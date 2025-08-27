"use client";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button, Container, SectionHeader } from "@/components/ui/core";
import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { InternationalConference } from "@/type/internationalConference";
import { GetAllInternationalConferencesPublic } from "@/services/internationalConferences";
import FallbackImage from "@/components/shared/FallbackImage";
import Autoplay from "embla-carousel-autoplay";

const InternationalConferenceCarouselSection = () => {
  const [conferences, setConferences] = useState<InternationalConference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await GetAllInternationalConferencesPublic();

        if (response?.success && response?.data) {
          // Limit to 12 conferences for homepage
          setConferences(response.data.slice(0, 12));
        } else {
          setConferences([]);
        }
      } catch (err) {
        console.error("Error fetching international conferences:", err);
        setError("Failed to load conferences");
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16">
        <Container>
          <SectionHeader
            title="International Conferences"
            description="Exploring global research collaborations and academic excellence through international conferences and symposiums."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error || conferences.length === 0) {
    return null; // Don't show section if no conferences
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-16">
      <Container>
        <SectionHeader
          title="International Conferences"
          description="Exploring global research collaborations and academic excellence through international conferences and symposiums."
        />

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {conferences.map((conference, index) => (
                <CarouselItem
                  key={conference._id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="group relative h-64 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                    {/* Image */}
                    {conference.imageUrl ? (
                      <FallbackImage
                        src={conference.imageUrl}
                        alt={conference.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-5xl mb-3">🌍</div>
                          <p className="text-sm font-medium">No Image</p>
                        </div>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold drop-shadow-lg line-clamp-2">
                          {conference.title}
                        </h3>
                        <p className="text-sm text-gray-200 drop-shadow-lg line-clamp-2 leading-relaxed">
                          {conference.description}
                        </p>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-4 left-4 w-8 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-12" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link href="/international-conferences">
            <Button variant="primary" className="cursor-pointer group">
              View All Conferences
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default InternationalConferenceCarouselSection;
