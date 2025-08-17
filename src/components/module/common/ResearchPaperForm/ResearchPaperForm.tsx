"use client";
import React from "react";
import { useResearchPaperForm } from "./useResearchPaperForm";
import { ResearchPaperFormProps } from "./types";
import FormHeader from "./FormHeader";
import BasicInfoFields from "./BasicInfoFields";
import AuthorsSection from "./AuthorsSection";
import AdditionalFields from "./AdditionalFields";
import KeywordsSection from "./KeywordsSection";
import FormActions from "./FormActions";
import LoadingState from "./LoadingState";

const ResearchPaperForm: React.FC<ResearchPaperFormProps> = ({
  onSuccess,
  onError,
  className = "",
}) => {
  const {
    // Form state
    authorReaseachpaper,
    keywords,
    loading,
    isLoadingData,
    isEditMode,
    
    // Form methods
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
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
  } = useResearchPaperForm(onSuccess, onError);

  return (
    <div className={`mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen ${className}`}>
      <div className="space-y-6">
        <FormHeader isEditMode={isEditMode} onClose={handleClose} />
        
        {isLoadingData ? (
          <LoadingState />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Fields */}
            <BasicInfoFields register={register} errors={errors} />
            
            {/* Authors Section */}
            <AuthorsSection
              authors={authorReaseachpaper}
              onAuthorChange={handleResearchChange}
              onAddAuthor={handleAddResearch}
              onRemoveAuthor={handleRemoveResearch}
            />
            
            {/* Additional Fields */}
            <AdditionalFields
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              trigger={trigger}
            />
            
            {/* Keywords Section */}
            <KeywordsSection
              keywords={keywords}
              onKeywordChange={handleKeywordChange}
              onAddKeyword={handleAddKeyword}
              onRemoveKeyword={handleRemoveKeyword}
            />
            
            {/* Form Actions */}
            <FormActions isEditMode={isEditMode} loading={loading} />
          </form>
        )}
      </div>
    </div>
  );
};

export default ResearchPaperForm;
