"use client";

import { Button } from "@/components/ui/button";
import { DeletePaper } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useState } from "react";
import { toast } from "sonner";
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
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import ManageTable from "@/components/shared/ManageTable/ManageTable";

const MyResearch = ({data}:{data:TPapers[]}) => {
  const [papers, setPapers] = useState<TPapers[]>(data);

  const handleDelete = async (id: string) => {
    try {
      const res = await DeletePaper(id);
      if (res) {
        toast.success("Research paper deleted successfully");
        // Remove the deleted paper from the local state
        setPapers(prev => prev.filter(paper => paper._id !== id));
      }
    } catch (error) {
      console.error("Error deleting paper:", error);
      toast.error("Failed to delete research paper");
    }
  };

  const columns = [
    { label: "Year", value: "year" },
    { label: "Title", value: "title" },
    { label: "Authors", value: "authors" },
    { label: "Paper Type", value: "paperType" },
    { label: "Status", value: "isApproved" },
    { label: "Visit Link", value: "visitLink" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Research Papers</h2>
      <ManageTable
        data={papers}
        isvalue="myresearch"
        columns={columns}
        loading={false}
        onDelete={handleDelete}
        customActions={(item) => (
          <div className="flex gap-2">
            {/* Edit Button */}
            <Link href={`/user/dashboard/edit-research-paper/${item._id}`}>
              <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                <Edit className="w-4 h-4" />
              </Button>
            </Link>
            
            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Research Paper</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{item.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      />
    </div>
  );
};

export default MyResearch;
