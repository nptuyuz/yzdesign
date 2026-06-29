'use client';

import { useEffect, useRef } from 'react';

export default function PixelTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const lastRef = useRef(0);

  useEffect(() => {
    const layer = layerRef.current;
    const cursor = cursorRef.current;
    if (!layer || !cursor) return;

    const spawn = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;

      const now = performance.now();
      if (now - lastRef.current < 58) return;
      lastRef.current = now;

      const block = document.createElement('span');
      const size = 10;
      const offsetX = (Math.random() - 0.5) * 2;
      const offsetY = (Math.random() - 0.5) * 2;
      block.className = 'pixel-trail-block';
      block.style.left = `${event.clientX + offsetX}px`;
      block.style.top = `${event.clientY + offsetY}px`;
      block.style.width = `${size}px`;
      block.style.height = `${size}px`;
      layer.appendChild(block);
      window.setTimeout(() => block.remove(), 480);
    };

    window.addEventListener('pointermove', spawn, { passive: true });
    return () => window.removeEventListener('pointermove', spawn);
  }, []);

  return (
    <div ref={layerRef} className="pixel-trail-layer" aria-hidden="true">
      <span ref={cursorRef} className="pixel-cursor" />
    </div>
  );
}
