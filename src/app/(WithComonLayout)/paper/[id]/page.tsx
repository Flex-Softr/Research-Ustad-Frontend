import { SingleResearchPaper } from "@/components/module/common/AllPapers";
import { GetSingleResearchPaperPublic } from "@/services/allreserchPaper";
import { notFound } from "next/navigation";

// ✅ Named export and correct inline type
export default async function SingleReaserchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    try {
        // Fetch the specific research paper from API (public access)
        const paperData = await GetSingleResearchPaperPublic(id);
        const paper = paperData?.data;

        if (!paper) {
            notFound();
        }

        return <SingleResearchPaper paper={paper} />;
    } catch (error) {
        console.error("Error fetching paper:", error);
        notFound();
    }
}
