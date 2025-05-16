"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import ResearchMembar from "./ResearchMembar/ResearchMembar";

type AllMembers = {
  allMembers: UserProfile[];
};

const SkeletonLoader = () => (
  <div className="px-12 py-8 transition-colors duration-300 transform border rounded-xl group">
    <div className="flex flex-col sm:-mx-4 sm:flex-row gap-6">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 animate-pulse rounded-full"></div>
      <div className="mt-4 sm:mx-4 sm:mt-0">
        <div className="h-6 bg-gray-300 animate-pulse rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
      </div>
    </div>
    <div className="mt-4 h-4 bg-gray-300 animate-pulse rounded-md w-3/4"></div>
  </div>
);

const NoDataMessage = () => (
  <div className="px-12 py-8 text-center text-gray-500 dark:text-gray-300">
    <p>No team members available at the moment.</p>
  </div>
);

const Team = ({ allMembers }: AllMembers) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to simulate loading for 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMembers.map((member: UserProfile, index) => (
            <ResearchMembar associate={member} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
