/** 70s-style parallel wave stripes — cream field + hot pink (inspired by reference art) */
const CREAM = '#f7dc94';
const PINK = '#ff77c0';

function wavePath(verticalOffset: number): string {
  const o = verticalOffset;
  return `M -220 ${95 + o} C 240 ${72 + o}, 360 ${900 + o}, 640 ${965 + o} C 920 ${900 + o}, 1090 ${228 + o}, 1320 ${168 + o} C 1485 ${128 + o}, 1680 ${108 + o}, 1880 ${142 + o}`;
}

export function GroovyWaveBackground() {
  const stripeCount = 15;
  const step = 24;
  const start = (-((stripeCount - 1) / 2) * step);
  const strokeWidth = step * 0.82;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="h-[115%] w-[118%] min-h-full min-w-full -translate-x-[6%] -translate-y-[4%]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect x="-200" y="-200" width="2000" height="1400" fill={CREAM} />
        <g
          fill="none"
          stroke={PINK}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.97}
        >
          {Array.from({ length: stripeCount }, (_, i) => (
            <path key={i} d={wavePath(start + i * step)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
