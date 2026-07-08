import { motion } from 'framer-motion';
import { mockProgressStats } from '@/features/dashboard/api/dashboard.mock';

// ─── SparklineChart ───────────────────────────────────────────────────────────
// Lightweight inline SVG sparkline — no external chart library needed.

function SparklineChart() {
  const data = mockProgressStats.weeklyData;
  const W = 220;
  const H = 64;
  const pad = 8;
  const plotW = W - pad * 2;
  const plotH = H - pad * 2;

  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * plotW,
    y: pad + plotH - ((d.value - min) / range) * plotH,
    label: d.day,
    value: d.value,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="flex flex-col gap-1">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        aria-label="Weekly progress chart"
        role="img"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={pad}
            y1={pad + (i * plotH) / 3}
            x2={W - pad}
            y2={pad + (i * plotH) / 3}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-border"
            strokeDasharray="3,3"
          />
        ))}

        {/* Sparkline */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="currentColor"
          className="text-muted-foreground"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Dots */}
        {points.map((p) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={2.5}
            className="fill-muted-foreground"
          />
        ))}

        {/* Last dot highlighted */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={4}
            className="fill-success"
          />
        )}
      </svg>

      {/* Day labels */}
      <div className="flex justify-between px-2">
        {data.map((d) => (
          <span key={d.day} className="font-sans text-[10px] text-muted-foreground">
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── StatCell ─────────────────────────────────────────────────────────────────

function StatCell({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-sans font-bold text-lg text-foreground leading-none">
        {value}{suffix}
      </span>
      <span className="font-sans text-[11px] text-muted-foreground text-center leading-snug">
        {label}
      </span>
    </div>
  );
}

// ─── ProgressWidget ───────────────────────────────────────────────────────────

export function ProgressWidget(): React.JSX.Element {
  const stats = mockProgressStats;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      aria-labelledby="progress-heading"
      className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          id="progress-heading"
          className="font-sans font-semibold text-sm text-foreground"
        >
          Your Progress
        </h2>
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-fast font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          This Week ↓
        </button>
      </div>

      {/* Overall percent + growth */}
      <div className="flex items-baseline gap-2">
        <span className="font-sans font-bold text-4xl text-foreground leading-none">
          {stats.overallPercent}%
        </span>
        <div className="flex flex-col">
          <span className="font-sans text-xs font-semibold text-foreground">
            Overall Progress
          </span>
          <span className="font-sans text-xs text-success font-medium">
            ↑ {stats.growthPercent}%
          </span>
        </div>
      </div>

      {/* Sparkline chart */}
      <SparklineChart />

      {/* 4-stat grid */}
      <div
        className="grid grid-cols-4 gap-2 pt-2 border-t border-border"
        role="list"
        aria-label="Progress statistics"
      >
        <StatCell value={stats.coursesEnrolled} label="Courses Enrolled" />
        <StatCell value={stats.lessonsCompleted} label="Lessons Completed" />
        <StatCell value={stats.learningHours} label="Learning Time" suffix="h" />
        <StatCell value={stats.certificates} label="Certificates" />
      </div>
    </motion.section>
  );
}

export default ProgressWidget;
