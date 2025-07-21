import React from "react";
import SocialLoginButtons from "./SocialLoginButtons";
import LoginForm from "./LoginForm";
import ToggleButton from "./ToggleButton";

interface RightPanelProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className="lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center relative">
      {/* Decorative Triangle */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-pink-400 opacity-20"></div>

      {/* Form Content */}
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        {/* Social Login Buttons */}
        {!isLogin && <SocialLoginButtons />}

        {!isLogin && (
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or use your email for registration
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <LoginForm isLogin={isLogin} />

        {/* Toggle Button */}
        <ToggleButton isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};

export default RightPanel;
