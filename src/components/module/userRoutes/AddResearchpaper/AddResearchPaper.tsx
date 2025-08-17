"use client";
import ResearchPaperForm from '@/components/module/common/ResearchPaperForm/ResearchPaperForm';
import React from 'react';

const AddResearchPaper: React.FC = () => {
  const handleSuccess = (result: any) => {
    // Additional success handling for user dashboard if needed
    console.log('Research paper submitted successfully:', result);
  };

  const handleError = (error: any) => {
    // Additional error handling for user dashboard if needed
    console.error('Error in user dashboard:', error);
  };

  return (
    <ResearchPaperForm
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default AddResearchPaper;
