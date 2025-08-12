"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

  return (
    <div className="overflow-x-auto w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Research Papers</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Authors</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Journal</TableHead>
            <TableHead>Impact Factor</TableHead>
            <TableHead>Rank</TableHead>
            <TableHead>Journal Type</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {papers.length > 0 ? (
            papers.map((paper) => (
              <TableRow key={paper._id}>
                <TableCell>
                  <div className="max-w-[200px]">
                    <div className="relative group">
                      <span className="text-sm text-gray-900 cursor-help">
                        {paper.title.length > 50 ? paper.title.substring(0, 50) + "..." : paper.title}
                      </span>
                      {paper.title.length > 50 && (
                        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 max-w-xs">
                          <div className="font-semibold mb-1">Full Title:</div>
                          <div>{paper.title}</div>
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative group">
                    <span className="text-sm text-gray-600 cursor-help">
                      {paper.authors.length > 0 ? `${paper.authors.length} author${paper.authors.length > 1 ? 's' : ''}` : 'No authors'}
                    </span>
                    {paper.authors.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap max-w-xs">
                        <div className="font-semibold mb-1">Authors:</div>
                        {paper.authors.map((author, index) => (
                          <div key={index} className="mb-1">
                            {author}
                          </div>
                        ))}
                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell>{paper.journal}</TableCell>
                <TableCell>{paper.impactFactor}</TableCell>
                <TableCell>{paper.journalRank}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                    {paper.paperType}
                  </span>
                </TableCell>
                <TableCell>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <a href={paper.visitLink} target="_blank" rel="noopener noreferrer">
                      View Paper
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <Link href={`/user/dashboard/edit-research-paper/${paper._id}`}>
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
                            Are you sure you want to delete "{paper.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(paper._id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                No research papers found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyResearch;
