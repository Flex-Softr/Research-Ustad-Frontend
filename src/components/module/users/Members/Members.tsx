"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeleteMember, GetAllResearchAssociate } from "@/services/reserarchers";
import { TResearchAssociate } from "@/type";
import { useEffect, useState } from "react";

interface MembersProps {
  data?: TResearchAssociate[];
}

const Members = ({ data: initialData }: MembersProps) => {
  const [data, setData] = useState<TResearchAssociate[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(!initialData);

  useEffect(() => {
    if (!initialData) {
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
    }
  }, [initialData]);

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
    <div className="w-full">
      <ManageTable
        data={data}
        isvalue="researhMembar"
        columns={columns}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default Members;
