'use client';

import { useEffect, useState } from 'react';

const mapImages = [
  { src: '/lumen/map-01.png', alt: '游戏地图 01 初始之境' },
  { src: '/lumen/map-02.png', alt: '游戏地图 02 过渡长廊' },
  { src: '/lumen/map-03.png', alt: '游戏地图 03 灵魂森林' },
  { src: '/lumen/map-04.png', alt: '游戏地图 04 圣殿宫殿' },
  { src: '/lumen/map-05.png', alt: '游戏地图 05 最终圣地' }
];

export default function LumenMapStack() {
  const [activeMap, setActiveMap] = useState<(typeof mapImages)[number] | null>(null);

  useEffect(() => {
    if (!activeMap) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveMap(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMap]);

  return (
    <div className="lumen-map-stack" aria-label="游戏地图五场景交互图组">
      {/* 游戏地图：图片保持 PDF 里的重叠顺序，交互热区覆盖每张图露出的部分。 */}
      <div className="lumen-map-visuals" aria-hidden="true">
        {mapImages.map((image, index) => (
          <img
            key={image.src}
            className="lumen-map-card"
            src={image.src}
            alt=""
            style={{ left: `${index * 207.5}px`, zIndex: index + 1 }}
          />
        ))}
      </div>

      {mapImages.map((image, index) => (
        <span key={`hover-${image.src}`} className="lumen-map-hover-pair">
          {/* 热区：对应 PDF 里每张图片实际露出来的那一段。 */}
          <button
            className="lumen-map-hit"
            type="button"
            aria-label={`放大${image.alt}`}
            onClick={() => setActiveMap(image)}
            style={{ left: `${index * 207.5}px` }}
          />
          {/* CSS hover 预览层：保留鼠标悬停时的即时反馈。 */}
          <span className="lumen-map-css-preview" aria-hidden="true">
            <img src={image.src} alt="" />
          </span>
        </span>
      ))}

      {/* 单击放大层：图片固定到屏幕中央，点击背景或 EXIT 关闭。 */}
      {activeMap && (
        <div className="lumen-map-click-modal is-open" role="dialog" aria-modal="true" onClick={() => setActiveMap(null)}>
          <button className="lumen-map-exit" type="button" onClick={() => setActiveMap(null)}>
            EXIT
          </button>
          <img src={activeMap.src} alt={activeMap.alt} onClick={event => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
