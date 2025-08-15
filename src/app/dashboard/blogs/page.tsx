import RouteProtection from "@/components/module/dashboard/RouteProtection";

export default function BlogsPage() {
  return (
    <RouteProtection requiredRoles={["superadmin", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Blog Management
          </h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-600">
              Welcome to the blog management section. Here you can manage all
              blog posts.
            </p>
            {/* Blog management content will go here */}
          </div>
        </div>
      </div>
    </RouteProtection>
  );
}
