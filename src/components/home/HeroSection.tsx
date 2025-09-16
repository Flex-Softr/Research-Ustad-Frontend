import { Button } from "@/components/ui/core";
import { Container } from "@/components/ui/core";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-full lg:h-[90vh] bg-white overflow-hidden">
      {/* Background Image with Blue Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/img/heroimg1.jpg"
          alt="Academic research background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-brand-primary/60"></div>
      </div>

      {/* Main Content */}
      <Container className="relative z-10 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Heading */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight font-serif">
              Enlighten your Research curiosity <br /> shape the career
            </h1>

            {/* Subtitle */}
            <div className="text-xl md:text-xl text-white leading-relaxed max-w-3xl mx-auto">
              <p>
                Dive into the world where your knowledge sparks innovation and
                leads your talents to new horizons of excellence. Collaborate, Connect and Make your footprint.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-5">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  START YOUR RESEARCH
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
