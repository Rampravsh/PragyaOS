/**
 * media/Illustration.tsx
 *
 * Wrapper for displaying complex vector illustration elements (such as empty states
 * and hero graphics) with consistent responsive margins.
 */

import React from "react";
import * as Assets from "@pragyaos/assets";
import { cn } from "@pragyaos/utils";

export type IllustrationName =
  | "EmptyNoCourses"
  | "EmptyNoSearchResults"
  | "EmptyNoNotifications"
  | "EmptyNoMessages"
  | "EmptyNoCertificates"
  | "EmptyNoNotes"
  | "EmptyNoBookmarks"
  | "EmptyNoDownloads"
  | "EmptyNoHistory"
  | "EmptyOffline";

interface IllustrationProps {
  name: IllustrationName;
  className?: string;
  color?: string;
  size?: number | string;
  opacity?: number;
}

export const Illustration: React.FC<IllustrationProps> = ({
  name,
  className,
  color = "currentColor",
  size = 180,
  opacity,
}) => {
  const Comp = Assets[name] as React.FC<any>;

  if (!Comp) {
    console.warn(`Illustration: Component "${name}" was not found in @pragyaos/assets library.`);
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center pointer-events-none select-none text-[var(--muted-foreground)] p-[var(--spacing-4)]",
        className
      )}
      style={{ width: size, height: "auto" }}
    >
      <Comp
        color={color}
        opacity={opacity}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Illustration;
