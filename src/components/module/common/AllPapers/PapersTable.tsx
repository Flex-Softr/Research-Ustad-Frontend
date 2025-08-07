"use client";

import { TPapers } from "@/type";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PapersTableProps {
  papers: TPapers[];
}

const PapersTable = ({ papers }: PapersTableProps) => {
  if (papers.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
        <CardContent className="p-0">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No papers found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title & Authors
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Journal
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Year
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {papers.map((paper) => (
                <tr
                  key={paper._id}
                  className="hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div>
                      <Link href={`/allpapers/${paper._id}`} className="flex gap-2">
                        {/* <FileText className="h-10 w-10" /> */}
                        <h4 className="hover:underline text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                          {paper.title}
                        </h4>
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {paper.journal}
                      </p>
                      <p className="text-xs text-gray-600">
                        Vol. {paper.volume}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {paper.year}
                      </span>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {paper.impactFactor}
                      </span>
                    </div>
                  </td> */}
                  <td className="px-6 py-4">
                    <Badge
                      variant={paper.isApproved ? "default" : "secondary"}
                      className={`text-xs ${
                        paper.isApproved
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {paper.isApproved ? "Published" : "Ongoing"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(paper.visitLink, "_blank")}
                      className="h-8 px-3 text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PapersTable;
