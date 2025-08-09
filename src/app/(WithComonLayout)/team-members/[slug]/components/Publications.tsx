import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Quote, ExternalLink, Users } from "lucide-react";
import { TeamMember } from "../../components";
import Link from "next/link";

interface PublicationsProps {
  member: TeamMember;
}

const Publications = ({ member }: PublicationsProps) => {
  if (!member.publications || member.publications.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-none border-0">
      <CardContent>
        <div className="space-y-4">
          {member.publications.map((publication, index) => (
            <div
              key={publication.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-secondary transition-colors">
                    {publication.title}
                  </h3>

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
                      variant={"secondary"}
                      className={"bg-green-100 text-green-800 border-green-200"}
                    >
                      <Quote className="h-4 w-4" />
                      <span>{publication.citations} citations</span>
                    </Badge>
                  </div>

                  {publication.authors && publication.authors.length > 0 && (
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Authors: {publication.authors.join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 flex-shrink-0"
                >
                  <Link href={`/allpapers/${publication?.id}`}>
                    View Paper
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Publications;
