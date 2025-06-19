"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { ProfileEditForm } from "./_components/ProfileEditForm";
import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileOverviewCard } from "./_components/ProfileOverviewCard";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null; // ProtectedRoute will handle redirection
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader pageName="Profile" />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProfileHeader
            title="Profile Settings"
            description="Manage your account information and security settings"
          />

          <div className="grid gap-6 md:grid-cols-3">
            <ProfileOverviewCard user={user} />
            <ProfileEditForm />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
