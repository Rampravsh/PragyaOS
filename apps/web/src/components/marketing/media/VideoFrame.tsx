/**
 * media/VideoFrame.tsx
 *
 * Reusable video component wrapping HTML5 video or YouTube/Vimeo iframe embeds
 * in responsive layout containers.
 */

import React, { useState } from "react";
import { cn } from "@pragyaos/utils";

interface VideoFrameProps {
  src: string;
  title?: string;
  isEmbed?: boolean;
  thumbnailUrl?: string;
  aspectRatio?: "video" | "square" | "wide";
  className?: string;
}

const aspectClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export const VideoFrame: React.FC<VideoFrameProps> = ({
  src,
  title = "Video Player",
  isEmbed = false,
  thumbnailUrl,
  aspectRatio = "video",
  className,
}) => {
  const [isPlaying, setIsPlaying] = useState(!thumbnailUrl);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[var(--paper-dark)] rounded-[var(--radius-md)] border border-[var(--border)] shadow-[var(--shadow-lg)]",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {!isPlaying && thumbnailUrl ? (
        // Thumbnail overlay
        <div className="absolute inset-0 z-10 cursor-pointer group" onClick={handlePlayClick}>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-102"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40" />
          
          {/* Glass play button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--background)]/90 backdrop-blur-sm text-[var(--foreground)] flex items-center justify-center shadow-[var(--shadow-xl)] transition-all duration-[var(--duration-normal)] group-hover:scale-110">
            <svg
              className="w-6 h-6 stroke-[1.5] fill-current translate-x-0.5"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      ) : null}

      {/* Actual Video Frame */}
      {isPlaying ? (
        isEmbed ? (
          <iframe
            src={`${src}${src.includes("?") ? "&" : "?"}autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={src}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        )
      ) : null}
    </div>
  );
};

export default VideoFrame;
