import { redirect } from "next/navigation";

interface EditBlogPageProps {
  params: {
    id: string;
  };
}

const EditBlogPage = ({ params }: EditBlogPageProps) => {
  // Redirect to create blog page with edit mode
  redirect(`/admin/dashboard/createblog?edit=true&id=${params.id}`);
};

export default EditBlogPage; 