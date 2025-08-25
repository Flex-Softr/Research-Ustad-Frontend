"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useRef, useEffect } from "react";

interface Column {
  label: string;
  value: string;
}

interface DataItem {
  _id: string;
  [key: string]: any;
}

interface CellRendererProps {
  column: Column;
  item: DataItem;
  formatDate: (dateString: string) => string;
}

// Custom hook for tooltip positioning
const useTooltipPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const tooltipWidth = 320; // Increased tooltip width
    const tooltipHeight = 300; // Increased tooltip height for better scrolling

    let x = rect.left + rect.width / 2 - tooltipWidth / 2;
    let y = rect.top - tooltipHeight - 10; // Position above the element

    // Adjust if tooltip would go off-screen
    if (x < 10) x = 10;
    if (x + tooltipWidth > window.innerWidth - 10)
      x = window.innerWidth - tooltipWidth - 10;
    if (y < 10) y = rect.bottom + 10; // Position below if not enough space above

    setPosition({ x, y });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringTooltip) {
        setIsVisible(false);
      }
    }, 100); // Small delay to allow moving to tooltip
  };

  const handleTooltipMouseEnter = () => {
    setIsHoveringTooltip(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    setIsHoveringTooltip(false);
    setIsVisible(false);
  };

  return { 
    position, 
    isVisible, 
    handleMouseEnter, 
    handleMouseLeave, 
    handleTooltipMouseEnter, 
    handleTooltipMouseLeave 
  };
};

export const CellRenderer: React.FC<CellRendererProps> = ({
  column,
  item,
  formatDate,
}) => {
  const cellValue = column.value
    .split(".")
    .reduce((o: any, k: string) => (o?.[k] ? o[k] : ""), item);

  if (column.value === "authors") {
    const authors = cellValue || [];
    const authorCount = authors.length;
    const displayText =
      authorCount > 0
        ? `${authorCount} author${authorCount > 1 ? "s" : ""}`
        : "No authors";

    const { 
      position, 
      isVisible, 
      handleMouseEnter, 
      handleMouseLeave, 
      handleTooltipMouseEnter, 
      handleTooltipMouseLeave 
    } = useTooltipPosition();

    return (
      <>
        <span
          className="text-sm text-gray-600 cursor-help hover:text-gray-800 transition-colors"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {displayText}
        </span>
                 {authors.length > 0 && isVisible && (
           <div
             className="fixed z-[9999] transition-opacity duration-200"
             style={{
               left: `${position.x}px`,
               top: `${position.y}px`,
             }}
             onMouseEnter={handleTooltipMouseEnter}
             onMouseLeave={handleTooltipMouseLeave}
           >
            <div className="relative bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700 min-w-[280px] max-w-[320px] p-4">
              <div className="font-semibold mb-3 text-white border-b border-gray-600 pb-2">
                Authors:
              </div>
              <div
                className="max-h-48 overflow-y-auto"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#6B7280 #374151",
                }}
              >
                <div className="space-y-2 pr-2">
                  {authors.map((author: any, index: number) => {
                    let displayName = "";
                    if (author?.user?.fullName) {
                      displayName = author.user.fullName;
                    } else if (author?.name) {
                      displayName = author.name;
                    } else {
                      displayName = "Unknown Author";
                    }

                    const role = author?.role || "Author";

                    return (
                      <div key={index} className="flex items-center justify-between bg-gray-800 rounded-md p-2 hover:bg-gray-700 transition-colors">
                        <div className="text-gray-200 text-xs flex-1 truncate">
                          {displayName}
                        </div>
                        <div className="text-gray-400 text-xs bg-gray-600 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                          {role}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (column.value === "paperType") {
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
        {cellValue || "N/A"}
      </span>
    );
  }

  if (column.value === "visitLink") {
    return (
      <a
        href={cellValue}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Visit
      </a>
    );
  }

  if (
    column.value === "publishedDate" ||
    column.value === "createdAt" ||
    column.value === "updatedAt"
  ) {
    return formatDate(cellValue);
  }

  if (column.value === "category") {
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
        {cellValue || "Uncategorized"}
      </span>
    );
  }

  if (column.value === "role") {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.role === "superAdmin"
            ? "bg-purple-100 text-purple-800"
            : item.role === "admin"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {item.role}
      </span>
    );
  }

  if (column.value === "isApproved") {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.isApproved
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {item.isApproved ? "Approved" : "Pending"}
      </span>
    );
  }

  if (column.value === "title") {
    return (
      <div className="max-w-[150px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-sm cursor-help line-clamp-2">
              {cellValue?.length > 25
                ? cellValue?.substring(0, 25) + "..."
                : cellValue}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-[300px]">{cellValue}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  }

  return cellValue;
};
