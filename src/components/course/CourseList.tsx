"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import UpcomingCourseCard from "./UpcomingCourseCard";
import { MyCourse } from "@/services/allreserchPaper";

const socket = io("https://researchustad-backend.vercel.app");

interface ICourse {
  _id: string;
  title: string;
  startDate: string;
  status: "upcoming" | "ongoing";
}

const CourseList = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);

  const fetchCourses = async () => {
    try {
      const res = await MyCourse();
      setCourses(res.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();

    socket.on("courseUpdate", (updatedCourses: ICourse[]) => {
      setCourses(updatedCourses);
    });

    return () => {
      socket.off("courseUpdate");
    };
  }, []);

  const moveToOngoing = (_id: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === _id ? { ...course, status: "ongoing" } : course
      )
    );
  };

  const upcomingCourses = courses.filter((course) => course.status === "upcoming");
  const ongoingCourses = courses.filter((course) => course.status === "ongoing");

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-3">Upcoming Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingCourses.map((course) => (
          <UpcomingCourseCard key={course._id} course={{ ...course, moveToOngoing }} />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">Ongoing Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ongoingCourses.map((course) => (
          <div key={course._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-green-500 font-semibold">Ongoing</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
