import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const STTLoadingState = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader pageName={"Agent"} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
