"use client";
import ManageTable from "@/components/shared/ManageTable/ManageTable";
import { DeleteBlog, GetAllPersonalBlog } from "@/services/blogs";
import { TUser } from "@/type";
import { useEffect, useState } from "react";

const MyAllBlog = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<TUser[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllPersonalBlog();
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
  const handledeleted = async (id: string) => {
    const res = await DeleteBlog(id);
    console.log(res);
  };

  return (
    <div className=" w-full p-4">
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

export default MyAllBlog;
