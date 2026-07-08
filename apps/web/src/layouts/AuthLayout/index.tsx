import { Outlet, Link } from 'react-router-dom';
import { PageTransition } from '@/components/layout';
import { DoodleStar, DoodlePaperPlane, DoodleLeaves, DoodleUnderline } from '@/components/ui/Doodles';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Illustration / Editorial Area (hidden on mobile/tablet) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#faf9f6] border-r border-border p-12 flex-col justify-between relative overflow-hidden paper-grid">
        <Link to="/" className="flex items-center space-x-2 shrink-0 text-text-primary">
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 22C4 18 10 14 22 14C18 10 14 4 14 2C10 6 8 8 2 22Z" />
          </svg>
          <span className="font-heading text-h3 font-bold">PragyaOS</span>
        </Link>

        <div className="space-y-6 relative z-10 max-w-md">
          <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
            Join the Study Space
          </span>
          <h2 className="text-display-lg font-heading text-text-primary leading-tight font-extrabold">
            Your journey <br />starts <span className="relative inline-block font-bold">here.<DoodleUnderline className="absolute bottom-0 left-0 w-full text-accent-gold" /></span>
          </h2>
          <p className="text-body text-text-secondary leading-relaxed font-body">
            Unlock your workspace. Experience personalized AI tutoring, lined notes editor, and structured assignments.
          </p>
        </div>

        <p className="text-caption text-text-muted font-body">
          &copy; {new Date().getFullYear()} PragyaOS. Handcrafted learning platform.
        </p>

        {/* Floating Doodles */}
        <div className="absolute right-12 top-24 opacity-40">
          <DoodlePaperPlane className="w-20 h-20 text-text-muted rotate-[10deg]" />
        </div>
        <div className="absolute left-8 bottom-32 opacity-30">
          <DoodleLeaves className="w-16 h-16 text-success" />
        </div>
        <div className="absolute right-24 bottom-16 opacity-45">
          <DoodleStar className="w-10 h-10 text-accent-gold animate-pulse" />
        </div>
      </div>

      {/* Right Content Area (centered login/register forms) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile top branding */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link to="/" className="flex items-center space-x-2 text-text-primary">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 22C4 18 10 14 22 14C18 10 14 4 14 2C10 6 8 8 2 22Z" />
            </svg>
            <span className="font-heading text-h4 font-bold">PragyaOS</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </div>
    </div>
  );
}
