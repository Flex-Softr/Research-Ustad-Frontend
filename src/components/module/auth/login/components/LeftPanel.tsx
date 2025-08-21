import React from "react";
import Image from "next/image";
import Link from "next/link";
import image1 from "../../../../../../public/logo.png";

const LeftPanel = () => {
  return (
    <div className="lg:w-1/2 bg-brand-primary p-8 lg:p-12 flex flex-col justify-center relative">
      {/* Back to Home Button */}
      <Link 
        href="/"
        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      {/* Logo and Brand */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={image1}
          width={70}
          height={70}
          alt="Research Ustad Logo"
          className="rounded-lg"
        />
        <span className="text-white font-bold text-xl">Research Ustad</span>
      </div>

      {/* Welcome Content */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Welcome Back!
        </h1>
        <p className="text-white/80 text-lg leading-relaxed">
          Sign in to access your research dashboard and continue your academic journey with Research Ustad.
        </p>
      </div>
    </div>
  );
};

export default LeftPanel;
