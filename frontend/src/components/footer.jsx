import { Camera, X, GitBranch, MessageSquare, Home, Pencil, Mail } from "lucide-react";
import RetroGrid from "./magicui/retro-grid";
import { LightRays } from "./magicui/light-rays";
import { Dock, DockIcon } from "./magicui/dock";

const Github = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-background pt-20 pb-10 overflow-hidden flex flex-col items-center">
      <LightRays className="opacity-100 dark:opacity-50" />
      <RetroGrid className="opacity-10" angle={45} />


      <div className="w-full max-w-7xl px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">
        <div className="flex flex-col gap-6 col-span-1 md:col-span-1">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            <span className="text-xl font-black tracking-tighter">TEXTLENS</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Leading the way in precision character recognition. Empowering developers and creators with near-perfect text extraction.
          </p>
          <Dock className="mx-0 mr-auto mt-2 h-auto px-4" direction="middle">
            <DockIcon>
              <a href="#" aria-label="Home" className="flex items-center justify-center">
                <Home className="w-5 h-5" />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="#" aria-label="Edit" className="flex items-center justify-center">
                <Pencil className="w-5 h-5" />
              </a>
            </DockIcon>
            <div className="w-[1px] h-full bg-white/10 mx-2" />
            <DockIcon>
              <a href="#" aria-label="GitHub" className="flex items-center justify-center">
                <Github className="w-5 h-5" />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="#" aria-label="LinkedIn" className="flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="#" aria-label="X / Twitter" className="flex items-center justify-center">
                <X className="w-5 h-5" />
              </a>
            </DockIcon>
            <DockIcon>
              <a href="#" aria-label="Email" className="flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </a>
            </DockIcon>
          </Dock>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h4>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Stay updated with our latest OCR improvements.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl">Join</button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl px-6 md:px-12 border-t border-white/5 pt-10 text-center relative z-10">
        <p className="text-xs text-muted-foreground uppercase tracking-[0.3em]">
          © 2026 TEXTLENS AI • ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}
