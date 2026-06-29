export type HoverImageZone = {
  left: number;
  top: number;
  width: number;
  height: number;
  src: string;
  label: string;
};

export default function ImageHoverZones({ zones }: { zones: HoverImageZone[] }) {
  return (
    <div className="image-hover-layer" aria-label="图片 hover 放大区域">
      {zones.map(zone => (
        <button
          key={zone.src}
          className="image-hover-zone"
          type="button"
          aria-label={zone.label}
          style={{ left: `${zone.left}px`, top: `${zone.top}px`, width: `${zone.width}px`, height: `${zone.height}px` }}
        >
          <span className="image-hover-preview">
            <img src={zone.src} alt="" />
          </span>
        </button>
      ))}
    </div>
  );
}
