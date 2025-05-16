import { ClipLoader } from "react-spinners";

export default function Loading() {

  return  <div className=" w-full min-h-screen flex items-center justify-center">
  <ClipLoader size={50} color="#36d7b7" />
  </div>
}