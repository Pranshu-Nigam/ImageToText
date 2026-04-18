import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Camera, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

import { LightRays } from "./magicui/light-rays";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-center",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <LightRays className="opacity-70 dark:opacity-50 w-screen h-screen !fixed top-0 left-0 pointer-events-none -z-10" />

      <div className="w-full max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative p-2 bg-primary/20 rounded-xl overflow-hidden">
             <Camera className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
             <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            TEXTLENS
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it Works</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Demo</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
