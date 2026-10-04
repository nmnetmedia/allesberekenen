import { useState } from 'preact/hooks';

export interface StackedDatum {
  label: string;
  /** Onderste segment. */
  a: number;
  /** Bovenste segment. */
  b: number;
}

interface Props {
  data: StackedDatum[];
  seriesA: { name: string; color: string };
  seriesB: { name: string; color: string };
  format: (v: number) => string;
  formatAxis: (v: number) => string;
  ariaLabel: string;
  totalLabel?: string;
}

const W = 640;
const H = 260;
const PAD = { top: 12, right: 8, bottom: 26, left: 56 };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

/**
 * Lichtgewicht gestapelde staafgrafiek in SVG (geen chartlibrary).
 * Hover/focus toont een tooltip; de bijbehorende tabel staat altijd onder de grafiek.
 */
export function StackedBars({ data, seriesA, seriesB, format, formatAxis, ariaLabel, totalLabel = 'Totaal' }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...data.map((d) => d.a + Math.max(0, d.b))));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const step = innerW / data.length;
  const barW = Math.max(2, Math.min(28, step - 2));
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const labelEvery = Math.ceil(data.length / 10);
  const act = active !== null ? data[active] : null;

  return (
    <div class="chart-wrap">
      <div class="chart-legend" style={{ marginBottom: '8px' }}>
        <span>
          <i style={{ background: seriesA.color }} /> {seriesA.name}
        </span>
        <span>
          <i style={{ background: seriesB.color }} /> {seriesB.name}
        </span>
      </div>
      <svg class="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} onMouseLeave={() => setActive(null)}>
        <g class="grid">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
              <text x={PAD.left - 8} y={y(t) + 4} text-anchor="end">
                {formatAxis(t)}
              </text>
            </g>
          ))}
        </g>
        {data.map((d, i) => {
          const x = PAD.left + i * step + (step - barW) / 2;
          const hA = (d.a / max) * innerH;
          const hB = (Math.max(0, d.b) / max) * innerH;
          const gap = hB > 2 ? 2 : 0;
          const r = Math.min(4, barW / 2);
          return (
            <g key={d.label} opacity={active === null || active === i ? 1 : 0.55}>
              <rect x={x} y={y(d.a)} width={barW} height={Math.max(0, hA)} fill={seriesA.color} rx={hB > 0 ? 0 : r} />
              {hB > 0 && <rect x={x} y={y(d.a) - hB} width={barW} height={Math.max(0, hB - gap)} fill={seriesB.color} rx={r} />}
              {i % labelEvery === 0 && (
                <text x={x + barW / 2} y={H - 8} text-anchor="middle">
                  {d.label}
                </text>
              )}
              <rect
                class="bar-hit"
                x={PAD.left + i * step}
                y={PAD.top}
                width={step}
                height={innerH}
                tabIndex={-1}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              />
            </g>
          );
        })}
      </svg>
      {act && active !== null && (
        <div
          class="chart-tip"
          style={{
            left: `${Math.min(85, Math.max(15, ((PAD.left + active * step + step / 2) / W) * 100))}%`,
            top: `${(y(act.a + Math.max(0, act.b)) / H) * 100}%`,
          }}
        >
          <b>{act.label}</b>
          <br />
          {seriesA.name}: {format(act.a)}
          <br />
          {seriesB.name}: {format(act.b)}
          <br />
          {totalLabel}: <b>{format(act.a + act.b)}</b>
        </div>
      )}
    </div>
  );
}
