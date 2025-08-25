"use client";
import { useState } from "react";
import { Button, Container, SectionHeader } from "@/components/ui/core";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["Nabinagar, Savar, Dhaka, Bangladesh"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@researchustad.org"],
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    details: ["+880 1910-649179"],
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      // You'll need to replace these with your actual EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'ResearchUstad Team'
      };

      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 bg-gray-50">
      <Container>
        {/* Section Header */}
        <SectionHeader title="Get In Touch" />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Left Column - Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-6">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Enter subject"
                    className="border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your research needs"
                    rows={6}
                    className="border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20 resize-none"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-brand-primary mb-4">
                Contact Information
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions about our services or want to discuss your
                research needs? Our team is here to help.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-primary mb-1">
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
