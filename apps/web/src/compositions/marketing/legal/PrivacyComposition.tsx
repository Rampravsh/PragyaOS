import React from "react";
import { Link } from "react-router";
import { EditorialHeadline } from "@pragyaos/ui";
import { AuthLock } from "@pragyaos/assets";
import { ROUTES } from "@/routes/route.constants";

export function PrivacyComposition(): React.JSX.Element {
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
                className="px-3.5 py-2.5 rounded-lg bg-brand-gold/10 text-brand-gold font-bold transition-all"
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
                className="px-3.5 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-stone-50 dark:hover:bg-stone-900/40 transition-all"
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
                  Privacy Policy
                </EditorialHeadline>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Last Updated: July 9, 2026
                </div>
              </div>
              <div className="text-brand-gold bg-brand-gold/10 p-3 rounded-full shrink-0">
                <AuthLock className="w-8 h-8" strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex flex-col gap-6 font-sans text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                PragyaOS (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, process, and safeguard user account details when you use our modular classroom and studio tools.
              </p>

              <h3 className="font-serif font-bold text-base text-foreground mt-4">1. Information Collection</h3>
              <p>
                We collect personal identity details (such as names, email addresses, and system passwords) during authentication, as well as analytics relating to course progress, module interactions, and billing details.
              </p>

              <h3 className="font-serif font-bold text-base text-foreground mt-4">2. Processing Purpose</h3>
              <p>
                Your information is processed to maintain active session security, compile performance metrics on your workspace dashboard, and authorize access controls across student and instructor consoles.
              </p>

              <h3 className="font-serif font-bold text-base text-foreground mt-4">3. Data Integrity & Safeguards</h3>
              <p>
                All records are stored within protected database architectures. Communication links are wrapped with TLS/SSL encryption to prevent interception by unauthorized systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyComposition;
