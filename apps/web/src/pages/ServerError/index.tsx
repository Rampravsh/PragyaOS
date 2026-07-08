import { PaperCard, Button } from '@/components/ui';
import { DoodleStar } from '@/components/ui/Doodles';

export default function ServerErrorPage() {
  return (
    <div className="text-center space-y-6 font-body select-none">
      <div className="relative max-w-sm mx-auto">
        <PaperCard variant="grid" stack className="p-8 space-y-6">
          <div className="absolute right-4 top-4 opacity-30 select-none">
            <DoodleStar className="w-8 h-8 text-accent-purple" />
          </div>
          <span className="text-display-lg font-heading font-extrabold text-accent-purple block leading-none">
            500
          </span>
          <h2 className="text-h2 font-heading font-bold text-text-primary">
            Critical system tear
          </h2>
          <p className="text-small text-text-secondary leading-relaxed font-body">
            Something went wrong compiling this study view. Our coordinators have been notified.
          </p>
          <Button variant="primary" className="w-full" onClick={() => (window.location.href = '/')}>
            Reload Space
          </Button>
        </PaperCard>
      </div>
    </div>
  );
}
