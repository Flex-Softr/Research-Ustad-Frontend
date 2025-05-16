"use client";

import { FaFacebook, FaGithub, FaReddit } from "react-icons/fa";
import Link from "next/link";

// Define the type for a team member
interface TeamMember {
  id: string;
  name: string;
  image: string;
  description: string;
  role: string;
  redditLink: string;
  facebookLink: string;
  githubLink: string;
}

// Define the type for the research paper
interface ResearchPaper {
  _id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume: string;
  impactFactor: number;
  journalRank: string;
  visitLink: string;
  journalType: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define the props for the Team component
interface TeamProps {
  title_pre: string;
  title_next: string;
  allMembers: TeamMember[];
  researchPaper: ResearchPaper;
}

const OurTeamPage: React.FC<TeamProps> = ({ title_pre, title_next, allMembers, researchPaper }) => {
  return (
    <div className="">
      <div className="">
        {title_next && (
          <div className="flex justify-between items-center">
            <h2 className="text-3xl flex justify-start gap-2 items-center font-bold mb-8 text-left">
              <span>
                {title_pre} <span className="text-yellow-500">{title_next}</span>
              </span>
            </h2>
          </div>
        )}

        {/* Research Paper Section */}
        {/* <div className="mb-8 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-2xl font-semibold">{researchPaper.title}</h3>
          <p className="text-gray-600">Authors: {researchPaper.authors.join(", ")}</p>
          <p className="text-gray-600">Journal: {researchPaper.journal}</p>
          <p className="text-gray-600">Volume: {researchPaper.volume}</p>
          <p className="text-gray-600">Impact Factor: {researchPaper.impactFactor}</p>
          <p className="text-gray-600">Rank: {researchPaper.journalRank}</p>
          <p className="text-gray-600">Type: {researchPaper.journalType}</p>
          <Link href={researchPaper.visitLink} className="text-blue-500 hover:underline" target="_blank">
            Read Paper
          </Link>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allMembers.map((leader) => (
            <Link href={`/team-members/${leader.id}`} key={leader.id}>
              <div className="px-12 py-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                <div className="flex flex-col sm:-mx-4 sm:flex-row">
                  <img
                    className="flex-shrink-0 object-cover w-24 h-24 rounded-full sm:mx-4 ring-4 ring-gray-300"
                    src={leader.image}
                    alt={leader.name}
                  />
                  <div className="mt-4 sm:mx-4 sm:mt-0">
                    <h1 className="text-xl font-semibold text-gray-700 capitalize md:text-2xl dark:text-white group-hover:text-white">
                      {leader.name}
                    </h1>
                    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                      {leader.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                  {leader.description}
                </p>
                <div className="flex mt-4 -mx-2">
                  <a
                    href={leader.redditLink}
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Reddit"
                  >
                    <FaReddit className="w-6 h-6" />
                  </a>
                  <a
                    href={leader.facebookLink}
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href={leader.githubLink}
                    className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"
                    aria-label="Github"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeamPage;
