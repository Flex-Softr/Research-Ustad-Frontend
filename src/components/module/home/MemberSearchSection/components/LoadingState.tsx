"use client";

import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white text-lg">Searching for members...</p>
    </div>
  );
};

export default LoadingState;
