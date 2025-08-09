import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Target } from "lucide-react";
import { TeamMember } from "../../components";

interface OngoingProjectsProps {
  member: TeamMember;
}

const OngoingProjects = ({ member }: OngoingProjectsProps) => {
  if (!member.ongoingProjects || member.ongoingProjects.length === 0) {
    return null;
  }

  return (
    <Card className="rounded-none border-0">
      {/* <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Target className="h-6 w-6 text-brand-secondary" />
          Ongoing Projects ({member.ongoingProjects.length})
        </CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="space-y-4">
          {member.ongoingProjects.map((project, index) => (
            <div
              key={project.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-brand-secondary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      
                      <span> {project.funding.toLocaleString()} BDT</span>
                    </div>

                    <Badge
                      variant="outline"
                      className={
                        project.status === "Active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : project.status === "Planning"
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {project.collaborators &&
                    project.collaborators.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Collaborators: {project.collaborators.join(", ")}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OngoingProjects;
