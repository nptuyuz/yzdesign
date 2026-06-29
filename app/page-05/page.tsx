import FixedHeader from "@/components/FixedHeader";
import { detailPages, PdfSection } from "@/components/PortfolioPages";
import LumenPageInteractive from "@/components/Lumen/LumenPageInteractive";

export default function Page() {
  const page = detailPages["page-05"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      {/* 新固定导航：详情页也统一显示。 */}
      <FixedHeader />
      <div className="portfolio">
        {/* 第五页独立详情页：底图保留文本，交互层替换指定图片区域。 */}
        <PdfSection page={page}>
          <LumenPageInteractive />
        </PdfSection>
      </div>
    </main>
  );
}
