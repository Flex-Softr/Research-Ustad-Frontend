"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UpdateInfoConferencesSectionProps, Conference } from "@/type";

export function ConferencesSection({
  conferencesList,
  onAddConference,
  onRemoveConference,
  onUpdateConference,
  errors,
}: UpdateInfoConferencesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2">
        Conferences & Speaking Engagements (Optional)
      </h3>
      <div className="space-y-4">
        {conferencesList.map((conference, i) => (
          <div key={i} className="border rounded-lg p-4 space-y-3 bg-gray-50">
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-medium text-gray-700">Conference {i + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveConference(i)}
                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-600">Conference Name</span>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <Input
                    value={conference.name}
                    onChange={(e) => onUpdateConference(i, 'name', e.target.value)}
                    placeholder="e.g., NeurIPS 2024"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-600">Your Role</span>
                <div className="flex gap-2 items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <Input
                    value={conference.role}
                    onChange={(e) => onUpdateConference(i, 'role', e.target.value)}
                    placeholder="e.g., Keynote Speaker, Presenter"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-600">Topic/Title</span>
              <div className="flex gap-2 items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <Input
                  value={conference.topic}
                  onChange={(e) => onUpdateConference(i, 'topic', e.target.value)}
                  placeholder="e.g., Advances in Large Language Models"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={onAddConference}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Conference
        </Button>
        
        {errors.conferences && (
          <p className="text-red-500 text-sm">
            {String(errors.conferences.message || "Invalid conferences data")}
          </p>
        )}
      </div>
    </div>
  );
}
