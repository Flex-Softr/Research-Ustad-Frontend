"use client"; // Ensures this is a client component

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Team from "@/components/module/home/ourTeam/Team";
import { Input } from "@/components/ui/input";
import { GetAllResearchAssociate } from "@/services/reserarchers";
import { UserProfile } from "@/type";

const Page = () => {
  const [data, setData] = useState<UserProfile[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract search query from URL
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllResearchAssociate();
      setData(response.data);
    };
    fetchData();
  }, []);

  // Filtering Data Based on Search Query
  const filteredData = data.filter(
    (associate) =>
      associate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      associate.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by Specific Designation
  const filterByDesignation = (designation: string) => {
    return filteredData.filter((associate) => associate.designation === designation);
  };

  // Handle Search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    router.push(`?search=${value}`, { scroll: false }); // Update URL
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url("/teambg.jpg")',
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
        className="py-[200px] flex justify-center items-center flex-col"
      >
        <h2 className="text-5xl text-white font-bold mb-4 text-center">
          Our <span className="text-yellow-500">Team Members</span>
        </h2>
        <div className="text-white flex gap-3">
          <a href="/home" className="text-white hover:text-green-500">HOME</a>
          <span>/</span>
          <span className="uppercase">Team-member</span>
        </div>
      </div>

     <div className="container sm:w-[90%] mx-auto py-10">
     <div className="mx-2 md:mx-0">
        {/* Search Input */}
        <div className="flex justify-end mb-6">
          <Input
            className="md:w-64 w-full"
            placeholder="Search Name or Designation"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Team Sections */}
        <div className="grid grid-cols-1 gap-10">
          {[
            { title: "Our Advisor", key: "Advisor" },
            { title: "Our Lead Members", key: "Lead" },
            { title: "Our Research Associates", key: "Research_Associate" },
            { title: "Mentor Panel", key: "Mentor_Panel" },
          ].map(({ title, key }) => {
            const members = filterByDesignation(key);
            return (
              <div key={key}>
               {members.length > 0 && <h3 className="text-3xl font-semibold mb-5">{title}</h3>}
                {members.length > 0 &&
                  <Team allMembers={members} />
                  }
              </div>
            );
          })}
        </div>
      </div>
     </div>
    </div>
  );
};

export default Page;
