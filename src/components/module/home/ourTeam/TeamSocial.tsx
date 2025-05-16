import { FaFacebook, FaLinkedin } from "react-icons/fa"

const TeamSocial = ({member}:any) => {
  return (
    <div className="flex mt-4 -mx-2">
    {member?.socialLinks?.facebook && (
      <a
        href={member?.socialLinks?.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
        aria-label="Facebook"
      >
        <FaFacebook className="w-6 h-6" />
      </a>
    )}
    {member?.socialLinks?.linkedin && (
      <a
        href={member?.socialLinks?.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
        aria-label="LinkedIn"
      >
        <FaLinkedin className="w-6 h-6" />
      </a>
    )}
  </div>
  )
}

export default TeamSocial
