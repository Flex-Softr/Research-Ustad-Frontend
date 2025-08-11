import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Clock, Users } from "lucide-react";
import { TeamMember } from "../../components";

interface OngoingPapersProps {
  member: TeamMember;
}

const OngoingPapers = ({ member }: OngoingPapersProps) => {
  if (!member.ongoing || member.ongoing.length === 0) {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under review':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'in preparation':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'revision':
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'journal':
        return <FileText className="h-4 w-4" />;
      case 'conference':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="rounded-none border-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          {member.ongoing.map((paper, index) => (
            <div
              key={paper.id}
              className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white/50"
            >
              <div className="flex flex-col space-y-3">
                {/* Paper Title and Status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-brand-secondary transition-colors flex-1">
                    {paper.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className={getStatusColor(paper.status)}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {paper.status}
                  </Badge>
                </div>

                {/* Journal and Type */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(paper.papertype)}
                    <span className="font-medium">{paper.journal}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expected {paper.year}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="bg-gray-50 text-gray-700 border-gray-200 text-xs"
                    >
                      {paper.papertype.charAt(0).toUpperCase() + paper.papertype.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>
                      {paper.status === 'In Preparation' ? '25%' : 
                       paper.status === 'Under Review' ? '75%' : 
                       paper.status === 'Revision' ? '85%' : '50%'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        paper.status === 'In Preparation' ? 'bg-yellow-500 w-1/4' :
                        paper.status === 'Under Review' ? 'bg-purple-500 w-3/4' :
                        paper.status === 'Revision' ? 'bg-orange-500 w-5/6' : 'bg-gray-500 w-1/2'
                      }`}
                    ></div>
                  </div>
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