import AllBlogs from "@/components/module/admin/AllBlogs/AllBlogs"
import { GetAllBlog } from "@/services/blogs"


const page = async() => {
  return (
    <div className="">
      <AllBlogs></AllBlogs>
      </div>
  )
}

export default page