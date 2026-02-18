"use client";

import React, { useState, useRef } from "react";
import { Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { login } from "@/lib/auth-api";
import { useAuth } from "@/components/providers/auth-provider";
import { CompanyLogo } from "@/components/ui/company-logo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AuthPage() {
  const { login: authLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".stagger-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
      );

      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" },
      );
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4 },
      );
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(formData.email, formData.password);
      if (response.success && response.data?.user) {
        authLogin(response.data.user);
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Authentication failed";
      setError(message);
      gsap.to(formRef.current, {
        x: 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#FCFBF7] flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-black selection:text-white"
    >
      {/* Left Section: Visual Editorial */}
      <div className="relative w-full lg:w-[45%] h-[40vh] lg:h-screen overflow-hidden bg-[#E8E4D9]">
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center h-full w-full"
          style={{
            backgroundImage: "url('/assets/login/facial.avif')",
          }}
        />
        <div className="absolute inset-0 bg-black/5" />

        {/* Floating Brand Elements */}
        <div className="absolute bottom-10 left-10 text-white z-10 hidden lg:block stagger-item">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-70 mb-2">
            Artistry In Motion
          </p>
          <h2 className="text-4xl font-serif italic text-white/90">
            The Body Mask Studio
          </h2>
        </div>

        {/* Top Overlay Logo for Mobile */}
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <CompanyLogo className="h-8 invert" />
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative">
        {/* Subtle Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pvc-noise.png')]" />

        <div ref={formRef} className="w-full max-w-sm relative z-10">
          <div className="mb-12 text-center lg:text-left stagger-item">
            <Link
              href="/"
              className="mb-10 transition-transform hover:scale-105 hidden lg:block"
            >
              <CompanyLogo className="h-10 w-auto" />
            </Link>

            <h1 className="text-4xl lg:text-5xl font-serif text-[#1A1A1A] mb-4 leading-tight">
              Welcome to the Studio
            </h1>
            <p className="text-[#6B6B6B] text-sm font-medium tracking-tight">
              Please sign in to access your administrative suite.
            </p>
          </div>

          {error && (
            <div
              ref={errorRef}
              className="mb-8 p-4 bg-[#FFF5F5] border border-[#FFDADA] rounded-sm flex items-center gap-3 text-[#C53030] text-[13px] font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 stagger-item">
              <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b-2 border-[#E5E5E5] py-3 px-1 text-[#1A1A1A] placeholder:text-[#D4D4D4] focus:outline-none focus:border-black transition-all duration-500 text-sm font-medium"
                placeholder="studio@bodymask.com"
              />
            </div>

            <div className="space-y-1 stagger-item">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-[0.2em]">
                  Password
                </label>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b-2 border-[#E5E5E5] py-3 px-1 text-[#1A1A1A] placeholder:text-[#D4D4D4] focus:outline-none focus:border-black transition-all duration-500 text-sm font-medium pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[#D4D4D4] hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 stagger-item">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full group relative bg-black text-white px-8 py-4 overflow-hidden transition-all duration-500 hover:bg-[#2A2A2A] disabled:bg-gray-400"
              >
                <div className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-[11px]">
                  {isLoading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <span>Authorize Entry</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* Global Boutique Accents */}
        <div className="absolute top-10 right-10 hidden xl:block stagger-item">
          <div className="text-[9px] font-bold text-black/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
            Established MMXXIV
          </div>
        </div>
      </div>
    </div>
  );
}
