

import SingleBlogPage from "@/components/blogs/SingleBlogPage";

const Page =async ({ params }:{params:any}) => {
  const {slug} =await params;

  return (
    <div>
      <SingleBlogPage id={slug} />
    </div>
  );
};

export default Page;
