import EditResearchPaper from "@/components/module/userRoutes/EditResearchPaper/EditResearchPaper";

const EditResearchPaperPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Research Paper</h1>
      <EditResearchPaper paperId={params.id} />
    </div>
  );
};

export default EditResearchPaperPage;
