import BlogDetailsPage from "@/components/blogs/SingleBlogPage";

const Page = async ({ params }: { params: any }) => {
  const { slug } = await params;

  return (
    <div>
      <BlogDetailsPage id={slug} />
    </div>
  );
};

export default Page;
