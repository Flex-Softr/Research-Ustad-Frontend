"use client";

import { ApprovePaper, RejectPaper } from "@/services/allreserchPaper";
import { PromoteRole } from "@/services/Users";
import { toast } from "sonner";

interface UseTableActionsProps {
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRoleChange?: (id: string, currentRole: string) => void;
}

export const useTableActions = ({
  onApprove,
  onReject,
  onRoleChange,
}: UseTableActionsProps) => {
  const handleApprove = async (id: string) => {
    try {
      if (onApprove) {
        // Call the custom onApprove function if provided (parent handles approval)
        await onApprove(id);
      } else {
        // Default approval logic (ManageTable handles approval)
        console.log("Approving paper with ID:", id);
        const res = await ApprovePaper(id);
        if (res?.success) {
          toast.success("Paper approved successfully!");
        } else {
          toast.error("Failed to approve paper");
        }
        console.log(res);
      }
    } catch (error) {
      console.error("Error approving paper:", error);
      toast.error("Failed to approve paper");
    }
  };

  const handleReject = async (id: string) => {
    try {
      if (onReject) {
        // Call the custom onReject function if provided (parent handles rejection)
        await onReject(id);
      } else {
        // Default rejection logic (ManageTable handles rejection)
        console.log("Rejecting paper with ID:", id);
        const res = await RejectPaper(id);
        if (res?.success) {
          toast.success("Paper rejected successfully!");
        } else {
          toast.error("Failed to reject paper");
        }
        console.log(res);
      }
    } catch (error) {
      console.error("Error rejecting paper:", error);
      toast.error("Failed to reject paper");
    }
  };

  const handleRoleChange = async (id: string, currentRole: string) => {
    try {
      if (onRoleChange) {
        // Call the custom onRoleChange function if provided (parent handles role change)
        await onRoleChange(id, currentRole);
      } else {
        // Default role change logic (ManageTable handles role change)
        if (currentRole === "superAdmin") {
          toast.error("SuperAdmin role cannot be changed");
          return;
        }
        if (currentRole === "user" || currentRole === "admin") {
          const res = await PromoteRole(id);
          if (res?.success) {
            // Show single success message with logout info if applicable
            if (res?.data?.requiresReauth) {
              toast.success(
                `Successfully changed role for ${res?.data?.fullName}. They will be logged out and need to log in again.`
              );
            } else {
              toast.success(
                `Successfully changed role for ${res?.data?.fullName}`
              );
            }
          } else {
            toast.error(res?.message || "Failed to change role");
          }
        }
      }
    } catch (error) {
      console.error("Error changing role:", error);
      toast.error("Failed to change role");
    }
  };

  return {
    handleApprove,
    handleReject,
    handleRoleChange,
  };
};
