"use client";

import React from "react";
import { AmbientGlowOrbs } from "./AmbientGlowOrbs";
import { SystemCircuitIllustration } from "./SystemCircuitIllustration";

export function LayoutBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Layer 1: Ambient Inertial Glow Orbs (gsap.quickTo mouse parallax) */}
      <AmbientGlowOrbs />

      {/* Layer 2: Dynamic GSAP Systems Circuit Illustration with Flowing Pulses & Scroll Parallax */}
      <SystemCircuitIllustration />

      {/* Layer 3: Vignette & Foreground Depth Mask (Guarantees 100% Typography Readability) */}
      <div className="absolute inset-0 bg-radial-fade bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,transparent_0%,var(--background)_95%)] opacity-85" />
    </div>
  );
}
