"use client";
import CreateBlogForm from "@/components/shared/CreateBlogForm";

const CreateBlog: React.FC = () => {
  return (
    <div>
      <CreateBlogForm 
        isAdmin={false}
        title="Create New Blog"
        description="Share your thoughts and ideas. Your blog will be reviewed by admin before publishing."
      />
    </div>
  );
};

export default CreateBlog;
