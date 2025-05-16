"use client";
import Achievement from "@/components/module/home/Achievement/Achievement";
import BlogSection from "@/components/module/home/BlogSection/BlogSection";
import Hero from "@/components/module/home/Hero/Hero";
import OurTeam from "@/components/module/home/ourTeam/OurTeam";
import ResearchArea from "@/components/module/home/ResearchArea/ResearchArea";

const HomePage = () => {
  return (
    <div className=" md:space-y-16 space-y-8">
      <Hero />
      <Achievement />
      <ResearchArea />
      <OurTeam></OurTeam>
      {/* <RecentPublishSection></RecentPublishSection> */}
      <BlogSection></BlogSection>
      {/* <Pricing></Pricing>  */}
    </div>
  );
};

export default HomePage;
