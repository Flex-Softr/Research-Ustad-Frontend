import AllBlogs from "@/components/module/admin/AllBlogs/AllBlogs"
import { GetAllBlog } from "@/services/blogs"


const page = async() => {
  return (
    <div className="">
       <h2 className="text-2xl font-bold px-4 pt-4"> All Blog</h2>
      <AllBlogs></AllBlogs>
      </div>
  )
}

export default page