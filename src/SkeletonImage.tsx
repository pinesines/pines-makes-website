import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from 'react';

/** Sources that have already decoded this session — avoids a skeleton flash on cached revisits. */
const loadedSources = new Set<string>();

function sheenOffset(src: string) {
  let hash = 0;
  for (const char of src) hash = (hash * 33 + char.charCodeAt(0)) % 1000;
  return hash;
}

type Phase = 'loading' | 'ready' | 'error';

type SkeletonImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Extra classes for the frame when `fill` is false (logos). */
  frameClassName?: string;
  id?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  /** Paint into a relative, overflow-hidden parent instead of creating a frame. */
  fill?: boolean;
  loading?: ImgHTMLAttributes<HTMLImageElement>['loading'];
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>['fetchPriority'];
};

export function SkeletonImage({
  src,
  alt,
  className = '',
  frameClassName = '',
  id,
  style,
  width,
  height,
  fill = false,
  loading,
  fetchPriority,
}: SkeletonImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [phase, setPhase] = useState<Phase>(loadedSources.has(src) ? 'ready' : 'loading');
  /** Crossfade only after we've actually waited on a network load. Cached paints stay instant. */
  const [animate, setAnimate] = useState(false);
  const [trackedSrc, setTrackedSrc] = useState(src);

  if (src !== trackedSrc) {
    const alreadyLoaded = loadedSources.has(src);
    setTrackedSrc(src);
    setPhase(alreadyLoaded ? 'ready' : 'loading');
    setAnimate(!alreadyLoaded);
  }

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete && img.naturalWidth > 0) {
      loadedSources.add(src);
      setPhase('ready');
      setAnimate(false);
      return;
    }

    if (img.complete) {
      setPhase('error');
      setAnimate(false);
      return;
    }

    setPhase('loading');
    setAnimate(true);
  }, [src]);

  useEffect(() => {
    if (phase !== 'ready' || !animate) return;
    const timeout = window.setTimeout(() => setAnimate(false), 560);
    return () => window.clearTimeout(timeout);
  }, [phase, animate, src]);

  const isCurrentSource = (img: HTMLImageElement) => {
    if (img.getAttribute('src') === src) return true;
    try {
      return img.src === new URL(src, window.location.href).href;
    } catch {
      return false;
    }
  };

  const markReady = (img: HTMLImageElement) => {
    if (!isCurrentSource(img)) return;
    loadedSources.add(src);
    setPhase('ready');
  };

  const markError = (img: HTMLImageElement) => {
    if (!isCurrentSource(img)) return;
    setPhase('error');
  };

  const visible = phase !== 'loading';
  const showShimmer = phase === 'loading' || (phase === 'ready' && animate);
  const offset = sheenOffset(src);
  const fade = animate ? 'transition-opacity duration-500 ease-out' : '';

  const image = (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      id={id}
      width={width}
      height={height}
      style={style}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      draggable={false}
      aria-busy={phase === 'loading'}
      onLoad={(event) => markReady(event.currentTarget)}
      onError={(event) => markError(event.currentTarget)}
      className={`${className} ${visible ? 'opacity-100' : 'opacity-0'}`}
    />
  );

  const shimmer = showShimmer ? (
    <span
      className={`skeleton-shimmer pointer-events-none ${fade} ${
        phase === 'loading' ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <span className="skeleton-shimmer__sheen" style={{ animationDelay: `-${offset}ms` }} />
      <span
        className="skeleton-shimmer__sheen"
        style={{ animationDelay: `-${offset + 600}ms` }}
      />
    </span>
  ) : null;

  if (fill) {
    return (
      <>
        {shimmer}
        {image}
      </>
    );
  }

  return (
    <span className={`relative overflow-hidden ${frameClassName}`}>
      {shimmer}
      {image}
    </span>
  );
}
