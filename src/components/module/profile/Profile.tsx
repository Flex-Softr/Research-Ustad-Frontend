import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUniversity, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
const Profile = () => {
  const profileData = {
    fullName: "Anis Islam",
    email: "anissir@gmail.com",
    designation: "Research Associate",
    institution: "ABC University",
    department: "Computer Science",
    research: ["AI in Healthcare", "Blockchain Security"],
    socialLinks: {
      facebook: "https://facebook.com/junayet",
      twitter: "https://twitter.com/junayet",
      linkedin: "https://linkedin.com/in/junayet",
    },
  };
  return (
    <div className=" flex justify-center items-center bg-gray-100 p-6">
    <Card className="w-full max-w-4xl shadow-xl rounded-lg bg-white">
      <CardHeader className="flex flex-col items-center p-8 bg-blue-500 text-white rounded-t-lg">
        <Avatar className="w-24 h-24 border-4 border-white shadow-md">
          <AvatarImage src="/placeholder-instructor.jpg" alt="Profile" />
          <AvatarFallback className="text-2xl font-bold">AI</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl mt-4">{profileData.fullName}</CardTitle>
        <p className="text-gray-200 text-lg">{profileData.designation}</p>
      </CardHeader>
      <CardContent className="p-8">
        {/* User Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
            <p className="text-gray-700 mt-2">{profileData.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Institution</h3>
            <p className="flex items-center text-gray-700 mt-2">
              <FaUniversity className="mr-2 text-blue-500" />
              {profileData.institution}, {profileData.department}
            </p>
          </div>
        </div>

        {/* Research Areas */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Research Areas</h3>
          <ul className="list-disc list-inside text-gray-600 text-md mt-2 space-y-1">
            {profileData.research.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href={profileData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-600 text-3xl hover:scale-110 transition-transform" />
          </a>
          <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-3xl hover:scale-110 transition-transform" />
          </a>
          <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-3xl hover:scale-110 transition-transform" />
          </a>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}

export default Profile
