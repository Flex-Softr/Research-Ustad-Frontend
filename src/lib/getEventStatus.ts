export interface EventData {
  startDate: string;
  endDate: string;
}

export const getEventStatus = (event: {
  startDate: string;
  endDate: string;
}) => {
  const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  if (now < startDate) {
    const daysUntil = Math.ceil(
      (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      status: "upcoming",
      text: `${daysUntil} days away`,
      color: "text-green-600",
      bgColor: "bg-green-100", // ✅ add this
    };
  } else if (now >= startDate && now <= endDate) {
    return {
      status: "ongoing",
      text: "Ongoing",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100", // ✅ add this
    };
  } else {
    return {
      status: "finished",
      text: "Finished",
      color: "text-gray-500",
      bgColor: "bg-gray-200", // ✅ add this
    };
  }
};
