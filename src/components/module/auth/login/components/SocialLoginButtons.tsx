import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Linkedin } from "lucide-react";

const SocialLoginButtons: React.FC = () => {
  return (
    <div className="flex justify-center gap-5 mb-8">
      <Button
        variant="outline"
        size="sm"
        className="w-14 h-14 rounded-full p-0 border-2 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
      >
        <Facebook className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-14 h-14 rounded-full p-0 border-2 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
      >
        <span className="text-base font-bold">G+</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-14 h-14 rounded-full p-0 border-2 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
      >
        <Linkedin className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
