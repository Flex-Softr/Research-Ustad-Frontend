import { Container, SectionHeader } from "@/components/ui/core";

interface ValueCardProps {
  title: string;
  description: string;
}

const ValueCard = ({ title, description }: ValueCardProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg py-10 px-14 border border-white/20">
      <h3 className="text-xl text-[var(--color-brand-secondary)] font-bold mb-4 font-serif">{title}</h3>
      <p className="text-gray-200 leading-relaxed">{description}</p>
    </div>
  );
};

const CoreValuesSection = () => {
  const values = [
    {
      title: "Mission",
      description:
        "Democratic access to research excellence by providing personalized guidance, fostering critical thinking and building research confidence among students worldwide.",
    },
    {
      title: "Vision",
      description:
        "To become the global nexus for student research, where knowledge transcends boundaries, and every student can achieve their full academic potential.",
    },
    {
      title: "Approach",
      description:
        "Combine traditional academic rigor with innovative digital tools to create a holistic research ecosystem that adapts to each student's unique needs.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--color-brand-primary)]">
      <Container>
        <SectionHeader 
          title="Our Core Values"
          className="text-white"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoreValuesSection;
