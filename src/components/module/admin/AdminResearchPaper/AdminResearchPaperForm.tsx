"use client";
import ResearchPaperForm from '@/components/module/common/ResearchPaperForm/ResearchPaperForm';
import React from 'react';

interface AdminResearchPaperFormProps {
  userRole?: 'admin' | 'superAdmin';
}

const AdminResearchPaperForm: React.FC<AdminResearchPaperFormProps> = ({ 
  userRole = 'admin' 
}) => {


  const handleSuccess = (result: any) => {
    // Admin/SuperAdmin-specific success handling
    console.log(`${userRole} submitted research paper successfully:`, result);
    // You can add role-specific logic here like:
    // - Refresh admin dashboard data
    // - Show admin-specific notifications
    // - Redirect to admin research papers list
    // - Different handling for superadmin vs admin
  };

  const handleError = (error: any) => {
    // Admin/SuperAdmin-specific error handling
    console.error(`Error in ${userRole} dashboard:`, error);
    // You can add role-specific error handling here
  };

  return (
    <ResearchPaperForm
      onSuccess={handleSuccess}
      onError={handleError}
      className={`${userRole}-research-form`}
    />
  );
};

export default AdminResearchPaperForm;
