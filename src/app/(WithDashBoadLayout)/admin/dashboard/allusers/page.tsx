import ManageAllUser from "@/components/module/users/Allusers/AllUsers";
import { GetAllUsers } from "@/services/Users";

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

const ManageUser = async () => {
  // Fetch data server-side for better UX
  let initialData = [];
  try {
    const response = await GetAllUsers();
    if (response?.data) {
      initialData = response.data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    // Continue with empty data - client will handle fetching
    initialData = [];
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all platform users and their roles
        </p>
      </div>
      <ManageAllUser data={initialData} />
    </div>
  );
};

export default ManageUser;
