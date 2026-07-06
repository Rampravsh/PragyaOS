/**
 * cta/NewsletterCTA.tsx
 *
 * Newsletter signup CTA component featuring clean styled form elements.
 */

import React, { useState } from "react";
import { cn } from "@pragyaos/utils";
import EditorialSection from "../section/EditorialSection";
import { SectionHeading, SectionDescription } from "../section";
import { MarketingPrimaryButton } from "../shared/Buttons";

interface NewsletterCTAProps {
  title: string;
  description: string;
  placeholder?: string;
  buttonText?: string;
  onSubscribe?: (email: string) => Promise<void> | void;
  className?: string;
}

export const NewsletterCTA: React.FC<NewsletterCTAProps> = ({
  title,
  description,
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  onSubscribe,
  className,
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      setStatus("loading");
      if (onSubscribe) {
        await onSubscribe(email);
      }
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <EditorialSection
      variant="muted"
      className={cn("border-y border-[var(--border)]", className)}
    >
      <div className="max-w-2xl mx-auto text-center py-[var(--spacing-4)]">
        <SectionHeading level={2} align="center" size="3xl">
          {title}
        </SectionHeading>

        <SectionDescription align="center" className="mb-[var(--spacing-6)]">
          {description}
        </SectionDescription>

        {status === "success" ? (
          <div className="p-[var(--spacing-4)] rounded-[var(--radius-sm)] bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50 text-[var(--text-sm)] font-medium inline-block">
            ✓ Thank you! You have successfully subscribed to our newsletter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-[var(--spacing-3)]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "loading"}
                placeholder={placeholder}
                className="flex-grow px-[var(--spacing-4)] py-[var(--spacing-3)] bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:opacity-50 text-[var(--text-sm)]"
                aria-label="Email address"
              />
              <MarketingPrimaryButton
                type="submit"
                disabled={status === "loading"}
                className="whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : buttonText}
              </MarketingPrimaryButton>
            </div>
            
            {status === "error" && (
              <p className="mt-[var(--spacing-3)] text-rose-600 dark:text-rose-400 text-[var(--text-xs)] font-medium text-left">
                ⚠ {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </EditorialSection>
  );
};

export default NewsletterCTA;
