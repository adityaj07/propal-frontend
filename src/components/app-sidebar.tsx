"use client";

import { Bot, GalleryVerticalEnd, Home, User } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";

const getUserInitials = (username?: string, email?: string): string => {
  if (username && username.length >= 2) {
    return username.substring(0, 2).toUpperCase();
  }
  if (email && email.length >= 2) {
    return email.substring(0, 2).toUpperCase();
  }
  return "GU"; // Guest User
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Propal Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
      items: [
        {
          title: "Account Settings",
          url: "/dashboard/profile/settings",
        },
        {
          title: "Security",
          url: "/dashboard/profile/security",
        },
        {
          title: "Preferences",
          url: "/dashboard/profile/preferences",
        },
      ],
    },
    {
      title: "Agent",
      url: "/dashboard/agent",
      icon: Bot,
      items: [
        {
          title: "Chat Interface",
          url: "/dashboard/agent/chat",
        },
        {
          title: "Training Data",
          url: "/dashboard/agent/training",
        },
        {
          title: "Analytics",
          url: "/dashboard/agent/analytics",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const pathname = usePathname(); // Add this import: import { usePathname } from "next/navigation";

  // Helper function to determine if a nav item is active
  const isNavItemActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(url);
  };

  // Update navigation items with dynamic active states
  const navMainWithActiveStates = data.navMain.map((item) => ({
    ...item,
    isActive: isNavItemActive(item.url),
  }));

  // Update user data with actual auth user and proper initials
  const updatedData = {
    ...data,
    navMain: navMainWithActiveStates,
    user: {
      name: user?.username || "Guest",
      email: user?.email || "guest@example.com",
      avatar: "/avatars/shadcn.jpg",
      initials: getUserInitials(user?.username, user?.email),
    },
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={updatedData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={updatedData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={updatedData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
