
import { AppSidebar } from "@/components/module/dashboard/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       
        <div className="min-h-screen p-2 md:p-8 ">
        <header className=" mb-4">
          <div className="flex items-center gap-2 px-4 ">
            <SidebarTrigger className="-ml-1 " />
          </div>
        </header>
        {children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}