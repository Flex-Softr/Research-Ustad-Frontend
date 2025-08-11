"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthorSearchDropdown from '@/components/module/userRoutes/AddResearchpaper/author-search-dropdown';
import { PostResearchPaper } from '@/services/allreserchPaper';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export interface ResearchPaperForm {
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  impactFactor: number;
  journalRank: string;
  visitLink: string;
  paperType: string;
}

const AddResearchPaper: React.FC = () => {
  const [authorReaseachpaper, setauthorReaseachpaper] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, setValue } = useForm<ResearchPaperForm>();

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

  const onSubmit: SubmitHandler<ResearchPaperForm> = async (data) => {
    setLoading(true);

    // Filter out empty author entries
    const validAuthors = authorReaseachpaper.filter(author => author.trim() !== "");

    if (validAuthors.length === 0) {
      toast.error("At least one author is required");
      setLoading(false);
      return;
    }

    const formData = {
      year: Number(data.year),
      title: data.title,
      authors: validAuthors, // Using the filtered authors list
      journal: data.journal,
      volume: data.volume,
      impactFactor: Number(data.impactFactor),
      journalRank: data.journalRank,
      visitLink: data.visitLink,
      paperType: data.paperType,
    };

    try {
      const result = await PostResearchPaper(formData);
      reset();
      console.log(result);
      toast.success(result.message);
      setauthorReaseachpaper([""]);
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error submitting research paper:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submit Research Paper</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Year Input */}
        <div>
          <Label htmlFor="year" className="mb-2">Year:</Label>
          <Input
            id="year"
            type="number"
            placeholder="Enter the year of ResearchPaper"
            {...register('year', { required: true })}
          />
        </div>

        {/* Title Input */}
        <div>
          <Label htmlFor="title" className="mb-2">Title:</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter the title of the paper"
            {...register('title', { required: true })}
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
        <Button variant="outline" type="button" className="w-full" onClick={handleAddResearch}>
          + Add Author
        </Button>

        {/* Journal */}
        <div>
          <Label htmlFor="journal" className="mb-2">Journal:</Label>
          <Input
            id="journal"
            type="text"
            placeholder="Enter the journal name"
            {...register('journal', { required: true })}
          />
        </div>

        {/* Volume */}
        <div>
          <Label htmlFor="volume" className="mb-2">Volume:</Label>
          <Input
            id="volume"
            type="text"
            placeholder="Enter the volume number"
            {...register('volume', { required: true })}
          />
        </div>

        {/* Impact Factor */}
        <div>
          <Label htmlFor="impactFactor" className="mb-2">Impact Factor:</Label>
          <Input
            id="impactFactor"
            type="number"
            step="0.1"
            placeholder="Enter the impact factor"
            {...register('impactFactor', { required: true })}
          />
        </div>

        {/* Journal Rank */}
        <div>
          <Label htmlFor="journalRank" className="mb-2">Journal Rank:</Label>
          <Input
            id="journalRank"
            type="text"
            placeholder="Enter the journal rank"
            {...register('journalRank', { required: true })}
          />
        </div>

        {/* Research Paper Link */}
        <div>
          <Label htmlFor="visitLink" className="mb-2">Research Paper Link:</Label>
          <Input
            id="visitLink"
            type="url"
            placeholder="Enter the research paper link"
            {...register('visitLink', { required: true })}
          />
        </div>

        {/* Paper Type */}
        <div>
          <Label htmlFor="paperType" className="mb-2">Paper Type:</Label>
          <Select onValueChange={(value) => setValue('paperType', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Journal">Journal</SelectItem>
              <SelectItem value="Conference">Conference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default AddResearchPaper;
