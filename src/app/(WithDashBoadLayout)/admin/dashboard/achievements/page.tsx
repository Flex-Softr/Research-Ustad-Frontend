import ManageAchievements from "@/components/module/achievements/ManageAchievements";
import { GetAllAchievements } from "@/services/achievements";

// Force dynamic rendering since this page uses cookies
export const dynamic = 'force-dynamic';

const AchievementsPage = async () => {
  // Fetch data server-side for better UX
  let initialData = [];
  try {
    const response = await GetAllAchievements();
    if (response?.data) {
      initialData = response.data;
    }
  } catch (error) {
    console.error("Error fetching achievements:", error);
    // Continue with empty data - client will handle fetching
    initialData = [];
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Manage Achievements</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Create, edit, and manage platform achievements
        </p>
      </div>
      <ManageAchievements data={initialData} />
    </div>
  );
};

export default AchievementsPage;
