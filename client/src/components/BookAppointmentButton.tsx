"use client";

import { useRouter } from "next/navigation";

interface BookAppointmentButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BookAppointmentButton({ 
  className, 
  children 
}: BookAppointmentButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if we're already on the contact page
    const isOnContactPage = window.location.pathname === "/Best-Makeup-Artist-in-Madurai";
    
    if (isOnContactPage) {
      // Just scroll to the form
      const element = document.getElementById("contact-form");
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        });
      }
    } else {
      // Navigate to the page
      router.push("/Best-Makeup-Artist-in-Madurai");
      
      // Wait for navigation and scroll
      setTimeout(() => {
        const element = document.getElementById("contact-form");
        if (element) {
          element.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
        }
      }, 800);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
