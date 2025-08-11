"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { DeleteMember, GetAllResearchAssociate } from "@/services/reserarchers";
import { TResearchAssociate } from "@/type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface MembersProps {
  data?: TResearchAssociate[];
}

const Members = ({ data: initialData }: MembersProps) => {
  const [data, setData] = useState<TResearchAssociate[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TResearchAssociate | null>(null);

  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await GetAllResearchAssociate();
          setData(response?.data || []);
        } catch (error) {
          console.error("Error fetching research members:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [initialData]);

  const handleDelete = (id: string) => {
    const member = data.find(member => member._id === id);
    if (member) {
      setMemberToDelete(member);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (memberToDelete) {
      try {
        setLoading(true);
        const res = await DeleteMember(memberToDelete._id);
        if (res?.success) {
          // Remove member from local state
          setData(prevData => prevData.filter(member => member._id !== memberToDelete._id));
          toast.success(`Member ${memberToDelete.fullName} deleted successfully`);
        } else {
          toast.error(res?.message || "Failed to delete member");
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        toast.error("Failed to delete member");
      } finally {
        setLoading(false);
        setMemberToDelete(null);
        setDeleteDialogOpen(false);
      }
    }
  };

  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Designation", value: "designation" },
    { label: "Email", value: "email" },
  ];

  return (
    <>
      <div className="w-full">
        <ManageTable
          data={data}
          isvalue="researhMembar"
          columns={columns}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Member"
        itemName={memberToDelete?.fullName || ""}
        itemType="member"
        description={`Are you sure you want to delete "${memberToDelete?.fullName}"? This action cannot be undone and will permanently remove the member from the system.`}
      />
    </>
  );
};
export default Members;
