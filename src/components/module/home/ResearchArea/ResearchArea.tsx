
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionTitle from "../../SectionTitle";
import { researchAreas } from "@/components/shared/data/researchArea";



const   ResearchArea = () => {
  return (
 <div className=" container sm:w-[90%] mx-auto">
     <div className=" md:mx-0 mx-2">
      <SectionTitle title="Our Research Areas"  discription={"Meet our outstanding team of research associates who are dedicated to excellence."}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">
        {researchAreas?.map((area,i) => {
          const Icon = area.icon; // Dynamically render the icon
          return (
            <Card
              key={i}
              className=" bg-white  hover:bg-[#bc986b] hover:text-white transition-colors duration-500 ease-in"
            >
              <CardHeader>
                <CardTitle className="hidden"></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Icon size={40} />
                  <h3 className="text-xl font-semibold ">{area.title}</h3>
                  <p>{area.description}</p>
                </div>
      
              </CardContent>
              <CardFooter>
            
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
 </div>
  );
};

export default ResearchArea;
