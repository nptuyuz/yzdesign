'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type GalleryItem = { number: number; src: string; alt: string };

const baseItems: GalleryItem[] = [
  { number: 1, src: '/photos/photo-01.jpg', alt: 'photo 1' },
  { number: 2, src: '/photos/photo-02.jpg', alt: 'photo 2' },
  { number: 3, src: '/photos/photo-03.jpg', alt: 'photo 3' },
  { number: 4, src: '/photos/photo-04.jpg', alt: 'photo 4' },
  { number: 5, src: '/photos/photo-05.jpg', alt: 'photo 5' },
  { number: 6, src: '/photos/photo-06.jpg', alt: 'photo 6' },
  { number: 7, src: '/photos/photo-07.jpg', alt: 'photo 7' },
  { number: 8, src: '/photos/photo-08.jpg', alt: 'photo 8' },
  { number: 9, src: '/photos/photo-09.jpg', alt: 'photo 9' },
  { number: 10, src: '/photos/photo-10.jpg', alt: 'photo 10' },
  { number: 11, src: '/photos/photo-11.jpg', alt: 'photo 11' },
  { number: 12, src: '/photos/photo-12.jpg', alt: 'photo 12' },
  { number: 13, src: '/photos/photo-13.jpg', alt: 'photo 13' },
  { number: 14, src: '/photos/photo-14.jpg', alt: 'photo 14' },
  { number: 15, src: '/photos/photo-15.jpg', alt: 'photo 15' },
  { number: 16, src: '/photos/photo-16.jpg', alt: 'photo 16' },
  { number: 17, src: '/photos/photo-17.jpg', alt: 'photo 17' },
  { number: 18, src: '/photos/photo-18.jpg', alt: 'photo 18' },
  { number: 19, src: '/photos/photo-19.jpg', alt: 'photo 19' },
  { number: 20, src: '/photos/photo-20.jpg', alt: 'photo 20' },
  { number: 21, src: '/photos/photo-21.jpg', alt: 'photo 21' },
  { number: 22, src: '/photos/photo-22.jpg', alt: 'photo 22' },
  { number: 23, src: '/photos/photo-23.jpg', alt: 'photo 23' },
  { number: 24, src: '/photos/photo-24.jpg', alt: 'photo 24' },
  { number: 25, src: '/photos/photo-25.jpg', alt: 'photo 25' }
];

const repeatedItems = Array.from({ length: 4 }, (_, group) => baseItems.map(item => ({ group, ...item }))).flat();
const fishScale = [0.76, 0.94, 1.18, 0.94, 0.76];
const fishZ = [-105, -32, 92, -32, -105];
const fishRot = [20, 9, 0, -9, -20];
const fishXRot = [-4, -1, 1, -1, -4];
const fishSkew = [-8, -3, 0, 3, 8];
const fishClip = [
  'polygon(12% 7%, 100% 0, 96% 100%, 8% 92%)',
  'polygon(6% 4%, 100% 0, 100% 100%, 4% 96%)',
  'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
  'polygon(0 0, 94% 4%, 96% 96%, 0 100%)',
  'polygon(0 0, 88% 7%, 92% 92%, 4% 100%)'
];

export default function DomeGallery() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startRef = useRef({ x: 0, offset: -360, moved: false });
  const [offset, setOffset] = useState(-360);
  const [active, setActive] = useState<GalleryItem | null>(null);
  const clampOffset = useCallback((value: number) => Math.max(-2460, Math.min(120, value)), []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const openFromElement = useCallback((element: Element | null) => {
    const tile = element?.closest<HTMLButtonElement>('.dome-tile');
    if (!tile || !trackRef.current?.contains(tile)) return;
    const src = tile.dataset.src;
    const alt = tile.dataset.alt || 'photo preview';
    const number = Number(tile.dataset.number || 0);
    if (src) setActive({ number, src, alt });
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startRef.current = { x: event.clientX, offset, moved: false };
    trackRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current?.hasPointerCapture(event.pointerId)) return;
    const delta = event.clientX - startRef.current.x;
    if (Math.abs(delta) > 8) startRef.current.moved = true;
    setOffset(clampOffset(startRef.current.offset + delta));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const wasMoved = startRef.current.moved;
    trackRef.current?.releasePointerCapture(event.pointerId);
    if (!wasMoved) openFromElement(document.elementFromPoint(event.clientX, event.clientY));
  };

  return (
    <>
      <div className="dome-gallery dome-gallery-fisheye" aria-label="photo fisheye gallery">
        <div
          ref={trackRef}
          className="dome-track dome-track-grid"
          style={{ transform: `translateX(${offset}px)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {repeatedItems.map(({ group, number, src, alt }, index) => {
            const row = Math.floor((number - 1) / 5);
            const col = (number - 1) % 5;
            return (
              <button
                key={`${group}-${number}`}
                className="dome-tile"
                type="button"
                aria-label={alt}
                data-src={src}
                data-alt={alt}
                data-number={number}
                onClick={event => {
                  event.stopPropagation();
                  if (!startRef.current.moved) openFromElement(event.currentTarget);
                }}
                style={{
                  ['--tile-row' as string]: row,
                  ['--tile-col' as string]: col,
                  ['--tile-group' as string]: group,
                  ['--tile-index' as string]: index,
                  ['--fish-scale' as string]: fishScale[col],
                  ['--fish-z' as string]: `${fishZ[col]}px`,
                  ['--fish-rot' as string]: `${fishRot[col]}deg`,
                  ['--fish-xrot' as string]: `${fishXRot[row]}deg`,
                  ['--fish-skew' as string]: `${fishSkew[col]}deg`,
                  ['--fish-clip' as string]: fishClip[col]
                }}
              >
                <img src={src} alt={alt} draggable={false} />
              </button>
            );
          })}
        </div>
      </div>
      {active !== null && (
        <div className="dome-fullscreen is-open" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <button className="dome-exit" type="button" onClick={() => setActive(null)}>
            EXIT
          </button>
          <span onClick={event => event.stopPropagation()}>
            <img src={active.src} alt={active.alt} draggable={false} />
          </span>
        </div>
      )}
    </>
  );
}
