"use client"
import { Card, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"; // Correct imports from ShadCN
import { Button } from "@/components/ui/button"; // Button from ShadCN
import PageTitle from "@/components/ui/core/PageTitle/PageTitle";
import { TPapers } from "@/type";

const AllPapers = ({ papers }:{papers:TPapers[]}) => {
console.log(papers)
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
                <p>Authors: {paper.authors.join(", ")}</p>
                <p>Journal: {paper.journal}</p>
                <p>Impact Factor: {paper.impactFactor}</p>
                <p>Research Area: {paper.researchArea || 'General'}</p>
                <p>Journal Rank: {paper.journalRank}</p>
                <p>Volume: {paper.volume}</p>
                <p>Status: <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  paper.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {paper.status === 'published' ? 'Published' : 'Ongoing'}
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
