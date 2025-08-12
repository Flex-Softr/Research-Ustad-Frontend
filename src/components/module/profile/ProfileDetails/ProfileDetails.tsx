import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import MyResearch from "../MyReseraches/MyResearch"
import { TPapers, TResearchAssociate } from "@/type"
import OngoingProject from "../OngoingProject/OngoingProject"
import { Linkedin } from "lucide-react"
import { BsTwitter } from "react-icons/bs"
import { FaFacebook } from "react-icons/fa"

const ProfileDetails = ({data,currentUser}:{data:TPapers[],currentUser:TResearchAssociate}) => {
  return (
    <section className="container mx-auto w-[90%]   my-[40px]    sm:px-6 lg:px-8">
  <div className="flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200">
  {/* Left Side: Profile Image and Profession */}
  <div className="lg:w-1/4 bg-gradient-to-b from-[#f9f9f9] via-gray-50 to-gray-100 p-8 flex flex-col items-center text-center space-y-6">
    <div className="relative w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-[#bc986b] shadow-md">
      <Image
        src={currentUser?.profileImg || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"}
        alt="Profile"
        width={400}
        height={400}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg";
        }}
      />
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
      {currentUser?.fullName}
    </h2>
    <p className="text-base sm:text-lg text-gray-600">
      {currentUser?.education?.degree}, {currentUser?.education?.institution}
    </p>
    <p className="text-sm sm:text-base text-[#bc986b] font-medium uppercase tracking-wide">
      {currentUser?.designation}
    </p>
  </div>

  {/* Right Side: About Bio */}
  <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col space-y-8">
    <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 border-b pb-2">
      About Me
    </h3>
    <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
      {currentUser?.shortBio}
    </p>

    {/* Research Interests (Only if available) */}
    {currentUser?.research?.length > 0 && (
      <>
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 border-b pb-2">
          Interests
        </h3>
        <ul className="list-disc pl-5 text-gray-700 text-base lg:text-lg space-y-2">
          {currentUser?.research.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </>
    )}

    {/* Contact and Social Links */}
    <div className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
    <a
  href={`https://wa.me/${currentUser?.contactNo}`}
  className="bg-gradient-to-r from-[#bc986b] to-yellow-500 text-white px-8 py-3 text-lg rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
>
  Contact via WhatsApp
</a>

      <div className="flex space-x-4 ">
          {currentUser?.socialLinks?.facebook && (
            <a
              href={currentUser.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
            >
              <FaFacebook size={24} />
            </a>
          )}
          {currentUser?.socialLinks?.twitter && (
            <a
              href={currentUser.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all"
            >
              <BsTwitter size={24} />
            </a>
          )}
          {currentUser?.socialLinks?.linkedin && (
            <a
              href={currentUser.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all"
            >
              <Linkedin size={24} />
            </a>
          )}
        </div>
    </div>
  </div>
</div>

    <div className=" my-3">
        <Tabs defaultValue="Pulications" className="w-full">
      <TabsList className="grid w-full grid-cols-2 rounded-none">
        <TabsTrigger className="rounded-none" value="Ongoing">Ongoing Project</TabsTrigger>
        <TabsTrigger className="rounded-none"   value="Pulications">Pulications</TabsTrigger>
      </TabsList>
      <TabsContent value="Ongoing">
         <OngoingProject data = {data}></OngoingProject>
      </TabsContent>
      <TabsContent value="Pulications">
      <MyResearch data={data}></MyResearch>
      </TabsContent>
    </Tabs>
        </div>
  </section>
  )
}

export default ProfileDetails
