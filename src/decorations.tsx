/** Shared flower decals and accent palettes for page sections */

import { Fragment } from 'react';

const FLOWER_PETAL_5_D =
  'M 100 34 C 118 44 126 72 116 90 C 110 96 104 99 100 100 C 96 99 90 96 84 90 C 74 72 82 44 100 34 Z';

const PETAL_ROTATIONS_5 = [0, 72, 144, 216, 288];

export const FLOWER_ACCENTS = {
  pink: {
    petal: '#fb9ec4',
    center: '#e11d74',
    leaf: '#14896d',
    leafAlt: '#0d6b52',
  },
  yellow: {
    petal: '#ffdd2e',
    center: '#f97316',
    leaf: '#1d9a72',
    leafAlt: '#157a59',
  },
  lilac: {
    petal: '#9d6bff',
    center: '#7c3aed',
    leaf: '#189873',
    leafAlt: '#127a5b',
  },
  mint: {
    petal: '#5eead4',
    center: '#0d9488',
    leaf: '#047857',
    leafAlt: '#065f46',
  },
  blue: {
    petal: '#7dd3fc',
    center: '#2563eb',
    leaf: '#14b8a6',
    leafAlt: '#0d9488',
  },
} as const;

export type FlowerColors = {
  petal: string;
  center: string;
  leaf?: string;
  leafAlt?: string;
};

function FlowerDecal({
  className,
  colors,
}: {
  className?: string;
  colors?: FlowerColors;
}) {
  const petal = colors?.petal ?? '#ff7a1a';
  const center = colors?.center ?? '#ff7a1a';

  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <g style={{ transformOrigin: '100px 100px' }}>
        <g transform="translate(100 100) scale(1.1) translate(-100 -100)">
          {PETAL_ROTATIONS_5.map((deg) => (
            <path key={deg} d={FLOWER_PETAL_5_D} fill={petal} transform={`rotate(${deg} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="21" fill={center} />
        </g>
      </g>
    </svg>
  );
}

export type FlowerSpot = {
  className: string;
  colors?: FlowerColors;
  colorsKey?: keyof typeof FLOWER_ACCENTS;
};

export function ScatteredLittleFlowers({ spots }: { spots: FlowerSpot[] }) {
  return (
    <>
      {spots.map((spot, i) => (
        <Fragment key={i}>
          <FlowerDecal
            colors={spot.colors ?? (spot.colorsKey ? FLOWER_ACCENTS[spot.colorsKey] : undefined)}
            className={`pointer-events-none absolute ${spot.className}`}
          />
        </Fragment>
      ))}
    </>
  );
}
