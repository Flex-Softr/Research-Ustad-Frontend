import React from "react";
import LoginForm from "./LoginForm";


const RightPanel = () => {
  return (
    <div className="lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center relative">
      {/* Decorative Triangle */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-pink-400 opacity-20"></div>

      {/* Form Content */}
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Sign In
        </h2>
        {/* Form */}
        <LoginForm />

      </div>
    </div>
  );
};

export default RightPanel;
