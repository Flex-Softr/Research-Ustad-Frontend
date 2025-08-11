import React from "react";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/blogs/blog/RichTextEditor";

interface EventAgendaSectionProps {
  agenda: string;
  onChange: (value: string) => void;
  error?: string;
}

export const EventAgendaSection: React.FC<EventAgendaSectionProps> = ({
  agenda,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-4">
    
        <Label className="text-lg font-semibold text-gray-900">
          Event Agenda
        </Label>
    

      <div className="space-y-2">
        <RichTextEditor
          value={agenda}
          onChange={onChange}
          placeholder="Write your event agenda here... Include sessions, time slots, speakers, and activities. You can use headings, lists, and formatting to organize your content."
          minHeight="300px"
        />
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Agenda Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use headings to organize different time slots or sessions</li>
          <li>• Include specific times for each activity</li>
          <li>• List speakers and their topics</li>
          <li>• Mention breaks and networking sessions</li>
          <li>• Include venue details for different sessions</li>
        </ul>
      </div>
    </div>
  );
};
