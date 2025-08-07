"use client";

import { useState, useEffect } from "react";
import { TPapers } from "@/type";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  ExternalLink,
  Download,
  Eye,
  Award,
  FileText,
  Globe,
  Building,
  Clock,
  Tag,
  Quote,
  ArrowLeft,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SingleResearchPaperProps {
  paper?: TPapers & {
    abstract?: string;
    keywords?: string[];
    doi?: string;
    citations?: number;
    downloads?: number;
    researchArea?: string;
    funding?: string;
    createdAt?: string;
    journalType?: string;
    updatedAt?: string;
  };
  paperId?: string;
}

interface RelatedPaper extends TPapers {
  abstract?: string;
  keywords?: string[];
  doi?: string;
  citations?: number;
  downloads?: number;
  researchArea?: string;
  funding?: string;
  journalType?: string;
}

const SingleResearchPaper = ({
  paper: propPaper,
  paperId,
}: SingleResearchPaperProps) => {
  const [paper, setPaper] = useState<
    | (TPapers & {
        abstract?: string;
        keywords?: string[];
        doi?: string;
        citations?: number;
        downloads?: number;
        researchArea?: string;
        funding?: string;
        createdAt?: string;
        updatedAt?: string;
      })
    | null
  >(null);
  const [relatedPapers, setRelatedPapers] = useState<RelatedPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Load paper data
  useEffect(() => {
    const loadPaper = async () => {
      try {
        // If paper is provided as prop, use it
        if (propPaper) {
          setPaper(propPaper);
          setLoading(false);
          return;
        }

        // If paperId is provided, load from JSON
        if (paperId) {
          const response = await fetch("/json/research-papers.json");
          const data = await response.json();
          const foundPaper = data.papers.find((p: any) => p._id === paperId);

          if (foundPaper) {
            setPaper(foundPaper);
          } else {
            notFound();
          }
        }
      } catch (error) {
        console.error("Failed to load paper:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadPaper();
  }, [propPaper, paperId]);

  // Load related papers when paper is loaded
  useEffect(() => {
    const loadRelatedPapers = async () => {
      if (!paper || !paper.researchArea) return;

      setLoadingRelated(true);
      try {
        const response = await fetch("/json/research-papers.json");
        const data = await response.json();
        
        // Find papers with the same research area, excluding the current paper
        const related = data.papers.filter((p: RelatedPaper) => 
          p.researchArea === paper.researchArea && p._id !== paper._id
        );
        
        // Limit to 3 related papers
        setRelatedPapers(related.slice(0, 3));
      } catch (error) {
        console.error("Failed to load related papers:", error);
        setRelatedPapers([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    loadRelatedPapers();
  }, [paper]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading paper details...</p>
        </div>
      </div>
    );
  }

  if (!paper) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "Research Papers",
            href: "/allpapers",
          },
          {
            label: paper.title,
          },
        ]}
        className="py-4"
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="flex items-center gap-2 hover:bg-brand-secondary hover:text-white transition-all duration-300"
          >
            <Link href="/allpapers">
              <ArrowLeft className="h-4 w-4" />
              Back to Papers
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Paper Header */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {paper.title}
                    </CardTitle>

                    {/* Authors */}
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-brand-secondary" />
                      <div className="flex flex-wrap gap-1">
                        {paper.authors.map((author, index) => (
                          <span
                            key={index}
                            className="text-sm text-gray-700 font-medium"
                          >
                            {author}
                            {index < paper.authors.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <Badge
                        variant={paper.isApproved ? "default" : "secondary"}
                        className={`text-sm ${
                          paper.isApproved
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {paper.isApproved ? "Published" : "Under Review"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Abstract */}
                {paper.abstract && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Quote className="h-5 w-5 text-brand-secondary" />
                      Abstract
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>
                )}

                {/* Keywords */}
                {paper.keywords && paper.keywords.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Tag className="h-5 w-5 text-brand-secondary" />
                      Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {paper.keywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-sm bg-brand-secondary/5 text-brand-secondary border-brand-secondary/20"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    onClick={() => window.open(paper.visitLink, "_blank")}
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Paper
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Journal Information */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-brand-secondary" />
                  Journal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Journal
                      </h4>
                      <p className="text-gray-700">{paper.journal}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Year</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{paper.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Journal Type
                      </h4>
                      <Badge variant="outline" className="text-sm">
                        {paper.journalType}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Paper Stats */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-secondary" />
                  Paper Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paper.citations !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Citations</span>
                    <span className="font-semibold text-gray-900">
                      {paper.citations}
                    </span>
                  </div>
                )}
                {paper.researchArea && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Research Area</span>
                    <Badge variant="outline" className="text-xs">
                      {paper.researchArea}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Funding Information */}
            {paper.funding && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Building className="h-5 w-5 text-brand-secondary" />
                    Funding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{paper.funding}</p>
                </CardContent>
              </Card>
            )}

            {/* Publication Timeline */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-secondary" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paper.createdAt && (
                  <div>
                    <span className="text-sm text-gray-600">Submitted</span>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(paper.createdAt)}
                    </p>
                  </div>
                )}
                {paper.updatedAt && (
                  <div>
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(paper.updatedAt)}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">Published</span>
                  <p className="text-sm font-medium text-gray-900">
                    {paper.year}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Related Papers */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-secondary" />
                  Related Papers
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingRelated ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-secondary mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading related papers...</p>
                  </div>
                ) : relatedPapers.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Papers in similar research areas
                    </p>
                    {relatedPapers.map((relatedPaper) => (
                      <div
                        key={relatedPaper._id}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                          {truncateText(relatedPaper.title, 80)}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>{relatedPaper.year}</span>
                          <span>{relatedPaper.authors[0]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="text-xs border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
                          >
                            <Link href={`/allpapers/${relatedPaper._id}`}>
                              View Paper
                              <ExternalLinkIcon className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
                    >
                      <Link href="/allpapers">Browse All Papers</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-4">
                      No related papers found in the same research area
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-brand-secondary/30 text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all duration-300"
                    >
                      <Link href="/allpapers">Browse All Papers</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResearchPaper;
