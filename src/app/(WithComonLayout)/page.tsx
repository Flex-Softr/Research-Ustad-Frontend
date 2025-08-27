"use client";

import BlogSection from "@/components/home/BlogSection";
import ContactSection from "@/components/home/ContactSection";
import CoursesSection from "@/components/home/CourseSection";
import EventsSection from "@/components/home/EventSection";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServiceSection";
import AboutSection from "@/components/home/AboutSection";
import TeamSection from "@/components/home/TeamSection";
import AchievementCarouselSection from "@/components/home/AchievementCarouselSection";
import InternationalConferenceCarouselSection from "@/components/home/InternationalConferenceCarouselSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="courses">
        <CoursesSection />
      </div>
      <div id="events">
        <EventsSection />
      </div>
      <div id="achievements">
        <AchievementCarouselSection />
      </div>
      <div id="conferences">
        <InternationalConferenceCarouselSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default HomePage;
