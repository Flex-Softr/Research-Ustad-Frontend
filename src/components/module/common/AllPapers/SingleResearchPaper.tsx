"use client";

import { useState, useEffect } from "react";
import { RelatedPaper, SingleResearchPaperProps, TPapers } from "@/type";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  BookOpen,
  ExternalLink,
  Award,
  FileText,
  Building,
  Clock,
  Tag,
  Quote,
  ArrowLeft,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GetAllResearchPaperPublic,
  GetSingleResearchPaperPublic,
} from "@/services/allreserchPaper";

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
  >(propPaper || null);
  const [relatedPapers, setRelatedPapers] = useState<RelatedPaper[]>([]);
  const [loading, setLoading] = useState(!propPaper);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load paper data if paperId is provided
  useEffect(() => {
    const fetchPaper = async () => {
      if (!paperId || propPaper) return;

      try {
        setLoading(true);
        setError(null);

        const paperData = await GetSingleResearchPaperPublic(paperId);

        if (paperData?.success && paperData?.data) {
          setPaper(paperData.data);
        } else {
          setError("Paper not found");
        }
      } catch (err) {
        console.error("Error fetching paper:", err);
        setError("Failed to fetch paper");
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [paperId, propPaper]);

  // Load related papers when paper is loaded
  useEffect(() => {
    const loadRelatedPapers = async () => {
      if (!paper?.researchArea) return;

      setLoadingRelated(true);
      try {
        const data = await GetAllResearchPaperPublic();

        if (data?.success && data?.data) {
          // Find papers with the same research area, excluding the current paper
          const related = data.data.filter(
            (p: RelatedPaper) =>
              p?.researchArea === paper.researchArea && p?._id !== paper._id
          );

          // Limit to 3 related papers
          setRelatedPapers(related.slice(0, 3));
        }
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

  if (error) {
    console.error("Error loading paper:", error);
    notFound();
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
            label: paper?.title || "Untitled Paper",
          },
        ]}
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
                      {paper?.title || "Untitled Paper"}
                    </CardTitle>

                    {/* Authors */}
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-brand-secondary" />
                      <div className="flex flex-wrap gap-1">
                        {paper?.authors?.map((author: any, index: number) => (
                          <span
                            key={index}
                            className="text-sm text-gray-700 font-medium"
                          >
                            {typeof author === "string"
                              ? author
                              : author?.name || "Unknown Author"}
                            {index < (paper?.authors?.length || 0) - 1 && ", "}
                          </span>
                        )) || (
                          <span className="text-sm text-gray-500">
                            No authors listed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <Badge
                        variant={
                          paper?.status === "published"
                            ? "default"
                            : "secondary"
                        }
                        className={`text-sm ${
                          paper?.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {paper?.status === "published"
                          ? "Published"
                          : "Ongoing"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Abstract */}
                {paper?.abstract && (
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
                {paper?.keywords && paper.keywords.length > 0 && (
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
                  {paper?.visitLink && (
                    <Button
                      onClick={() => window.open(paper.visitLink, "_blank")}
                      className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:shadow-lg transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Paper
                    </Button>
                  )}
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
                      <p className="text-gray-700">
                        {paper?.journal || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Year</h4>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">
                          {paper?.year || "Not specified"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Paper Type
                      </h4>
                      <Badge variant="outline" className="text-sm">
                        {paper?.paperType || "Not specified"}
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
                {paper?.citations !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Citations</span>
                    <span className="font-semibold text-gray-900">
                      {paper.citations}
                    </span>
                  </div>
                )}
                {paper?.researchArea && (
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
            {paper?.funding && (
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
                {paper?.createdAt && (
                  <div>
                    <span className="text-sm text-gray-600">Submitted</span>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(paper.createdAt)}
                    </p>
                  </div>
                )}
                {paper?.updatedAt && (
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
                    {paper?.year || "Not specified"}
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
                    <p className="text-sm text-gray-600">
                      Loading related papers...
                    </p>
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
                          {truncateText(
                            relatedPaper?.title || "Untitled Paper",
                            80
                          )}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                          <span>{relatedPaper?.year || "N/A"}</span>
                          <span>
                            {relatedPaper?.authors?.[0]
                              ? typeof relatedPaper.authors[0] === "string"
                                ? relatedPaper.authors[0]
                                : (relatedPaper.authors[0] as any)?.name ||
                                  "Unknown Author"
                              : "Unknown Author"}
                          </span>
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
