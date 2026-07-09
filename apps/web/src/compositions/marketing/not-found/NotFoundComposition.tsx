import React from "react";
import { EmptyNoSearchResults } from "@pragyaos/assets";
import { EditorialHeadline, EditorialParagraph, MarketingButton } from "@pragyaos/ui";
import { ROUTES } from "@/routes/route.constants";

export function NotFoundComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-24 sm:py-32 flex items-center justify-center min-h-[75vh] overflow-hidden">
      <div className="max-w-md mx-auto px-4 text-center flex flex-col items-center gap-6">
        
        {/* Animated Search Loop Illustration */}
        <div className="text-brand-gold bg-brand-gold/5 p-6 rounded-full border border-brand-gold/15 animate-pulse">
          <EmptyNoSearchResults className="w-24 h-24" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] uppercase text-brand-gold">
            Error 404
          </span>
          <EditorialHeadline level={1} className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 dark:text-white leading-tight tracking-tight">
            Lost in the wilderness.
          </EditorialHeadline>
        </div>

        {/* Description */}
        <EditorialParagraph className="text-stone-500 dark:text-stone-400 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
          The page you are looking for has been moved, renamed, or does not exist. Let&apos;s guide you back to familiar tracks.
        </EditorialParagraph>

        {/* Redirect CTA */}
        <div className="mt-4">
          <MarketingButton
            href={ROUTES.HOME}
            className="px-6 py-3 bg-[#1C1917] hover:bg-black text-white dark:bg-white dark:hover:bg-stone-100 dark:text-stone-950 text-xs font-sans font-semibold rounded-xl transition-all duration-200"
          >
            Return to Homepage
          </MarketingButton>
        </div>
      </div>
    </div>
  );
}

export default NotFoundComposition;
