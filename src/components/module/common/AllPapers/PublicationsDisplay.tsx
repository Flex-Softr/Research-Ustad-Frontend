"use client";

import { useEffect, useState } from "react";
import { GetAllUsers } from "@/services/allreserchPaper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Quote, FileText, Users } from "lucide-react";

interface UserWithPublications {
  _id: string;
  fullName: string;
  email: string;
  publications: Array<{
    _id: string;
    title: string;
    citations?: number;
    journal: string;
    abstract?: string;
    year: number;
    visitLink: string;
    authors: Array<{
      user?: {
        _id: string;
        fullName: string;
        email: string;
        designation?: string;
        image?: string;
      };
      name?: string;
      role: string;
      isRegisteredUser?: boolean;
    }>;
  }>;
}

export default function PublicationsDisplay() {
  const [users, setUsers] = useState<UserWithPublications[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetAllUsers();
        if (response.success && response.data) {
          setUsers(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatAuthors = (authors: UserWithPublications['publications'][0]['authors']) => {
    if (!authors || authors.length === 0) return "No authors listed";
    return authors.map(author => {
      if (author.user) {
        return author.user.fullName;
      }
      return author.name || "Unknown Author";
    }).join(", ");
  };

  const formatAuthorsWithRoles = (authors: UserWithPublications['publications'][0]['authors']) => {
    if (!authors || authors.length === 0) return "No authors listed";
    return authors.map(author => {
      const name = author.user ? author.user.fullName : (author.name || "Unknown Author");
      return `${name} (${author.role})`;
    }).join(", ");
  };

  // Get all unique publications from all users
  const allPublications = users.flatMap(user => user.publications);
  const uniquePublications = allPublications.filter((paper, index, self) => 
    index === self.findIndex(p => p._id === paper._id)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading publications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Research Publications
        </h2>
        <p className="text-gray-600">
          Latest research papers from our team members ({uniquePublications.length} papers)
        </p>
      </div>

      {uniquePublications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No publications found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {uniquePublications.map((paper) => (
            <Card key={paper._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {paper.title}
                </CardTitle>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{paper.journal}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{paper.year}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {paper.abstract || "No abstract available"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Authors:</span>
                    <span>{formatAuthors(paper.authors)}</span>
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    <strong>Roles:</strong> {formatAuthorsWithRoles(paper.authors)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {paper.citations !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        <Quote className="h-3 w-3 mr-1" />
                        {paper.citations} citations
                      </Badge>
                    )}
                  </div>
                  
                  <a
                    href={paper.visitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Paper
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
