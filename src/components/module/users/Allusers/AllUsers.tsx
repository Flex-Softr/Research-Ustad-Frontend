"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers } from "@/services/Users";
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

  console.log('users', data)

  return (
    <div className=" w-full">
      <ManageTable
        data={data}
        isvalue="userRole"
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

export default ManageAllUser;
