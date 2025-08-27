import OngoingProjectsClient from "./OngoingProjectsClient";

// Force dynamic rendering to ensure API calls happen at runtime
export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  return <OngoingProjectsClient />;
};

export default page;
