import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  FileText,
  Quote,
  Calendar,
} from "lucide-react";
import { TeamMember } from "../../components";

interface ResearchStatsProps {
  member: TeamMember;
}

const ResearchStats = ({ member }: ResearchStatsProps) => {
  if (!member.researchStats) {
    return null;
  }

  const stats = [
    {
      label: "Total Papers",
      value: member.researchStats.totalPapers,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Published Papers",
      value: member.researchStats.publishedPapers,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Ongoing Papers",
      value: member.researchStats.ongoingPapers,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      label: "Total Citations",
      value: member.researchStats.totalCitations.toLocaleString(),
      icon: Quote,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <BarChart3 className="h-6 w-6 text-brand-secondary" />
          Research Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${stat.bgColor} ${stat.borderColor} text-center`}
            >
              <div className={`${stat.color} mb-2 flex justify-center`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchStats;
