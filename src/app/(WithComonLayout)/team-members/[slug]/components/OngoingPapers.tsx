import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Clock, Users, Quote } from "lucide-react";
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

  return (
    <Card className="rounded-none border-0">
      <CardContent>
      <div className="space-y-6">
          {ongoingPapers.map((publication, index) => (
            <div
              key={publication._id || index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white/50"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <Link href={`/paper/${publication._id}`}>
                    <h3 className="text-lg hover:underline font-semibold text-gray-900 mb-3 hover:text-brand-secondary transition-colors cursor-pointer">
                      {publication.title}
                    </h3>
                  </Link>

                  {/* Abstract */}
                  {publication.abstract && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {publication.abstract}
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{publication.year}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{publication.journal}</span>
                    </div>

                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      <Quote className="h-4 w-4" />
                      <span>{publication.paperType}</span>
                    </Badge>
                  </div>
                </div>
                <div>
                  <Badge variant="destructive" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    {publication.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OngoingPapers;
