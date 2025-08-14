import { ResearchPapersPage } from "@/components/module/common/AllPapers";
import { GetAllResearchPaperPublic } from "@/services/allreserchPaper";

const page = async () => {
  // Fetch approved research papers from API
  const papersData = await GetAllResearchPaperPublic();
  const papers = papersData?.data || [];

  return (
    <div>
      <ResearchPapersPage papers={papers} />
    </div>
  );
};

export default page;
