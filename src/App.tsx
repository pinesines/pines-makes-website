import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { GroovyWaveBackground } from './GroovyWaveBackground';

/** Vite base path — `'/'` in dev, `'/pines-makes-website/'` in production Pages build */
const STATIC_BASE = import.meta.env.BASE_URL;

/** Wavy section transition (1960s organic flow) */
function WaveDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className ?? ''}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 72"
        className="relative block h-10 w-full md:h-14"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,40 C200,8 400,72 600,38 C800,4 1000,68 1200,36 L1200,72 L0,72 Z"
        />
      </svg>
    </div>
  );
}

/** Static hero logotype — bubble style (see docs/font-2.png) */
const HERO_LOGO_LETTER_COLOR = 'text-tuft-peachy';

function BubbleDisplayTitle({
  text,
  as,
  className = '',
}: {
  text: string;
  as: 'h1' | 'h2' | 'h3';
  className?: string;
}) {
  const upper = text.toUpperCase();
  const Comp = as;

  return (
    <Comp
      className={`hero-bubble-title px-2 text-center uppercase leading-none tracking-[-0.06em] ${className}`}
      style={{ wordSpacing: '-0.12em' }}
    >
      {upper.split('').map((ch, i) => {
        if (ch === ' ') {
          return <span key={i} className="inline-block w-[0.22em] md:w-[0.3em]" aria-hidden />;
        }
        return (
          <span key={i} className={`hero-bubble-letter ${HERO_LOGO_LETTER_COLOR}`}>
            {ch}
          </span>
        );
      })}
    </Comp>
  );
}

/** One rounded petal, tip toward top (−Y); rotates around 100,100 (5-fold symmetry) */
const FLOWER_PETAL_5_D =
  'M 100 34 C 118 44 126 72 116 90 C 110 96 104 99 100 100 C 96 99 90 96 84 90 C 74 72 82 44 100 34 Z';

/** Simple paired leaves below the bloom */
const FLOWER_LEAF_LEFT_D =
  'M 100 101 C 88 104 74 118 72 136 C 69 152 79 160 88 150 C 94 140 98 118 100 106 Z';
const FLOWER_LEAF_RIGHT_D =
  'M 100 101 C 112 104 126 118 128 136 C 131 152 121 160 112 150 C 106 140 102 118 100 106 Z';

const PETAL_ROTATIONS_5 = [0, 72, 144, 216, 288];

/** Small five-petal flower with leaves (scattered accents) */
function FlowerDecal({
  className,
  colors,
}: {
  className?: string;
  colors?: { petal: string; center: string; leaf?: string; leafAlt?: string };
}) {
  const petal = colors?.petal ?? '#ff7a1a';
  const center = colors?.center ?? '#ff7a1a';
  const leaf = colors?.leaf ?? '#0d9e90';
  const leafAlt = colors?.leafAlt ?? '#067a6f';

  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <g style={{ transformOrigin: '100px 100px' }}>
        <path d={FLOWER_LEAF_LEFT_D} fill={leaf} />
        <path d={FLOWER_LEAF_RIGHT_D} fill={leafAlt} />
        {PETAL_ROTATIONS_5.map((deg) => (
          <path key={deg} d={FLOWER_PETAL_5_D} fill={petal} transform={`rotate(${deg} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="18" fill={center} />
      </g>
    </svg>
  );
}

type FlowerSpot = {
  className: string;
  colors?: { petal: string; center: string; leaf?: string; leafAlt?: string };
};

function ScatteredLittleFlowers({ spots }: { spots: FlowerSpot[] }) {
  return (
    <>
      {spots.map((spot, i) => (
        <FlowerDecal key={i} colors={spot.colors} className={`pointer-events-none absolute ${spot.className}`} />
      ))}
    </>
  );
}

/** Scattered accent flowers — rotate pink / yellow / lilac / mint / blue */
const FLOWER_ACCENTS = {
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
} as const satisfies Record<string, NonNullable<FlowerSpot['colors']>>;

const FLOWER_ON_TEAL = {
  pink: { ...FLOWER_ACCENTS.pink, leaf: '#043d38', leafAlt: '#022925' },
  yellow: { ...FLOWER_ACCENTS.yellow, leaf: '#043d38', leafAlt: '#022925' },
  lilac: { ...FLOWER_ACCENTS.lilac, leaf: '#043d38', leafAlt: '#022925' },
  mint: { ...FLOWER_ACCENTS.mint, leaf: '#043d38', leafAlt: '#022925' },
  blue: { ...FLOWER_ACCENTS.blue, leaf: '#043d38', leafAlt: '#022925' },
} as const;

const heroLittleFlowers: FlowerSpot[] = [
  { className: 'left-[5%] top-[8%] w-12 opacity-45 -rotate-[18deg]', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[14%] top-[22%] w-14 opacity-35 rotate-6', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[7%] top-[12%] w-14 opacity-40 rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[18%] top-[28%] w-12 opacity-30 -rotate-8', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[8%] top-[42%] w-12 opacity-35 rotate-[22deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[6%] top-[48%] w-12 opacity-35 -rotate-6', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[3%] bottom-[28%] w-12 opacity-40 -rotate-12', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[20%] bottom-[18%] w-14 opacity-30 rotate-9', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[4%] bottom-[22%] w-11 opacity-45 rotate-[14deg]', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[16%] bottom-[10%] w-14 opacity-35 -rotate-[10deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[42%] top-[6%] w-10 opacity-25 -rotate-45 hidden sm:block', colors: FLOWER_ACCENTS.pink },
  { className: 'right-[40%] bottom-[14%] w-10 opacity-25 rotate-12 hidden sm:block', colors: FLOWER_ACCENTS.yellow },
];

const galleryLittleFlowers: FlowerSpot[] = [
  { className: 'left-[4%] top-[6%] w-12 opacity-35 -rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[12%] top-[32%] w-11 opacity-30 rotate-9 hidden lg:block', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[8%] top-[14%] w-12 opacity-35 rotate-6', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[3%] top-[48%] w-11 opacity-25 -rotate-[16deg]', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[6%] bottom-[20%] w-12 opacity-30 rotate-12', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[14%] bottom-[8%] w-14 opacity-35 -rotate-6', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[35%] top-[18%] w-10 opacity-20 rotate-45 hidden md:block', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[38%] bottom-[24%] w-10 opacity-22 -rotate-12 hidden md:block', colors: FLOWER_ACCENTS.blue },
];

const contactLittleFlowers: FlowerSpot[] = [
  { className: 'left-[4%] top-[10%] w-12 opacity-40 -rotate-10', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[16%] top-[22%] w-14 opacity-35 rotate-8', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[6%] top-[14%] w-12 opacity-35 rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[15%] top-[8%] w-11 opacity-30 -rotate-6', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[8%] bottom-[30%] w-12 opacity-35 rotate-[18deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[22%] bottom-[12%] w-11 opacity-30 -rotate-12', colors: FLOWER_ACCENTS.pink },
  { className: 'right-[5%] bottom-[18%] w-14 opacity-40 -rotate-9', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[20%] bottom-[8%] w-12 opacity-35 rotate-6', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[45%] top-[6%] w-10 opacity-25 rotate-45 hidden sm:block', colors: FLOWER_ACCENTS.mint },
];

const tealBannerLittleFlowers: FlowerSpot[] = [
  { className: 'left-[5%] top-[18%] w-12 opacity-45 -rotate-12', colors: FLOWER_ON_TEAL.pink },
  { className: 'left-[14%] bottom-[22%] w-11 opacity-40 rotate-9', colors: FLOWER_ON_TEAL.yellow },
  { className: 'right-[7%] top-[20%] w-12 opacity-45 rotate-6', colors: FLOWER_ON_TEAL.lilac },
  { className: 'right-[18%] bottom-[26%] w-12 opacity-40 -rotate-[14deg]', colors: FLOWER_ON_TEAL.mint },
  { className: 'left-[32%] top-[12%] w-10 opacity-35 rotate-45 hidden md:block', colors: FLOWER_ON_TEAL.blue },
  { className: 'right-[35%] bottom-[14%] w-10 opacity-35 -rotate-6 hidden md:block', colors: FLOWER_ON_TEAL.pink },
];

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass =
    'font-sans text-xs font-normal uppercase tracking-[0.22em] text-stone-900 transition-colors hover:text-tuft-orange md:text-[13px]';

  const primaryBtnClass =
    'font-sans cursor-pointer rounded-sm border-2 border-stone-900 bg-tuft-orange px-5 py-2.5 text-xs font-normal uppercase tracking-[0.2em] text-white shadow-[3px_3px_0_0_#0f0f0f] transition-[transform,box-shadow,background-color] hover:bg-tuft-magenta hover:shadow-[2px_2px_0_0_#0f0f0f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none md:px-6 md:text-[13px]';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 font-sans">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between rounded-sm border-2 border-stone-900 bg-white px-4 nav-brutal-shadow md:h-[3.75rem] md:px-6">
        <a href="#" className={navLinkClass}>
          Home
        </a>

        <div className="hidden items-center gap-8 md:flex md:gap-10">
          <a href="#" className={navLinkClass}>
            Gallery
          </a>
          <a href="#" className={navLinkClass}>
            Process
          </a>
          <button type="button" onClick={onContactClick} className={primaryBtnClass}>
            Order Custom
          </button>
        </div>

        <button
          type="button"
          className="rounded-sm border-2 border-stone-900 bg-white p-2 text-stone-900 shadow-[2px_2px_0_0_#0f0f0f] transition-[transform,box-shadow] hover:bg-soft-bg md:hidden"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] right-4 left-4 mx-auto max-w-7xl rounded-sm border-2 border-stone-900 bg-white p-6 nav-brutal-shadow md:hidden"
          >
            <div className="flex flex-col gap-5">
              <a href="#" onClick={() => setIsOpen(false)} className={`${navLinkClass} text-base`}>
                Home
              </a>
              <a href="#" onClick={() => setIsOpen(false)} className={`${navLinkClass} text-base`}>
                Gallery
              </a>
              <a href="#" onClick={() => setIsOpen(false)} className={`${navLinkClass} text-base`}>
                Process
              </a>
              <button
                type="button"
                onClick={() => {
                  onContactClick();
                  setIsOpen(false);
                }}
                className={`${primaryBtnClass} w-full py-3.5`}
              >
                Contact Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-12">
      <ScatteredLittleFlowers spots={heroLittleFlowers} />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[1] -rotate-1 mb-10 md:mb-16"
      >
        <BubbleDisplayTitle
          text="Pines Makes"
          as="h1"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.5rem]"
        />
      </motion.div>

      <div className="relative z-[1] mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-block rounded-sm border-2 border-stone-900 bg-tuft-yellow px-4 py-1.5 font-sans text-[10px] font-normal uppercase tracking-[0.28em] text-stone-900 shadow-[3px_3px_0_0_#0f0f0f] md:px-5 md:text-xs">
              Handcrafted Tufted Art
            </div>
            <h2 className="mb-8 font-sans text-5xl leading-[0.95] text-stone-900 md:text-7xl lg:text-8xl">
              No Two Rugs Alike
            </h2>
            <p className="mb-10 max-w-md font-sans text-lg leading-relaxed text-stone-600">
              Unique tufted wall hangings designed to bring warmth, color, and a touch of groovy retro
              whimsy to your space.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                className="group flex cursor-pointer items-center gap-2 rounded-sm border-2 border-stone-900 bg-tuft-teal px-7 py-3 font-sans text-sm font-normal uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_0_#0f0f0f] transition-[transform,box-shadow,filter] hover:brightness-110 hover:shadow-[3px_3px_0_0_#0f0f0f] active:translate-x-1 active:translate-y-1 active:shadow-none md:px-8 md:text-[15px]"
              >
                View Collection
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="relative mx-auto aspect-square w-full max-w-lg"
          >
            <div
              className="absolute -inset-3 -z-20 rotate-6 bg-tuft-yellow/50"
              style={{ borderRadius: '58% 42% 48% 52% / 52% 45% 55% 48%' }}
            />
            <div
              className="absolute -inset-2 -z-10 -rotate-6 bg-tuft-lilac/25"
              style={{ borderRadius: '45% 55% 62% 38% / 40% 55% 45% 60%' }}
            />
            <div
              className="relative h-full w-full overflow-hidden shadow-[0_28px_60px_-20px_rgb(45_30_50_0.22),0_12px_24px_-12px_rgb(45_30_50_0.12)] ring-4 ring-white/80"
              style={{ borderRadius: '46% 54% 52% 48% / 44% 48% 52% 56%' }}
            >
              <img
                src={`${STATIC_BASE}cheece-rug-1.jpg`}
                alt="Tufted wall art"
                className="h-full w-full object-cover"
                id="hero-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/** Cream → white handoff into gallery */
function HeroToGalleryWave() {
  return (
    <div className="bg-soft-bg">
      <WaveDivider className="text-white" />
    </div>
  );
}

const galleryItems = [
  { id: 1, title: 'Pastel Dream', accent: 'ring-tuft-yellow/60', blob: 'blob-squish-1', img: `${STATIC_BASE}rug-1.jpg` },
  { id: 2, title: 'Soft Waves', accent: 'ring-tuft-magenta/50', blob: 'blob-squish-2', img: `${STATIC_BASE}rug-2.jpg` },
  { id: 3, title: 'Retro Bloom', accent: 'ring-tuft-orange/50', blob: 'blob-squish-3', img: `${STATIC_BASE}rug-3.jpg` },
  { id: 4, title: 'Sunset Tuft', accent: 'ring-tuft-teal/50', blob: 'blob-squish-4', img: `${STATIC_BASE}rug-4.jpg` },
  { id: 5, title: 'Azure Flow', accent: 'ring-tuft-lime/50', blob: 'blob-squish-1', img: `${STATIC_BASE}rug-5.jpg` },
];

const Gallery = () => {
  return (
    <section className="shrink-0 bg-soft-bg">
      <div className="relative px-6 pb-24 pt-6">
        <ScatteredLittleFlowers spots={galleryLittleFlowers} />

        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 font-sans text-4xl text-stone-900 md:text-5xl">Latest Creations</h2>
              <p className="max-w-sm font-sans text-stone-600">
                Every piece is slow-made, ensuring the highest quality texture and detail.
              </p>
            </div>
            <div className="inline-flex items-center rounded-sm border-2 border-stone-900 bg-white px-5 py-2.5 font-sans text-[10px] font-normal uppercase tracking-[0.28em] text-stone-900 shadow-[3px_3px_0_0_#0f0f0f] md:text-xs">
              Est. 2024
            </div>
          </div>

          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-pointer"
              >
                <div
                  className={`blob-inflate relative mb-6 aspect-[4/5] overflow-hidden ring-4 ${item.blob} ${item.accent} transition-shadow duration-500`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 font-sans text-2xl text-stone-900">{item.title}</h3>
                <p className="font-sans text-sm font-semibold uppercase tracking-widest text-stone-400">
                  Tufted Wall Hanging
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ id }: { id: string }) => {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-gradient-to-b from-tuft-yellow/40 via-tuft-yellow/20 to-soft-bg px-6 py-28"
    >
      <ScatteredLittleFlowers spots={contactLittleFlowers} />

      <div className="relative z-[1] mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <BubbleDisplayTitle
            text="Work with me"
            as="h2"
            className="hero-bubble-section-title mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-[3.65rem]"
          />
          <p className="mb-12 font-sans text-xl text-stone-600">
            Have a specific color palette or design in mind? I love creating custom pieces for unique
            homes.
          </p>

          <div className="mb-16 grid gap-6 font-sans md:grid-cols-2">
            <div className="blob-inflate blob-squish-2 rounded-[2rem] bg-tuft-yellow p-8 transition-transform hover:scale-[1.02]">
              <Instagram className="mx-auto mb-4 text-tuft-orange" size={32} />
              <h4 className="mb-2 font-sans text-xl text-stone-900">Instagram</h4>
              <p className="mb-4 text-sm text-stone-700">DM for commissions</p>
              <a
                href="https://instagram.com/pinesmakes"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold tracking-widest text-tuft-teal uppercase hover:underline"
              >
                @pinesmakes
              </a>
            </div>
            <div className="blob-inflate blob-squish-3 rounded-[2rem] bg-tuft-lime/60 p-8 transition-transform hover:scale-[1.02]">
              <Mail className="mx-auto mb-4 text-tuft-teal" size={32} />
              <h4 className="mb-2 font-sans text-xl text-stone-900">Email</h4>
              <p className="mb-4 text-sm text-stone-700">Let&apos;s chat about art</p>
              <a
                href="mailto:pinesmakes@gmail.com"
                className="text-xs font-bold tracking-widest text-tuft-teal uppercase hover:underline"
              >
                pinesmakes@gmail.com
              </a>
            </div>
          </div>

          <form className="rounded-[2.75rem] border-2 border-tuft-orange/30 bg-white p-10 text-left shadow-[0_24px_56px_-24px_rgb(45_35_55_0.18),inset_0_1px_0_0_rgb(255_255_255_0.95)]">
            <div className="mb-6 grid gap-6 font-sans md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name-input" className="px-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
                  Your Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  className="w-full rounded-2xl border-none bg-soft-bg px-6 py-4 outline-none ring-2 ring-transparent transition-shadow focus:ring-tuft-magenta/35"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email-input" className="px-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
                  Email
                </label>
                <input
                  id="email-input"
                  type="email"
                  className="w-full rounded-2xl border-none bg-soft-bg px-6 py-4 outline-none ring-2 ring-transparent transition-shadow focus:ring-tuft-magenta/35"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div className="mb-8 space-y-2 font-sans">
              <label htmlFor="message-input" className="px-1 text-xs font-bold tracking-widest text-stone-500 uppercase">
                What are you looking for?
              </label>
              <textarea
                id="message-input"
                rows={4}
                className="w-full resize-none rounded-2xl border-none bg-soft-bg px-6 py-4 outline-none ring-2 ring-transparent transition-shadow focus:ring-tuft-magenta/35"
                placeholder="Tell me about your dream piece..."
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-sm border-2 border-stone-900 bg-tuft-magenta py-4 font-sans text-base font-normal uppercase tracking-[0.16em] text-white shadow-[4px_4px_0_0_#0f0f0f] transition-[transform,box-shadow,filter] hover:brightness-105 hover:shadow-[3px_3px_0_0_#0f0f0f] active:translate-x-1 active:translate-y-1 active:shadow-none md:py-5 md:text-lg"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-grain relative min-h-screen font-sans selection:bg-tuft-magenta selection:text-white">
      <GroovyWaveBackground />
      <Navbar onContactClick={scrollToContact} />
      <main className="relative z-[1]">
        <Hero />
        <HeroToGalleryWave />
        <Gallery />
        <div className="bg-white">
          <WaveDivider className="text-tuft-teal" />
        </div>
        <section className="relative overflow-hidden bg-tuft-teal px-6 py-24 text-center">
          <motion.div
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 130, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none flex gap-24 whitespace-nowrap opacity-[0.12]"
          >
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-sans text-8xl text-tuft-lime uppercase md:text-9xl">
                PINES MAKES • PINES MAKES •
              </span>
            ))}
          </motion.div>
          <ScatteredLittleFlowers spots={tealBannerLittleFlowers} />
          <div className="relative z-10 mx-auto max-w-4xl py-10">
            <h2 className="mb-8 font-sans text-4xl leading-tight text-white md:text-6xl">
              Bringing{' '}
              <span className="text-tuft-yellow">personality</span>{' '}
              to every stitch.
            </h2>
            <button
              type="button"
              onClick={scrollToContact}
              className="cursor-pointer rounded-sm border-2 border-stone-900 bg-tuft-orange px-8 py-4 font-sans text-base font-normal uppercase tracking-[0.18em] text-white shadow-[4px_4px_0_0_#0f0f0f] transition-[transform,box-shadow,background-color,color] hover:bg-tuft-yellow hover:text-stone-900 hover:shadow-[3px_3px_0_0_#0f0f0f] active:translate-x-1 active:translate-y-1 active:shadow-none md:px-10 md:text-lg"
            >
              Start a Commission
            </button>
          </div>
        </section>
        <div className="bg-tuft-teal">
          <WaveDivider className="text-soft-bg" />
        </div>
        <Contact id="contact-section" />
      </main>

      <footer className="relative z-[1] mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 border-t border-tuft-magenta/10 px-6 py-12 text-sm text-stone-500 font-sans md:flex-row">
        <img
          src={`${STATIC_BASE}font-2.png`}
          alt="Pines Makes"
          className="h-10 w-auto object-contain md:h-11"
          width={1024}
          height={1024}
        />
        <div className="flex gap-8 text-xs font-bold tracking-widest uppercase">
          <a href="#" className="transition-colors hover:text-tuft-teal">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-tuft-teal">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-tuft-teal">
            Shipping
          </a>
        </div>
        <div className="text-center md:text-right">© 2026 PINES MAKES STUDIO. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}
