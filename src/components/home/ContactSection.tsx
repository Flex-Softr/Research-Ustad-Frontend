import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+8801779717686", "-988678363866"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["Support@uprangly.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["New York, USA"],
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-100 via-blac to-blue-50/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg">
            <MessageCircle className="w-4 h-4" />
            Contact Us
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary">
              Get In
            </span>

            <span className="text-gray-800">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We'll create high-quality linkable content and build at least 40
            high-authority links to each asset, paving the way for you to grow
            your rankings, improve brand.
          </p>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent"></div>
            <div className="w-2 h-2 bg-brand-secondary rounded-full animate-ping"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-secondary to-transparent"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Contact Information */}
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-8 lg:p-12 relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/30 rounded-full transform translate-x-16 translate-y-16"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Contact Information
                  </h3>
                  <p className="text-teal-100 mb-8 leading-relaxed">
                    We'll create high-quality linkable content and build at
                    least 42 high-authority.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {info.title}
                          </h4>
                          {info.details.map((detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="text-teal-100 leading-relaxed"
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

              {/* Right Column - Contact Form */}
              <div className="p-8 lg:p-12">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name
                    </label>
                    <Input
                      placeholder="John Trangely"
                      className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      placeholder="hello@nurency.com"
                      className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Subject
                    </label>
                    <Input
                      placeholder="I want to hire you quickly"
                      className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Write here your message"
                      rows={6}
                      className="border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all duration-300 resize-none"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary hover:to-cyan-700 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/30">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
