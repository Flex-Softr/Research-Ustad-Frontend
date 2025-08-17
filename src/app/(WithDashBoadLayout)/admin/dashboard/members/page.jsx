import Members from "@/components/module/users/Members/Members";
import { GetAllResearchAssociate } from "@/services/reserarchers";

const page = async () => {
  try {
    const response = await GetAllResearchAssociate();
    const allData = response?.data || [];

    // Filter out admin and superAdmin users
    const data = allData.filter(
      (member) => member.role !== "admin" && member.role !== "superAdmin"
    );

    console.log("Research members (filtered)", data);

    return (
      <div className="p-4">
        <Members data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error in members page:", error);
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Research Members</h2>
        <div className="text-red-500">Error loading research members data</div>
      </div>
    );
  }
};

export default page;
