import { CheckCircle2, BookOpen, LineChart, ShieldCheck } from 'lucide-react';
import { Section, Container } from '@/components/layout';

export default function ShowcaseSection() {
  const items = [
    {
      title: 'Powerful Course Builder',
      desc: 'Easy tools for creators.',
      icon: <BookOpen className="w-5 h-5 text-accent-gold" />,
    },
    {
      title: 'Smart Analytics',
      desc: 'Insights that help you grow.',
      icon: <LineChart className="w-5 h-5 text-accent-gold" />,
    },
    {
      title: 'Secured & Badges',
      desc: 'Built for teams and enterprises.',
      icon: <ShieldCheck className="w-5 h-5 text-accent-gold" />,
    },
  ];

  return (
    <Section bg="dark" spacing="lg" overlap dividerBottom="cream" className="text-stone-200 select-none">
      <Container width="desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-caption font-semibold tracking-wider text-accent-gold uppercase font-body">
                Everything in one place
              </span>
              <h2 className="text-display-lg font-heading text-white leading-tight font-extrabold">
                A platform built <br />for meaningful <br />learning.
              </h2>
              <p className="text-body-lg text-text-muted leading-relaxed font-body">
                Create, organize and share learning experiences that make an impact. Enjoy zero clutter and distraction-free studies.
              </p>
            </div>

            {/* List */}
            <ul className="space-y-6">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-surface/10 border border-white/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-body font-heading font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-small text-text-muted leading-tight font-body">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: High-fidelity Programmatic Dashboard App Screenshot Mockup */}
          <div className="lg:col-span-7 relative flex justify-center">
            
            {/* Desktop Mockup Card */}
            <div className="w-full bg-[#18181a] border border-stone-800 rounded-lg shadow-paper-floating p-4 relative overflow-hidden text-left">
              {/* Mock top browser bar */}
              <div className="flex items-center space-x-2 pb-3.5 border-b border-stone-850">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                <span className="text-[10px] text-text-muted font-body ml-4">workspace.pragyaos.org</span>
              </div>

              {/* Layout splits */}
              <div className="flex pt-4 h-80 gap-4">
                {/* Mock sidebar */}
                <div className="w-32 bg-[#202022] border border-stone-800 rounded-md p-2 flex flex-col space-y-1">
                  <div className="h-4 w-12 bg-white/20 rounded-sm mb-3" />
                  <div className="h-6 w-full bg-white/10 rounded-sm flex items-center px-1.5 text-[9px] font-semibold text-white">Dashboard</div>
                  <div className="h-6 w-full bg-transparent rounded-sm flex items-center px-1.5 text-[9px] text-text-muted">Courses</div>
                  <div className="h-6 w-full bg-transparent rounded-sm flex items-center px-1.5 text-[9px] text-text-muted">Analytics</div>
                </div>

                {/* Mock main content dashboard panel */}
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-small font-heading font-extrabold text-white">Welcome back, Ananya! 👋</span>
                    <span className="text-[10px] text-accent-gold font-body bg-accent-gold/10 px-2 py-0.5 rounded-sm border border-accent-gold/20 font-semibold">168 XP</span>
                  </div>

                  {/* Active Path Cards */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-[#202022] border border-stone-800 rounded-md p-3.5 flex flex-col justify-between h-28 text-left">
                      <span className="text-[10px] text-text-muted font-body leading-none">Course</span>
                      <h5 className="text-small font-heading font-extrabold text-white leading-tight">Data Structures & Algos</h5>
                      <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-3">
                        <div className="bg-accent-gold h-full w-[65%]" />
                      </div>
                    </div>
                    <div className="bg-[#202022] border border-stone-800 rounded-md p-3.5 flex flex-col justify-between h-28 text-left">
                      <span className="text-[10px] text-text-muted font-body leading-none">Course</span>
                      <h5 className="text-small font-heading font-extrabold text-white leading-tight">Human Centered UI/UX</h5>
                      <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden mt-3">
                        <div className="bg-accent-blue h-full w-[85%]" />
                      </div>
                    </div>
                  </div>

                  {/* Progress chart representation */}
                  <div className="bg-[#202022] border border-stone-800 rounded-md p-3 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-text-muted font-body leading-none">Weekly Progress</span>
                      <span className="text-[10px] text-success font-semibold leading-none">+25% Study Hours</span>
                    </div>
                    {/* Simulated chart vectors */}
                    <div className="w-full h-8 flex items-end justify-between px-2 pt-2 gap-1.5 select-none">
                      <div className="w-full bg-stone-800 h-2 rounded-t-sm" />
                      <div className="w-full bg-stone-800 h-4 rounded-t-sm" />
                      <div className="w-full bg-accent-gold h-6 rounded-t-sm" />
                      <div className="w-full bg-stone-800 h-3 rounded-t-sm" />
                      <div className="w-full bg-accent-blue h-8 rounded-t-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile floating mockup (overlapping bottom right) */}
            <div className="absolute -right-4 -bottom-8 w-44 bg-[#18181a] border border-stone-850 rounded-2xl shadow-paper-floating p-2 hidden sm:block">
              {/* Phone speaker/camera notch */}
              <div className="w-16 h-3.5 bg-stone-850 rounded-full mx-auto mb-2" />
              {/* Inner phone body */}
              <div className="bg-[#202022] border border-stone-800 rounded-xl p-3 space-y-3.5 min-h-[180px] text-left">
                <span className="text-[9px] text-text-muted font-body font-semibold uppercase tracking-wider block">Course Path</span>
                <h6 className="text-[11px] font-heading font-extrabold text-white leading-tight">Code Structures</h6>
                {/* Simulated vertical node path */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                    <span className="text-[9px] text-stone-200">1. Introduction</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                    <span className="text-[9px] text-stone-200">2. Basic Variables</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-accent-gold bg-transparent shrink-0" />
                    <span className="text-[9px] text-stone-200 font-semibold text-accent-gold">3. Routing Layouts</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </Section>
  );
}
