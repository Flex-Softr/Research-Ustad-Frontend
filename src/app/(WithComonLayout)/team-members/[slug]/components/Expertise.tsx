import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Users, Calendar } from "lucide-react";
import { TeamMember } from "../../components";

interface ExpertiseProps {
  member: TeamMember;
}

const Expertise = ({ member }: ExpertiseProps) => {
  return (
    <div className="space-y-6">
      {/* Expertise */}
      {member.expertise && member.expertise.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Star className="h-6 w-6 text-brand-secondary" />
              Areas of Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-brand-secondary/5 text-brand-secondary border-brand-secondary/20 px-3 py-1 text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Awards */}
      {member.awards && member.awards.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Award className="h-6 w-6 text-brand-secondary" />
              Awards & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {member.awards.map((award, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <Award className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-800">{award}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conferences */}
      {member.conferences && member.conferences.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <Users className="h-6 w-6 text-brand-secondary" />
              Conference Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {member.conferences.map((conference, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {conference.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Role: {conference.role}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Topic: {conference.topic}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Expertise;
