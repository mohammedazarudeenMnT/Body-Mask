"use client";

import { useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Sidebar, SidebarLink, SidebarUser } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Settings,
  Users,
  Package,
  LayoutDashboard,
  Briefcase,
  Gift,
  Images,
  Star,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user)) {
      router.push("/login");
    }
  }, [isAuthenticated, user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Base links for all authenticated users
  const baseSidebarLinks: SidebarLink[] = [
    {
      label: "Services",
      href: "/dashboard/services",
      icon: <Briefcase className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/services"),
    },

    {
      label: "Offers",
      href: "/dashboard/offers",
      icon: <Gift className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/offers"),
    },

    {
      label: "Testimonials",
      href: "/dashboard/testimonials",
      icon: <Star className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/testimonials"),
    },
    {
      label: "Leads",
      href: "/dashboard/leads",
      icon: <Users className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/leads"),
    },
  ];

  // Admin-only links
  const adminLinks: SidebarLink[] = [
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/settings"),
    },
  ];

  const sidebarLinks =
    user.role === "admin"
      ? [...baseSidebarLinks, ...adminLinks]
      : baseSidebarLinks;

  const sidebarUser: SidebarUser = {
    name: user.name || "User",
    email: user.email || "user@example.com",
    role: user.role,
    avatar: user.image,
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        links={sidebarLinks}
        user={sidebarUser}
        onLinkClick={(href) => router.push(href)}
      />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
