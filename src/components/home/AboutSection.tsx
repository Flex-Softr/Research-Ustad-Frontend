import { Button, Container, SectionHeader } from "@/components/ui/core";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeader title="About Research Ustad" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Research Ustad is a premier academic platform dedicated to
              transforming how students approach research. We combine expert
              mentorship with innovative tools to simplify the research process
              while maintaining scholarly excellence.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our interdisciplinary team brings together decades of experience
              across humanities, sciences, and social sciences to provide
              comprehensive support tailored to your academic needs.
            </p>

            {/* <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
              >
                DISCOVER OUR APPROACH
              </Button>
            </div> */}
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src="/img/aboutsection.png"
                alt="Academic team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
