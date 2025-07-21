import LoadingSpinner from "@/components/ui/loading-spinner";

const CourseLoadingSpinner = () => {
  return (
    <LoadingSpinner
      size="xl"
      variant="border"
      text="Loading course..."
      fullScreen
    />
  );
};

export default CourseLoadingSpinner;
