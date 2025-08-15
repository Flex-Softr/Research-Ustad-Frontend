import RouteProtection from "@/components/module/dashboard/RouteProtection";

export default function CreateBlogPage() {
  return (
    <RouteProtection requiredRoles={["superadmin", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Create New Blog
          </h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-600">Create a new blog post here.</p>
            {/* Blog creation form will go here */}
          </div>
        </div>
      </div>
    </RouteProtection>
  );
}
