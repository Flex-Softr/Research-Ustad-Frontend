"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TPapers } from "@/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GetSingleResearchPaper, UpdateResearchPaper } from "@/services/allreserchPaper";

interface EditResearchPaperProps {
  paperId: string;
}

const EditResearchPaper = ({ paperId }: EditResearchPaperProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paper, setPaper] = useState<TPapers | null>(null);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    authors: [""],
    journal: "",
    volume: "",
    impactFactor: "",
    journalRank: "",
    visitLink: "",
    paperType: "journal" as "journal" | "conference",
    researchArea: "",
  });

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        setLoading(true);
        const response = await GetSingleResearchPaper(paperId);
        if (response?.data) {
          const paperData = response.data;
          setPaper(paperData);
          setFormData({
            year: paperData.year?.toString() || "",
            title: paperData.title || "",
            authors: paperData.authors?.length > 0 ? paperData.authors : [""],
            journal: paperData.journal || "",
            volume: paperData.volume || "",
            impactFactor: paperData.impactFactor?.toString() || "",
            journalRank: paperData.journalRank || "",
            visitLink: paperData.visitLink || "",
            paperType: paperData.paperType || "journal",
            researchArea: paperData.researchArea || "",
          });
        }
      } catch (error) {
        console.error("Error fetching paper:", error);
        toast.error("Failed to fetch research paper");
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchPaper();
    }
  }, [paperId]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    setFormData(prev => ({
      ...prev,
      authors: newAuthors
    }));
  };

  const addAuthor = () => {
    setFormData(prev => ({
      ...prev,
      authors: [...prev.authors, ""]
    }));
  };

  const removeAuthor = (index: number) => {
    if (formData.authors.length > 1) {
      const newAuthors = formData.authors.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        authors: newAuthors
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validate required fields
      if (!formData.title || !formData.journal || !formData.visitLink) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Filter out empty authors
      const validAuthors = formData.authors.filter(author => author.trim() !== "");
      if (validAuthors.length === 0) {
        toast.error("Please add at least one author");
        return;
      }

      const updateData = {
        year: parseInt(formData.year) || new Date().getFullYear(),
        title: formData.title,
        authors: validAuthors,
        journal: formData.journal,
        volume: formData.volume,
        impactFactor: parseFloat(formData.impactFactor) || 0,
        journalRank: formData.journalRank,
        visitLink: formData.visitLink,
        paperType: formData.paperType,
        researchArea: formData.researchArea,
      };

      const response = await UpdateResearchPaper(paperId, updateData);
      
      if (response) {
        toast.success("Research paper updated successfully");
        router.push("/user/dashboard/mypapers");
      }
    } catch (error) {
      console.error("Error updating paper:", error);
      toast.error("Failed to update research paper");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !paper) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading research paper...</p>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Research paper not found</p>
          <Button onClick={() => router.push("/user/dashboard/mypapers")}>
            Back to Papers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Paper Title *
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter the title of your research paper"
              className="mt-1"
              required
            />
          </div>

          {/* Authors */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Authors *
            </Label>
            <div className="mt-1 space-y-2">
              {formData.authors.map((author, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={author}
                    onChange={(e) => handleAuthorChange(index, e.target.value)}
                    placeholder={`Author ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.authors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeAuthor(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addAuthor}
                className="mt-2"
              >
                Add Author
              </Button>
            </div>
          </div>

          {/* Year and Journal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="year" className="text-sm font-medium text-gray-700">
                Publication Year
              </Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                placeholder="2024"
                className="mt-1"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div>
              <Label htmlFor="journal" className="text-sm font-medium text-gray-700">
                Journal/Conference *
              </Label>
              <Input
                id="journal"
                type="text"
                value={formData.journal}
                onChange={(e) => handleInputChange("journal", e.target.value)}
                placeholder="Journal name or conference"
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* Volume and Impact Factor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="volume" className="text-sm font-medium text-gray-700">
                Volume
              </Label>
              <Input
                id="volume"
                type="text"
                value={formData.volume}
                onChange={(e) => handleInputChange("volume", e.target.value)}
                placeholder="Volume number"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="impactFactor" className="text-sm font-medium text-gray-700">
                Impact Factor
              </Label>
              <Input
                id="impactFactor"
                type="number"
                step="0.01"
                value={formData.impactFactor}
                onChange={(e) => handleInputChange("impactFactor", e.target.value)}
                placeholder="0.00"
                className="mt-1"
                min="0"
              />
            </div>
          </div>

          {/* Journal Rank and Paper Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="journalRank" className="text-sm font-medium text-gray-700">
                Journal Rank
              </Label>
              <Input
                id="journalRank"
                type="text"
                value={formData.journalRank}
                onChange={(e) => handleInputChange("journalRank", e.target.value)}
                placeholder="Q1, Q2, Q3, Q4"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="paperType" className="text-sm font-medium text-gray-700">
                Paper Type
              </Label>
              <Select
                value={formData.paperType}
                onValueChange={(value: "journal" | "conference") => 
                  handleInputChange("paperType", value)
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select paper type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="journal">Journal Paper</SelectItem>
                  <SelectItem value="conference">Conference Paper</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Research Area */}
          <div>
            <Label htmlFor="researchArea" className="text-sm font-medium text-gray-700">
              Research Area
            </Label>
            <Input
              id="researchArea"
              type="text"
              value={formData.researchArea}
              onChange={(e) => handleInputChange("researchArea", e.target.value)}
              placeholder="e.g., Machine Learning, Computer Vision"
              className="mt-1"
            />
          </div>

          {/* Visit Link */}
          <div>
            <Label htmlFor="visitLink" className="text-sm font-medium text-gray-700">
              Paper Link *
            </Label>
            <Input
              id="visitLink"
              type="url"
              value={formData.visitLink}
              onChange={(e) => handleInputChange("visitLink", e.target.value)}
              placeholder="https://doi.org/... or direct link"
              className="mt-1"
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Updating..." : "Update Paper"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/user/dashboard/mypapers")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditResearchPaper;
