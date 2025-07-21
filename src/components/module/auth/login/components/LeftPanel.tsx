import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image1 from "../../../../../../public/logo.png";

interface LeftPanelProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className="lg:w-1/2 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-lg"></div>
        <div className="absolute top-20 right-16 w-6 h-6 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-10 h-10 bg-white rounded-lg"></div>
        <div className="absolute bottom-10 right-10 w-4 h-4 bg-white rounded-full"></div>
      </div>

      {/* Logo and Brand */}
      <div className="relative z-10 flex items-center gap-3 mb-8">
        <Image
          src={image1}
          width={40}
          height={40}
          alt="logo"
          className="rounded-lg"
        />
        <span className="text-white font-bold text-xl">ResearchUstad</span>
      </div>

      {/* Welcome Content */}
      <div className="relative z-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Welcome Back!
        </h1>
        <p className="text-emerald-100 text-lg mb-8">
          To keep connected with us please login with your personal info
        </p>

        {/* Sign In Button */}
        <Button
          onClick={() => setIsLogin(true)}
          variant="outline"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
        >
          SIGN IN
        </Button>
      </div>
    </div>
  );
};

export default LeftPanel;
