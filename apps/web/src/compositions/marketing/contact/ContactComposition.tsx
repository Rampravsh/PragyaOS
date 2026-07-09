import React, { useState } from "react";
import { motion } from "framer-motion";
import { EditorialHeadline, EditorialParagraph, EditorialCard, MarketingButton } from "@pragyaos/ui";
import { AuthEnvelope } from "@pragyaos/assets";

export function ContactComposition(): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-normal py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Details + Illustration */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-brand-gold">
                Get In Touch
              </span>
              <EditorialHeadline level={1} className="font-serif font-bold text-stone-900 dark:text-white leading-[1.1] tracking-tight">
                Connect with our team.
              </EditorialHeadline>
              <EditorialParagraph className="text-stone-600 dark:text-stone-300">
                Have questions about custom licenses, classroom integrations, or partnerships? Write to us directly.
              </EditorialParagraph>
            </div>

            {/* Static Details */}
            <div className="flex flex-col gap-4 text-xs font-sans">
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-bold uppercase tracking-wider w-16">Email:</span>
                <span className="text-muted-foreground">hello@pragyaos.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-bold uppercase tracking-wider w-16">Press:</span>
                <span className="text-muted-foreground">press@pragyaos.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-brand-gold font-bold uppercase tracking-wider w-16">Location:</span>
                <span className="text-muted-foreground">Bengaluru, KA, India</span>
              </div>
            </div>

            {/* Illustration */}
            <div className="hidden lg:flex justify-start text-brand-gold/60 dark:text-brand-gold/40">
              <AuthEnvelope className="w-40 h-auto" strokeWidth={1} />
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-7">
            <EditorialCard className="p-8 bg-stone-50 dark:bg-stone-900/40 border border-border/80 rounded-xl shadow-sm">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-xs font-sans font-bold text-stone-700 dark:text-stone-300">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Alice Cooper"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-border focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-xs font-sans font-bold text-stone-700 dark:text-stone-300">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alice@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-border focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="text-xs font-sans font-bold text-stone-700 dark:text-stone-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Tell us how we can collaborate..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-background border border-border focus:border-brand-gold focus:ring-1 focus:ring-brand-gold rounded-lg px-4 py-2.5 text-xs font-sans text-foreground placeholder:text-muted-foreground focus-visible:outline-none transition-all resize-none"
                    />
                  </div>

                  <MarketingButton
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 font-sans font-bold text-xs py-3 bg-[#1C1917] text-white hover:bg-black dark:bg-white dark:text-stone-950 dark:hover:bg-stone-100 rounded-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </MarketingButton>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-foreground">Message Sent</h3>
                  <p className="font-sans text-xs text-muted-foreground max-w-xs leading-relaxed">
                    Thank you for reaching out! A member of the PragyaOS team will write back to you shortly.
                  </p>
                </motion.div>
              )}
            </EditorialCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactComposition;
