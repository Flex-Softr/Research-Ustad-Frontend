import Members from "@/components/module/users/Members/Members"
import { GetAllResearchAssociate } from "@/services/reserarchers"


const page = async () => {
  try {
    const response = await GetAllResearchAssociate()
    const data = response?.data || []

    console.log("all members", data)
    
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Members</h2>
        <Members data={data} />
      </div>
    )
  } catch (error) {
    console.error("Error in members page:", error)
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">All Members</h2>
        <div className="text-red-500">Error loading members data</div>
      </div>
    )
  }
}

export default page