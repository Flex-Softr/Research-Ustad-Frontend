// Format date function
export const formatDate = (dateString: string): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return "Invalid Date";
  }
};

// Get item title for confirmation dialog
export const getItemTitle = (item: any): string => {
  if (item.title) return item.title;
  if (item.name) return item.name;
  if (item.fullName) return item.fullName;
  return "this item";
};
