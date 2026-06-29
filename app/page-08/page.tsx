import FixedHeader from "@/components/FixedHeader";
import ImageHoverZones, { HoverImageZone } from "@/components/ImageHoverZones";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

const zones: HoverImageZone[] = [
  { left: 132, top: 1570, width: 1168, height: 560, src: "/hover/page-08/app-ui-02.png", label: "page 8 game phone UI image" },
  { left: 120, top: 2498, width: 1195, height: 529, src: "/hover/page-08/app-ui-01.png", label: "page 8 calendar phone UI image" }
];

export default function Page() {
  const page = detailPages["page-08"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      <FixedHeader />
      <div className="portfolio">
        <PdfSection page={page}>
          {/* 第八页右侧概念图位置的视频：保持原图片比例与位置。 */}
          <div className="page08-computer-video" aria-label="page 8 app concept video">
            <video src="/videos/computer.mp4" autoPlay muted loop playsInline controls preload="auto" />
          </div>
          {/* 第八页两组手机展示图的 hover 放大区域：放大内容与页面中看到的同一张图一致。 */}
          <ImageHoverZones zones={zones} />
        </PdfSection>
      </div>
    </main>
  );
}
