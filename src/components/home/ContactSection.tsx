import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Business Avenue", "Suite 100", "San Francisco, CA 94102"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hello@ResearchUstad.com", "support@ResearchUstad.com"],
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business with data? Contact us today for a
            free consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <Input placeholder="Enter your company name" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us about your project and requirements..."
                      rows={6}
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-3">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
