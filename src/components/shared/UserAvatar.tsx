import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  src,
  alt,
  name,
  size = "md",
  className,
  fallbackClassName,
}: UserAvatarProps) => {
  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  // Fallback size classes for text
  const fallbackSizeClasses = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-sm",
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold",
          fallbackSizeClasses[size],
          fallbackClassName
        )}
      >
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
