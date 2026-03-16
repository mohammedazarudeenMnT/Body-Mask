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
  Youtube,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
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
      label: "Client Memoirs",
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
    {
      label: "Videos",
      href: "/dashboard/videos",
      icon: <Youtube className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/videos"),
    },
    {
      label: "Gallery",
      href: "/dashboard/gallery",
      icon: <Images className="w-5 h-5" />,
      isActive: pathname.startsWith("/dashboard/gallery"),
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
        footer={
          <div className="space-y-2">
            <button
              onClick={() => router.push("/")}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              <Home className="w-5 h-5 text-[#c5a367]" />
              <span className="font-medium">Visit Site</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        }
      />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
