import { useState, useEffect } from "react";
import { FileText, ArrowRight, Zap, Sparkles, Upload, X, CheckCircle2 } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import ShimmerButton from "./magicui/shimmer-button";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";
import RetroGrid from "./magicui/retro-grid";
import { MorphingText } from "./magicui/morphing-text";

export function Hero() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isPasted, setIsPasted] = useState(false);

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            setFile(blob);
            setIsPasted(true);
            setTimeout(() => setIsPasted(false), 2000);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section className="relative flex flex-col items-center pt-32 text-center overflow-visible">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary animate-fade-in">
        <Sparkles className="w-3 h-3" />
        <span>POWERED BY ADVANCED OCR AI</span>
      </div>

      {/* Headline */}
      <div className="flex flex-col items-center max-w-5xl mb-8">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2">
          Convert Any Image to
        </h1>
        {/* Dynamic Morphing Component */}
        <div className="relative mt-2 w-full flex flex-col items-center">
          <MorphingText 
            texts={["Editable Text", "Markdown", "Clean Code"]} 
            className="text-primary tracking-tight"
          />
          <div className="absolute bottom-0 w-72 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </div>

      {/* Sub-headline */}
      <p className="max-w-2xl text-lg text-muted-foreground mb-12">
        TextLens extracts text from documents, images, and screens with 99.9% accuracy. Perfect for developers, students, and professionals.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <ShimmerButton className="font-bold">
          <span className="flex items-center gap-2">
            Try TextLens Free <ArrowRight className="w-4 h-4" />
          </span>
        </ShimmerButton>
        <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold backdrop-blur-sm">
          Watch Demo
        </button>
      </div>

      {/* Interactive Uploader Frame (Replaces Static Mockup) */}
      <div className="relative w-full max-w-5xl aspect-video rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden group shadow-2xl">
        <RetroGrid className="opacity-80" />
        <BorderBeam size={250} duration={12} delay={9} />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500",
            isDragging ? "bg-primary/5 scale-[1.01]" : "bg-transparent",
            file ? "bg-black/60" : "",
            isPasted ? "ring-4 ring-primary ring-inset" : ""
          )}
        >
          {isPasted && (
            <div className="absolute top-8 px-4 py-2 bg-primary text-white text-xs font-bold rounded-full animate-in fade-in zoom-in duration-300 z-50">
              Image Pasted! ✨
            </div>
          )}
          {!file ? (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-8 ring-primary/5 group-hover:scale-110 transition-transform duration-500">
                <Upload className="w-10 h-10 text-primary animate-bounce" />
              </div>
              <h3 className="text-3xl font-black mb-2 tracking-tight">Experience the Magic</h3>
              <p className="text-muted-foreground text-lg mb-10 max-w-md">
                Drop your image here to see TextLens in action. Supports JPG, PNG, WEBP, and PDF.
              </p>

              <label className="px-10 py-4 bg-primary text-white font-bold rounded-2xl cursor-pointer hover:shadow-[0_0_20px_rgba(108,92,231,0.5)] transition-all active:scale-95">
                Select File
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6 ring-8 ring-green-500/5">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-black mb-2">{file.name}</h2>
              <p className="text-muted-foreground text-lg mb-10">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for high-speed OCR</p>

              <div className="flex gap-4">
                <ShimmerButton className="font-bold px-10">
                  Start Transformation
                </ShimmerButton>
                <button
                  onClick={() => setFile(null)}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        {!file && (
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none opacity-40">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="w-2 h-2 rounded-full bg-muted" />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold">Secure AI Processing</div>
          </div>
        )}
      </div>
    </section>
  );
}
