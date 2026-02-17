"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CompanyLogo } from "@/components/ui/company-logo";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hasDropdown?: boolean;
  subLinks?: SidebarLink[];
}

export interface SidebarUser {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
}

export interface SidebarProps {
  links: SidebarLink[];
  user?: SidebarUser;
  className?: string;
  onLinkClick?: (href: string) => void;
}

export function Sidebar({ links, user, className, onLinkClick }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isPinned, setIsPinned] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
      setIsPinned(false);
    } else {
      setIsExpanded(true);
      setIsPinned(true);
    }
  }, [isMobile]);

  useGSAP(() => {
    if (!sidebarRef.current) return;

    const targetWidth = isMobile
      ? isMobileOpen
        ? 280
        : 0
      : isExpanded
        ? 280
        : 80;
    const targetX = isMobile && !isMobileOpen ? -280 : 0;

    gsap.to(sidebarRef.current, {
      width: targetWidth,
      x: targetX,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isExpanded, isMobileOpen, isMobile]);

  const isCollapsed = !isMobile && !isPinned && !isExpanded;

  const handleLinkClick = (href: string) => {
    if (onLinkClick) onLinkClick(href);
    if (isMobile) setIsMobileOpen(false);
  };

  const togglePin = () => {
    setIsPinned(!isPinned);
    if (!isPinned) setIsExpanded(true);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "fixed md:relative z-50 h-screen flex flex-col bg-white border-r border-gray-200 shadow-sm overflow-hidden",
          className,
        )}
        onMouseEnter={() => !isPinned && !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isPinned && !isMobile && setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="h-24 flex items-center px-6 border-b border-gray-200 relative bg-linear-to-r from-[#c5a367]/5 to-transparent shrink-0">
          <div className="w-full flex items-center overflow-hidden">
            {isExpanded || (isMobile && isMobileOpen) ? (
              <CompanyLogo />
            ) : (
              <div className="w-full flex justify-center">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#c5a367] to-[#b69357] flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0">
                  B
                </div>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          {isMobile && isMobileOpen && (
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Pin/Unpin Button (Desktop Only) */}
        {!isMobile && (
          <button
            onClick={togglePin}
            className={cn(
              "absolute -right-3 top-20 z-50 w-6 h-6 bg-white border-2 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all",
              isPinned
                ? "border-[#c5a367] text-[#c5a367]"
                : "border-gray-300 text-gray-400 hover:border-[#c5a367] hover:text-[#c5a367]",
            )}
          >
            <ChevronLeft
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                !isPinned && "rotate-180",
              )}
            />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {links.map((link) => {
            const isMenuExpanded = expandedMenus.includes(link.label);

            return (
              <div key={link.href}>
                <button
                  onClick={() => {
                    if (link.hasDropdown) {
                      setExpandedMenus((prev) =>
                        prev.includes(link.label)
                          ? prev.filter((i) => i !== link.label)
                          : [...prev, link.label],
                      );
                    } else {
                      handleLinkClick(link.href);
                    }
                  }}
                  className={cn(
                    "group w-full flex items-center gap-3 rounded-lg transition-all whitespace-nowrap",
                    isCollapsed ? "justify-center p-3" : "px-4 py-3",
                    link.isActive && !link.hasDropdown
                      ? "bg-[#c5a367]/10 text-[#c5a367] font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <span className={cn("shrink-0 w-5 h-5")}>{link.icon}</span>
                  {!isCollapsed && (
                    <span className="flex-1 text-left text-sm truncate">
                      {link.label}
                    </span>
                  )}
                  {!isCollapsed && link.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isMenuExpanded && "rotate-180",
                      )}
                    />
                  )}
                </button>

                {/* Dropdown Submenu */}
                {link.hasDropdown && isMenuExpanded && !isCollapsed && (
                  <div className="ml-9 mt-1 space-y-1">
                    {link.subLinks?.map((sub) => (
                      <button
                        key={sub.href}
                        onClick={handleLinkClick.bind(null, sub.href)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm rounded-md transition-colors relative whitespace-nowrap",
                          sub.isActive
                            ? "text-[#c5a367] font-medium bg-[#c5a367]/5"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                        )}
                      >
                        {sub.isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-[#c5a367] rounded-r" />
                        )}
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 bg-linear-to-r from-gray-50 to-transparent shrink-0">
          <div
            className={cn(
              "flex items-center gap-3 transition-all overflow-hidden",
              isCollapsed && "justify-center",
            )}
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#c5a367] to-[#b69357] flex items-center justify-center text-white font-bold shadow-sm ring-2 ring-white shrink-0">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <span className="text-sm">{user?.name?.charAt(0) || "U"}</span>
              )}
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                {user?.role && (
                  <p className="text-xs text-[#c5a367] font-medium mt-0.5">
                    {user.role}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
