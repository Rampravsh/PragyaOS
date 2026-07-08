import { FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { BookIcon, LogoIcon } from '@pragyaos/icons';
import ThemeToggle from '@/layouts/marketing/ThemeToggle';

const learningCards = [
  { title: 'Foundations of Mindful Learning', progress: 100, offset: 'ml-20' },
  { title: 'Critical Thinking in Everyday Life', progress: 75, offset: 'ml-10' },
  { title: 'Express Ideas with Confidence', progress: 25, offset: 'ml-0' },
];

export function LoginComposition(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[#f8f4ec] text-[#1c211d] dark:bg-[#111815] dark:text-[#f8f4ec] xl:grid xl:grid-cols-[minmax(390px,44%)_minmax(0,56%)]">
      <aside className="relative min-h-[240px] overflow-hidden bg-[#123c2c] px-5 py-6 text-white sm:min-h-[280px] sm:px-10 sm:py-8 xl:min-h-[100dvh] xl:px-10 xl:py-8 2xl:px-16 2xl:py-10 [@media(min-width:1280px)_and_(max-height:800px)]:py-6">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#e3bd68_0.7px,transparent_0.7px)] [background-size:7px_7px]" />
        <div className="absolute -right-20 top-28 h-72 w-72 rounded-full border border-[#d7ae57]/20" />
        <div className="absolute -right-8 top-48 h-48 w-48 rounded-full border border-[#d7ae57]/15" />

        <div className="relative z-10 mx-auto flex h-full max-w-xl flex-col">
          <Link to="/" className="inline-flex w-fit items-center gap-3 text-[#f9f3e7]" aria-label="PragyaOS home">
            <LogoIcon size={31} className="text-[#e6bc62]" />
            <span className="font-serif text-3xl font-semibold tracking-tight">PragyaOS</span>
          </Link>

          <div className="mt-8 max-w-md sm:mt-10 xl:mt-[7vh] [@media(min-width:1280px)_and_(max-height:800px)]:mt-8">
            <h2 className="max-w-[9ch] font-serif text-[2.65rem] font-medium leading-[0.94] tracking-[-0.035em] min-[400px]:text-5xl sm:text-6xl xl:text-[clamp(3.4rem,4.3vw,4.4rem)]">
              Learning that stays with you.
            </h2>
            <div className="mt-5 flex items-center gap-3 text-[#e6bc62] sm:mt-7 [@media(min-width:1280px)_and_(max-height:800px)]:mt-4">
              <span className="h-px w-20 bg-current" />
              <span className="text-lg">✦</span>
            </div>
            <p className="mt-4 hidden max-w-sm text-sm leading-6 text-[#eef3ed]/80 min-[480px]:block sm:mt-5 sm:text-base xl:max-w-xs [@media(min-width:1280px)_and_(max-height:720px)]:hidden">
              Thoughtfully designed learning paths to build knowledge, clarify thinking, and grow with purpose.
            </p>
          </div>

          <div className="relative mt-8 hidden w-full min-w-0 max-w-md flex-1 xl:block [@media(min-width:1280px)_and_(max-height:800px)]:mt-5">
            <div className="absolute bottom-5 left-24 h-[78%] w-28 rotate-[20deg] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(235,186,83,0.28),transparent_68%)] blur-sm" />
            <div className="absolute bottom-10 left-40 h-[75%] w-px rotate-[28deg] bg-gradient-to-t from-[#e6bc62]/70 to-transparent" />
            <div className="relative space-y-[-6px] pt-2 [@media(min-width:1280px)_and_(max-height:720px)]:scale-[0.82] [@media(min-width:1280px)_and_(max-height:720px)]:origin-top-left">
              {learningCards.map((card, index) => (
                <div
                  key={card.title}
                  className={`${card.offset} relative flex w-[min(20rem,calc(100%-5rem))] min-w-0 items-center gap-3 rounded-xl border border-[#e8c982]/55 bg-[#183e30]/90 p-3 shadow-[0_12px_35px_rgba(4,20,13,0.28)] backdrop-blur-sm`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-[#e8c982]/35 bg-[#f3ead7]/10 text-[#f1d18c]">
                    {index === 2 ? <BookIcon size={24} /> : <LogoIcon size={24} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-5 text-[#fffaf0]">{card.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
                        <div className="h-full rounded-full bg-[#e6bc62]" style={{ width: `${card.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-white/70">{card.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -bottom-9 -left-4 h-20 w-[110%] -rotate-2 bg-[#f8f4ec] dark:bg-[#111815] [clip-path:polygon(0_57%,6%_45%,12%_60%,19%_43%,27%_59%,35%_42%,44%_58%,52%_43%,61%_59%,70%_42%,79%_58%,88%_41%,100%_56%,100%_100%,0_100%)] xl:block" />
      </aside>

      <section className="relative flex min-h-[calc(100dvh-240px)] items-center justify-center px-4 pb-8 pt-16 sm:min-h-[calc(100dvh-280px)] sm:px-8 sm:pb-12 sm:pt-20 xl:min-h-[100dvh] xl:px-8 xl:py-8 2xl:px-12 2xl:py-10 [@media(min-width:1280px)_and_(max-height:800px)]:py-5">
        <div className="absolute right-4 top-4 z-20 sm:right-8 sm:top-6 xl:right-8 xl:top-7">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[630px] rounded-[18px] bg-transparent px-1 py-4 sm:rounded-[22px] sm:border sm:border-[#d9ccb8] sm:bg-white/65 sm:px-10 sm:py-10 sm:shadow-[0_18px_55px_rgba(62,48,28,0.09)] sm:backdrop-blur-sm sm:dark:border-white/10 sm:dark:bg-white/[0.035] lg:px-14 xl:px-[clamp(2.25rem,4vw,4rem)] [@media(min-width:1280px)_and_(max-height:800px)]:py-6">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-[#173e2e] dark:text-[#f4ecd9]">
              <LogoIcon size={35} className="text-[#c79436]" />
              <span className="font-serif text-3xl font-semibold">PragyaOS</span>
            </Link>
            <h1 className="mt-4 font-serif text-[2.7rem] font-medium leading-none tracking-[-0.035em] text-[#171a17] dark:text-white min-[400px]:text-5xl sm:mt-5 sm:text-[3.5rem] 2xl:text-[4rem] [@media(min-width:1280px)_and_(max-height:800px)]:text-5xl">Welcome back</h1>
            <p className="mt-2 text-sm text-[#6f716e] dark:text-white/55 sm:text-base">Continue your learning journey</p>
          </div>

          <form className="mt-7 space-y-4 sm:mt-8 sm:space-y-5 [@media(min-width:1280px)_and_(max-height:800px)]:mt-5 [@media(min-width:1280px)_and_(max-height:800px)]:space-y-3" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Email</span>
              <span className="flex h-12 items-center rounded-xl border border-[#d7d4cc] bg-white px-3 transition focus-within:border-[#1c513b] focus-within:ring-2 focus-within:ring-[#1c513b]/10 dark:border-white/15 dark:bg-white/5 sm:h-14 sm:px-4 [@media(min-width:1280px)_and_(max-height:800px)]:h-11">
                <span className="mr-3 text-lg text-[#777b76]" aria-hidden="true">✉</span>
                <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#a2a39f]" />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Password</span>
              <span className="flex h-12 items-center rounded-xl border border-[#d7d4cc] bg-white px-3 transition focus-within:border-[#1c513b] focus-within:ring-2 focus-within:ring-[#1c513b]/10 dark:border-white/15 dark:bg-white/5 sm:h-14 sm:px-4 [@media(min-width:1280px)_and_(max-height:800px)]:h-11">
                <span className="mr-3 text-lg text-[#777b76]" aria-hidden="true">♙</span>
                <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" required placeholder="Enter your password" className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#a2a39f]" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="ml-2 rounded p-1 text-[#666b67] hover:text-[#173e2e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c513b]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? '◉' : '◎'}
                </button>
              </span>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs min-[380px]:text-sm">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="h-4 w-4 accent-[#174b36]" />
                <span>Remember me</span>
              </label>
              <button type="button" className="font-medium text-[#174b36] hover:underline dark:text-[#dfc17b]">Forgot password?</button>
            </div>

            <button type="submit" className="h-12 w-full rounded-xl bg-[#174b36] text-base font-semibold text-white shadow-[0_7px_18px_rgba(23,75,54,0.2)] transition hover:bg-[#103d2b] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174b36] focus-visible:ring-offset-2 sm:h-14 [@media(min-width:1280px)_and_(max-height:800px)]:h-11">Sign in</button>

            <div className="flex items-center gap-3 whitespace-nowrap text-xs text-[#85857f] min-[380px]:gap-4 min-[380px]:text-sm">
              <span className="h-px flex-1 bg-[#d8d0c2] dark:bg-white/15" />
              <span>or continue with</span>
              <span className="h-px flex-1 bg-[#d8d0c2] dark:bg-white/15" />
            </div>

            <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#d7d4cc] bg-white/70 text-sm font-semibold transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10 sm:h-14 [@media(min-width:1280px)_and_(max-height:800px)]:h-11">
              <span className="text-lg font-bold text-[#4285f4]">G</span>
              Sign in with Google
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-[#777873] dark:text-white/55 min-[380px]:text-sm sm:mt-6 [@media(min-width:1280px)_and_(max-height:800px)]:mt-4">
            New to PragyaOS?{' '}
            <button type="button" className="font-semibold text-[#174b36] hover:underline dark:text-[#dfc17b]">Create an account</button>
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginComposition;
