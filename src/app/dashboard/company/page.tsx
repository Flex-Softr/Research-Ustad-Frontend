import { CompanyForm } from "@/components/module/dashboard/company";
import RouteProtection from "@/components/module/dashboard/RouteProtection";

export default function CompanyPage() {
  return (
    <RouteProtection requiredRoles={["superadmin", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <CompanyForm />
        </div>
      </div>
    </RouteProtection>
  );
}
