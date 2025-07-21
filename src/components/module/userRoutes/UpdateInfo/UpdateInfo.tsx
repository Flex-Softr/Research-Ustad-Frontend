"use client";

import {
  GetSingleMember,
  GetSinglePersonalMember,
  UpdateMember,
  UpdatePersonalMember,
} from "@/services/reserarchers";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  currentInstitution: z.string().min(2, "Institution name is required"),
  currentDepartment: z.string().min(2, "Department is required"),
  currentDegree: z.string().min(2, "Degree is required"),
  educationDegree: z.string().min(2, "Education degree is required"),
  educationField: z.string().min(2, "Field of study is required"),
  educationInstitution: z.string().min(2, "Institution is required"),
  educationStatus: z.string().min(2, "Education status is required"),
  scholarship: z.string().optional(),
  shortBio: z.string().min(10, "Short bio must be at least 10 characters"),
  facebook: z.string().url("Invalid URL format").optional(),
  twitter: z.string().url("Invalid URL format").optional(),
  linkedin: z.string().url("Invalid URL format").optional(),
});

interface FormData {
  currentInstitution?: string;
  currentDepartment?: string;
  currentDegree?: string;
  educationDegree?: string;
  educationField?: string;
  educationInstitution?: string;
  educationStatus?: string;
  scholarship?: string;
  shortBio?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

interface MemberData {
  current?: {
    institution: string;
    department: string;
    degree: string;
  };
  education?: {
    degree: string;
    field: string;
    institution: string;
    status: string;
    scholarship: string;
  };
  research?: string[];
  shortBio: string;
  socialLinks?: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

const UpdateInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setMember] = useState<MemberData | null>(null);
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const { data } = await GetSinglePersonalMember();
        setMember(data);

        // Populate default values in the form
        setValue("currentInstitution", data?.current?.institution || "");
        setValue("currentDepartment", data?.current?.department || "");
        setValue("currentDegree", data?.current?.degree || "");
        setValue("educationDegree", data?.education?.degree || "");
        setValue("educationField", data?.education?.field || "");
        setValue("educationInstitution", data?.education?.institution || "");
        setValue("educationStatus", data?.education?.status || "Ongoing");
        setValue("scholarship", data?.education?.scholarship || "");
        setValue("shortBio", data?.shortBio || "N/A");
        setValue("facebook", data?.socialLinks?.facebook || "");
        setValue("twitter", data?.socialLinks?.twitter || "");
        setValue("linkedin", data?.socialLinks?.linkedin || "");
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [setValue]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);

    const payload = {
      ResearchMembar: {
        current: {
          institution: formData.currentInstitution || "",
          department: formData.currentDepartment || "",
          degree: formData.currentDegree || "",
        },
        education: {
          degree: formData.educationDegree || "",
          field: formData.educationField || "",
          institution: formData.educationInstitution || "",
          status: formData.educationStatus || "Ongoing",
          scholarship: formData.scholarship || "",
        },
        research: data?.research || [],
        shortBio: formData.shortBio || "N/A",
        socialLinks: {
          facebook: formData.facebook || "",
          twitter: formData.twitter || "",
          linkedin: formData.linkedin || "",
        },
      },
    };

    try {
      const res = await UpdatePersonalMember(JSON.stringify(payload));
      if (res.success === true) {
        toast.success("Member updated successfully!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Failed to update member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full container mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Update Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-medium mt-4">Current Institution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Institution
              <Input
                type="text"
                {...register("currentInstitution")}
                placeholder="Enter current institution"
              />
              {errors.currentInstitution && (
                <p className="text-red-500 text-sm">
                  {errors.currentInstitution.message}
                </p>
              )}
            </label>
            <label>
              Department
              <Input
                type="text"
                {...register("currentDepartment")}
                placeholder="Enter current department"
              />
              {errors.currentDepartment && (
                <p className="text-red-500 text-sm">
                  {errors.currentDepartment.message}
                </p>
              )}
            </label>
            <label>
              Degree
              <Input
                type="text"
                {...register("currentDegree")}
                placeholder="Enter current degree"
              />
              {errors.currentDegree && (
                <p className="text-red-500 text-sm">
                  {errors.currentDegree.message}
                </p>
              )}
            </label>
          </div>

          <h3 className="text-lg font-medium mt-4">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Degree
              <Input
                type="text"
                {...register("educationDegree")}
                placeholder="Enter education degree"
              />
              {errors.educationDegree && (
                <p className="text-red-500 text-sm">
                  {errors.educationDegree.message}
                </p>
              )}
            </label>
            <label>
              Field
              <Input
                type="text"
                {...register("educationField")}
                placeholder="Enter field of study"
              />
              {errors.educationField && (
                <p className="text-red-500 text-sm">
                  {errors.educationField.message}
                </p>
              )}
            </label>
            <label>
              Institution
              <Input
                type="text"
                {...register("educationInstitution")}
                placeholder="Enter education institution"
              />
              {errors.educationInstitution && (
                <p className="text-red-500 text-sm">
                  {errors.educationInstitution.message}
                </p>
              )}
            </label>
            <label>
              Status
              <select
                {...register("educationStatus")}
                className="border rounded p-2 w-full"
              >
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Dropped">Dropped</option>
              </select>
              {errors.educationStatus && (
                <p className="text-red-500 text-sm">
                  {errors.educationStatus.message}
                </p>
              )}
            </label>

            <label>
              Scholarship
              <Input
                type="text"
                {...register("scholarship")}
                placeholder="Enter scholarship (if any)"
              />
              {errors.scholarship && (
                <p className="text-red-500 text-sm">
                  {errors.scholarship.message}
                </p>
              )}
            </label>
          </div>

          <h3 className="text-lg font-medium mt-4">Short Bio</h3>
          <label>
            Short Bio
            <Textarea
              {...register("shortBio")}
              placeholder="Enter a short bio"
            />
            {errors.shortBio && (
              <p className="text-red-500 text-sm">{errors.shortBio.message}</p>
            )}
          </label>

          <h3 className="text-lg font-medium mt-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label>
              Facebook
              <Input
                type="text"
                {...register("facebook")}
                placeholder="Enter Facebook URL"
              />
              {errors.facebook && (
                <p className="text-red-500 text-sm">
                  {errors.facebook.message}
                </p>
              )}
            </label>
            <label>
              Twitter
              <Input
                type="text"
                {...register("twitter")}
                placeholder="Enter Twitter URL"
              />
              {errors.twitter && (
                <p className="text-red-500 text-sm">{errors.twitter.message}</p>
              )}
            </label>
            <label>
              LinkedIn
              <Input
                type="text"
                {...register("linkedin")}
                placeholder="Enter LinkedIn URL"
              />
              {errors.linkedin && (
                <p className="text-red-500 text-sm">
                  {errors.linkedin.message}
                </p>
              )}
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 cursor-pointer"
          >
            {loading ? (
              <LoadingSpinner size="sm" variant="icon" className="mr-2" />
            ) : (
              "Update Member"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateInfo;
