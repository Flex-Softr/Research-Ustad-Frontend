/**
 * Comprehensive Date Utility Functions
 * Provides various date formatting and manipulation functions for the application
 */

export interface DateFormatOptions {
  locale?: string;
  timeZone?: string;
  includeTime?: boolean;
  includeSeconds?: boolean;
  format?: 'short' | 'long' | 'numeric' | 'relative';
}

/**
 * Format date for HTML date input (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
  } catch (error) {
    return "";
  }
};

/**
 * Format date for display with various options
 */
export const formatDate = (
  dateString: string | undefined,
  options: DateFormatOptions = {}
): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    const {
      locale = "en-US",
      includeTime = false,
      includeSeconds = false,
      format = 'short'
    } = options;

    if (format === 'relative') {
      return formatRelativeDate(date);
    }

    if (format === 'long') {
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...(includeTime && {
          hour: "2-digit",
          minute: "2-digit",
          ...(includeSeconds && { second: "2-digit" })
        })
      });
    }

    if (format === 'numeric') {
      return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        ...(includeTime && {
          hour: "2-digit",
          minute: "2-digit",
          ...(includeSeconds && { second: "2-digit" })
        })
      });
    }

    // Default short format
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...(includeTime && {
        hour: "2-digit",
        minute: "2-digit",
        ...(includeSeconds && { second: "2-digit" })
      })
    });
  } catch (error) {
    return "Invalid Date";
  }
};

/**
 * Format time only
 */
export const formatTime = (
  dateString: string | undefined,
  options: { includeSeconds?: boolean; locale?: string } = {}
): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    const { includeSeconds = false, locale = "en-US" } = options;
    
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      ...(includeSeconds && { second: "2-digit" })
    });
  } catch (error) {
    return "Invalid Time";
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "3 days ago")
 */
export const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
};

/**
 * Check if a date is in the past
 */
export const isPastDate = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
  } catch (error) {
    return false;
  }
};

/**
 * Check if a date is in the future
 */
export const isFutureDate = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const now = new Date();
    return date > now;
  } catch (error) {
    return false;
  }
};

/**
 * Get the difference between two dates in days
 */
export const getDaysDifference = (date1: string, date2: string): number => {
  try {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
};

/**
 * Format date range (e.g., "Jan 15 - Jan 20, 2024")
 */
export const formatDateRange = (
  startDate: string | undefined,
  endDate: string | undefined,
  options: { locale?: string } = {}
): string => {
  if (!startDate || !endDate) return "N/A";
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const { locale = "en-US" } = options;

    // If same date, return single date
    if (start.toDateString() === end.toDateString()) {
      return formatDate(startDate, { format: 'short' });
    }

    // If same month and year
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    // If same year but different months
    if (start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
    }

    // Different years
    return `${start.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } catch (error) {
    return "Invalid Date Range";
  }
};

/**
 * Get current date in YYYY-MM-DD format
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Add days to a date
 */
export const addDays = (dateString: string, days: number): string => {
  try {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString();
  } catch (error) {
    return dateString;
  }
};

/**
 * Check if a date is today
 */
export const isToday = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  } catch (error) {
    return false;
  }
};

/**
 * Check if a date is this week
 */
export const isThisWeek = (dateString: string | undefined): boolean => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return date >= startOfWeek && date <= endOfWeek;
  } catch (error) {
    return false;
  }
};

/**
 * Get day of week name
 */
export const getDayOfWeek = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  } catch (error) {
    return "Invalid Date";
  }
};

/**
 * Get month name
 */
export const getMonthName = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long" });
  } catch (error) {
    return "Invalid Date";
  }
}; 