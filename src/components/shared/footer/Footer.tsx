import {
  Facebook,
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
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  // Define quick links array
  const quickLinks = [
    { href: "#about", label: "About Us" },
    { href: "#services", label: "Our Wings" },
    { href: "/team-members", label: "Our Team" },
    { href: "/achievements", label: "Achievements" },
    { href: "/international-conferences", label: "International Conferences" },
    { href: "/course", label: "Courses" },
    { href: "/event", label: "Events" },
    { href: "/blog", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-brand-primary via-black-400/30 to-brand-primary overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand Section */}
          <div className="flex-1">
            <Link href="/" className="group flex items-center gap-3">
              <div className="">
              <Image
                src="/logo3.png"
                alt="Research Ustad"
                width={60}
                height={60}
                className="object-contain w-full h-full"
              />
              </div>
              <h2 className="font-bold text-[28px] flex items-center text-brand-secondary">
                Research
                <span className="text-white group-hover:text-brand-secondary transition-colors duration-300 ml-1">
                  Ustad
                </span>
              </h2>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              We connect the dots between passion and profession. Stay connected
              with the cutting-edge tools and unlock opportunities globally.
              Dare to dream big!
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-secondary" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-brand-secondary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-secondary" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-secondary mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  100 Bermuda Run Rd, Statesboro, GA 30458, USA
                </p>
              </div>
              <div className="flex items-center gap-3">
                <BsWhatsapp className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <p className="text-gray-300 text-sm ">
                  WhatsApp:{" "}
                  <a
                    className="hover:underline "
                    href="https://wa.me/8801724653054"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +880 1724-653054
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <p className="text-gray-300 text-sm">Phone: (912) 794-1871</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-secondary flex-shrink-0" />

                <p className="text-gray-300 text-sm ">
                  Email:
                  <a
                    href="mailto:info@researchustad.org"
                    className="underline ml-1"
                  >
                    info@researchustad.org
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FacebookIcon className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <a
                  target="_blank"
                  href="https://www.facebook.com/groups/research.ustadbd/"
                  className="text-gray-300 text-sm hover:underline"
                >
                  FaceBook Group
                </a>
              </div>

              {/* Social Media Section */}
              <div className="mt-6">
                <p className="text-white font-semibold mb-4 text-sm">
                  Follow Us On Social Media:
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/ResearchUstad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110 overflow-hidden"
                    title="Facebook Page"
                  >
                    <Image
                      src="/icons/2021_Facebook_icon.svg"
                      alt="Facebook"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </a>

                  <a
                    href="https://x.com/ResearchUstad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110 overflow-hidden"
                    title="Twitter/X"
                  >
                    <Image
                      src="/icons/twitter_2.svg.png"
                      alt="Twitter/X"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </a>

                  <a
                    href="https://www.linkedin.com/company/researchustad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110 overflow-hidden"
                    title="LinkedIn"
                  >
                    <Image
                      src="/icons/LinkedIn_icon.svg"
                      alt="LinkedIn"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </a>
                  <a
                    href="https://wa.me/8801724653054"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110 overflow-hidden"
                    title="whatsApp"
                  >
                    <Image
                      src="/icons/whatsApp.svg"
                      alt="whatsApp"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </a>

                  <a
                    href="https://www.youtube.com/@ResearchUstad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group hover:scale-110 overflow-hidden"
                    title="YouTube"
                  >
                    <Image
                      src="/icons/youtube.png"
                      alt="YouTube"
                      width={40}
                      height={40}
                      className="object-cover rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-gray-300 text-center md:flex items-center text-sm gap-1">
              <p>© 2025 - ResearchUstad - All Rights Reserved.</p>
              <p>
                Developed by
                <span className="font-bold hover:underline text-brand-secondary ml-1">
                  <a
                    href="https://www.flexsoftr.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Flex Softr
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
