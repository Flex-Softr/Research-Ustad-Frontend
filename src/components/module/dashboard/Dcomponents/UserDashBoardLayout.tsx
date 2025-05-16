"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GetAllPersonalInfo } from "@/services/dashbaord";

// Define types
interface PersonalData {
  totalApprovedPapers: number;
  totalPendingPapers: number;
  totalBlogs: number;
}

const UserDashBoardLayout = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllPersonalInfo();
        setPersonalInfo(response?.data || null);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Card className="rounded-xl bg-muted flex justify-center items-center">
        <CardContent className="text-center">
          <h2 className="text-2xl font-bold">Dashboard Insights</h2>
        </CardContent>
      </Card>
      <div className="grid mt-4 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Approved Papers</h2>
            <p className="text-3xl font-semibold">{personalInfo?.totalApprovedPapers ?? "N/A"}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Pending Papers</h2>
            <p className="text-3xl font-semibold">{personalInfo?.totalPendingPapers ?? "N/A"}</p>
          </CardContent>
        </Card>
        <Card className="aspect-video rounded-xl bg-muted flex flex-col justify-center items-center">
          <CardContent className="text-center">
            <h2 className="text-xl font-bold">Total Blogs</h2>
            <p className="text-3xl font-semibold">{personalInfo?.totalBlogs ?? "N/A"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashBoardLayout;
