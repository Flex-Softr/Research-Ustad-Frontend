import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbItem } from "@/type";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

const Breadcrumb = ({
  items,
  className = "",
  showHome = true,
}: BreadcrumbProps) => {
  return (
    <section
      className={`w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-white">
            {showHome && (
              <>
                <Link
                  href="/"
                  className="flex items-center hover:text-brand-secondary transition-colors duration-300"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-white/60" />
              </>
            )}

            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-white/60" />
                )}
                {item.href && !item.current ? (
                  <Link
                    href={item.href}
                    className="hover:text-brand-secondary transition-colors duration-300 text-white/80"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`${
                      item.current ? "text-white" : "text-white/80"
                    } truncate max-w-xs`}
                  >
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Page Title - Only show if there's a current item */}
          {items.length > 0 && items[items.length - 1]?.current && (
            <div className="text-right">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {items[items.length - 1].label}
              </h1>
              {items.length > 1 && (
                <p className="text-white/80 text-sm md:text-base mt-1">
                  {items[items.length - 2]?.label}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
