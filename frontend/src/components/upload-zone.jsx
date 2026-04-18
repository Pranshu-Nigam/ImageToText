import { useState } from "react";
import { Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import { cn } from "@/lib/utils";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

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
    <section id="upload" className="py-20 w-full flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">Experience the Magic</h2>
        <p className="text-muted-foreground text-lg max-w-xl">
          Upload an image to see our OCR engine in action. No signup required for demo.
        </p>
      </div>

      <div className="w-full max-w-4xl relative group">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative min-h-[400px] w-full rounded-[2rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 text-center",
            isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-white/10 bg-white/5",
            file ? "border-solid border-primary/50" : ""
          )}
        >
          {/* Animated Border on Hover or Active */}
          <BorderBeam size={300} duration={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />

          {!file ? (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-8 ring-primary/5">
                <Upload className="w-10 h-10 text-primary animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Drop your image here</h3>
              <p className="text-muted-foreground mb-8">Supports JPG, PNG, WEBP, and PDF up to 10MB</p>
              
              <label className="px-8 py-3 bg-foreground text-background font-bold rounded-2xl cursor-pointer hover:scale-105 transition-transform active:scale-95">
                Select File
                <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              </label>
            </>
          ) : (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
               <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6 ring-8 ring-green-500/5">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{file.name}</h3>
              <p className="text-muted-foreground mb-8">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to convert</p>
              
              <div className="flex gap-4">
                 <button className="px-8 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform">
                   Start Extraction
                 </button>
                 <button 
                  onClick={() => setFile(null)}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-red-500"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Decorative Background Glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] -z-10" />
      </div>
    </section>
  );
}
