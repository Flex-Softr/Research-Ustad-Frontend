"use client";
import { useState, useEffect } from "react";
import { TResearchAssociate } from "@/type";
import { GetAllResearchAssociate, DeleteMember } from "@/services/reserarchers";
import { toast } from "sonner";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import UserAvatar from "@/components/shared/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Users, Mail } from "lucide-react";
import EditDesignationModal from "./EditDesignationModal";

interface MembersProps {
  data?: TResearchAssociate[];
}

const Members = ({ data: initialData }: MembersProps) => {
  const [data, setData] = useState<TResearchAssociate[]>(initialData || []);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<TResearchAssociate | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] =
    useState<TResearchAssociate | null>(null);

  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await GetAllResearchAssociate();
          // Filter out admin and superAdmin users
          const filteredData = (response?.data || []).filter(
            (member: TResearchAssociate) =>
              member.role !== "admin" && member.role !== "superAdmin"
          );
          setData(filteredData);
        } catch (error) {
          console.error("Error fetching research members:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      // Filter out admin and superAdmin users from initial data
      const filteredData = initialData.filter(
        (member: TResearchAssociate) =>
          member.role !== "admin" && member.role !== "superAdmin"
      );
      setData(filteredData);
    }
  }, [initialData]);

  const handleDelete = async (id: string) => {
    const member = data.find((m) => m._id === id);
    if (member) {
      setMemberToDelete(member);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    try {
      const res = await DeleteMember(memberToDelete._id);
      if (res?.success) {
        // Remove member from local state immediately for instant feedback
        setData((prevData) =>
          prevData.filter((member) => member._id !== memberToDelete._id)
        );
        toast.success(`Successfully deleted member ${memberToDelete.fullName}`);
      } else {
        toast.error(res?.message || "Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete member");
    } finally {
      setMemberToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleEdit = (member: TResearchAssociate) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleEditSuccess = (updatedDesignation?: string) => {
    // Update the local data immediately for instant feedback
    if (selectedMember && updatedDesignation) {
      setData((prevData) =>
        prevData.map((member) =>
          member._id === selectedMember._id
            ? { ...member, designation: updatedDesignation }
            : member
        )
      );
    }

    // Also refresh from server to ensure consistency
    const fetchData = async () => {
      try {
        const response = await GetAllResearchAssociate();
        const filteredData = (response?.data || []).filter(
          (member: TResearchAssociate) =>
            member.role !== "admin" && member.role !== "superAdmin"
        );
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching research members:", error);
      }
    };
    fetchData();
  };

  const columns = [
    { label: "Name", value: "fullName" },
    { label: "Email", value: "email" },
    { label: "Designation", value: "designation" },
  ];

  // Custom cell rendering for the table
  const customRenderCell = (column: any, item: TResearchAssociate) => {
    if (column.value === "fullName") {
      return (
        <div className="flex items-center space-x-3">
          <UserAvatar
            src={item.image}
            alt={item.fullName}
            name={item.fullName}
            size="md"
          />
          <div>
            <div className="font-medium text-gray-900">{item.fullName}</div>
            {item.shortBio && (
              <div
                className="text-xs text-gray-500 truncate max-w-[200px]"
                title={item.shortBio}
              >
                {item.shortBio}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (column.value === "email") {
      return (
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{item.email}</span>
        </div>
      );
    }

    if (column.value === "designation") {
      return item.designation ? (
        <Badge
          variant="outline"
          className="text-xs bg-brand-primary text-white"
        >
          {item.designation}
        </Badge>
      ) : (
        <span className="text-sm text-gray-400">N/A</span>
      );
    }

    return null; // Let default rendering handle other cases
  };

  // Custom actions for the table
  const customActions = (item: TResearchAssociate) => {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(item._id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          title="Delete Member"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Research Members
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage research team members
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-500">
            {data.length} member{data.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <ManageTable
        data={data}
        loading={loading}
        columns={columns}
        isvalue="researhMembar"
        onDelete={handleDelete}
        customRenderCell={customRenderCell}
        customActions={customActions}
      />

      {/* Edit Designation Modal */}
      <EditDesignationModal
        member={selectedMember}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        title="Delete Member"
        itemName={memberToDelete?.fullName || null}
        itemType="member"
        description={`Are you sure you want to delete "${memberToDelete?.fullName}"? This action cannot be undone and will permanently remove the member from the research team.`}
        confirmText="Delete Member"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Members;
