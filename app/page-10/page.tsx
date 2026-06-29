import FixedHeader from "@/components/FixedHeader";
import TvVideoStack from "@/components/TvVideoStack";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

export default function Page() {
  const page = detailPages["page-10"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      {/* 新固定导航：详情页也统一显示。 */}
      <FixedHeader />
      <div className="portfolio">
        {/* 第十页：保留 PDF 文案排版，在右侧叠加四台电视与视频内容。 */}
        <PdfSection page={page}>
          <TvVideoStack />
        </PdfSection>
      </div>
    </main>
  );
}
