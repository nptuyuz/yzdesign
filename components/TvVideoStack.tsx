'use client';

import { useEffect, useState } from 'react';

const tvItems = [
  { id: '01', video: '/tv/tv-01.mp4', label: '电视 01 视频' },
  { id: '02', video: '/tv/tv-02.mp4', label: '电视 02 视频' },
  { id: '03', video: '/tv/tv-03.mp4', label: '电视 03 视频' },
  { id: '04', video: '/tv/tv-04.mp4', label: '电视 04 视频' }
];

export default function TvVideoStack() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    document.querySelectorAll<HTMLVideoElement>('.tv-screen-button video').forEach(video => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <>
      <div className="tv-video-stack" aria-label="四台老式电视机视频展示">
        {/* 电视组合前景：已扣除白色背景与屏幕白区，视频从透明屏幕中露出。 */}
        <img className="tv-stack-composite" src="/tv/tv-stack-new.png" alt="四台老式电视机" />
        {tvItems.map(item => (
          <button
            key={item.id}
            className={`tv-screen-button tv-screen-button-${item.id}`}
            type="button"
            aria-label={`放大${item.label}`}
            onClick={() => setActiveVideo(item.video)}
          >
            {/* 屏幕内原色视频：不再叠加黑白滤镜。 */}
            <video src={item.video} autoPlay muted loop playsInline preload="auto" />
          </button>
        ))}
      </div>

      {activeVideo && (
        <div className="tv-video-modal is-open" role="dialog" aria-modal="true" aria-label="放大视频预览">
          <button className="tv-video-modal-close" type="button" aria-label="退出放大视频" onClick={() => setActiveVideo(null)}>
            EXIT
          </button>
          <video src={activeVideo} autoPlay muted loop playsInline controls />
        </div>
      )}
    </>
  );
}
