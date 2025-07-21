import React from "react";
import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isLogin, setIsLogin }) => {
  return (
    <div className="mt-8 text-center">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsLogin(!isLogin)}
        className="text-teal-600 hover:text-teal-700 font-medium py-3 px-6 text-base hover:bg-teal-50 rounded-lg transition-all duration-300"
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : "Already have an account? Sign In"}
      </Button>
    </div>
  );
};

export default ToggleButton;
