import { SingleResearchPaper } from "@/components/module/common/AllPapers";
import { use } from "react";

// ✅ Named export and correct inline type
export default function SingleReaserchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
  return <SingleResearchPaper paperId={id} />;
}
