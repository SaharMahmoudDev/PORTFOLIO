"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { ProjectImage as ProjectImageType } from "../../../data/projects";

function subscribe() {
  return () => {};
}

function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

type ProjectImageProps = {
  image: ProjectImageType;
  alt: string;
  className?: string;
};

export function ProjectImage({ image, alt, className }: ProjectImageProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const src = mounted && resolvedTheme === "light" ? image.light : image.dark;

  return (
    <div className={cn("bg-card relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
