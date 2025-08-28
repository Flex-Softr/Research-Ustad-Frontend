
import AllreserchPaperAdmin from "@/components/module/ResearchPapers/AllReaserchPaperAdmin";
const ResearchPapersPage = async () => {

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Approved Research Papers</h2>
      <p className="text-gray-600 mb-6">Manage all approved research papers in the system</p>
      <AllreserchPaperAdmin/>
    </div>
  );
};

export default ResearchPapersPage;