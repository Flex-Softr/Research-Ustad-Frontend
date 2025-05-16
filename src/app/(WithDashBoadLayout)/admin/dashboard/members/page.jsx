import Members from "@/components/module/users/Members/Members"
import { GetAllResearchAssociate } from "@/services/reserarchers"


const page =async () => {

const {data} = await GetAllResearchAssociate()
  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold  mb-4">All Membars</h2>
    <Members data = {data}></Members>
    </div>
  )
}

export default page