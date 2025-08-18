"use client";
import { UpdatePersonalMember } from "@/services/reserarchers";
import { GetMe } from "@/services/singleUser";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useForm } from "react-hook-form";
import { UpdateInfoFormData, Conference } from "@/type";
import {
  BasicInformationSection,
  CurrentInstitutionSection,
  EducationSection,
  SocialLinksSection,
  ExpertiseSection,
  AwardsSection,
  ConferencesSection,
} from "./index";
import { useRouter } from "next/navigation";
import { useUserStatus } from "@/hooks/useUserStatus";

const UpdateInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setMember] = useState<any>(null);
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [awardsList, setAwardsList] = useState<string[]>([]);
  const [conferencesList, setConferencesList] = useState<Conference[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();

  // Use the user status hook to check for account deletion
  useUserStatus();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateInfoFormData>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      contactNo: "",
      designation: "",
      profileImg: "",
      shortBio: "",
      currentInstitution: "",
      currentDepartment: "",
      currentDegree: "",
      currentInstDesignation: "",
      educationDegree: "",
      educationField: "",
      educationInstitution: "",
      educationStatus: "",
      scholarship: "",
      linkedin: "",
      researchgate: "",
      googleScholar: "",
      expertise: [],
      awards: [],
      conferences: [],
      isDeleted: false,
    },
  });

  console.log("user infoooo", data);

  // Helper functions for array management
  const addExpertise = () => {
    const newList = [...expertiseList, ""];
    setExpertiseList(newList);
    setValue("expertise", newList);
  };

  const removeExpertise = (index: number) => {
    const newList = expertiseList.filter((_, i) => i !== index);
    setExpertiseList(newList);
    setValue("expertise", newList);
  };

  const updateExpertise = (index: number, value: string) => {
    const newList = [...expertiseList];
    newList[index] = value;
    setExpertiseList(newList);
    setValue("expertise", newList);
  };

  const addAward = () => {
    const newList = [...awardsList, ""];
    setAwardsList(newList);
    setValue("awards", newList);
  };

  const removeAward = (index: number) => {
    const newList = awardsList.filter((_, i) => i !== index);
    setAwardsList(newList);
    setValue("awards", newList);
  };

  const updateAward = (index: number, value: string) => {
    const newList = [...awardsList];
    newList[index] = value;
    setAwardsList(newList);
    setValue("awards", newList);
  };

  // Helper functions for conferences management
  const addConference = () => {
    const newList = [...conferencesList, { name: "", role: "", topic: "" }];
    setConferencesList(newList);
    setValue("conferences", newList);
  };

  const removeConference = (index: number) => {
    const newList = conferencesList.filter((_, i) => i !== index);
    setConferencesList(newList);
    setValue("conferences", newList);
  };

  const updateConference = (
    index: number,
    field: keyof Conference,
    value: string
  ) => {
    const newList = [...conferencesList];
    newList[index] = { ...newList[index], [field]: value };
    setConferencesList(newList);
    setValue("conferences", newList);
  };

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const userResult = await GetMe();
        const data = userResult?.data;
        setMember(data);

        // Basic Information - only set if data exists
        setValue("fullName", data?.fullName || "");
        setValue("contactNo", data?.contactNo || "");
        setValue("designation", data?.designation || "");
        setValue("profileImg", data?.image || "");
        setValue("shortBio", data?.shortBio || "");

        // Current Institution - only set if data exists
        setValue("currentInstitution", data?.current?.institution || "");
        setValue("currentDepartment", data?.current?.department || "");
        setValue("currentDegree", data?.current?.degree || "");
        setValue(
          "currentInstDesignation",
          data?.current?.inst_designation || ""
        );

        // Education - only set if data exists
        setValue("educationDegree", data?.education?.degree || "");
        setValue("educationField", data?.education?.field || "");
        setValue("educationInstitution", data?.education?.institution || "");
        // Only set education status if it's a valid value, otherwise keep empty
        const validStatuses = ["Ongoing", "Completed"];
        setValue(
          "educationStatus",
          validStatuses.includes(data?.education?.status)
            ? data?.education?.status
            : ""
        );
        setValue("scholarship", data?.education?.scholarship || "");

        // Social Links - only set if data exists
        setValue("linkedin", data?.socialLinks?.linkedin || "");
        setValue("researchgate", data?.socialLinks?.researchgate || "");
        setValue("googleScholar", data?.socialLinks?.google_scholar || "");

        // Expertise - only set if data exists
        const expertise = data?.expertise || [];
        setExpertiseList(expertise.length > 0 ? expertise : [""]);
        setValue("expertise", expertise);

        // Awards - only set if data exists
        const awards = data?.awards || [];
        setAwardsList(awards.length > 0 ? awards : [""]);
        setValue("awards", awards);

        // Conferences - only set if data exists
        const conferences = data?.conferences || [];
        setConferencesList(
          conferences.length > 0
            ? conferences
            : [{ name: "", role: "", topic: "" }]
        );
        setValue("conferences", conferences);

        // System fields
        setValue("isDeleted", data?.isDeleted || false);
      } catch (error: any) {
        console.error("Error fetching member:", error);
        // If user data fails, the useUserStatus hook will handle logout
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [setValue]);

  const onSubmit = async (formData: UpdateInfoFormData) => {
    setLoading(true);

    // Helper function to clean empty strings
    const cleanString = (value: string | undefined) => {
      return value && value.trim() !== "" ? value.trim() : "";
    };

    // Helper function to clean arrays
    const cleanArray = (arr: string[] | undefined) => {
      if (!arr || arr.length === 0) return [];
      return arr.filter((item) => item && item.trim() !== "");
    };

    // Helper function to clean conference objects
    const cleanConferences = (conferences: Conference[] | undefined) => {
      if (!conferences || conferences.length === 0) return [];
      return conferences.filter(
        (conf) =>
          (conf.name && conf.name.trim() !== "") ||
          (conf.role && conf.role.trim() !== "") ||
          (conf.topic && conf.topic.trim() !== "")
      );
    };

    // Build payload with conditional inclusion of fields
    const payload: any = {
      // System fields
      isDeleted: formData.isDeleted ?? false,
    };

    // Only include basic information fields if they have content
    const fullName = cleanString(formData.fullName);
    if (fullName) payload.fullName = fullName;

    const contactNo = cleanString(formData.contactNo);
    if (contactNo) payload.contactNo = contactNo;

    const designation = cleanString(formData.designation);
    if (designation) payload.designation = designation;

    const image = cleanString(formData.profileImg);
    if (image) payload.image = image;

    const shortBio = cleanString(formData.shortBio);
    if (shortBio) payload.shortBio = shortBio;

    // Current Institution - only include if any field has content
    const currentInstitution = cleanString(formData.currentInstitution);
    const currentDepartment = cleanString(formData.currentDepartment);
    const currentDegree = cleanString(formData.currentDegree);
    const currentInstDesignation = cleanString(formData.currentInstDesignation);

    if (
      currentInstitution ||
      currentDepartment ||
      currentDegree ||
      currentInstDesignation
    ) {
      payload.current = {
        inst_designation: currentInstDesignation,
        institution: currentInstitution,
        department: currentDepartment,
        degree: currentDegree,
      };
    }

    // Education - only include if any field has content
    const educationDegree = cleanString(formData.educationDegree);
    const educationField = cleanString(formData.educationField);
    const educationInstitution = cleanString(formData.educationInstitution);
    const scholarship = cleanString(formData.scholarship);

    // Handle education status - allow empty string for "Select status (optional)"
    const educationStatus =
      formData.educationStatus === "" ? "" : formData.educationStatus;

    if (
      educationDegree ||
      educationField ||
      educationInstitution ||
      educationStatus ||
      scholarship
    ) {
      payload.education = {
        degree: educationDegree,
        field: educationField,
        institution: educationInstitution,
        status: educationStatus,
        scholarship: scholarship,
      };
    }

    // Keep existing research data
    payload.research = data?.research || [];

    // Social Links - only include if any field has content
    const linkedin = cleanString(formData.linkedin);
    const researchgate = cleanString(formData.researchgate);
    const googleScholar = cleanString(formData.googleScholar);

    if (linkedin || researchgate || googleScholar) {
      payload.socialLinks = {
        linkedin: linkedin,
        researchgate: researchgate,
        google_scholar: googleScholar,
      };
    }

    // Expertise - only include if array has content
    const expertise = cleanArray(formData.expertise);
    if (expertise.length > 0) {
      payload.expertise = expertise;
    }

    // Awards - only include if array has content
    const awards = cleanArray(formData.awards);
    if (awards.length > 0) {
      payload.awards = awards;
    }

    // Conferences - only include if array has content
    const conferences = cleanConferences(formData.conferences);
    if (conferences.length > 0) {
      payload.conferences = conferences;
    }

    try {
      console.log("Sending payload:", payload);
      const res = await UpdatePersonalMember(payload, selectedFile);
      console.log("res", res);
      if (res.success === true) {
        toast.success("Member updated successfully!");
        setLoading(false);
        setSelectedFile(null);
        if (data?.role === "user") {
          router.push("/user/dashboard/profileinfo");
        } else {
          router.push("/admin/dashboard/profileinfo");
        }
      }
    } catch (error) {
      console.error("Error updating member:", error);
      toast.error("Failed to update member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full container mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Update Member Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden Fields */}
          <input type="hidden" {...register("isDeleted")} />

          {/* Basic Information Section */}
          <BasicInformationSection
            register={register}
            errors={errors}
            selectedFile={selectedFile}
            onFileChange={setSelectedFile}
            currentProfileImg={data?.image}
          />

          {/* Current Institution Section */}
          <CurrentInstitutionSection register={register} errors={errors} />

          {/* Education Section */}
          <EducationSection register={register} errors={errors} />

          {/* Social Links Section */}
          <SocialLinksSection register={register} errors={errors} />

          {/* Expertise & Awards Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">
              Expertise & Awards
            </h3>

            {/* Expertise Areas */}
            <ExpertiseSection
              expertiseList={expertiseList}
              onAddExpertise={addExpertise}
              onRemoveExpertise={removeExpertise}
              onUpdateExpertise={updateExpertise}
              errors={errors}
            />

            {/* Awards & Achievements */}
            <AwardsSection
              awardsList={awardsList}
              onAddAward={addAward}
              onRemoveAward={removeAward}
              onUpdateAward={updateAward}
              errors={errors}
            />
          </div>

          {/* Conferences Section */}
          <ConferencesSection
            conferencesList={conferencesList}
            onAddConference={addConference}
            onRemoveConference={removeConference}
            onUpdateConference={updateConference}
            errors={errors}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6 cursor-pointer"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" variant="icon" className="mr-2" />
                Updating...
              </>
            ) : (
              "Update Member Information"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default UpdateInfo;
