import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Camera, Scissors, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { useIsMobile } from "@/lib/use-mobile";

import { LightRays } from "./magicui/light-rays";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 py-3 sm:py-4 flex justify-center",
        scrolled ? "border-b border-white/10" : "bg-transparent"
      )}
      style={scrolled ? {
        backgroundColor: 'rgba(var(--background-rgb, 10, 10, 10), 0.85)',
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      } : undefined}
    >
      {/* LightRays — disabled on mobile for performance */}
      {!isMobile && (
        <LightRays className="opacity-70 dark:opacity-50 w-screen h-screen !fixed top-0 left-0 pointer-events-none -z-10" />
      )}

      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative p-1.5 sm:p-2 bg-primary/20 rounded-xl overflow-hidden">
             <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform" />
             <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span
            className="text-lg sm:text-xl font-black tracking-tighter"
            style={{
              background: 'linear-gradient(to right, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'var(--primary)',
            }}
          >
            TEXTLENS
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ModeToggle />
          <button className="hidden sm:block px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all active:scale-95">
            Get Started
          </button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 border-b border-white/10 py-4 px-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            backgroundColor: 'rgba(var(--background-rgb, 10, 10, 10), 0.95)',
            WebkitBackdropFilter: 'blur(20px)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">Features</a>
          <a href="#how" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">How it Works</a>
          <a href="#demo" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2">Demo</a>
          <button className="w-full px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl mt-2 active:scale-95 transition-transform">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
