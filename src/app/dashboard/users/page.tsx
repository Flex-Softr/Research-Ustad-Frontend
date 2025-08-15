import { UserForm } from "@/components/module/dashboard/users";
import RouteProtection from "@/components/module/dashboard/RouteProtection";

export default function UsersPage() {
  return (
    <RouteProtection requiredRoles={["superadmin", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <UserForm />
        </div>
      </div>
    </RouteProtection>
  );
}
