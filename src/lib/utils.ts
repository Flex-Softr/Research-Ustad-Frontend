import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to calculate course status based on dates
export function calculateCourseStatus(startDate: string | Date, endDate?: string | Date, duration?: string): 'upcoming' | 'ongoing' {
  const now = new Date();
  const start = new Date(startDate);
  
  // If we have an endDate, use it
  if (endDate) {
    const end = new Date(endDate);
    if (now < start) {
      return 'upcoming';
    } else {
      return 'ongoing';
    }
  }
  
  // If no endDate but we have duration, calculate endDate
  if (duration) {
    const durationMatch = duration.match(/(\d+)\s*(day|days|week|weeks|month|months|year|years)/i);
    if (durationMatch) {
      const amount = parseInt(durationMatch[1]);
      const unit = durationMatch[2].toLowerCase();
      
      const end = new Date(start);
      switch (unit) {
        case 'day':
        case 'days':
          end.setDate(end.getDate() + amount);
          break;
        case 'week':
        case 'weeks':
          end.setDate(end.getDate() + (amount * 7));
          break;
        case 'month':
        case 'months':
          end.setMonth(end.getMonth() + amount);
          break;
        case 'year':
        case 'years':
          end.setFullYear(end.getFullYear() + amount);
          break;
      }
      
      if (now < start) {
        return 'upcoming';
      } else {
        return 'ongoing';
      }
    }
  }
  
  // If no endDate or duration, just compare with startDate
  if (now < start) {
    return 'upcoming';
  } else {
    return 'ongoing';
  }
}
