import MemberUpdate from "@/components/module/admin/MembersUpdateByAdmin/MemberUpdate";
import { GetSingleMember } from "@/services/reserarchers";

const page =async ({params}:{params:any}) => {
 const {slug} =await params;
 
 
  return (

    <div><MemberUpdate  id={slug}></MemberUpdate></div>
  )
}

export default page