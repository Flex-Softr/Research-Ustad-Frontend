import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Quote, ExternalLink } from "lucide-react";
import { TeamMember } from "../../components";
import Link from "next/link";

interface PublicationsProps {
  member: TeamMember;
  paginatedData?: any[];
}

const Publications = ({ member, paginatedData }: PublicationsProps) => {
  // Use paginated data if provided, otherwise filter from member data
  const publishedPapers = paginatedData || member.publications?.filter(
    (pub) => (pub.status === "published" || pub.status === "Published")
  ) || [];

  if (publishedPapers.length === 0) {
    return (
      <Card className="rounded-none border-0">
        <CardContent className="py-12">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Published Papers
            </h3>
            <p className="text-gray-600">
              No published research papers at the moment.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none border-0">
      <CardContent>
        
        <div className="space-y-6">
          {publishedPapers.map((publication, index) => (
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

                {publication.visitLink && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 flex-shrink-0"
                  >
                    <a href={publication.visitLink} target="_blank" rel="noopener noreferrer">
                      View Paper
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Publications;
