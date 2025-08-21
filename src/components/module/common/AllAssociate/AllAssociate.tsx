import { Card } from "@/components/ui/card";
import { TResearchAssociate } from "@/type";
import { GraduationCap, Microscope } from "lucide-react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";



const associates = [
  {
    name: "Dr. Junayet Shiblu",
    img: "https://res.cloudinary.com/dzxzxdsnq/image/upload/v1741017173/jsjunayet12030%40gmail.comDr.%20Junayet%20Shiblu.png",
    designation: "Research Associate",
    socialLinks: {
      google_scholar: "g",
      researchgate: "h",
      linkedin: "gfds",
    },
  },
];

export default function AllAssociates(data:TResearchAssociate[]) {

  return (
    <section className="container mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-10">Team Member</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {associates.map((associate, index) => (
          <Card key={index} className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <Image
              src={associate.img}
              alt={associate.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{associate.name}</h3>
              <p className="text-gray-500 text-sm mb-1">{associate.designation}</p>
              <p className="text-gray-500 text-sm mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <div className="flex gap-3 text-gray-300">
                {associate.socialLinks.researchgate && (
                  <a href={associate.socialLinks.researchgate} target="_blank" rel="noopener noreferrer">
                    <Microscope className="cursor-pointer hover:text-blue-600" />
                  </a>
                )}
                {associate.socialLinks.google_scholar && (
                  <a href={associate.socialLinks.google_scholar} target="_blank" rel="noopener noreferrer">
                    <GraduationCap className="cursor-pointer hover:text-blue-400" />
                  </a>
                )}
                {associate.socialLinks.linkedin && (
                  <a href={associate.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="cursor-pointer hover:text-blue-700" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}