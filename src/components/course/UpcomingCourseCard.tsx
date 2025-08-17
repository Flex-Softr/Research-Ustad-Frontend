"use client";

import dayjs from "dayjs";
import CountdownTimer from "../shared/CountdownTimer";

interface ICourse {
  _id: string;
  title: string;
  startDate: string;
  status: "upcoming" | "ongoing";
  moveToOngoing: (_id: string) => void;
}

const UpcomingCourseCard = ({ course }: { course: ICourse }) => {
  const handleStatusChange = (status: "ongoing" | "finished") => {
    if (status === "ongoing") {
      course.moveToOngoing(course._id);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-gray-600">
        Starts at {dayjs(course.startDate).format("MMM D, YYYY h:mm A")}
      </p>
      <CountdownTimer
        startDate={course.startDate}
        itemId={course._id}
        itemType="course"
        onStatusChange={handleStatusChange}
        className="mt-2"
      />
    </div>
  );
};

export default UpcomingCourseCard;
