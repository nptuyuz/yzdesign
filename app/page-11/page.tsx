import FixedHeader from "@/components/FixedHeader";
import DomeGallery from "@/components/DomeGallery";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

export default function Page() {
  const page = detailPages["page-11"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      {/* 新固定导航：详情页也统一显示。 */}
      <FixedHeader />
      <div className="portfolio">
        {/* 第十一页：原本文字置顶，底部加入 25 张数字占位图片展示。 */}
        <PdfSection page={page}>
          <DomeGallery />
          <div className="page11-title-veil" />
        </PdfSection>
      </div>
    </main>
  );
}

