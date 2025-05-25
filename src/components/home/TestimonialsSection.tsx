import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    content:
      "ResearchUstad transformed our decision-making process. We went from gut feelings to data-driven insights that increased our revenue by 40% in just 6 months.",
    author: "Jennifer Walsh",
    role: "VP of Operations",
    company: "TechCorp Inc.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "The predictive analytics features are game-changing. We can now forecast market trends weeks ahead of our competition and adjust our strategy accordingly.",
    author: "Marcus Thompson",
    role: "Chief Data Officer",
    company: "Retail Giants",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
  {
    content:
      "Implementation was seamless, and the support team is exceptional. ResearchUstad scales perfectly with our growing business needs.",
    author: "Lisa Rodriguez",
    role: "CEO",
    company: "StartupX",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Students Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied Students who have transformed their
            business with ResearchUstad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg relative overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-12 w-12 text-blue-600" />
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-gray-900 font-semibold">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
