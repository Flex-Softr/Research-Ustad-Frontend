import UpdateInfo from "@/components/module/userRoutes/UpdateInfo/UpdateInfo"
import { getCurrentUser } from "@/services/AuthService"


const page =async () => {

  return (
    <div>
     <UpdateInfo ></UpdateInfo>
    </div>
  )
}

export default page
