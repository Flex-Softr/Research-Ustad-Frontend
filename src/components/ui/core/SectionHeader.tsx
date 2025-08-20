import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

const SectionHeader = ({
  title,
  description,
  className,
  children,
}: SectionHeaderProps) => {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold mb-4 relative tracking-tight font-serif",
          className === "text-white" ? "text-white" : "text-[#3A5A78]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
