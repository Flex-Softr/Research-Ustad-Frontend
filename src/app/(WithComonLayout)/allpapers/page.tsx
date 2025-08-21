import { ResearchPapersPage } from "@/components/module/common/AllPapers";
import { GetAllResearchPaperPublic } from "@/services/allreserchPaper";

const page = async () => {
  try {
    // Fetch approved research papers from API
    const papersData = await GetAllResearchPaperPublic();
    
    // console.log("papersData", papersData);
    
    // Handle different response scenarios
    let papers = [];
    
    if (papersData?.success && papersData?.data) {
      papers = papersData.data;
    } else if (papersData?.data) {
      // If no success flag but data exists
      papers = papersData.data;
    } else {
      console.log("No papers data available from API");
      papers = [];
    }

    return (
      <div>
        <ResearchPapersPage papers={papers} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching papers:", error);
    // Return empty papers array if API fails
    return (
      <div>
        <ResearchPapersPage papers={[]} />
      </div>
    );
  }
};

export default page;
