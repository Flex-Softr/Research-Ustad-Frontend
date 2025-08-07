"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DeletePaper } from "@/services/allreserchPaper";
import { TPapers } from "@/type";
import { useState } from "react";

const MyResearch = ({data}:{data:TPapers[]}) => {
 

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting paper with ID:", id);
      const res = await DeletePaper(id);
    } catch (error) {
      console.error("Error deleting paper:", error);
      alert("Error deleting paper!");
    }
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <h2 className="text-2xl font-semibold mb-4">Research Papers</h2>

      <Table >
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((paper) => (
              <TableRow key={paper._id}>
                <TableCell>{paper.title}</TableCell>
                <TableCell>{paper.authors.join(", ")}</TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell>{paper.journal}</TableCell>
                <TableCell>{paper.impactFactor}</TableCell>
                <TableCell>{paper.journalRank}</TableCell>
                <TableCell>{paper.paperType}</TableCell>
                <TableCell>
                  <Button asChild variant="link">
                    <a href={paper.visitLink} target="_blank" rel="noopener noreferrer">
                      View Paper
                    </a>
                  </Button>
                </TableCell>
               
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center text-gray-500">
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
