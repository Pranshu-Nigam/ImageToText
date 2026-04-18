import { Zap, Shield, Target, Cpu, Cloud, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuroraText } from "./magicui/aurora-text";

const features = [
  {
    title: "Instant Processing",
    description: "Get results in under 200ms with our state-of-the-art edge computing neural engine.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    title: "Unmatched Accuracy",
    description: "Our AI is trained on billions of complex documents, capturing every single character perfectly.",
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Privacy First",
    description: "We process and purge. Your data is never stored, never tracked, and never used for training.",
    icon: Shield,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Developer Ready",
    description: "Plug into our high-speed API with just two lines of code. Support for 40+ languages.",
    icon: Cpu,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Cloud Sync",
    description: "Access your extracted snippets across all devices seamlessly with secure cloud storage.",
    icon: Cloud,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Mobile Friendly",
    description: "Perfectly optimized for mobile browsers. Snap a photo and get text on the go.",
    icon: Smartphone,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 flex flex-col items-center">
      <div className="text-center mb-16 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          <AuroraText>Powerful OCR Capabilities</AuroraText>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl font-medium">
          <AuroraText colors={["#a1a1aa", "#d4d4d8", "#f4f4f5", "#a1a1aa"]} speed={2}>
            Everything you need to extract text from the digital and physical world.
          </AuroraText>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", feature.bg)}>
              <feature.icon className={cn("w-6 h-6", feature.color)} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

            {/* Glow Decorative */}
            <div className={cn("absolute -inset-2 rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity -z-10", feature.bg)} />
          </div>
        ))}
      </div>
    </section>
  );
}
