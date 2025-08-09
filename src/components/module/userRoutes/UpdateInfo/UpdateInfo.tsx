"use client";
import {
  GetSinglePersonalMember,
  UpdatePersonalMember,
} from "@/services/reserarchers";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { useForm } from "react-hook-form";
import { UpdateInfoFormData, MemberData, Conference } from "@/type";
import {
  BasicInformationSection,
  CurrentInstitutionSection,
  EducationSection,
  SocialLinksSection,
  ExpertiseSection,
  AwardsSection,
  ConferencesSection,
} from "./index";

const UpdateInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setMember] = useState<MemberData | null>(null);
  const [expertiseList, setExpertiseList] = useState<string[]>([]);
  const [awardsList, setAwardsList] = useState<string[]>([]);
  const [conferencesList, setConferencesList] = useState<Conference[]>([]);

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
      educationStatus: "Ongoing",
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
        const { data } = await GetSinglePersonalMember();
        setMember(data);

        // Basic Information
        setValue("fullName", data?.fullName || "");
        setValue("contactNo", data?.contactNo || "");
        setValue("designation", data?.designation || "");
        setValue("profileImg", data?.profileImg || "");
        setValue("shortBio", data?.shortBio || "");

        // Current Institution
        setValue("currentInstitution", data?.current?.institution || "");
        setValue("currentDepartment", data?.current?.department || "");
        setValue("currentDegree", data?.current?.degree || "");
        setValue(
          "currentInstDesignation",
          data?.current?.inst_designation || ""
        );

        // Education
        setValue("educationDegree", data?.education?.degree || "");
        setValue("educationField", data?.education?.field || "");
        setValue("educationInstitution", data?.education?.institution || "");
        setValue("educationStatus", data?.education?.status || "Ongoing");
        setValue("scholarship", data?.education?.scholarship || "");

        // Social Links
        setValue("linkedin", data?.socialLinks?.linkedin || "");
        setValue("researchgate", data?.socialLinks?.researchgate || "");
        setValue("googleScholar", data?.socialLinks?.google_scholar || "");

        // Expertise (set array directly)
        const expertise = data?.expertise || [""];
        setExpertiseList(expertise);
        setValue("expertise", expertise);

        // Awards (set array directly)
        const awards = data?.awards || [];
        setAwardsList(awards.length > 0 ? awards : [""]);
        setValue("awards", awards.length > 0 ? awards : []);

        // Conferences (set array directly)
        const conferences = data?.conferences || [];
        setConferencesList(
          conferences.length > 0
            ? conferences
            : [{ name: "", role: "", topic: "" }]
        );
        setValue("conferences", conferences.length > 0 ? conferences : []);

        // System fields
        setValue("isDeleted", data?.isDeleted || false);
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [setValue]);

  // Custom validation for expertise
  const validateExpertise = () => {
    if (expertiseList.filter((item) => item.trim().length > 0).length === 0) {
      return "At least one expertise area is required";
    }
    return true;
  };

  const onSubmit = async (formData: UpdateInfoFormData) => {
    // Validate expertise manually since it's managed separately
    const expertiseValidation = validateExpertise();
    if (expertiseValidation !== true) {
      toast.error(expertiseValidation);
      return;
    }
    setLoading(true);

    const payload = {
      ResearchMembar: {
        // Basic Information
        fullName: formData.fullName || "",
        contactNo: formData.contactNo || "",
        designation: formData.designation || "",
        profileImg: formData.profileImg || "",
        shortBio: formData.shortBio || "",
        isDeleted: formData.isDeleted || false,

        // Current Institution
        current: {
          inst_designation: formData.currentInstDesignation || "",
          institution: formData.currentInstitution || "",
          department: formData.currentDepartment || "",
          degree: formData.currentDegree || "",
        },

        // Education
        education: {
          degree: formData.educationDegree || "",
          field: formData.educationField || "",
          institution: formData.educationInstitution || "",
          status: formData.educationStatus || "Ongoing",
          scholarship: formData.scholarship || "",
        },

        // Keep existing research data
        research: data?.research || [],

        // Social Links
        socialLinks: {
          linkedin: formData.linkedin || "",
          researchgate: formData.researchgate || "",
          google_scholar: formData.googleScholar || "",
        },

        // Expertise (use array directly, filter out empty strings)
        expertise: formData.expertise.filter((item) => item.trim().length > 0),

        // Awards (use array directly, filter out empty strings)
        awards: formData.awards
          ? formData.awards.filter((item) => item.trim().length > 0)
          : [],

        // Conferences (filter out empty conferences)
        conferences: formData.conferences
          ? formData.conferences.filter(
              (conf) =>
                conf.name.trim() || conf.role.trim() || conf.topic.trim()
            )
          : [],
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
        <CardTitle>Update Member Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Hidden Fields */}
          <input type="hidden" {...register("isDeleted")} />

          {/* Basic Information Section */}
          <BasicInformationSection register={register} errors={errors} />

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