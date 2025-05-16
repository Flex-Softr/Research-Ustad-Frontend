"use client";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/type";
import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import SectionTitle from "../../SectionTitle";
import { GetAllResearchAssociate } from "@/services/reserarchers";
import ResearchMembar from "./ResearchMembar/ResearchMembar";
import { SkeletonCard } from "@/components/Skeleton/Hompage/ResearchMembarSkeleton";
import { LuMoveRight } from "react-icons/lu";
import Link from "next/link";



const OurTeam = () => {
  const [associates, setAssociates] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAssociates = async () => {
      try {
        const data = await GetAllResearchAssociate();
        setAssociates(data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false); 
      }
    };

    fetchAssociates();
  }, []);
  console.log(associates);
  // Filter associates by "Advisor" designation
  const filteredAssociates = associates.filter(
    (associate) => associate.designation === "Advisor"
  );

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container w-[92%] mx-auto">
        <div className="text-center">
          <SectionTitle
            title="Meet Our Esteemed Advisor"
            discription="Guidance from our experienced advisor, dedicated to excellence in research and innovation."
          />
        </div>
        <div className="grid md:grid-cols-3 mt-8 lg:grid-cols-4 sm:grid-cols-2 gap-4 ">
          {/* If loading, show skeleton loaders */}
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />) // Adjust number based on how many cards you want to show
            : filteredAssociates.slice(0,4).map((associate, index) => (
             <ResearchMembar key={index} associate={associate}/>
              ))}
        </div>
      
      <div className="flex md:justify-end justify-center mt-5 md:mt-2 ">
      <Link  href={'/team-members'}  className=" rounded-full bg-[#bc986b]  p-2">
      <LuMoveRight color="white" className=" hover:text-black" size={30} />
      </Link>
      </div>
      </div>
  
    </section>
  );
};

export default OurTeam;
