'use client';

import dynamic from 'next/dynamic';

const ReactBitsLanyard = dynamic(() => import('@/components/ReactBitsLanyard'), {
  ssr: false,
  loading: () => <div className="lanyard-loading" aria-hidden="true" />
});

export default function LanyardBadge() {
  return (
    <div className="lanyard-scene" aria-label="React Bits 物理挂绳工牌">
      {/* 第二页物理工牌：正面使用第一页 Yzzz. logo，背面使用第二页人像图。 */}
      <ReactBitsLanyard
        position={[0, 0, 16]}
        gravity={[0, -54, 0]}
        frontImage="/lanyard/yzzz-logo.png"
        backImage="/lanyard/portrait-back.png"
        imageFit="contain"
        lanyardImage="/lanyard/lanyard-band.png"
        lanyardWidth={0.72}
      />
    </div>
  );
}

