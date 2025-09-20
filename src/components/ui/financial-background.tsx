import React from "react";
import { cn } from "@/lib/utils";

interface FinancialBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

function GridPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--muted) / 0.03) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--muted) / 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    />
  );
}

function SubtleShape({
  className,
  width = 200,
  height = 60,
  opacity = 0.02,
}: {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  return (
    <div className={cn("absolute", className)}>
      <div
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-muted to-transparent border border-border/10"
          style={{ opacity }}
        />
      </div>
    </div>
  );
}

export function FinancialBackground({
  children,
  className,
}: FinancialBackgroundProps) {
  return (
    <div
      className={cn(
        "relative w-full min-h-screen overflow-hidden bg-background",
        className
      )}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />

      {/* Grid pattern */}
      <GridPattern />

      {/* Subtle geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <SubtleShape
          width={300}
          height={80}
          opacity={0.015}
          className="left-[10%] top-[20%]"
        />
        
        <SubtleShape
          width={250}
          height={70}
          opacity={0.02}
          className="right-[15%] top-[60%]"
        />
        
        <SubtleShape
          width={180}
          height={50}
          opacity={0.018}
          className="left-[5%] bottom-[25%]"
        />
        
        <SubtleShape
          width={220}
          height={60}
          opacity={0.012}
          className="right-[8%] top-[15%]"
        />
      </div>

      {/* Subtle corner gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-muted/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-muted/8 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10 pointer-events-none" />
    </div>
  );
}