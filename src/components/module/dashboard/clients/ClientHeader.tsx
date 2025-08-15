"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientHeaderProps {
  onClearForm: () => void;
}

export default function ClientHeader({ onClearForm }: ClientHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clients Management</h1>
        <p className="text-gray-600 mt-1">Add and manage your clients</p>
      </div>
      <Button onClick={onClearForm} className="bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4 mr-2" />
        Clear Form
      </Button>
    </div>
  );
}
