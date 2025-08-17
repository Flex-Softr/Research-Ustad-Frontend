import PendingResearchPapers from "@/components/module/ResearchPapers/PendingResearchPapers";

const PendingResearchPapersPage = async () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Research Papers</h2>
      <p className="text-gray-600 mb-6">
        Review and approve or reject submitted research papers.
      </p>
      <PendingResearchPapers />
    </div>
  );
};

export default PendingResearchPapersPage;
