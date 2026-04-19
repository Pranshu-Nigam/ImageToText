import { useState, useEffect } from "react";
import { 
  FileText, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Upload, 
  X, 
  CheckCircle2, 
  Copy, 
  RefreshCw,
  Clock,
  Dna,
  ShieldCheck
} from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import ShimmerButton from "./magicui/shimmer-button";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";
import RetroGrid from "./magicui/retro-grid";
import { MorphingText } from "./magicui/morphing-text";
import { useIsMobile } from "@/lib/use-mobile";
import { extractText } from "@/lib/api";

export function Hero() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isPasted, setIsPasted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [autoCopy, setAutoCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            setFile(blob);
            setIsPasted(true);
            setResult(null);
            setError(null);
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
      setResult(null);
      setError(null);
    }
  };

  const handleCopy = (textToCopy) => {
    const text = textToCopy || result?.text;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransform = async () => {
    if (!file || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await extractText(file);

    if (response.success) {
      setResult(response.data);
      // Auto-copy logic
      if (autoCopy && response.data.text) {
        handleCopy(response.data.text);
      }
    } else {
      setError(response.error);
    }
    
    setIsLoading(false);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <section className="relative flex flex-col items-center pt-20 sm:pt-32 text-center overflow-visible">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] sm:text-xs font-bold text-primary animate-fade-in">
        <Sparkles className="w-3 h-3" />
        <span>POWERED BY ADVANCED OCR AI</span>
      </div>

      {/* Headline */}
      <div className="flex flex-col items-center max-w-5xl mb-6 sm:mb-8 px-2">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight mb-2">
          Convert Any Image to
        </h1>
        {/* Dynamic Morphing Component */}
        <div className="relative mt-2 w-full flex flex-col items-center">
          <MorphingText 
            texts={["Editable Text", "Markdown", "Clean Code"]} 
            className="text-primary tracking-tight"
          />
          <div className="absolute bottom-0 w-48 sm:w-72 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>
      </div>

      {/* Sub-headline */}
      <p className="max-w-2xl text-sm sm:text-lg text-muted-foreground mb-8 sm:mb-12 px-4">
        TextLens extracts text from documents, images, and screens with 99.9% accuracy. Perfect for developers, students, and professionals.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto px-4 sm:px-0">
        <ShimmerButton className="font-bold" onClick={() => document.getElementById('file-input').click()}>
          <span className="flex items-center gap-2">
            Try TextLens Free <ArrowRight className="w-4 h-4" />
          </span>
        </ShimmerButton>
        <button
          className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold"
          style={{ WebkitBackdropFilter: 'blur(4px)', backdropFilter: 'blur(4px)' }}
        >
          Watch Demo
        </button>
      </div>

      {/* Auto Copy Toggle */}
      {!result && (
        <div className="flex justify-center mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
          <button
            onClick={() => setAutoCopy(!autoCopy)}
            className={cn(
              "group flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all border",
              autoCopy 
                ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_20px_rgba(108,92,231,0.25)] scale-105" 
                : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20"
            )}
          >
            <div className={cn(
              "w-2 h-2 rounded-full transition-all duration-500",
              autoCopy ? "bg-primary shadow-[0_0_8px_#6c5ce7] animate-pulse" : "bg-muted-foreground/30"
            )} />
            <Copy className={cn("w-3.5 h-3.5 transition-transform", autoCopy && "scale-110")} />
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase">Auto Copy</span>
            {autoCopy && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
          </button>
        </div>
      )}

      {/* Interactive Uploader Frame */}
      <div
        className="relative w-full max-w-5xl min-h-[320px] sm:min-h-0 sm:aspect-video rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden group shadow-2xl transition-all duration-700"
        style={{
          background: 'rgba(0, 0, 0, 0.35)',
          WebkitBackdropFilter: isMobile ? undefined : 'blur(64px)',
          backdropFilter: isMobile ? undefined : 'blur(64px)',
        }}
      >
        <RetroGrid className={isMobile ? "opacity-40" : "opacity-80"} />
        {/* BorderBeam disabled on mobile — offset-path animation is expensive */}
        {!isMobile && <BorderBeam size={250} duration={12} delay={9} />}

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 transition-all duration-500",
            isDragging ? "bg-primary/5 scale-[1.01]" : "bg-transparent",
            file && !result ? "bg-black/60" : "",
            isPasted ? "ring-4 ring-primary ring-inset" : ""
          )}
        >
          {isPasted && (
            <div className="absolute top-4 sm:top-8 px-4 py-2 bg-primary text-white text-xs font-bold rounded-full animate-in fade-in zoom-in duration-300 z-50">
              Image Pasted! ✨
            </div>
          )}

          {!file ? (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 ring-8 ring-primary/5 group-hover:scale-110 transition-transform duration-500">
                <Upload className={cn("w-7 h-7 sm:w-10 sm:h-10 text-primary", !isMobile && "animate-bounce")} />
              </div>
              <h3 className="text-xl sm:text-3xl font-black mb-2 tracking-tight">Experience the Magic</h3>
              <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-10 max-w-md px-2">
                Drop your image here to see TextLens in action. Supports JPG, PNG, WEBP, and PDF.
              </p>

              <label className="px-8 py-3 sm:px-10 sm:py-4 bg-primary text-white font-bold rounded-2xl cursor-pointer hover:shadow-[0_0_20px_rgba(108,92,231,0.5)] transition-all active:scale-95">
                Select File
                <input id="file-input" type="file" className="hidden" onChange={(e) => {
                  if (e.target.files[0]) {
                    setFile(e.target.files[0]);
                    setResult(null);
                    setError(null);
                  }
                }} />
              </label>
            </div>
          ) : result ? (
            <div className="w-full h-full flex flex-col animate-in fade-in zoom-in duration-500 p-2 sm:p-6">
               <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm sm:text-base font-bold truncate max-w-[150px] sm:max-w-xs">{file.name}</h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Transformation Complete</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleCopy}
                      className="p-2 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-xs sm:text-sm font-bold"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                    <button 
                      onClick={reset}
                      className="p-2 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2 text-xs sm:text-sm font-bold"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">New Image</span>
                    </button>
                  </div>
               </div>

               <div className="flex-1 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 min-h-0 overflow-hidden">
                  {/* Source Image Preview */}
                  <div className="flex-1 min-h-[150px] sm:h-full bg-black/20 border border-white/5 rounded-2xl overflow-hidden relative group/preview">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="Source" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] sm:text-xs font-bold text-white/60 pointer-events-none">
                      SOURCE IMAGE
                    </div>
                  </div>

                  {/* Extracted Text */}
                  <div className="flex-1 min-h-[200px] sm:h-full bg-black/40 border border-white/5 rounded-2xl p-4 sm:p-5 text-left overflow-auto custom-scrollbar group/text relative">
                    <div className="absolute top-2 right-2 px-2 py-1 bg-primary/20 backdrop-blur-md rounded text-[10px] sm:text-xs font-bold text-primary pointer-events-none z-10">
                      EXTRACTED TEXT
                    </div>
                    <pre className="text-xs sm:text-sm md:text-base whitespace-pre-wrap font-mono leading-relaxed text-foreground/90 selection:bg-primary/30 pt-4">
                      {result.text}
                    </pre>
                  </div>
               </div>

               <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-3 flex flex-col items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary mb-1" />
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Time</span>
                    <span className="text-xs sm:text-sm font-bold">{result.processingTimeMs}ms</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-3 flex flex-col items-center">
                    <Dna className="w-3 h-3 sm:w-4 sm:h-4 text-secondary mb-1" />
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Accuracy</span>
                    <span className="text-xs sm:text-sm font-bold">{result.confidence}%</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-2 sm:p-3 flex flex-col items-center">
                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mb-1" />
                    <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Status</span>
                    <span className="text-xs sm:text-sm font-bold text-green-500">Verified</span>
                  </div>
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <div className="relative mb-4 sm:mb-6">
                <div className={cn(
                  "w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500/10 flex items-center justify-center ring-8 ring-green-500/5 transition-all duration-300",
                  isLoading && "animate-pulse ring-primary/20 bg-primary/10"
                )}>
                  {isLoading ? (
                    <RefreshCw className="w-8 h-8 sm:w-12 sm:h-12 text-primary animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-8 h-8 sm:w-12 sm:h-12 text-green-500" />
                  )}
                </div>
                {isLoading && (
                   <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
              </div>
              
              <h2 className={cn(
                "text-xl sm:text-3xl font-black mb-2 break-all px-4 transition-colors",
                isLoading ? "text-primary" : "text-foreground"
              )}>
                {isLoading ? "Transforming..." : file.name}
              </h2>
              
              <p className="text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-10">
                {isLoading 
                  ? "Our AI is deciphering the visual data..." 
                  : `${(file.size / 1024 / 1024).toFixed(2)} MB • Ready for high-speed OCR`
                }
              </p>

              {error && (
                <div className="mb-6 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs sm:text-sm animate-in shake duration-500">
                  {error}
                </div>
              )}

              <div className="flex gap-3 sm:gap-4">
                <ShimmerButton 
                  className={cn("font-bold px-6 sm:px-10 transition-opacity", isLoading && "opacity-50 cursor-not-allowed")}
                  onClick={handleTransform}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Start Transformation"}
                </ShimmerButton>
                <button
                  onClick={reset}
                  disabled={isLoading}
                  className={cn(
                    "p-3 sm:p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-red-500",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements — hidden on very small screens */}
        {!file && (
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-none opacity-40">
            <div className="flex gap-3 sm:gap-4">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <div className="w-2 h-2 rounded-full bg-muted" />
            </div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">Secure AI Processing</div>
          </div>
        )}
      </div>
    </section>
  );
}
