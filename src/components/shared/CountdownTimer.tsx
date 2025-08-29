"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import io from "socket.io-client";
import { Clock, Calendar, Play, Pause, CheckCircle } from "lucide-react";
import { api } from "@/config";

dayjs.extend(duration);

const socket = io(api.baseUrl);

interface CountdownTimerProps {
  startDate: string;
  endDate?: string;
  itemId: string;
  itemType: "course" | "event";
  onStatusChange?: (status: "ongoing" | "finished") => void;
  className?: string;
}

const CountdownTimer = ({
  startDate,
  endDate,
  itemId,
  itemType,
  onStatusChange,
  className = "",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "finished">(
    "upcoming"
  );
  const [timeUnits, setTimeUnits] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      // Ensure proper date parsing - handle different date formats
      let start = dayjs(startDate);

      // If the date string doesn't include time, assume it starts at 00:00:00
      if (startDate && !startDate.includes("T") && !startDate.includes(":")) {
        start = dayjs(startDate + "T00:00:00");
      }

      // If dayjs couldn't parse the date, try alternative formats
      if (!start.isValid()) {
        console.warn("Invalid start date format:", startDate);
        // Try parsing as ISO string or other common formats
        start = dayjs(startDate, "YYYY-MM-DD");
        if (!start.isValid()) {
          start = dayjs(startDate, "MM/DD/YYYY");
        }
      }

      const end = endDate ? dayjs(endDate) : null;

      // Debug logging
      // console.log("CountdownTimer Debug:", {
      //   startDate,
      //   parsedStart: start.format("YYYY-MM-DD HH:mm:ss"),
      //   now: now.format("YYYY-MM-DD HH:mm:ss"),
      //   diffToStart: start.diff(now, "second"),
      //   diffToStartDays: start.diff(now, "day"),
      //   diffToStartHours: start.diff(now, "hour"),
      //   timeUnits: {
      //     days: dayjs.duration(start.diff(now, "second"), "seconds").days(),
      //     hours: dayjs.duration(start.diff(now, "second"), "seconds").hours(),
      //     minutes: dayjs
      //       .duration(start.diff(now, "second"), "seconds")
      //       .minutes(),
      //     seconds: dayjs
      //       .duration(start.diff(now, "second"), "seconds")
      //       .seconds(),
      //   },
      // });

      // Calculate time until start
      const diffToStart = start.diff(now, "second");

      if (diffToStart > 0) {
        // Event/Course hasn't started yet
        setStatus("upcoming");

        // Calculate time units more accurately for large time differences
        const totalDays = Math.floor(diffToStart / (24 * 60 * 60));
        const remainingSeconds = diffToStart % (24 * 60 * 60);
        const totalHours = Math.floor(remainingSeconds / (60 * 60));
        const remainingMinutes = remainingSeconds % (60 * 60);
        const totalMinutes = Math.floor(remainingMinutes / 60);
        const totalSeconds = remainingMinutes % 60;

        setTimeUnits({
          days: totalDays,
          hours: totalHours,
          minutes: totalMinutes,
          seconds: totalSeconds,
        });

        // Format time left string
        const timeLeftStr = `${totalDays
          .toString()
          .padStart(2, "0")}:${totalHours
          .toString()
          .padStart(2, "0")}:${totalMinutes
          .toString()
          .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
        setTimeLeft(timeLeftStr);

        // Calculate progress for upcoming events
        // Show progress based on how close we are to the start time
        // Use a more intuitive approach: show progress from announcement to start
        const daysUntilStart = Math.ceil(diffToStart / (24 * 60 * 60));

        // For events more than 30 days away, show minimal progress
        // For events within 30 days, show increasing progress
        let progressPercent = 0;
        if (daysUntilStart <= 30) {
          progressPercent = Math.max(
            0,
            Math.min(100, ((30 - daysUntilStart) / 30) * 100)
          );
        } else {
          // For events more than 30 days away, show a small progress based on how far we are
          const monthsUntilStart = Math.ceil(daysUntilStart / 30);
          progressPercent = Math.max(
            0,
            Math.min(15, (1 / monthsUntilStart) * 15)
          ); // Max 15% for far events
        }
        setProgress(progressPercent);
      } else if (end && now.isBefore(end)) {
        // Event/Course is ongoing
        setStatus("ongoing");
        const diffToEnd = end.diff(now, "second");

        // Calculate time units more accurately for large time differences
        const totalDays = Math.floor(diffToEnd / (24 * 60 * 60));
        const remainingSeconds = diffToEnd % (24 * 60 * 60);
        const totalHours = Math.floor(remainingSeconds / (60 * 60));
        const remainingMinutes = remainingSeconds % (60 * 60);
        const totalMinutes = Math.floor(remainingMinutes / 60);
        const totalSeconds = remainingMinutes % 60;

        setTimeUnits({
          days: totalDays,
          hours: totalHours,
          minutes: totalMinutes,
          seconds: totalSeconds,
        });

        // Format time left string
        const timeLeftStr = `${totalDays
          .toString()
          .padStart(2, "0")}:${totalHours
          .toString()
          .padStart(2, "0")}:${totalMinutes
          .toString()
          .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
        setTimeLeft(timeLeftStr);

        // Calculate progress for ongoing events (0% = just started, 100% = ending)
        const totalDuration = end.diff(start, "second");
        const elapsed = now.diff(start, "second");
        const progressPercent = Math.max(
          0,
          Math.min(100, (elapsed / totalDuration) * 100)
        );
        setProgress(progressPercent);
      } else {
        // Event/Course has finished
        setStatus("finished");
        setTimeLeft("Finished");
        setTimeUnits({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setProgress(100);
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    // Emit status change when countdown reaches zero
    const checkStatusChange = () => {
      const now = dayjs();
      const start = dayjs(startDate);
      const end = endDate ? dayjs(endDate) : null;

      if (now.isAfter(start) && status === "upcoming") {
        setStatus("ongoing");
        // Emit the correct event based on item type
        if (itemType === "course") {
          socket.emit("updateCourseStatus", {
            courseId: itemId,
            status: "ongoing",
          });
        } else if (itemType === "event") {
          socket.emit("updateEventStatus", {
            eventId: itemId,
            status: "ongoing",
          });
        }
        onStatusChange?.("ongoing");
      } else if (end && now.isAfter(end) && status === "ongoing") {
        setStatus("finished");
        // Emit the correct event based on item type
        if (itemType === "course") {
          socket.emit("updateCourseStatus", {
            courseId: itemId,
            status: "finished",
          });
        } else if (itemType === "event") {
          socket.emit("updateEventStatus", {
            eventId: itemId,
            status: "finished",
          });
        }
        onStatusChange?.("finished");
      }
    };

    const statusCheckInterval = setInterval(checkStatusChange, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(statusCheckInterval);
    };
  }, [startDate, endDate, itemId, itemType, status, onStatusChange]);

  const getStatusColor = () => {
    switch (status) {
      case "upcoming":
        return "text-blue-600";
      case "ongoing":
        return "text-green-600";
      case "finished":
        return "text-gray-500";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case "upcoming":
        return "bg-gradient-to-br from-blue-50 to-blue-100";
      case "ongoing":
        return "bg-gradient-to-br from-green-50 to-green-100";
      case "finished":
        return "bg-gradient-to-br from-gray-50 to-gray-100";
      default:
        return "bg-gray-50";
    }
  };

  const getStatusBorderColor = () => {
    switch (status) {
      case "upcoming":
        return "border-blue-200";
      case "ongoing":
        return "border-green-200";
      case "finished":
        return "border-gray-200";
      default:
        return "border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "upcoming":
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case "ongoing":
        return <Play className="w-5 h-5 text-green-600" />;
      case "finished":
        return <CheckCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "upcoming":
        return "Starting in";
      case "ongoing":
        return "Ends in";
      case "finished":
        return "Event finished";
      default:
        return "";
    }
  };

  const TimeUnit = ({
    value,
    label,
    isHighlighted = false,
  }: {
    value: number;
    label: string;
    isHighlighted?: boolean;
  }) => (
    <div
      className={`flex flex-col items-center ${
        isHighlighted ? "scale-110" : ""
      } transition-transform duration-300`}
    >
      <div
        className={`relative w-16 h-16 rounded-xl flex items-center justify-center ${
          isHighlighted
            ? "bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg"
            : "bg-white text-gray-700 border border-gray-200 shadow-sm"
        }`}
      >
        <span
          className={`text-lg font-bold ${
            isHighlighted ? "text-white" : "text-gray-800"
          }`}
        >
          {value.toString().padStart(2, "0")}
        </span>
        {isHighlighted && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>
      <span
        className={`text-xs font-medium mt-2 ${
          isHighlighted ? "text-brand-secondary" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className={`${className}`}>
      {status !== "finished" && (
        <div
          className={`p-6 rounded-2xl ${getStatusBgColor()} border ${getStatusBorderColor()} shadow-lg`}
        >
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {getStatusIcon()}
            <span className={`text-sm font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>

          {/* Time Units Grid */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <TimeUnit
              value={timeUnits.days}
              label="Days"
              isHighlighted={timeUnits.days <= 1 && timeUnits.days > 0}
            />
            <TimeUnit
              value={timeUnits.hours}
              label="Hours"
              isHighlighted={
                timeUnits.days === 0 &&
                timeUnits.hours <= 6 &&
                timeUnits.hours > 0
              }
            />
            <TimeUnit
              value={timeUnits.minutes}
              label="Minutes"
              isHighlighted={
                timeUnits.days === 0 &&
                timeUnits.hours === 0 &&
                timeUnits.minutes <= 30 &&
                timeUnits.minutes > 0
              }
            />
            <TimeUnit
              value={timeUnits.seconds}
              label="Seconds"
              isHighlighted={
                timeUnits.days === 0 &&
                timeUnits.hours === 0 &&
                timeUnits.minutes === 0
              }
            />
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {status === "upcoming"
                  ? `${Math.ceil(timeUnits.days)} days to start`
                  : `${Math.ceil(timeUnits.days)} days remaining`}
              </span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                  status === "upcoming"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600"
                    : "bg-gradient-to-r from-green-400 to-green-600"
                }`}
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              {status === "upcoming"
                ? progress < 15
                  ? "Event announced"
                  : progress < 50
                  ? "Getting closer"
                  : "Almost here!"
                : "Event in progress"}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                status === "upcoming"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {status === "upcoming" ? "⏰ Upcoming" : "🎯 Live"}
            </span>
          </div>
        </div>
      )}

      {status === "finished" && (
        <div
          className={`p-6 rounded-2xl ${getStatusBgColor()} border ${getStatusBorderColor()} shadow-lg text-center`}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <CheckCircle className="w-6 h-6 text-gray-500" />
            <span className="text-lg font-semibold text-gray-700">
              Event Completed
            </span>
          </div>
          <p className="text-sm text-gray-600">
            This {itemType} has finished. Thank you for participating!
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
