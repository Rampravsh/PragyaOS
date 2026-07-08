import React from 'react';
import { NavLink } from 'react-router-dom';

export interface SidebarItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

export interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className = '' }: SidebarProps) {
  return (
    <aside
      className={`w-64 bg-paper-dark text-background-secondary border-r border-stone-850 flex flex-col shrink-0 select-none ${className}`}
    >
      {/* Sidebar branding */}
      <div className="h-16 flex items-center px-6 border-b border-stone-850 select-none text-white">
        <svg
          className="w-6 h-6 text-white mr-2.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M2 22C4 18 10 14 22 14C18 10 14 4 14 2C10 6 8 8 2 22Z" />
        </svg>
        <span className="font-heading text-h3 font-bold">PragyaOS</span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {items.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-small font-semibold rounded-paper font-body transition-colors select-none ${
                isActive
                  ? 'bg-surface/10 text-white'
                  : 'text-text-muted hover:text-white hover:bg-surface/5'
              }`
            }
          >
            <span className="mr-3 shrink-0">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User profile workspace trigger mockup */}
      <div className="p-4 border-t border-stone-850 flex items-center space-x-3 text-left">
        <div className="w-9 h-9 rounded-full bg-surface/10 flex items-center justify-center font-bold text-white shadow-button">
          AV
        </div>
        <div className="flex flex-col">
          <span className="text-small font-semibold text-white font-body leading-none">
            Ananya Verma
          </span>
          <span className="text-caption text-text-muted font-body mt-0.5">
            Student Account
          </span>
        </div>
      </div>
    </aside>
  );
}
