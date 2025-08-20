import { Button, Container, SectionHeader } from "@/components/ui/core";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["123 Research Avenue, Academic City, RC 45678"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["contact@researchustad.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
  },
];

const ContactSection = () => {
  return (
    <section className="py-14 bg-gray-50">
      <Container>
        {/* Section Header */}
        <SectionHeader title="Get In Touch" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Left Column - Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-[#3A5A78] mb-6">
                Send Us a Message
              </h3>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    placeholder="Enter your name"
                    className="border-gray-200 focus:border-[#3A5A78] focus:ring-[#3A5A78]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-gray-200 focus:border-[#3A5A78] focus:ring-[#3A5A78]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="Enter subject"
                    className="border-gray-200 focus:border-[#3A5A78] focus:ring-[#3A5A78]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your research needs"
                    rows={6}
                    className="border-gray-200 focus:border-[#3A5A78] focus:ring-[#3A5A78]/20 resize-none"
                  />
                </div>

                <Button variant="primary" size="lg" className="w-full">
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-[#3A5A78] mb-4">
                Contact Information
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions about our services or want to discuss your
                research needs? Our team is here to help.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#3A5A78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-[#3A5A78]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#3A5A78] mb-1">
                        {info.title}
                      </h4>
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-sm text-gray-600 leading-relaxed"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
