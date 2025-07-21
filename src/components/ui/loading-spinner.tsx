import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "border" | "icon";
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = "md",
  variant = "icon",
  className,
  text,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const spinnerContent = (
    <div className={cn("text-center", className)}>
      {variant === "icon" ? (
        <Loader2
          className={cn(
            "text-brand-secondary animate-spin mx-auto mb-4",
            sizeClasses[size]
          )}
        />
      ) : (
        <div
          className={cn(
            "border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4",
            sizeClasses[size]
          )}
        />
      )}
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
