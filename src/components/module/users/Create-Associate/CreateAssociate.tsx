"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

interface FormData {
  password:string,
  fullName: string;
  email: string;
  contactNo: string;
  designation: string;
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
  file?: FileList;
}

const CreateAssociate: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [researchWorks, setResearchWorks] = useState<string[]>([""]);

  const handleAddResearch = (): void => {
    setResearchWorks([...researchWorks, ""]);
  };

  const handleResearchChange = (index: number, value: string): void => {
    const updatedResearch = [...researchWorks];
    updatedResearch[index] = value;
    setResearchWorks(updatedResearch);
  };

  const handleRemoveResearch = (index: number): void => {
    setResearchWorks(researchWorks.filter((_, i) => i !== index));
  };
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string>(""); 
  const [isUploading, setIsUploading] = useState(false);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Clooud_Gen");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dztxlecbe/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPreviewImage(data.secure_url);
      setImageURL(data.secure_url);
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };
  const removeImage = () => {
    setPreviewImage(null);
    setImageURL("");
  };
  const onSubmit = async (data: FormData): Promise<void> => {
    setLoading(true);
  
    const payload = {
      password: data.password,
      fullName: data.fullName,
      email: data.email,
      contactNo: data.contactNo,
      designation: data.designation,
      profileImg:imageURL,
      current: {
        institution: data.currentInstitution || "", 
        department: data.currentDepartment || "",
        degree: data.currentDegree || "",
      },
      education: {
        degree: data.educationDegree || "",
        field: data.educationField || "",
        institution: data.educationInstitution || "",
        status: data.educationStatus || "Ongoing",
        scholarship: data.scholarship || "",
      },
      research: researchWorks,
      shortBio: data.shortBio || "",
      socialLinks: {
        facebook: data.facebook || "",
        twitter: data.twitter || "",
        linkedin: data.linkedin || "",
      },
    };
  
    try {
      const res = await registerUser(payload);
      console.log(res);
      if(res.success){
        reset()
        setPreviewImage(null);
        setImageURL('');
        toast.success("User created successfully");
      }else{
        toast.error(res.err.code === 11000 ? "This Email is Duplicate!" : "An error occurred.");
      }
    } catch (error) {
      console.log("Error from backend:", error);
      toast.error("User registration failed.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-full w-[98%] mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
      <h2 className="text-2xl font-bold">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: "fullName", label: "Full Name*", required: true },
            { id: "email", label: "Email*", type: "email", required: true },
            { id: "contactNo", label: "Contact*", required: true },
            { id: "password", label: "Passwrod*",type: "password", required: true },
          ].map(({ id, label, type = "text", required }) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{label}</Label>
              <Input
                id={id}
                type={type}
                {...register(id as keyof FormData, required ? { required: `${label} is required` } : {})}
              />
              {errors[id as keyof FormData] && (
                <p className="text-red-500 text-sm">{errors[id as keyof FormData]?.message}</p>
              )}
            </div>
          ))}
        </div>
        <div className="space-y-2">
            <Label htmlFor="designation">Designation*</Label>
            <select
              id="designation"
              {...register("designation", { required: "Designation is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Designation</option>
              <option value="Advisor">Advisor</option>
              <option value="Lead">Lead</option>
              <option value="Mentor_Panel">Mentor Panel</option>
              <option value="Lead_Research_Associate">Lead Research Associate</option>
              <option value="Research_Associate">Research Associate</option>

            </select>
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
          </div>
          <div className="border p-4 rounded-lg my-5">
          <Label>Upload Image*</Label>
          <label className="flex items-center gap-2 cursor-pointer">
            <UploadCloud />
            <input type="file" onChange={handleImageUpload} className="hidden" />
          </label>
          {isUploading && <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded"></div>}
          {previewImage && (
            <div className="relative w-full h-[300px] border rounded mt-3">
              <Image src={previewImage} alt="Preview" fill className="w-full h-full object-cover rounded" />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={removeImage}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Current Position</h2>
        <div className="grid grid-cols-3 gap-4">
          {["currentInstitution", "currentDepartment", "currentDegree"].map((id) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{id.replace("current", "")}</Label>
              <Input id={id} {...register(id as keyof FormData)} />
            </div>
          ))}
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Educational Background</h2>
        <div className="grid grid-cols-3 gap-4">
          {["educationDegree", "educationField", "educationInstitution"].map((id) => (
            <div key={id} className="space-y-2">
              <Label htmlFor={id}>{id.replace("education", "")}</Label>
              <Input id={id} {...register(id as keyof FormData)} />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="educationStatus">Education Status</Label>
            <select id="educationStatus" {...register("educationStatus")} className="w-full p-2 border rounded">
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scholarship">Scholarship</Label>
            <Input id="scholarship" {...register("scholarship")} />
          </div>
        </div>

        <Separator />

        <h2 className="text-lg font-semibold">Research Work</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {researchWorks.map((research, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={research}
                onChange={(e) => handleResearchChange(index, e.target.value)}
                placeholder={`Research ${index + 1}`}
              />
              <Button type="button" onClick={() => handleRemoveResearch(index)} variant="destructive">
                ✕
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" type="button" onClick={handleAddResearch}>
          + Add Research
        </Button>

        <Separator />

<h2 className="text-lg font-semibold">Short Bio</h2>
<div className="space-y-2">
  <Label htmlFor="shortBio">Short Bio</Label>
  <Textarea id="shortBio" {...register("shortBio")} />
</div>

<Separator />

<h2 className="text-lg font-semibold">Social Links</h2>
<div className="grid grid-cols-3 gap-4">
  <div className="space-y-2">
    <Label htmlFor="facebook">Facebook</Label>
    <Input type="url" id="facebook" {...register("facebook")} />
  </div>
  <div className="space-y-2">
    <Label htmlFor="twitter">Twitter</Label>
    <Input type="url" id="twitter" {...register("twitter")} />
  </div>
  <div className="space-y-2">
    <Label htmlFor="linkedin">LinkedIn</Label>
    <Input type="url" id="linkedin" {...register("linkedin")} />
  </div>
</div>

<Separator />

   
        <DialogFooter>
          <Button type="submit" className="w-full cursor-pointer" disabled={isUploading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default CreateAssociate;
