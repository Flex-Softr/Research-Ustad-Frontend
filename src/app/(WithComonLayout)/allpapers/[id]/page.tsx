import { SingleResearchPaper } from "@/components/module/common/AllPapers";

interface PageProps {
  params: {
    id: string;
  };
}

const page = ({ params }: PageProps) => {
  return <SingleResearchPaper paperId={params.id} />;
};

export default page;
