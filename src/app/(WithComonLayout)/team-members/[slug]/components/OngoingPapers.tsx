import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Clock, Users } from "lucide-react";
import { TeamMember } from "../../components";

interface OngoingPapersProps {
  member: TeamMember;
}

const OngoingPapers = ({ member }: OngoingPapersProps) => {
  const ongoingPapers = member.publications?.filter(
    (pub) => pub.status !== "published" && pub.status !== "Published"
  ) || [];

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
      case 'under_review':
      case 'under review':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'in_preparation':
      case 'in preparation':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'revision':
        return "bg-orange-100 text-orange-800 border-orange-200";
      case 'ongoing':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'published':
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
      case 'journal':
        return <FileText className="h-4 w-4" />;
      case 'conference':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusDisplayName = (status?: string) => {
    if (!status) {
      return 'Unknown Status';
    }
    
    switch (status.toLowerCase()) {
      case 'in_preparation':
        return 'In Preparation';
      case 'under_review':
        return 'Under Review';
      case 'revision':
        return 'Revision';
      case 'ongoing':
        return 'Ongoing';
      case 'published':
        return 'Published';
      default:
        return status;
    }
  };

  const getProgressPercentage = (status?: string) => {
    if (!status) {
      return 50;
    }
    
    switch (status.toLowerCase()) {
      case 'in_preparation':
      case 'in preparation':
        return 25;
      case 'ongoing':
        return 35;
      case 'under_review':
      case 'under review':
        return 75;
      case 'revision':
        return 85;
      case 'published':
        return 100;
      default:
        return 50;
    }
  };

  return (
    <Card className="rounded-none border-0">
      <CardContent className="p-6">
        <div className="space-y-6">
          {ongoingPapers.map((paper, index) => (
            <div
              key={paper._id || index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white/50"
            >
              <div className="flex flex-col space-y-4">
                {/* Paper Title and Status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-brand-secondary transition-colors flex-1">
                    {paper.title || 'Untitled Paper'}
                  </h3>
                  <Badge
                    variant="outline"
                    className={getStatusColor(paper.status)}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {getStatusDisplayName(paper.status)}
                  </Badge>
                </div>

                {/* Abstract */}
                {paper.abstract && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {paper.abstract}
                  </p>
                )}

                {/* Journal and Type */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(paper.paperType)}
                    <span className="font-medium">{paper.journal || 'No Journal'}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Expected {paper.year || 'TBD'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className="bg-gray-50 text-gray-700 border-gray-200 text-xs"
                    >
                      {paper.paperType ? paper.paperType.charAt(0).toUpperCase() + paper.paperType.slice(1) : 'Paper'}
                    </Badge>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{getProgressPercentage(paper.status)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        paper.status?.toLowerCase() === 'in_preparation' || paper.status?.toLowerCase() === 'in preparation' ? 'bg-yellow-500' :
                        paper.status?.toLowerCase() === 'under_review' || paper.status?.toLowerCase() === 'under review' ? 'bg-blue-500' :
                        paper.status?.toLowerCase() === 'revision' ? 'bg-orange-500' :
                        paper.status?.toLowerCase() === 'ongoing' ? 'bg-yellow-500' :
                        paper.status?.toLowerCase() === 'published' ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${getProgressPercentage(paper.status)}%` }}
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