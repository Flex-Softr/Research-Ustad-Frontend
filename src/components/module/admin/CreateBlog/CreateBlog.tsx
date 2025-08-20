"use client";
import CreateBlogForm from "@/components/shared/CreateBlogForm";

const CreateBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CreateBlogForm 
        isAdmin={true}
        title="Create Blog Post"
      />
    </div>
  );
};

export default CreateBlog;
