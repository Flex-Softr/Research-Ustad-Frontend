import { BookOpen, Globe, TrendingUp, Users } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Active Students",
    description: "From around the world",
  },
  {
    icon: BookOpen,
    value: "500+",
    label: "Research Projects",
    description: "Completed successfully",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "In higher education",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
    description: "Global community reach",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Empowering Global Academic Excellence
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our platform delivers measurable results for students and
            researchers across every discipline and region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-blue-100">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
