"use client";

import React from "react";
import { User } from "lucide-react";
import { SearchResult } from "../types";

interface MemberProfileProps {
  member: SearchResult;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ member }) => {
  return (
    <div className="flex items-start gap-6 mb-6">
      <div className="w-40 h-40 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.fullName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <User
          className={`w-12 h-12 text-gray-600 ${member.photo ? "hidden" : ""}`}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {member.fullName}
        </h3>
        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-medium">District:</span> {member.district}
          </p>
          <p>
            <span className="font-medium">Address:</span> {member.fullAddress}
          </p>

          <p>
            <span className="font-medium">Phone:</span> {member.phoneNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
