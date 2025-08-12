import { useRouter } from "next/navigation";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const ResearchMembar = ({ associate }: { associate: any }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/team-members/${associate.id}`)}
      className="relative w-full p-5 transition-all duration-500 border-2 border-transparent bg-white shadow-lg rounded-xl hover:border-[#bc986b] hover:shadow-xl cursor-pointer"
    >
      <div className="flex justify-center">
        <img
          className="object-cover w-24 h-24 rounded-full ring-4 ring-gray-300 transition-transform duration-300 hover:scale-105"
          src={associate.profileImg || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"}
          alt={associate.fullName}
        />
      </div>

      {/* Name */}
      <h2 className="mt-3 text-lg font-semibold text-center truncate transition-all duration-500">
        {associate.fullName}
      </h2>

      <h5 className="text-sm font-semibold text-center truncate transition-all duration-500">
        {associate.designation}
      </h5>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-4">
        <a
          href={associate.socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
          aria-label="Facebook"
          onClick={(e) => e.stopPropagation()} // Stop parent click event
        >
          <FaFacebook className="w-6 h-6" />
        </a>

        <a
          href={associate.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
          aria-label="LinkedIn"
          onClick={(e) => e.stopPropagation()} // Stop parent click event
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a
          href={associate.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
          aria-label="LinkedIn"
          onClick={(e) => e.stopPropagation()} // Stop parent click event
        >
          <FaSquareTwitter className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default ResearchMembar;
