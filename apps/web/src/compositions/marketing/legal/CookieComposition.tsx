import React from "react";
import { Link } from "react-router";
import { EditorialHeadline } from "@pragyaos/ui";
import { AuthKey } from "@pragyaos/assets";
import { ROUTES } from "@/routes/route.constants";

export function CookieComposition(): React.JSX.Element {
  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Split Grid for Legal Center */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="md:col-span-4 flex flex-col gap-5 sticky top-24">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold px-2">
              Legal Center
            </span>
            <nav className="flex flex-col gap-1.5 font-sans text-xs">
              <Link
                to={ROUTES.PRIVACY}
                className="px-3.5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-all"
              >
                Privacy Policy
              </Link>
              <Link
                to={ROUTES.TERMS}
                className="px-3.5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                to={ROUTES.COOKIE}
                className="px-3.5 py-2.5 rounded-lg bg-brand-gold/10 text-brand-gold font-bold transition-all"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* Right Document Body */}
          <div className="md:col-span-8 flex flex-col gap-8">
            <div className="border-b border-border/80 pb-6 flex items-center justify-between">
              <div>
                <EditorialHeadline level={2} className="font-serif font-bold text-stone-900 dark:text-white mt-1 mb-2">
                  Cookie Policy
                </EditorialHeadline>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Last Updated: July 9, 2026
                </div>
              </div>
              <div className="text-brand-gold bg-brand-gold/10 p-3 rounded-full shrink-0">
                <AuthKey className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                PragyaOS uses standard browser tokens and cookies to manage active session controls, track selected user theme configurations, and optimize dashboard layout interactions.
              </p>

              <h3 className="font-serif font-bold text-base text-foreground mt-4">1. Required Cookies</h3>
              <p>
                Essential cookies are used to authenticate identity requests and persist your login state (`pragyaos_session`) within localStorage across window reloads. Gating layouts will not operate correctly without them.
              </p>

              <h3 className="font-serif font-bold text-base text-foreground mt-4">2. Preferences & Analytics</h3>
              <p>
                Subtle styling flags are stored to recall dark/light theme choices and local navigation menu toggles. We do not use third-party tracking pixels to log external site browsing behavior.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookieComposition;
