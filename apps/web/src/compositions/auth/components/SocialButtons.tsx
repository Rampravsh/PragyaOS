import React, { useState } from 'react';
import { GoogleIcon, GithubIcon, MicrosoftIcon } from '@pragyaos/icons';

export function SocialButtons(): React.JSX.Element {
  const [activeProvider, setActiveProvider] = useState<string | null>(null);

  const handleSocialClick = (provider: string) => {
    setActiveProvider(provider);
    
    // Auto clear after 2 seconds
    setTimeout(() => {
      setActiveProvider((curr) => (curr === provider ? null : curr));
    }, 2000);
  };

  const providers = [
    { id: 'Google', label: 'Google', icon: GoogleIcon },
    { id: 'GitHub', label: 'GitHub', icon: GithubIcon },
    { id: 'Microsoft', label: 'Microsoft', icon: MicrosoftIcon },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Divider */}
      <div className="flex items-center gap-3 whitespace-nowrap text-xs text-stone-400 dark:text-stone-600">
        <span className="h-px flex-1 bg-stone-200 dark:bg-white/10" />
        <span className="font-sans uppercase tracking-wider text-[10px] font-semibold">or continue with</span>
        <span className="h-px flex-1 bg-stone-200 dark:bg-white/10" />
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {providers.map((p) => {
          const Icon = p.icon;
          const isNotificationActive = activeProvider === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSocialClick(p.id)}
              className="relative flex items-center justify-center gap-2 h-11 px-3 border border-stone-200 dark:border-white/10 hover:border-stone-300 dark:hover:border-white/20 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-xs font-sans font-semibold text-stone-700 dark:text-stone-300 rounded-xl transition-all duration-fast select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981]"
              aria-label={`Sign in with ${p.id} (Coming Soon)`}
            >
              {isNotificationActive ? (
                <span className="text-[10px] font-sans text-rose-500 font-semibold truncate">
                  Coming Soon
                </span>
              ) : (
                <>
                  <Icon size={16} className="shrink-0" />
                  <span className="truncate">{p.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SocialButtons;
