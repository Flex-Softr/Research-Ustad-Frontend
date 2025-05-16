"use client"
import { TResearchAssociate } from "@/type";
import { DeleteMember, GetAllResearchAssociate } from "@/services/reserarchers";
import { useEffect, useState } from "react";
import ManageTable from "@/components/shared/ManageTable/ManageTable";

const Members = () => {

  const [data, setData] = useState<TResearchAssociate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllResearchAssociate();
        setData(response?.data || []);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeleteMember(id);
      if (res) {
        setLoading(true);
        const response = await GetAllResearchAssociate();
        setData(response?.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
    }
  };

  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Designation", value: "designation" },
    { label: "Email", value: "email" }, 
    { label: "ContactNo", value: "contactNo" },
  ];

  return (
    <div className=" lg:w-[990px]">
      <ManageTable
        data={data} 
        isvalue="researhMembar" 
        columns={columns} 
        loading={loading} 
        onDelete={handleDelete} 
      />
    </div>
  );

}
export default Members;
