import {
  Facebook,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Youtube,
  FacebookIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-brand-primary via-black-400/30 to-brand-primary overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Moving Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-green-400/15 to-brand-primary/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-brand-secondary/10 to-green-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s" }}
        ></div>

        {/* Moving Lines */}
        <div className="absolute top-1/4 left-0 w-2 h-40 bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent animate-pulse"></div>
        <div
          className="absolute bottom-1/3 right-0 w-2 h-32 bg-gradient-to-b from-transparent via-brand-secondary/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating Particles */}
        <div
          className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-ping"
          style={{ animationDuration: "3s", animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="group">
              <h2 className="font-bold text-[28px] flex items-center text-[#C99589] mb-6">
                Research{" "}
                <span className="text-white group-hover:text-brand-secondary transition-colors duration-300">
                  Ustad
                </span>
              </h2>
            </Link>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Empowering researchers and students with cutting-edge tools and
              collaborative platforms to accelerate innovation and knowledge
              discovery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-secondary" />
              Quick Links
            </h3>
            <ul className="space-y-4">
            <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Features
                </a>
              </li>
          
              <li>
                <a
                  href="#team"
                  className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-secondary" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-secondary mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                Nabinagar, Savar, Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  WhatsApp: +880 1724-653054
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Email: info@researchustad.org
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FacebookIcon className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <a target="_blank" href="https://www.facebook.com/groups/research.ustadbd/" className="text-gray-300 text-sm">
                  FaceBook Group
                </a>
              </div>

              {/* Social Media Section */}
              <div className="mt-6">
                <p className="text-white font-semibold mb-3">
                  Stay Connected with Us:
                </p>
                <div className="flex space-x-3">
                  <a
                    href="https://www.facebook.com/ResearchUstad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center transition-all duration-300 group"
                    title="Facebook Page"
                  >
                    <Facebook className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href="https://x.com/ResearchUstad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black hover:bg-gray-800 rounded flex items-center justify-center transition-all duration-300 group"
                    title="Twitter/X"
                  >
                    <Twitter className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/researchustad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded flex items-center justify-center transition-all duration-300 group"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href="https://www.youtube.com/@ResearchUstad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded flex items-center justify-center transition-all duration-300 group"
                    title="YouTube"
                  >
                    <Youtube className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 ResearchUstad. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* <a
                href="#"
                className="text-gray-300 hover:text-brand-secondary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-brand-secondary text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-brand-secondary text-sm transition-colors duration-300"
              >
                Cookie Policy
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
