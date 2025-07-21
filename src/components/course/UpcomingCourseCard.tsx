"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import io from "socket.io-client";

dayjs.extend(duration);

const socket = io("https://researchustad-backend.vercel.app");

interface ICourse {
  _id: string;
  title: string;
  startDate: string;
  status: "upcoming" | "ongoing";
  moveToOngoing: (_id: string) => void;
}

const UpcomingCourseCard = ({ course }: { course: ICourse }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs();
      const start = dayjs(course.startDate);
      const diff = start.diff(now, "second");

      if (diff <= 0) {
        setTimeLeft("Starting Now!");
        socket.emit("updateCourseStatus", {
          courseId: course._id,
          status: "ongoing",
        });
      } else {
        setTimeLeft(dayjs.duration(diff, "seconds").format("HH:mm:ss"));
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [course.startDate]);

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">
        Starts at {dayjs(course.startDate).format("MMM D, YYYY h:mm A")}
      </p>
      <p className="text-blue-500 font-semibold">{timeLeft}</p>
    </div>
  );
};

export default UpcomingCourseCard;
