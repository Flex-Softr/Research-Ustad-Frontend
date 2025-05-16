"use client"
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeleteBlog, GetAllBlog} from "@/services/blogs";
import { GetAllUsers, PromoteRole } from "@/services/Users";
import { TUser } from "@/type";
import { useEffect, useState } from "react";

const AllBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllBlog()       
         setData(response?.data || []);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const columns = [
    { label: "Title", value: "title" },
    { label: "PublishedDate", value: "publishedDate" },
  ];
const handledeleted= async(id:string)=>{
    console.log(id);
  const res = await DeleteBlog(id)
  if(res.success){
    await GetAllBlog() 
  }
}


  return (
    <div className=" lg:w-[990px] p-4">
      <ManageTable
        data={data} 
        isvalue="blog" 
        columns={columns} 
        loading={loading} 
        onDelete={handledeleted}
      />
    </div>
  );
};

export default AllBlogs;
