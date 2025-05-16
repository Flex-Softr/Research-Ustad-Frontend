import AllPapers from "@/components/module/common/AllPapers/AllPapers"
import { GetAllResearchPaperPublic } from "@/services/allreserchPaper"


const page = async() => {
const data = await GetAllResearchPaperPublic()
const papers = data?.data
  return (
    <div>
     <AllPapers papers={papers}></AllPapers>
    </div>
  )
}

export default page
