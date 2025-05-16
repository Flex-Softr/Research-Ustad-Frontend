"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_wn5s998",
        "template_kea4eb9",
        formRef.current,
        "0HOscwHAu4457xcFH"
      );
      toast.success("Message sent successfully!", { position: "bottom-right" });
      formRef.current.reset(); 
    } catch (error) {
      toast.error("Failed to send message. Please try again.", { position: "bottom-left" });
      console.error("EmailJS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-50 pt-10 mt-8">
      <div className="container mx-auto w-[90%]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-10">
          {/* Contact Info */}
          <div className="space-y-4 text-left">
            <h2 className="text-4xl uppercase font-bold mb-5">Get in touch</h2>
            <ul className="flex gap-3">
              <li>
                <Link href="https://www.facebook.com/ResearchUstad" target="_blank">
                  <FaFacebookF size={40} className="bg-yellow-400 rounded-md p-2" />
                </Link>
              </li>
              <li>
                <Link href="https://www.youtube.com/@ResearchUstad" target="_blank">
                  <FaYoutube size={40} className="bg-yellow-400 rounded-md p-2" />
                </Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/researchustad" target="_blank">
                  <FaLinkedin size={40} className="bg-yellow-400 rounded-md p-2" />
                </Link>
              </li>
              <li>
                <Link href="https://x.com/ResearchUstad" target="_blank">
                  <FaTwitter size={40} className="bg-yellow-400 rounded-md p-2" />
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#bc986b] text-xl" />
              <a href="tel:+8801910649179" className="text-gray-700 hover:text-blue-500 font-medium">
                +88 01910-649179
              </a>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#bc986b] text-2xl" />
              <a href="mailto:info@researchustad.org " className="text-gray-700 font-medium hover:text-blue-500">
              info@researchustad.org 
              </a>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#bc986b] text-xl" />
              <span className="text-gray-700 font-medium">Savar, Nabinagar, Dhaka</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <Input name="to_name" type="text" placeholder="Name" className="w-full" required />
              <Input name="from_name" type="email" placeholder="Email Address" className="w-full" required />
              <Textarea name="message" placeholder="Write a Message" className="w-full" required />
              <Button type="submit" className="w-full cursor-pointer bg-[#bc986b] hover:bg-teal-600" disabled={isLoading}>
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      <hr className="w-full mt-4" />
      <div className="py-4">
        <p className="text-center text-gray-600">© 2025 Research Ustad. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
