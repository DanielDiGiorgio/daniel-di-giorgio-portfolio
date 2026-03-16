"use client";

import { useState, useEffect, type ReactNode } from "react";

/**
 * Renders children only after mount (client-side).
 * Prevents any Three.js / R3F code from running during SSR or initial hydration
 * with mismatched React instances.
 */
export function ClientOnlyThree({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-[#030712] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
