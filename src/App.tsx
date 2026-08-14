import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, ArrowRight, Menu, X } from 'lucide-react';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { GalleryPage } from './GalleryPage';
import { FLOWER_ACCENTS, ScatteredLittleFlowers, type FlowerSpot } from './decorations';
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
  letterClassName,
}: {
  text: string;
  as: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Per-letter Tailwind colour (default: `HERO_LOGO_LETTER_COLOR`) */
  letterClassName?: string;
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
          <span
            key={i}
            className={`hero-bubble-letter ${letterClassName ?? HERO_LOGO_LETTER_COLOR}`}
          >
            {ch}
          </span>
        );
      })}
    </Comp>
  );
}

const FLOWER_ON_TEAL = {
  pink: { ...FLOWER_ACCENTS.pink, leaf: '#043d38', leafAlt: '#022925' },
  yellow: { ...FLOWER_ACCENTS.yellow, leaf: '#043d38', leafAlt: '#022925' },
  lilac: { ...FLOWER_ACCENTS.lilac, leaf: '#043d38', leafAlt: '#022925' },
  mint: { ...FLOWER_ACCENTS.mint, leaf: '#043d38', leafAlt: '#022925' },
  blue: { ...FLOWER_ACCENTS.blue, leaf: '#043d38', leafAlt: '#022925' },
} as const;

const heroLittleFlowers: FlowerSpot[] = [
  { className: 'left-[5%] top-[8%] w-16 opacity-45 -rotate-[18deg]', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[14%] top-[22%] w-20 opacity-35 rotate-6', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[7%] top-[12%] w-20 opacity-40 rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[18%] top-[28%] w-16 opacity-30 -rotate-8', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[8%] top-[42%] w-16 opacity-35 rotate-[22deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[6%] top-[48%] w-16 opacity-35 -rotate-6', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[3%] bottom-[28%] w-16 opacity-40 -rotate-12', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[20%] bottom-[18%] w-20 opacity-30 rotate-9', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[4%] bottom-[22%] w-14 opacity-45 rotate-[14deg]', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[16%] bottom-[10%] w-20 opacity-35 -rotate-[10deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[42%] top-[6%] w-12 opacity-25 -rotate-45 hidden sm:block', colors: FLOWER_ACCENTS.pink },
  { className: 'right-[40%] bottom-[14%] w-12 opacity-25 rotate-12 hidden sm:block', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[52%] top-[24%] w-14 opacity-22 rotate-[12deg] hidden md:block', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[52%] top-[38%] w-14 opacity-20 -rotate-9 hidden lg:block', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[46%] bottom-[8%] w-14 opacity-24 rotate-[8deg] hidden md:block', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[30%] top-[62%] w-14 opacity-18 -rotate-12 hidden xl:block', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[26%] top-[62%] w-14 opacity-20 rotate-[16deg] hidden xl:block', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[92%] top-[36%] w-14 opacity-25 -rotate-6 hidden xl:block', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[54%] top-[14%] w-12 opacity-18 rotate-[20deg] hidden lg:block', colors: FLOWER_ACCENTS.blue },
];

const galleryLittleFlowers: FlowerSpot[] = [
  { className: 'left-[4%] top-[6%] w-16 opacity-35 -rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[12%] top-[32%] w-14 opacity-30 rotate-9 hidden lg:block', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[8%] top-[14%] w-16 opacity-35 rotate-6', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[3%] top-[48%] w-14 opacity-25 -rotate-[16deg]', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[6%] bottom-[20%] w-16 opacity-30 rotate-12', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[14%] bottom-[8%] w-20 opacity-35 -rotate-6', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[35%] top-[18%] w-12 opacity-20 rotate-45 hidden md:block', colors: FLOWER_ACCENTS.mint },
  { className: 'right-[38%] bottom-[24%] w-12 opacity-22 -rotate-12 hidden md:block', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[52%] top-[8%] w-14 opacity-22 rotate-10 hidden lg:block', colors: FLOWER_ACCENTS.pink },
  { className: 'right-[48%] bottom-[42%] w-14 opacity-18 -rotate-8 hidden xl:block', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[92%] top-[22%] w-14 opacity-24 rotate-[14deg] hidden md:block', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[94%] bottom-[18%] w-14 opacity-20 -rotate-10 hidden xl:block', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[72%] top-[58%] w-14 opacity-16 rotate-[22deg] hidden lg:block', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[30%] bottom-[46%] w-14 opacity-18 -rotate-6 hidden xl:block', colors: FLOWER_ACCENTS.pink },
];

const contactLittleFlowers: FlowerSpot[] = [
  { className: 'left-[4%] top-[10%] w-16 opacity-40 -rotate-10', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[16%] top-[22%] w-20 opacity-35 rotate-8', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[6%] top-[14%] w-16 opacity-35 rotate-12', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[15%] top-[8%] w-14 opacity-30 -rotate-6', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[8%] bottom-[30%] w-16 opacity-35 rotate-[18deg]', colors: FLOWER_ACCENTS.blue },
  { className: 'left-[22%] bottom-[12%] w-14 opacity-30 -rotate-12', colors: FLOWER_ACCENTS.pink },
  { className: 'right-[5%] bottom-[18%] w-20 opacity-40 -rotate-9', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[20%] bottom-[8%] w-16 opacity-35 rotate-6', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[45%] top-[6%] w-12 opacity-25 rotate-45 hidden sm:block', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[50%] bottom-[42%] w-14 opacity-22 rotate-[15deg] hidden md:block', colors: FLOWER_ACCENTS.blue },
  { className: 'right-[92%] top-[30%] w-14 opacity-28 -rotate-8 hidden xl:block', colors: FLOWER_ACCENTS.pink },
  { className: 'left-[94%] top-[58%] w-14 opacity-24 rotate-10 hidden lg:block', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[72%] top-[18%] w-14 opacity-20 -rotate-12 hidden xl:block', colors: FLOWER_ACCENTS.lilac },
  { className: 'right-[72%] bottom-[22%] w-14 opacity-22 rotate-[18deg] hidden lg:block', colors: FLOWER_ACCENTS.yellow },
  { className: 'left-[30%] top-[78%] w-14 opacity-18 rotate-10 hidden xl:block', colors: FLOWER_ACCENTS.blue },
];

const tealBannerLittleFlowers: FlowerSpot[] = [
  { className: 'left-[5%] top-[18%] w-16 opacity-45 -rotate-12', colors: FLOWER_ON_TEAL.pink },
  { className: 'left-[14%] bottom-[22%] w-14 opacity-40 rotate-9', colors: FLOWER_ON_TEAL.yellow },
  { className: 'right-[7%] top-[20%] w-16 opacity-45 rotate-6', colors: FLOWER_ON_TEAL.lilac },
  { className: 'right-[18%] bottom-[26%] w-16 opacity-40 -rotate-[14deg]', colors: FLOWER_ON_TEAL.mint },
  { className: 'left-[32%] top-[12%] w-12 opacity-35 rotate-45 hidden md:block', colors: FLOWER_ON_TEAL.blue },
  { className: 'right-[35%] bottom-[14%] w-12 opacity-35 -rotate-6 hidden md:block', colors: FLOWER_ON_TEAL.pink },
  { className: 'left-[48%] top-[28%] w-14 opacity-35 rotate-[18deg] hidden lg:block', colors: FLOWER_ON_TEAL.yellow },
  { className: 'right-[52%] bottom-[42%] w-14 opacity-32 -rotate-10 hidden xl:block', colors: FLOWER_ON_TEAL.blue },
  { className: 'left-[94%] top-[22%] w-14 opacity-38 rotate-[12deg]', colors: FLOWER_ON_TEAL.mint },
  { className: 'left-[8%] top-[72%] w-14 opacity-36 -rotate-8 hidden md:block', colors: FLOWER_ON_TEAL.lilac },
  { className: 'right-[94%] bottom-[62%] w-14 opacity-34 rotate-[20deg]', colors: FLOWER_ON_TEAL.pink },
];

/** Soft footer blossoms — toned down behind links */
const footerLittleFlowers: FlowerSpot[] = [
  { className: 'left-[8%] top-[42%] w-14 opacity-18 -rotate-12 hidden sm:block', colors: FLOWER_ACCENTS.lilac },
  { className: 'left-[92%] top-[38%] w-14 opacity-16 rotate-10 hidden md:block', colors: FLOWER_ACCENTS.mint },
  { className: 'left-[44%] top-[18%] w-14 opacity-15 -rotate-[8deg]', colors: FLOWER_ACCENTS.yellow },
  { className: 'right-[32%] bottom-[12%] w-14 opacity-16 rotate-[16deg]', colors: FLOWER_ACCENTS.blue },
];

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinkClass =
    'font-sans text-xs font-normal uppercase tracking-[0.22em] text-stone-900 transition-colors hover:text-tuft-orange md:text-[13px]';

  const primaryBtnClass =
    'font-sans cursor-pointer rounded-sm border-2 border-stone-900 bg-groovy-pink px-5 py-2.5 text-xs font-normal uppercase tracking-[0.2em] text-white shadow-[3px_3px_0_0_#0f0f0f] transition-[transform,box-shadow,filter] hover:brightness-95 hover:shadow-[2px_2px_0_0_#0f0f0f] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none md:px-6 md:text-[13px]';

  const handleHomeClick = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 font-sans">
      <div className="max-w-7xl mx-auto flex h-14 items-center justify-between rounded-sm border-2 border-stone-900 bg-white px-4 nav-brutal-shadow md:h-[3.75rem] md:px-6">
        <Link to="/" onClick={handleHomeClick} className={navLinkClass}>
          Home
        </Link>

        <div className="hidden items-center gap-8 md:flex md:gap-10">
          <Link to="/gallery" className={navLinkClass}>
            Gallery
          </Link>
          <button type="button" onClick={onContactClick} className={primaryBtnClass}>
            GET IN TOUCH
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
              <Link to="/" onClick={handleHomeClick} className={`${navLinkClass} text-base`}>
                Home
              </Link>
              <Link to="/gallery" onClick={() => setIsOpen(false)} className={`${navLinkClass} text-base`}>
                Gallery
              </Link>
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
        className="relative z-[1] mb-10 flex justify-center px-4 md:mb-16"
      >
        <h1 className="w-full max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] lg:max-w-[20rem]">
          <img
            src={`${STATIC_BASE}pinesmakes-logo.png`}
            alt="Pines Makes — Tufted Art"
            className="h-auto w-full object-contain"
            width={1024}
            height={1024}
          />
        </h1>
      </motion.div>

      <div className="relative z-[1] mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 font-sans text-sm font-bold uppercase tracking-[0.28em] text-stone-900 sm:text-base md:text-[17px]">
              Handcrafted Tufted Art
            </p>
            <h2 className="mb-8 font-sans text-5xl leading-[0.95] text-stone-900 md:text-7xl lg:text-8xl">
              No Two Rugs Alike
            </h2>
            <p className="mb-10 max-w-md font-sans text-lg leading-relaxed text-stone-600">
              Unique tufted wall hangings designed to bring warmth, color, and a touch of groovy retro
              whimsy to your space.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/gallery"
                className="group flex cursor-pointer items-center gap-2 rounded-sm border-2 border-stone-900 bg-tuft-teal px-7 py-3 font-sans text-sm font-normal uppercase tracking-[0.2em] text-white shadow-[4px_4px_0_0_#0f0f0f] transition-[transform,box-shadow,filter] hover:brightness-110 hover:shadow-[3px_3px_0_0_#0f0f0f] active:translate-x-1 active:translate-y-1 active:shadow-none md:px-8 md:text-[15px]"
              >
                View Collection
                <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
              </Link>
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
                src={`${STATIC_BASE}cheech-rug-1.jpg`}
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

function SiteFooter() {
  return (
    <footer className="relative z-[1] mx-auto overflow-hidden border-t border-tuft-magenta/10 px-6 py-12 text-sm text-stone-500 font-sans">
      <ScatteredLittleFlowers spots={footerLittleFlowers} />
      <div className="relative z-[2] mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
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
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('scrollToContact') === '1') {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname === '/') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    sessionStorage.setItem('scrollToContact', '1');
    navigate('/');
  };

  return (
    <div className="page-grain relative min-h-screen font-sans selection:bg-tuft-magenta selection:text-white">
      <ScrollToTop />
      <GroovyWaveBackground />
      <Navbar onContactClick={scrollToContact} />
      <Outlet />
      <SiteFooter />
    </div>
  );
}

function HomePage() {
  useEffect(() => {
    if (sessionStorage.getItem('scrollToContact') !== '1') {
      return;
    }

    sessionStorage.removeItem('scrollToContact');
    requestAnimationFrame(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }, []);

  return (
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
        <div className="relative z-10 mx-auto max-w-3xl py-10">
          <div className="grid gap-6 font-sans md:grid-cols-2">
            <div className="blob-inflate blob-squish-2 rounded-[2rem] bg-tuft-yellow p-8 transition-transform hover:scale-[1.02]">
              <Instagram className="mx-auto mb-4 text-tuft-orange" size={32} />
              <h3 className="mb-2 font-sans text-xl text-stone-900">Instagram</h3>
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
              <h3 className="mb-2 font-sans text-xl text-stone-900">Email</h3>
              <p className="mb-4 text-sm text-stone-700">Let&apos;s chat about art</p>
              <a
                href="mailto:pinesmakes@gmail.com"
                className="text-xs font-bold tracking-widest text-tuft-teal uppercase hover:underline"
              >
                pinesmakes@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-tuft-teal">
        <WaveDivider className="text-soft-bg" />
      </div>
      <Contact id="contact-section" />
    </main>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
