import React from "react";
import LoginForm from "./LoginForm";

const RightPanel = () => {
  return (
    <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-center">
      {/* Form Content */}
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-brand-primary mb-5 text-center tracking-tight">
          Sign In
        </h2>
        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default RightPanel;
