"use client";

import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import CoursesSection from "@/components/home/CourseSection";
import EventsSection from "@/components/home/EventSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServiceSection";
import AboutSection from "@/components/home/AboutSection";
import CoreValuesSection from "@/components/home/CoreValuesSection";
import ImpactSection from "@/components/home/ImpactSection";

import TeamSection from "@/components/home/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <AboutSection />
      {/* <CoreValuesSection /> */}
      {/* <ImpactSection /> */}
      <ServicesSection />
      <CoursesSection />
      <EventsSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
