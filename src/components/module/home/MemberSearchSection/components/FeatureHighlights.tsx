"use client";

import React from "react";
import { Search, Users, Sparkles } from "lucide-react";

const FeatureHighlights: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: "NID Search",
      description:
        "Search for members using their National ID number for quick access",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      icon: Users,
      title: "Complete Profiles",
      description: "Access detailed member information and client records",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      icon: Sparkles,
      title: "Real-time Data",
      description: "Always up-to-date information from our secure database",
      gradient: "from-indigo-600 to-blue-600",
    },
  ];

  return (
    <div className="mt-16 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
