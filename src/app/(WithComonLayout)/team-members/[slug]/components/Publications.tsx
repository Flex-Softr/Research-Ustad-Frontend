import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Quote, ExternalLink, Users } from "lucide-react";
import { TeamMember } from "../../components";

interface PublicationsProps {
  member: TeamMember;
}

const Publications = ({ member }: PublicationsProps) => {
  if (!member.publications || member.publications.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <FileText className="h-6 w-6 text-brand-secondary" />
          Publications ({member.publications.length})
        </CardTitle>
      </CardHeader>
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

                    <div className="flex items-center gap-1">
                      <Quote className="h-4 w-4" />
                      <span>{publication.citations} citations</span>
                    </div>

                    <Badge
                      variant={
                        publication.status === "Published"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        publication.status === "Published"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-yellow-100 text-yellow-800 border-yellow-200"
                      }
                    >
                      {publication.status}
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

                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Impact Factor:{" "}
                      <span className="font-medium">
                        {publication.impactFactor}
                      </span>
                    </span>
                    {publication.doi && (
                      <span className="text-gray-600">
                        DOI:{" "}
                        <span className="font-mono text-xs">
                          {publication.doi}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {publication.doi && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 flex-shrink-0"
                  >
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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
