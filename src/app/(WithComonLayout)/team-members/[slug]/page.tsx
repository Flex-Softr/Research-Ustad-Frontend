import ProfileDetails from "@/components/module/profile/ProfileDetails/ProfileDetails"
import { GetResearchPaperById } from "@/services/allreserchPaper";
import { GetSingleMember } from "@/services/reserarchers";


const page =async ({ params}: {params:any}) => {
  const { slug } =await params;
 const {data} = await GetResearchPaperById(slug);
 const user=await GetSingleMember(slug)
const currentUser = user.data;
console.log(currentUser)

  return (
    <div>
      <ProfileDetails data = {data} currentUser={currentUser} ></ProfileDetails>
    </div>
  )
}

export default page
