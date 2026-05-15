import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Mail, ArrowRight, Menu, X, Heart } from 'lucide-react';

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

/** Sparse cloud accent — not for every card */
function CloudPuff({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 180"
      fill="currentColor"
      aria-hidden
    >
      <path d="M 95 130 Q 55 132 48 95 Q 42 68 72 52 Q 82 22 118 26 Q 138 8 178 14 Q 210 4 248 18 Q 286 8 322 24 Q 352 18 382 32 Q 418 28 448 48 Q 478 44 498 72 Q 514 88 502 118 Q 508 142 482 152 Q 458 168 422 160 Q 392 174 352 166 Q 318 176 278 162 Q 238 172 198 158 Q 162 168 128 152 Q 100 150 95 130 Z" />
    </svg>
  );
}

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-7xl mx-auto flex h-[4.5rem] items-center justify-between rounded-[1.75rem] border border-tuft-magenta/15 bg-white/75 px-6 shadow-[0_12px_40px_-12px_rgb(60_40_50_0.12),0_4px_20px_-8px_rgb(60_40_50_0.08)] backdrop-blur-md md:px-8">
        <div className="font-retro text-2xl tracking-wide text-tuft-magenta logo-decal md:text-3xl">
          PINES MAKES
        </div>

        <div className="hidden items-center gap-10 font-sans text-sm font-semibold tracking-wide md:flex">
          <a href="#" className="transition-colors hover:text-tuft-teal">
            GALLERY
          </a>
          <a href="#" className="transition-colors hover:text-tuft-teal">
            PROCESS
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className="cursor-pointer rounded-full border-2 border-tuft-teal/30 bg-tuft-yellow px-7 py-2.5 font-sans shadow-[0_6px_20px_-4px_rgb(225_29_116_0.2)] transition-all hover:border-tuft-orange/50 hover:shadow-lg active:scale-[0.98]"
          >
            ORDER CUSTOM
          </button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] right-4 left-4 mx-auto max-w-7xl rounded-[1.75rem] border border-stone-100 bg-white p-8 shadow-[0_24px_50px_-20px_rgb(45_30_40_0.18)] md:hidden"
          >
            <div className="flex flex-col gap-6">
              <a href="#" onClick={() => setIsOpen(false)} className="font-retro text-2xl text-tuft-teal">
                GALLERY
              </a>
              <a href="#" onClick={() => setIsOpen(false)} className="font-retro text-2xl text-tuft-teal">
                PROCESS
              </a>
              <button
                type="button"
                onClick={() => {
                  onContactClick();
                  setIsOpen(false);
                }}
                className="w-full cursor-pointer rounded-[1.25rem] bg-tuft-magenta py-4 font-retro text-lg text-white shadow-[0_10px_30px_-8px_rgb(225_29_116_0.45)]"
              >
                CONTACT ME
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
    <section className="relative overflow-hidden pt-36 pb-12 px-6">
      <CloudPuff className="pointer-events-none absolute -left-32 top-24 w-[420px] text-tuft-lilac/20 md:w-[520px]" />
      <CloudPuff className="pointer-events-none absolute -right-20 bottom-32 w-[320px] rotate-12 text-tuft-lime/25 md:w-[400px]" />

      <div className="relative z-[1] mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 inline-block rounded-full bg-tuft-orange/15 px-5 py-2 font-sans text-xs font-bold tracking-widest text-tuft-orange ring-2 ring-tuft-orange/25">
            HANDMADE WITH LOVE
          </div>
          <h1 className="hero-headline mb-8 font-retro text-5xl leading-[0.95] text-stone-900 md:text-7xl lg:text-8xl">
            Soft textures for{' '}
            <span className="text-tuft-magenta">happy</span> walls.
          </h1>
          <p className="mb-10 max-w-md font-sans text-lg leading-relaxed text-stone-600">
            Unique tufted wall hangings designed to bring warmth, color, and a touch of groovy retro
            whimsy to your space.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-tuft-teal px-9 py-4 font-sans text-base font-bold text-white shadow-[0_12px_36px_-10px_rgb(13_158_144_0.55)] transition-all hover:brightness-110 active:scale-[0.98]"
            >
              View Collection
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
              src="/IMG_0572%20copy.jpg"
              alt="Tufted Wall Art"
              className="h-full w-full object-cover"
              id="hero-image"
            />
          </div>
        </motion.div>
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
  { id: 1, title: 'Pastel Dream', accent: 'ring-tuft-yellow/40', img: '/IMG_0463%20copy%20(1).jpg' },
  { id: 2, title: 'Soft Waves', accent: 'ring-tuft-magenta/35', img: '/IMG_0502%20copy.jpg' },
  { id: 3, title: 'Retro Bloom', accent: 'ring-tuft-lilac/40', img: '/IMG_0528%20(1)%20copy.jpg' },
  { id: 4, title: 'Sunset Tuft', accent: 'ring-tuft-orange/35', img: '/IMG_0608%20copy.jpg' },
  { id: 5, title: 'Azure Flow', accent: 'ring-tuft-teal/35', img: '/IMG_0612%20copy.jpg' },
];

const Gallery = () => {
  return (
    <section className="shrink-0 bg-white">
      <div className="relative px-6 pb-24 pt-6">
        <CloudPuff className="pointer-events-none absolute right-[8%] top-12 hidden w-[200px] text-tuft-teal/12 lg:block" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 font-retro text-4xl text-stone-900 md:text-5xl">Latest Creations</h2>
              <p className="max-w-sm font-sans text-stone-600">
                Every piece is slow-made, ensuring the highest quality texture and detail.
              </p>
            </div>
            <div className="inline-flex items-center rounded-full bg-tuft-yellow/35 px-6 py-3 font-sans text-xs font-bold tracking-widest text-stone-700 ring-2 ring-tuft-orange/20">
              EST. 2024
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
                className="group cursor-pointer"
              >
                <div
                  className={`relative mb-6 aspect-[4/5] overflow-hidden rounded-[2.75rem] ring-4 ${item.accent} shadow-[0_20px_50px_-24px_rgb(55_40_60_0.2),0_8px_20px_-12px_rgb(55_40_60_0.1)] transition-shadow duration-500 group-hover:shadow-[0_28px_64px_-20px_rgb(55_40_60_0.28)]`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <div className="rounded-full bg-white p-4 text-tuft-magenta shadow-lg">
                      <Heart size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <h3 className="mb-1 font-retro text-2xl text-stone-900">{item.title}</h3>
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
      <CloudPuff className="pointer-events-none absolute -left-24 bottom-20 w-[280px] text-tuft-orange/15" />

      <div className="relative z-[1] mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-8 font-retro text-5xl text-stone-900 md:text-7xl">Work with me</h2>
          <p className="mb-12 font-sans text-xl text-stone-600">
            Have a specific color palette or design in mind? I love creating custom pieces for unique
            homes.
          </p>

          <div className="mb-16 grid gap-6 font-sans md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-8 shadow-[0_16px_40px_-20px_rgb(55_40_60_0.12),inset_0_1px_0_0_rgb(255_255_255_0.9)] transition-shadow hover:shadow-[0_20px_48px_-18px_rgb(55_40_60_0.16)]">
              <Instagram className="mx-auto mb-4 text-tuft-magenta" size={32} />
              <h4 className="mb-2 font-retro text-xl text-stone-900">Instagram</h4>
              <p className="mb-4 text-sm text-stone-500">DM for commissions</p>
              <a
                href="#"
                className="text-xs font-bold tracking-widest text-tuft-teal uppercase hover:underline"
              >
                @softtuft.studio
              </a>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-[0_16px_40px_-20px_rgb(55_40_60_0.12),inset_0_1px_0_0_rgb(255_255_255_0.9)] transition-shadow hover:shadow-[0_20px_48px_-18px_rgb(55_40_60_0.16)]">
              <Mail className="mx-auto mb-4 text-tuft-magenta" size={32} />
              <h4 className="mb-2 font-retro text-xl text-stone-900">Email</h4>
              <p className="mb-4 text-sm text-stone-500">Let&apos;s chat about art</p>
              <a
                href="#"
                className="text-xs font-bold tracking-widest text-tuft-teal uppercase hover:underline"
              >
                hello@softtuft.art
              </a>
            </div>
          </div>

          <form className="rounded-[2.75rem] border-2 border-tuft-lilac/15 bg-white p-10 text-left shadow-[0_24px_56px_-24px_rgb(45_35_55_0.18),inset_0_1px_0_0_rgb(255_255_255_0.95)]">
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
              className="w-full cursor-pointer rounded-[1.75rem] bg-tuft-magenta py-5 font-retro text-xl text-white shadow-[0_14px_36px_-10px_rgb(225_29_116_0.45)] transition-all hover:brightness-105 active:scale-[0.98]"
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
            transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            className="pointer-events-none flex gap-24 whitespace-nowrap opacity-[0.12]"
          >
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-retro text-8xl text-tuft-lime uppercase md:text-9xl">
                PINES MAKES • PINES MAKES •
              </span>
            ))}
          </motion.div>
          <div className="relative z-10 mx-auto max-w-4xl py-10">
            <h2 className="mb-8 font-retro text-4xl leading-tight text-white md:text-6xl">
              Bringing{' '}
              <span className="text-tuft-yellow underline decoration-tuft-orange decoration-wavy underline-offset-[0.35em]">
                personality
              </span>{' '}
              to every stitch.
            </h2>
            <button
              type="button"
              onClick={scrollToContact}
              className="cursor-pointer rounded-full bg-tuft-orange px-10 py-5 font-retro text-xl text-white shadow-[0_16px_40px_-12px_rgb(255_122_26_0.55)] transition-all hover:bg-tuft-lime hover:text-stone-900"
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
        <div className="font-retro text-2xl text-tuft-magenta logo-decal">PINES MAKES</div>
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
