import { Container, SectionHeader } from "@/components/ui/core";

interface MetricCardProps {
  value: string;
  label: string;
}

const MetricCard = ({ value, label }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-lg px-6 py-10 shadow-sm border border-gray-100 text-center">
      <div className="text-3xl font-bold text-[#3A5A78] mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const ImpactSection = () => {
  const metrics = [
    { value: "750+", label: "Research Papers Supported" },
    { value: "120+", label: "Expert Mentors" },
    { value: "65+", label: "Academic Institutions" },
    { value: "97%", label: "Student Satisfaction" },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <Container>
        <div className="text-center mb-12">
          <SectionHeader title="Our Impact" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We measure our success by the academic achievements of the students
            we've supported.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} value={metric.value} label={metric.label} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ImpactSection;
