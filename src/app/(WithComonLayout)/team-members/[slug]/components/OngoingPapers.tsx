import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Clock, Users } from "lucide-react";
import { TeamMember } from "../../components";
import Link from "next/link";

interface OngoingPapersProps {
  member: TeamMember;
  paginatedData?: any[];
}

const OngoingPapers = ({ member, paginatedData }: OngoingPapersProps) => {
  // Use paginated data if provided, otherwise filter from member data
  const ongoingPapers =
    paginatedData ||
    member.publications?.filter(
      (pub) => pub.status !== "published" && pub.status !== "Published"
    ) ||
    [];

  if (ongoingPapers.length === 0) {
    return (
      <Card className="rounded-none border-0">
        <CardContent className="py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Ongoing Papers
            </h3>
            <p className="text-gray-600">
              No ongoing research papers at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status?: string) => {
    if (!status) {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }

    switch (status.toLowerCase()) {
      case "under_review":
      case "under review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_preparation":
      case "in preparation":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "revision":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "ongoing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type?: string) => {
    if (!type) {
      return <FileText className="h-4 w-4" />;
    }

    switch (type.toLowerCase()) {
      case "journal":
        return <FileText className="h-4 w-4" />;
      case "conference":
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusDisplayName = (status?: string) => {
    if (!status) {
      return "Unknown Status";
    }

    switch (status.toLowerCase()) {
      case "in_preparation":
        return "In Preparation";
      case "under_review":
        return "Under Review";
      case "revision":
        return "Revision";
      case "ongoing":
        return "Ongoing";
      case "published":
        return "Published";
      default:
        return status;
    }
  };

  const getProgressPercentage = (status?: string) => {
    if (!status) {
      return 50;
    }

    switch (status.toLowerCase()) {
      case "in_preparation":
      case "in preparation":
        return 25;
      case "ongoing":
        return 50;
      case "under_review":
      case "under review":
        return 75;
      case "revision":
        return 85;
      case "published":
        return 100;
      default:
        return 50;
    }
  };

  return (
    <Card className="rounded-none border-0">
      <CardContent>
        <div className="space-y-6">
          {ongoingPapers.map((paper, index) => (
            <div
              key={paper._id || index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white/50"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/allpapers/${paper._id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-secondary hover:underline transition-colors cursor-pointer">
                        {paper.title}
                      </h3>
                    </Link>

                    {/* Abstract */}
                    {paper.abstract && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {paper.abstract}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className={getStatusColor(paper.status)}
                    >
                      {getStatusDisplayName(paper.status)}
                    </Badge>

                    {/* <div className="flex items-center gap-1 text-sm text-gray-600">
                      {getTypeIcon(paper.paperType)}
                      <span className="capitalize">{paper.paperType || 'Research Paper'}</span>
                    </div> */}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{getProgressPercentage(paper.status)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-secondary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(paper.status)}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{paper.year}</span>
                  </div>

                  {paper.journal && (
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{paper.journal}</span>
                    </div>
                  )}
                </div>

                {/* Authors */}
                {paper.authors && paper.authors.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Authors:</span>
                    <span>
                      {paper.authors.map((author: any, idx: number) => {
                        const name =
                          author?.user?.fullName ||
                          author?.name ||
                          "Unknown Author";
                        return idx === paper.authors.length - 1
                          ? name
                          : `${name}, `;
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OngoingPapers;
