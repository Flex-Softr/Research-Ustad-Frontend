"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers, DeleteUser } from "@/services/Users";
import { TUser } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageAllUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TUser[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await GetAllUsers();
      setData(response?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" },
  ];
  const handledeleted = async (id: string) => {
    try {
      const user = data.find(user => user._id === id);
      
      // Prevent deletion of superAdmin users
      if (user?.role === "superAdmin") {
        toast.error("SuperAdmin users cannot be deleted");
        return;
      }

      // Show confirmation dialog
      const confirmed = window.confirm(`Are you sure you want to delete ${user?.fullName}? This action cannot be undone.`);
      if (!confirmed) return;

      setLoading(true);
      const response = await DeleteUser(id);
      
      if (response?.success) {
        // Remove user from local state
        setData(prevData => prevData.filter(user => user._id !== id));
        toast.success(`User ${user?.fullName} deleted successfully`);
      } else {
        toast.error(response?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  console.log('users', data)

  return (
    <div className=" w-full">
      <ManageTable
        data={data}
        isvalue="userRole"
        columns={columns}
        loading={loading}
        onDelete={handledeleted}
      />
    </div>
  );
};

export default ManageAllUser;
