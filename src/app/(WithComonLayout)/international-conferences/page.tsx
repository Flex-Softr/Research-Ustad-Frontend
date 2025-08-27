import InternationalConferencesClient from "./InternationalConferencesClient";
import Breadcrumb from "@/components/shared/Breadcrumb";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const page = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Breadcrumb Section */}
      <Breadcrumb
        items={[
          {
            label: "International Conferences",
          },
        ]}
      />

      {/* Main Content */}
      <div className="pt-12 pb-12">
        <InternationalConferencesClient />
      </div>
    </div>
  );
};

export default page;
