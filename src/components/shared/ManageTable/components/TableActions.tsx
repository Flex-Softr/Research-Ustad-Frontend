"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

interface DataItem {
  _id: string;
  [key: string]: any;
}

interface TableActionsProps {
  item: DataItem;
  isvalue: string;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onRoleChange?: (id: string, currentRole: string) => void;
  customActions?: (item: DataItem) => React.ReactNode;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  itemToDelete: DataItem | null;
  setItemToDelete: (item: DataItem | null) => void;
  getItemTitle: (item: DataItem) => string;
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  handleRoleChange: (id: string, currentRole: string) => void;
}

export const TableActions: React.FC<TableActionsProps> = ({
  item,
  isvalue,
  onDelete,
  onApprove,
  onReject,
  onRoleChange,
  customActions,
  deleteDialogOpen,
  setDeleteDialogOpen,
  itemToDelete,
  setItemToDelete,
  getItemTitle,
  handleApprove,
  handleReject,
  handleRoleChange,
}) => {
  // Check for custom actions first
  if (customActions) {
    return customActions(item);
  }

  return (
    <div className="flex gap-2">
      {/* View Button */}
      {isvalue === "blog" && (
        <Link href={`/blog/${item._id}`}>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
      )}

      {/* Edit Button */}
      {isvalue === "blog" && (
        <Link href={`/admin/dashboard/editblog/${item._id}`}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
      )}

      {/* Approve/Reject Buttons for Papers */}
      {isvalue === "paperadmin" && (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(item._id)}
            className={`px-2 py-1 cursor-pointer transition border rounded-md ${
              item.isApproved
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={item.isApproved}
          >
            {item.isApproved ? "Approved" : "Approve"}
          </button>
          {!item.isApproved && (
            <button
              onClick={() => handleReject(item._id)}
              className="px-2 py-1 cursor-pointer transition border rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Reject
            </button>
          )}
        </div>
      )}

      {/* Pending Papers - Approve/Reject */}
      {isvalue === "pendingPaper" && (
        <div className="flex gap-2">
          <button
            onClick={() => handleApprove(item._id)}
            className="px-2 py-1 cursor-pointer transition border rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(item._id)}
            className="px-2 py-1 cursor-pointer transition border rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      )}

      {/* Role Change Button */}
      {isvalue === "userRole" && item?.role !== "superAdmin" && (
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handleRoleChange(item?._id, item?.role)}
        >
          <ShieldCheck className="w-4 h-4" />{" "}
          {item.role === "admin" ? "Demote to User" : "Promote to Admin"}
        </Button>
      )}

      {/* Delete Button */}
      {(isvalue === "paperadmin" ||
        isvalue === "researhMembar" ||
        isvalue === "blog" ||
        isvalue === "myresearch" ||
        isvalue === "ongoingproject") &&
        onDelete && (
          <AlertDialog
            open={deleteDialogOpen && itemToDelete?._id === item._id}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setItemToDelete(item);
                  setDeleteDialogOpen(true);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{getItemTitle(item)}"? This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (itemToDelete) {
                      onDelete(itemToDelete._id);
                      setItemToDelete(null);
                    }
                    setDeleteDialogOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </div>
  );
};
