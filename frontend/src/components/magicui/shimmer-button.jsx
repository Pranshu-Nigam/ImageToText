import React from "react";
import { cn } from "@/lib/utils";

const ShimmerButton = React.forwardRef(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(108, 92, 231, 1)", // Primary color
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={{
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        }}
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black",
          "transform-gpu transition-transform duration-300 ease-in-out active:scale-95",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container - Removed as per user request */}
        {/* <div
          className={cn(
            "-z-10 [radial-gradient(circle_at_50%_0%,#6C5CE7_0%,transparent_70%)] absolute inset-0 overflow-visible [container-type:size]",
          )}
        >
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-pulse [aspect-ratio:1] [background:conic-gradient(from_0deg,transparent_0_340deg,var(--shimmer-color)_360deg)] [mask:linear-gradient(#fff,transparent)]" />
        </div> */}
        {children}

        {/* Highlight foreground */}
        <div
          className={cn(
            "insert-0 absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute inset-0 -z-20 [background:var(--bg)] [border-radius:var(--radius)]",
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
