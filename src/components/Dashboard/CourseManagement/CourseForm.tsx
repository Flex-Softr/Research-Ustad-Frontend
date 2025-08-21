import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

interface Course {
  id?: number;
  title: string;
  category: string;
  students: number;
  fee: number;
  startDate: string;
  status: string;
  image: string;
  instruction: string;
  syllabus: string;
  location: string;
}

interface CourseFormProps {
  course?: Course;
  onSave: (course: Course) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const CourseForm = ({
  course,
  onSave,
  onCancel,
  isEditing = false,
}: CourseFormProps) => {
  const [formData, setFormData] = useState<Course>({
    title: course?.title || "",
    category: course?.category || "",
    students: course?.students || 0,
    fee: course?.fee || 0,
    startDate: course?.startDate || "",
    status: course?.status || "upcoming",
    image: course?.image || "",
    instruction: course?.instruction || "",
    syllabus: course?.syllabus || "",
    location: course?.location || "",
    ...(course?.id && { id: course.id }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof Course, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{isEditing ? "Edit Course" : "Add New Course"}</CardTitle>
        <Button variant="ghost" className="cursor-pointer" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="e.g., Web Development"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fee">Fee ($)</Label>
              <Input
                id="fee"
                type="number"
                value={formData.fee}
                onChange={(e) => handleChange("fee", parseInt(e.target.value))}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Online or Physical location"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instruction">Instructor</Label>
              <Input
                id="instruction"
                value={formData.instruction}
                onChange={(e) => handleChange("instruction", e.target.value)}
                placeholder="Instructor name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="syllabus">Syllabus</Label>
            <Textarea
              id="syllabus"
              value={formData.syllabus}
              onChange={(e) => handleChange("syllabus", e.target.value)}
              placeholder="Course syllabus and description"
              rows={3}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="bg-brand-primary hover:bg-brand-primary/80 cursor-pointer">
              {isEditing ? "Update Course" : "Create Course"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="cursor-pointer">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CourseForm;
