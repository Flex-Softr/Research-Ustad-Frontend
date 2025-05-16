
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { BsChatLeftDots } from "react-icons/bs";


const ChatButton = () => {
  return (
    <div className="fixed bottom-8 right-6 z-50">
    <Link href="https://wa.me/+8801910649179"  target="_blank"
      rel="noopener noreferrer">
    <Button className=" bg-blue-500 text-white px-6 py-3 rounded-full flex items-center shadow-lg hover:bg-blue-600 transition-all">
      <BsChatLeftDots className="w-6 h-6 mr-2" />
      Chat
    </Button>
    </Link>
    </div>
  );
};

export default ChatButton;
