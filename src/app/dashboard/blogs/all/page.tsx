import RouteProtection from "@/components/module/dashboard/RouteProtection";

export default function AllBlogsPage() {
  return (
    <RouteProtection requiredRoles={["superadmin", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Blogs</h1>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <p className="text-gray-600">
              View and manage all blog posts here.
            </p>
            {/* Blog list content will go here */}
          </div>
        </div>
      </div>
    </RouteProtection>
  );
}
