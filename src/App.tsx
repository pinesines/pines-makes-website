import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Instagram, Mail, ArrowRight, Menu, X } from 'lucide-react';

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

/** Paint-splat blob — static shape; wrapper moves on scroll for parallax */
function CloudPuff({
  className,
  parallax = 0.14,
  center = false,
}: {
  className?: string;
  /** Multiplier on `scrollY` for vertical drift (lower = subtler). */
  parallax?: number;
  /** Set when using `left-1/2` so horizontal centering isn’t lost to transform. */
  center?: boolean;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (latest) => latest * parallax);

  return (
    <motion.div className={className} style={center ? { x: '-50%', y } : { y }} aria-hidden>
      <svg
        className="block h-auto w-full max-w-none"
        viewBox="0 0 640 320"
        fill="currentColor"
        aria-hidden
      >
        <g>
          {/* Main splat body with spiky drips */}
          <path d="M 90 175 C 35 165 -5 110 30 70 C 60 35 130 55 130 25 C 155 -5 205 -10 220 30 C 240 -5 290 0 290 30 C 320 40 330 -5 380 15 C 410 -15 445 0 445 30 C 470 40 510 -5 540 40 C 590 50 605 95 575 110 C 620 125 640 165 595 195 C 645 215 605 250 575 250 C 555 285 505 260 480 285 C 505 325 435 320 420 285 C 400 300 375 270 360 290 C 340 325 305 310 285 280 C 265 295 240 315 215 280 C 195 315 160 295 145 275 C 115 290 85 300 60 270 C 35 295 -5 270 30 225 C -5 215 -15 175 25 165 C 40 155 75 170 90 175 Z" />
          {/* Satellite paint droplets */}
          <ellipse cx="30" cy="270" rx="14" ry="10" />
          <circle cx="12" cy="295" r="6" />
          <ellipse cx="605" cy="105" rx="11" ry="8" />
          <circle cx="630" cy="82" r="5" />
          <ellipse cx="455" cy="305" rx="9" ry="5" />
          <circle cx="320" cy="312" r="8" />
          <circle cx="180" cy="315" r="6" />
          <circle cx="595" cy="285" r="7" />
        </g>
      </svg>
    </motion.div>
  );
}

/** Static hero logotype — bubble style (see docs/font-2.png) */
const HERO_LOGO_LETTER_COLORS = [
  'text-tuft-orange',
  'text-tuft-lime',
  'text-tuft-yellow',
  'text-tuft-orange',
  'text-tuft-yellow',
  'text-tuft-orange',
  'text-tuft-yellow',
  'text-tuft-yellow',
  'text-tuft-yellow',
  'text-tuft-orange',
] as const;

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
  let letterIndex = 0;
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
        const colorClass =
          HERO_LOGO_LETTER_COLORS[letterIndex % HERO_LOGO_LETTER_COLORS.length] ?? 'text-tuft-orange';
        letterIndex += 1;
        return (
          <span key={i} className={`hero-bubble-letter ${colorClass}`}>
            {ch}
          </span>
        );
      })}
    </Comp>
  );
}

/** Single organic petal (curved teardrop), tip toward -Y; rotates around 100,100 */
const FLOWER_PETAL_D =
  'M 100 12 C 138 22 142 62 128 86 C 118 102 106 112 100 116 C 94 112 82 102 72 86 C 58 62 62 22 100 12 Z';

/** Mystery Machine-style daisy flower decal */
function FlowerDecal({
  className,
  colors,
}: {
  className?: string;
  colors?: { petal: string; petalAlt: string; center: string };
}) {
  const petal = colors?.petal ?? '#ff7a1a';
  const petalAlt = colors?.petalAlt ?? '#ffdd2e';
  const center = colors?.center ?? '#ff7a1a';

  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '100px 100px' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
          <path
            key={deg}
            d={FLOWER_PETAL_D}
            fill={i % 2 === 0 ? petal : petalAlt}
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="24" fill={center} />
      </motion.g>
    </svg>
  );
}

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
      {/* Vivid van-body color panels */}
      <CloudPuff
        parallax={0.13}
        className="pointer-events-none absolute -left-40 top-16 w-[480px] text-tuft-lime/40 md:w-[580px]"
      />
      <CloudPuff
        parallax={-0.1}
        className="pointer-events-none absolute -right-24 top-28 w-[420px] -scale-x-100 text-tuft-teal/35 md:w-[520px]"
      />
      <CloudPuff
        parallax={0.17}
        className="pointer-events-none absolute -right-16 bottom-8 w-[360px] rotate-12 text-tuft-yellow/50 md:w-[440px]"
      />
      {/* Flower decals */}
      <FlowerDecal className="pointer-events-none absolute right-[8%] top-20 w-28 opacity-70 md:w-36" />
      <FlowerDecal className="pointer-events-none absolute left-[12%] bottom-12 w-20 opacity-50 rotate-12 md:w-28" />

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
              Handmade with love
            </div>
            <h2 className="mb-8 font-sans text-5xl leading-[0.95] text-stone-900 md:text-7xl lg:text-8xl">
              Soft textures for{' '}
              <span className="text-tuft-magenta">happy</span> walls.
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
        <CloudPuff
          parallax={0.11}
          className="pointer-events-none absolute right-[5%] top-8 hidden w-[260px] text-tuft-teal/30 lg:block"
        />
        <FlowerDecal className="pointer-events-none absolute left-[3%] top-10 hidden w-24 opacity-60 lg:block" />

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
      <CloudPuff
        parallax={0.15}
        className="pointer-events-none absolute -left-24 bottom-20 w-[380px] text-tuft-orange/30"
      />
      <CloudPuff
        parallax={-0.12}
        className="pointer-events-none absolute -right-20 top-16 w-[320px] -scale-x-100 text-tuft-lime/35"
      />
      <FlowerDecal className="pointer-events-none absolute right-[8%] bottom-16 w-24 opacity-60" />

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
    <div className="page-grain min-h-screen font-sans selection:bg-tuft-magenta selection:text-white">
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
          {/* Flower accents */}
          <FlowerDecal className="pointer-events-none absolute left-[3%] top-1/2 w-24 -translate-y-1/2 opacity-50 md:w-32" />
          <FlowerDecal className="pointer-events-none absolute right-[3%] top-1/2 w-24 -translate-y-1/2 rotate-45 opacity-50 md:w-32" />
          <CloudPuff
            center
            parallax={0.1}
            className="pointer-events-none absolute -bottom-8 left-1/2 w-[340px] text-tuft-lime/20"
          />
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
