"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers, PromoteRole } from "@/services/Users";
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

  const handleRoleChange = async (id: string, currentRole: string) => {
    try {
      if (currentRole === "superAdmin") {
        toast.error("SuperAdmin role cannot be changed");
        return;
      }

      const res = await PromoteRole(id);
      if (res?.success) {
        toast.success(`Successfully changed role for ${res?.data?.fullName}`);
        // Refresh the data to show the updated role
        fetchData();
      } else {
        toast.error(res?.message || "Failed to change role");
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    }
  };
  
  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" },
  ];

  console.log('users', data)

  return (
    <div className="w-full">
      <ManageTable
        data={data}
        isvalue="userRole"
        columns={columns}
        loading={loading}
        onRoleChange={handleRoleChange}
      />
    </div>
  );
};

export default ManageAllUser;
