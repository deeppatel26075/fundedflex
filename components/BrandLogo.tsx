import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = "md",
  withTagline = false,
  className = "",
}: BrandLogoProps) {
  const heights = {
    sm: "h-9",
    md: "h-11",
    lg: "h-16",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="relative overflow-hidden rounded-lg border border-[#00E599]/30 group-hover:border-[#00FFA3]/60 transition-colors shadow-[0_0_15px_rgba(0,229,153,0.35)] bg-black/60 flex-shrink-0">
        <Image
          src="/brand/fundedflex-logo.jpg"
          alt="FundedFlex Logo"
          width={size === "lg" ? 64 : size === "md" ? 44 : 36}
          height={size === "lg" ? 64 : size === "md" ? 44 : 36}
          className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-white transition-colors">
            Funded
          </span>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#00FFA3] via-[#00E599] to-emerald-400 bg-clip-text text-transparent ml-0.5">
            Flex
          </span>
        </div>
        {withTagline && (
          <span className="text-[9px] tracking-[0.25em] uppercase text-zinc-400 font-medium">
            TRADE • GROW • FREEDOM
          </span>
        )}
      </div>
    </Link>
  );
}
