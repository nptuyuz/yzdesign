'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import LumenMapStack from '@/components/Lumen/LumenMapStack';

const CatModel = dynamic(() => import('@/components/Lumen/LumenCatModel'), {
  ssr: false
});

function AutoPlayVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => undefined);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            video.play().catch(() => undefined);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="lumen-demo-video"
      src="/videos/lumen-demo.mp4"
      autoPlay
      muted
      playsInline
      loop
      controls
      preload="auto"
    />
  );
}

export default function LumenPageInteractive() {
  return (
    <>
      <LumenMapStack />

      {/* 游戏角色右侧：优先加载 cat.fbx，可旋转、可缩放。 */}
      <div className="lumen-model-wrap">
        <CatModel />
      </div>

      {/* 实机演示左侧：页面加载会尝试自动播放，滚动到视频位置也会播放。 */}
      <div className="lumen-video-wrap">
        <AutoPlayVideo />
      </div>
    </>
  );
}
