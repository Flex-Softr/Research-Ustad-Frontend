// Designation options for research team members
export const DESIGNATION_OPTIONS = [
  "Advisor",
  "Mentor", 
  "Team Lead",
  "Executive Board",
] as const;

// Type for designation values
export type DesignationType = typeof DESIGNATION_OPTIONS[number];

// Helper function to check if a string is a valid designation
export const isValidDesignation = (value: string): value is DesignationType => {
  return DESIGNATION_OPTIONS.includes(value as DesignationType);
};
