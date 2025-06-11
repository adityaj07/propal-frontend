"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { Activity, LogOut, Mail, Phone, User, Users } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { user, logoutWithConfirmation } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    await logoutWithConfirmation();
  };

  if (!user) {
    return null; // ProtectedRoute will handle redirection
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <Button
              onClick={() => setShowLogoutDialog(true)}
              variant="outline"
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Welcome Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Welcome Back
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.username || "Anonymous User"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Good to see you again
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium truncate">
                  {user.email || "No email provided"}
                </div>
                <p className="text-xs text-muted-foreground">Primary contact</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Phone</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium">
                  {user.phone || "Not provided"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {user.phone ? "Contact number" : "Add your phone number"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Account Status
                </CardTitle>
                <Badge variant="secondary" className="h-4 px-2 text-xs">
                  Active
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium text-green-600">
                  Verified
                </div>
                <p className="text-xs text-muted-foreground">
                  Account is active
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  Edit Profile
                </Button>
                <Button className="w-full" variant="outline">
                  Account Settings
                </Button>
                <Button className="w-full" variant="outline">
                  Help & Support
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Show empty state if no activity */}
                <EmptyState
                  icon={Activity}
                  title="No recent activity"
                  description="Your recent activities will appear here as you use the application."
                  className="border-0 shadow-none"
                />
              </CardContent>
            </Card>
          </div>

          {/* Large Content Area */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Main Content Area</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              <EmptyState
                icon={Users}
                title="Welcome to Propal"
                description="This is your main dashboard content area. Add your application features here to get started."
                action={{
                  label: "Get Started",
                  onClick: () => console.log("Getting started..."),
                }}
                className="border-0 shadow-none h-full"
              />
            </CardContent>
          </Card>
        </div>

        {/* Logout Confirmation Dialog */}
        <ConfirmationDialog
          open={showLogoutDialog}
          onOpenChange={setShowLogoutDialog}
          title="Confirm Logout"
          description="Are you sure you want to logout? You'll need to login again to access your account."
          confirmText="Logout"
          cancelText="Stay logged in"
          variant="destructive"
          onConfirm={handleLogout}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
