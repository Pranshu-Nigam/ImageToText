import { Meteors } from "./components/magicui/meteors";
import { TypingAnimation } from "./components/magicui/typing-animation";
import ShimmerButton from "./components/magicui/shimmer-button";
import { BorderBeam } from "./components/magicui/border-beam";
import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { UploadZone } from "./components/upload-zone";
import { Footer } from "./components/footer";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "./components/magicui/interactive-grid-pattern";

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-500">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <InteractiveGridPattern
          width={60}
          height={60}
          squares={[40, 20]}
          x={-1}
          y={-1}
          className={cn(
            "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
          )}
        />
        <div className="pointer-events-none z-0">
           <Meteors number={30} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(108,92,231,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto w-full flex flex-col items-center">
          <Nav />
          <main className="w-full max-w-7xl px-6 md:px-12 flex flex-col gap-32 py-20 pointer-events-none">
            <div className="pointer-events-auto w-full"><Hero /></div>
            <div className="pointer-events-auto w-full"><Features /></div>
          </main>
          <div className="pointer-events-auto w-full"><Footer /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
