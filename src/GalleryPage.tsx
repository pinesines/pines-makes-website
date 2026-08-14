import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { ScatteredLittleFlowers } from './decorations';

/** Vite base path — `'/'` in dev, `'/pines-makes-website/'` in production Pages build */
const STATIC_BASE = import.meta.env.BASE_URL;

function publicAsset(filename: string) {
  return `${STATIC_BASE}${encodeURI(filename)}`;
}

type GalleryItem = {
  id: number;
  title: string;
  accent: string;
  blob: string;
  images: string[];
};

const galleryPageItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Flower Dream',
    accent: 'ring-tuft-yellow/60',
    blob: 'blob-squish-1',
    images: ['Flower Dream 1.jpg', 'Flower Dream detail.jpg'],
  },
  {
    id: 2,
    title: 'Happy Mirror',
    accent: 'ring-tuft-magenta/50',
    blob: 'blob-squish-2',
    images: ['Happy mirror.jpg', 'Happy mirror 2.jpg', 'Happy mirror detail.jpg'],
  },
  {
    id: 3,
    title: 'Love Waves',
    accent: 'ring-tuft-orange/50',
    blob: 'blob-squish-3',
    images: ['Love waves 1.jpg'],
  },
  {
    id: 4,
    title: 'Retro Darkness',
    accent: 'ring-tuft-teal/50',
    blob: 'blob-squish-4',
    images: ['Retro darkness.jpg'],
  },
  {
    id: 5,
    title: 'Retro Bicolor',
    accent: 'ring-tuft-lime/50',
    blob: 'blob-squish-1',
    images: ['Retro bicolor 1.jpg'],
  },
  {
    id: 6,
    title: 'Retro Tricolor',
    accent: 'ring-tuft-lilac/50',
    blob: 'blob-squish-2',
    images: ['Retro tricolor.jpg', 'Retro waves tricolor.jpg', 'Retro waves combo.jpg'],
  },
  {
    id: 7,
    title: 'Small Retro',
    accent: 'ring-tuft-coral/50',
    blob: 'blob-squish-3',
    images: ['Small retro.jpg'],
  },
];

const galleryPageLittleFlowers = [
  { className: 'left-[4%] top-[6%] w-16 opacity-35 -rotate-12', colorsKey: 'lilac' as const },
  { className: 'right-[8%] top-[14%] w-16 opacity-35 rotate-6', colorsKey: 'blue' as const },
  { className: 'left-[6%] bottom-[20%] w-16 opacity-30 rotate-12', colorsKey: 'yellow' as const },
  { className: 'right-[14%] bottom-[8%] w-20 opacity-35 -rotate-6', colorsKey: 'lilac' as const },
  { className: 'left-[35%] top-[18%] w-12 opacity-20 rotate-45 hidden md:block', colorsKey: 'mint' as const },
  { className: 'right-[38%] bottom-[24%] w-12 opacity-22 -rotate-12 hidden md:block', colorsKey: 'blue' as const },
];

function variationLabel(filename: string, index: number) {
  if (filename.toLowerCase().includes('detail')) return 'Detail';
  if (/\d/.test(filename) && index > 0) return `View ${index + 1}`;
  return index === 0 ? 'Main' : `View ${index + 1}`;
}

type GalleryCardProps = {
  item: GalleryItem;
  isSelected: boolean;
  activeImageIndex: number;
  onSelect: (id: number) => void;
  onActiveImageChange: (index: number) => void;
};

function GalleryCardBody({
  item,
  isSelected,
  activeImageIndex,
  onSelect,
  onActiveImageChange,
}: GalleryCardProps) {
  const coverImage = item.images[0];
  const displayedImage = item.images[isSelected ? activeImageIndex : 0] ?? coverImage;
  const hasVariations = item.images.length > 1;

  return (
    <div className={isSelected ? 'mx-auto max-w-4xl' : undefined}>
        <button
          type="button"
          aria-expanded={isSelected}
          onClick={() => onSelect(item.id)}
          className={`group w-full cursor-pointer text-left ${isSelected ? '' : 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tuft-teal focus-visible:ring-offset-2'}`}
        >
          <motion.div
            layout
            className={`blob-inflate relative mb-6 overflow-hidden ring-4 ${item.blob} ${item.accent} transition-[transform,box-shadow] duration-300 ease-out ${
              isSelected
                ? 'mx-auto aspect-[4/5] w-full max-w-lg shadow-[0_28px_60px_-20px_rgb(45_30_50_0.28)]'
                : 'aspect-[4/5] group-hover:scale-[1.04] group-hover:shadow-[0_24px_52px_-18px_rgb(45_30_50_0.26)]'
            }`}
          >
            <motion.img
              key={displayedImage}
              src={publicAsset(displayedImage)}
              alt={item.title}
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full object-cover"
            />
            {isSelected && (
              <span className="absolute right-3 top-3 rounded-sm border-2 border-stone-900 bg-white/90 p-1.5 text-stone-900 shadow-[2px_2px_0_0_#0f0f0f]">
                <X size={16} strokeWidth={2.5} aria-hidden />
              </span>
            )}
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isSelected && hasVariations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.28em] text-stone-500">
                Variations
              </p>
              <div className="mb-8 flex flex-wrap justify-center gap-4 sm:justify-start">
                {item.images.map((file, imageIndex) => {
                  const isActive = imageIndex === activeImageIndex;
                  return (
                    <button
                      key={file}
                      type="button"
                      aria-label={`${item.title} — ${variationLabel(file, imageIndex)}`}
                      aria-pressed={isActive}
                      onClick={(event) => {
                        event.stopPropagation();
                        onActiveImageChange(imageIndex);
                      }}
                      className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tuft-teal focus-visible:ring-offset-2"
                    >
                      <div
                        className={`blob-inflate blob-squish-1 relative aspect-[4/5] w-24 overflow-hidden ring-4 transition-[transform,box-shadow] duration-300 sm:w-28 ${
                          isActive
                            ? `${item.accent} scale-[1.03] shadow-[0_16px_36px_-14px_rgb(45_30_50_0.28)]`
                            : 'ring-stone-200 hover:scale-[1.04] hover:ring-stone-300'
                        }`}
                      >
                        <img
                          src={publicAsset(file)}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span
                        className={`mt-2 block text-center font-sans text-[10px] font-bold uppercase tracking-widest ${
                          isActive ? 'text-stone-900' : 'text-stone-400'
                        }`}
                      >
                        {variationLabel(file, imageIndex)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={isSelected ? 'text-center sm:text-left' : undefined}>
          <h2 className="mb-1 font-sans text-2xl text-stone-900">{item.title}</h2>
          <p className="font-sans text-sm font-semibold uppercase tracking-widest text-stone-400">
            Tufted Wall Hanging
          </p>
          {!isSelected && hasVariations && (
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.22em] text-stone-500">
              Click to view {item.images.length} photos
            </p>
          )}
        </div>
    </div>
  );
}

export function GalleryPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
      setActiveImageIndex(0);
      return;
    }

    setSelectedId(id);
    setActiveImageIndex(0);
  };

  return (
    <main className="relative z-[1]">
      <section className="shrink-0 bg-soft-bg">
        <div className="relative px-6 pb-24 pt-32">
          <ScatteredLittleFlowers spots={galleryPageLittleFlowers} />

          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <h1 className="mb-4 font-sans text-4xl text-stone-900 md:text-5xl">Gallery</h1>
                <p className="max-w-md font-sans text-stone-600">
                  A full look at recent tufted pieces — each one slow-made with its own palette and
                  personality. Click a piece to explore its variations.
                </p>
              </div>
              <div className="inline-flex items-center rounded-sm border-2 border-stone-900 bg-white px-5 py-2.5 font-sans text-[10px] font-normal uppercase tracking-[0.28em] text-stone-900 shadow-[3px_3px_0_0_#0f0f0f] md:text-xs">
                Est. 2024
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {galleryPageItems.map((item, i) => {
                const isSelected = selectedId === item.id;

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={isSelected ? 'col-span-full' : undefined}
                  >
                    <GalleryCardBody
                      item={item}
                      isSelected={isSelected}
                      activeImageIndex={activeImageIndex}
                      onSelect={handleSelect}
                      onActiveImageChange={setActiveImageIndex}
                    />
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
