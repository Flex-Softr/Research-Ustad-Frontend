import ManageInternationalConferences from "@/components/module/internationalConferences/ManageInternationalConferences";
import { GetAllInternationalConferences } from "@/services/internationalConferences";

export const dynamic = 'force-dynamic';

const InternationalConferencesPage = async () => {
  let initialData = [];
  
  try {
    const response = await GetAllInternationalConferences();
    if (response?.data) {
      initialData = response.data;
    }
  } catch (error) {
    console.error("Error fetching international conferences:", error);
    initialData = [];
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Manage International Conferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create, edit, and manage international conference data
        </p>
      </div>
      <ManageInternationalConferences data={initialData} />
    </div>
  );
};

export default InternationalConferencesPage;
