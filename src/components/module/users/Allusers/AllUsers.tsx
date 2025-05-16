"use client"
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { GetAllUsers, PromoteRole } from "@/services/Users";
import { TUser } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageAllUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllUsers()       
         setData(response?.data || []);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" }, 

  ];
const handledeleted= async()=>{
  console.log("hellow rld");
}


  return (
    <div className=" lg:w-[990px]">
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
