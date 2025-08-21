"use client"
import { Card, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"; // Correct imports from ShadCN
import { Button } from "@/components/ui/button"; // Button from ShadCN
import PageTitle from "@/components/ui/core/PageTitle/PageTitle";
import { TPapers } from "@/type";

// Helper function to get status display name
const getStatusDisplayName = (status?: string) => {
  switch (status) {
    case "published":
      return "Published";
    case "ongoing":
      return "Ongoing";
    case "under_review":
      return "Under Review";
    case "in_preparation":
      return "In Preparation";
    case "revision":
      return "Revision";
    default:
      return "Unknown";
  }
};

// Helper function to get status badge styling
const getStatusBadgeStyle = (status?: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "ongoing":
      return "bg-yellow-100 text-yellow-800";
    case "under_review":
      return "bg-blue-100 text-blue-800";
    case "in_preparation":
      return "bg-gray-100 text-gray-800";
    case "revision":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AllPapers = ({ papers }:{papers:TPapers[]}) => {

  return (
    <>
      <div>
        <PageTitle link={"home"} title={"Research Papers"} />
      </div>
      <div className="research_papers max-w-7xl mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paper:TPapers) => (
          <Card key={paper._id} className="max-w-sm shadow-lg rounded-lg bg-white">
            <div className="p-4">
              <CardTitle className="text-xl font-semibold">{paper.title}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                <p>Authors: {paper.authors.map((author: any) => 
                  typeof author === 'string' 
                    ? author 
                    : author?.name || 'Unknown Author'
                ).join(", ")}</p>
                <p>Journal: {paper.journal}</p>
                <p>Impact Factor: {paper.impactFactor}</p>
                <p>Research Area: {paper.researchArea || 'General'}</p>
                <p>Journal Rank: {paper.journalRank}</p>
                <p>Volume: {paper.volume}</p>
                <p>Status: <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(paper.status)}`}>
                  {getStatusDisplayName(paper.status)}
                </span></p>
              </CardDescription>
            </div>
            <CardFooter className="p-4">
              <Button
                variant="outline"
                onClick={() => window.open(paper.visitLink, "_blank")}
              >
                Read Paper
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllPapers;
