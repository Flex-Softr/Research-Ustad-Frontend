import { Button } from "@/components/ui/core";
import { Container } from "@/components/ui/core";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/AuthService";
import { getDashboardUrl } from "@/lib/dashboardUtils";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getDashboardLink = () => {
    if (user?.role) {
      return getDashboardUrl(user.role);
    }
    return "/login";
  };

  const getPrimaryButtonText = () => {
    if (isLoading) return "Loading...";
    if (user) return "Go to Dashboard";
    return "START YOUR RESEARCH";
  };

  return (
    <section className="relative w-full min-h-[70vh] bg-white overflow-hidden">
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/img/heroimg1.jpg"
          alt="Academic research background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#3A5A78]/60"></div>
      </div>

      {/* Main Content */}
      <Container className="relative z-10 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight font-serif">
              Elevate Your Academic Research
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
              Research Ustad provides comprehensive guidance and resources to
              help students produce exceptional research papers with confidence
              and academic rigor.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href={getDashboardLink()}>
                <Button variant="primary" size="lg">
                  {getPrimaryButtonText()}
                </Button>
              </Link>

              <Link href="/team-members">
                <Button variant="secondary" size="lg">
                  MEET OUR MENTORS
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
