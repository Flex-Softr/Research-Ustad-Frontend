import MemberUpdate from "@/components/module/admin/MembersUpdateByAdmin/MemberUpdate";
import { GetSingleMember } from "@/services/reserarchers";

const page =async ({params}:{params:any}) => {
 const {id} =await params;
 
 
  return (

    <div><MemberUpdate  id={id}></MemberUpdate></div>
  )
}

export default page