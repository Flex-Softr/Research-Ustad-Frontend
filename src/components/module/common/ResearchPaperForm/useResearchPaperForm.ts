"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { getCurrentUser } from "@/services/AuthService";
import { JWTPayload } from "@/type";
import {
  PostResearchPaper,
  GetSingleResearchPaper,
  UpdateResearchPaper,
} from "@/services/allreserchPaper";
import { ResearchPaperFormData, Author } from "./types";

export const useResearchPaperForm = (onSuccess?: (result: any) => void, onError?: (error: any) => void) => {
  const [authorReaseachpaper, setauthorReaseachpaper] = useState<Author[]>([{ name: "", role: "Author" }]);
  const [keywords, setKeywords] = useState<string[]>([""]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const isEditMode = searchParams.get("edit") === "true";
  const paperId = searchParams.get("id");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm<ResearchPaperFormData>({
    mode: "onChange",
    defaultValues: {
      paperType: "journal",
      status: "ongoing",
    },
  });


  // Reset form when switching between create and edit modes
  useEffect(() => {
    if (!isEditMode) {
      reset({
        title: "",
        year: 0,
        journal: "",
        volume: "",
        impactFactor: 0,
        journalRank: "",
        visitLink: "",
        paperType: "journal",
        status: "ongoing",
        abstract: "",
        citations: 0,
        researchArea: "",
        funding: "",
      });
      setauthorReaseachpaper([{ name: "", role: "Author" }]);
      setKeywords([""]);
    }
  }, [isEditMode, reset]);

  // Load paper data for editing
  useEffect(() => {
    const loadPaperData = async () => {
      if (isEditMode && paperId) {
        try {
          setIsLoadingData(true);
          // console.log("Loading paper data for ID:", paperId);
          const response = await GetSingleResearchPaper(paperId);
          // console.log("Response from GetSingleResearchPaper:", response);

          if (response?.data) {
            const paperData = response.data;

            // Reset form with paper data
            reset({
              title: paperData.title || "",
              year: paperData.year || 0,
              journal: paperData.journal || "",
              volume: paperData.volume || "",
              impactFactor: paperData.impactFactor || 0,
              journalRank: paperData.journalRank || "",
              visitLink: paperData.visitLink || "",
              paperType: paperData.paperType || "",
              status: paperData.status || "ongoing",
              abstract: paperData.abstract || "",
              citations: paperData.citations || 0,
              researchArea: paperData.researchArea || "",
              funding: paperData.funding || "",
            });

            // Set authors and keywords - handle both old and new formats
            let authors: Author[];
            if (paperData.authors && paperData.authors.length > 0) {
              authors = paperData.authors.map((author: any) => {
                if (typeof author === 'string') {
                  // Old format: just a string
                  return { name: author, role: "Author", isRegisteredUser: false };
                } else if (author && typeof author === 'object') {
                  // New format: object with name, user ObjectId, role, and isRegisteredUser flag
                  return { 
                    name: author.name || '', 
                    user: author.user || undefined,
                    role: author.role || "Author",
                    isRegisteredUser: author.isRegisteredUser || !!author.user
                  };
                } else {
                  return { name: '', role: "Author", isRegisteredUser: false };
                }
              });
            } else {
              authors = [{ name: "", role: "Author", isRegisteredUser: false }];
            }
            
            const keywords =
              paperData.keywords && paperData.keywords.length > 0
                ? [...paperData.keywords]
                : [""];

    

            setauthorReaseachpaper(authors);
            setKeywords(keywords);

          } else if (response?.success === false) {
            console.error("API returned error:", response);
            toast.error(
              response?.message || "Failed to load research paper data"
            );
          } else {
            console.error("No data in response:", response);
            toast.error(
              "Failed to load research paper data - no data received"
            );
          }
        } catch (error) {
          console.error("Error loading paper data:", error);
          toast.error("Failed to load research paper data");
        } finally {
          setIsLoadingData(false);
        }
      }
    };
    loadPaperData();
  }, [isEditMode, paperId, reset]);

  const handleClose = () => {
    // Determine the appropriate route based on current pathname
    const isAdminRoute = pathname.includes("/admin/dashboard");
    if (isAdminRoute) {
      router.push("/admin/dashboard/myresearchpaper");
    } else {
      router.push("/user/dashboard/mypapers");
    }
  };

  const handleAddResearch = (): void => {
    setauthorReaseachpaper([...authorReaseachpaper, { name: "", role: "Author", isRegisteredUser: false }]);
  };

  const handleResearchChange = (index: number, author: Author): void => {
    console.log(
      `handleResearchChange called - index: ${index}, author:`, author
    );
    const updatedResearch = [...authorReaseachpaper];
    updatedResearch[index] = author;
    setauthorReaseachpaper(updatedResearch);
  };

  const handleRemoveResearch = (index: number): void => {
    setauthorReaseachpaper(authorReaseachpaper.filter((_, i) => i !== index));
  };

  const handleAddKeyword = (): void => {
    setKeywords([...keywords, ""]);
  };

  const handleKeywordChange = (index: number, value: string): void => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = value;
    setKeywords(updatedKeywords);
  };

  const handleRemoveKeyword = (index: number): void => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<ResearchPaperFormData> = async (data) => {
    setLoading(true);

    // Filter out empty author entries
    const validAuthors = authorReaseachpaper.filter(
      (author) => author.name && author.name.trim() !== ""
    );

    if (validAuthors.length === 0) {
      toast.error("At least one author is required");
      setLoading(false);
      return;
    }

    // Validate each author name and role
    const invalidAuthors = validAuthors.filter(
      (author) => (author.name && author.name.trim().length < 2) || !author.role || author.role.trim() === ""
    );
    if (invalidAuthors.length > 0) {
      toast.error("Each author must have a valid name (at least 2 characters) and role");
      setLoading(false);
      return;
    }

    // Filter out empty keyword entries
    const validKeywords = keywords.filter((keyword) => keyword.trim() !== "");

    // Validate each keyword (minimum 2 characters as per backend)
    const invalidKeywords = validKeywords.filter(
      (keyword) => keyword.trim().length < 2
    );
    if (invalidKeywords.length > 0) {
      toast.error("Each keyword must be at least 2 characters long");
      setLoading(false);
      return;
    }

    if (!data.paperType) {
      toast.error("Please select a paper type");
      setLoading(false);
      return;
    }

    // Validate paper type enum values
    if (!["journal", "conference", "book"].includes(data.paperType)) {
      toast.error("Paper type must be either 'journal' or 'conference' or 'book'");
      setLoading(false);
      return;
    }

    // Prepare form data with proper handling of optional fields
    const formData: any = {
      year: Number(data.year),
      title: data.title,
      authors: validAuthors,
      journal: data.journal,
      visitLink: data.visitLink,
      paperType: data.paperType,
      status: data.status,
    };

    // Only include optional fields if they have content
    if (data.volume && data.volume.trim() !== "") {
      formData.volume = data.volume;
    }

    if (data.impactFactor && data.impactFactor > 0) {
      formData.impactFactor = Number(data.impactFactor);
    }

    if (data.journalRank && data.journalRank.trim() !== "") {
      formData.journalRank = data.journalRank;
    }

    if (data.abstract && data.abstract.trim() !== "") {
      formData.abstract = data.abstract;
    }

    if (validKeywords.length > 0) {
      formData.keywords = validKeywords;
    }

    if (data.citations && data.citations > 0) {
      formData.citations = Number(data.citations);
    }

    if (data.researchArea && data.researchArea.trim() !== "") {
      formData.researchArea = data.researchArea;
    }

    if (data.funding && data.funding.trim() !== "") {
      formData.funding = data.funding;
    }


    try {
      let result;
      if (isEditMode && paperId) {
        result = await UpdateResearchPaper(paperId, formData);
        toast.success("Research paper updated successfully!");
      } else {
        result = await PostResearchPaper(formData);
        toast.success("Research paper created successfully!");
      }

      // Get current user to determine role-based redirect
      const userInfo = await getCurrentUser();
      const userRole = (userInfo as JWTPayload)?.role;

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(result);
      }

      // Only redirect and reset form for create mode
      if (!isEditMode) {
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
        setValue("paperType", "journal"); // Reset paperType to default value
        setauthorReaseachpaper([{ name: "", role: "Author", isRegisteredUser: false }]);
        setKeywords([""]);
      } else {
        // For edit mode, redirect based on current pathname and user role
        const isAdminRoute = pathname.includes("/admin/dashboard");

        // Add a small delay to ensure the success toast is visible
        setTimeout(() => {
          if (
            isAdminRoute ||
            userRole === "admin" ||
            userRole === "superAdmin"
          ) {
            router.push("/admin/dashboard/myresearchpaper");
          } else {
            router.push("/user/dashboard/mypapers");
          }
        }, 1000); // 1 second delay
      }
    } catch (error: any) {
      console.error("Error submitting research paper:", error);
      
      // Handle specific validation errors from backend
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error.message || "Failed to submit research paper");
      }

      // Call onError callback if provided
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    // Form state
    authorReaseachpaper,
    keywords,
    loading,
    isLoadingData,
    isEditMode,
    
    // Form methods
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    errors,
    trigger,
    
    // Handlers
    handleClose,
    handleAddResearch,
    handleResearchChange,
    handleRemoveResearch,
    handleAddKeyword,
    handleKeywordChange,
    handleRemoveKeyword,
    onSubmit,
  };
};
