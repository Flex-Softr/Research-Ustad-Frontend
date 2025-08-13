"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthorSearchDropdown from "@/components/module/common/ResearchPaperForm/author-search-dropdown";
import { PostResearchPaper } from "@/services/allreserchPaper";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/AuthService";
import { JWTPayload } from "@/type";

export interface ResearchPaperFormData {
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  impactFactor?: number;
  journalRank?: string;
  visitLink: string;
  paperType: string;
}

interface ResearchPaperFormProps {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  className?: string;
  title?: string;
}

const ResearchPaperForm: React.FC<ResearchPaperFormProps> = ({
  onSuccess,
  onError,
  className = "",
}) => {
  const [authorReaseachpaper, setauthorReaseachpaper] = useState<string[]>([
    "",
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ResearchPaperFormData>();

  const handleAddResearch = (): void => {
    setauthorReaseachpaper([...authorReaseachpaper, ""]);
  };

  const handleResearchChange = (index: number, value: string): void => {
    const updatedResearch = [...authorReaseachpaper];
    updatedResearch[index] = value;
    setauthorReaseachpaper(updatedResearch);
  };

  const handleRemoveResearch = (index: number): void => {
    setauthorReaseachpaper(authorReaseachpaper.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<ResearchPaperFormData> = async (data) => {
    setLoading(true);

    // Filter out empty author entries
    const validAuthors = authorReaseachpaper.filter(
      (author) => author.trim() !== ""
    );

    if (validAuthors.length === 0) {
      toast.error("At least one author is required");
      setLoading(false);
      return;
    }

    if (!data.paperType) {
      toast.error("Please select a paper type");
      setLoading(false);
      return;
    }

    const formData = {
      year: Number(data.year),
      title: data.title,
      authors: validAuthors, // Using the filtered authors list
      journal: data.journal,
      volume: data.volume || "",
      impactFactor: data.impactFactor ? Number(data.impactFactor) : undefined,
      journalRank: data.journalRank || "",
      visitLink: data.visitLink,
      paperType: data.paperType,
    };

    try {
      const result = await PostResearchPaper(formData);
      
      // Get current user to determine role-based redirect
      const userInfo = await getCurrentUser();
      const userRole = (userInfo as JWTPayload)?.role;
      
      // Conditionally redirect based on user role
      if (userRole === "admin" || userRole === "superAdmin") {
        router.push("/admin/dashboard/myresearchpaper");
      } else if (userRole === "user") {
        router.push("/user/dashboard/mypapers");
      } else {
        // Fallback to admin route if role is not recognized
        router.push("/admin/dashboard/myresearchpaper");
      }
      
      reset();
      setValue("paperType", ""); // Explicitly reset paperType
      console.log(result);
      toast.success(result.message);
      setauthorReaseachpaper([""]);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error submitting research paper:", error);

      // Call onError callback if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-full mx-auto p-4 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Create Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    

        {/* Title Input */}
        <div>
          <Label htmlFor="title" className="mb-2">
            Title:
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter the title of the paper"
            {...register("title", { required: true })}
          />
        </div>
            {/* Year Input */}
            <div>
          <Label htmlFor="year" className="mb-2">
            Year:
          </Label>
          <Input
            id="year"
            type="number"
            placeholder="Enter the year of ResearchPaper"
            {...register("year", { required: true })}
          />
        </div>

        {/* Authors */}
        <div>
          <Label className="mb-2">Authors:</Label>
          <div className="space-y-3">
            {authorReaseachpaper.map((research, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <AuthorSearchDropdown
                    value={research}
                    onChange={(value) => handleResearchChange(index, value)}
                    placeholder={`Search for author ${index + 1}`}
                  />
                </div>
                {authorReaseachpaper.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveResearch(index)}
                    variant="destructive"
                    className="flex-shrink-0"
                  >
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add Author Button */}
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleAddResearch}
        >
          + Add Author
        </Button>

        {/* Journal */}
        <div>
          <Label htmlFor="journal" className="mb-2">
            Journal:
          </Label>
          <Input
            id="journal"
            type="text"
            placeholder="Enter the journal name"
            {...register("journal", { required: true })}
          />
        </div>

        {/* Volume */}
        <div>
          <Label htmlFor="volume" className="mb-2">
            Volume:
          </Label>
          <Input
            id="volume"
            type="text"
            placeholder="Enter the volume number"
            {...register("volume")}
          />
        </div>

        {/* Impact Factor */}
        <div>
          <Label htmlFor="impactFactor" className="mb-2">
            Impact Factor:
          </Label>
          <Input
            id="impactFactor"
            type="number"
            step="0.1"
            placeholder="Enter the impact factor"
            {...register("impactFactor")}
          />
        </div>

        {/* Journal Rank */}
        <div>
          <Label htmlFor="journalRank" className="mb-2">
            Journal Rank:
          </Label>
          <Input
            id="journalRank"
            type="text"
            placeholder="Enter the journal rank"
            {...register("journalRank")}
          />
        </div>

        {/* Research Paper Link */}
        <div>
          <Label htmlFor="visitLink" className="mb-2">
            Research Paper Link:
          </Label>
          <Input
            id="visitLink"
            type="url"
            placeholder="Enter the research paper link"
            {...register("visitLink", { required: true })}
          />
        </div>

        {/* Paper Type */}
        <div>
          <Label htmlFor="paperType" className="mb-2">
            Paper Type: *
          </Label>
          <Select 
            value={watch("paperType") || ""} 
            onValueChange={(value) => setValue("paperType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ResearchPaperForm;
