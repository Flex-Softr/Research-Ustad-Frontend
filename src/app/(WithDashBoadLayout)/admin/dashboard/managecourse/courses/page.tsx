const CoursesPageRoute = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="text-gray-600">Manage active courses</p>
        </div>
      </div>

      {/* TODO: Add course-specific filtering and management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Course Management
          </h3>
          <p className="text-gray-600">
            This page will contain course-specific management features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPageRoute;
