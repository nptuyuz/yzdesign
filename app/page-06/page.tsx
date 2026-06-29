import FixedHeader from "@/components/FixedHeader";
import ImageHoverZones, { HoverImageZone } from "@/components/ImageHoverZones";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

const zones: HoverImageZone[] = [
  { left: 80, top: 1200, width: 640, height: 580, src: "/hover/page-06/brand-01.png", label: "page 6 bottom left brand image" },
  { left: 801, top: 1200, width: 536, height: 580, src: "/hover/page-06/brand-02.png", label: "page 6 bottom right brand image" }
];

export default function Page() {
  const page = detailPages["page-06"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      {/* 新固定导航：详情页也统一显示。 */}
      <FixedHeader />
      <div className="portfolio">
        {/* 独立详情页：只显示当前 PDF 页面，不出现在首页。 */}
        <PdfSection page={page}>
          {/* 第六页底部两张品牌图的透明 hover 区域：不改 PDF 原排版，只在对应图片上方显示放大预览。 */}
          <ImageHoverZones zones={zones} />
        </PdfSection>
      </div>
    </main>
  );
}
