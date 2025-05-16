"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function AboutContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required!");
      return;
    }
    setError("");
    alert("Message sent successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-16 lg:px-24 bg-gray-50">
      {/* About Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">Our Research Team</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
          We are committed to advancing knowledge and innovation through rigorous research. Join us in exploring new frontiers.
        </p>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 text-lg mb-6">Reach out for collaborations, inquiries, or more information.</p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4 text-gray-700">
              <Phone className="w-6 h-6 text-blue-600" />
              <span>+60 17-630 5405</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <Mail className="w-6 h-6 text-blue-600" />
              <span>info@researchustad.org</span>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <MapPin className="w-6 h-6 text-blue-600" />
              <span> Nabinagar,Savar, Dhaka</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-8 flex space-x-4">
            <Link href="https://www.facebook.com/ResearchUstad" className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
              <FaFacebookF className="w-5 h-5" />
            </Link>
            <Link href="www.youtube.com/@ResearchUstad" className="p-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition">
              <FaWhatsapp className="w-5 h-5" />
            </Link>
            <Link href="www.linkedin.com/company/researchustad" className="p-3 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-900 transition">
              <FaLinkedinIn className="w-5 h-5" />
            </Link>
            <Link href="www.facebook.com/groups/research.ustadbd" className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
              <FaFacebookF className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg rounded-xl p-8 bg-white">
          <CardContent className="p-0">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                type="email"
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Your Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Textarea
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Write your message here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
