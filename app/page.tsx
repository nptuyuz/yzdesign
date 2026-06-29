import FixedHeader from "@/components/FixedHeader";
import PortfolioPages from "@/components/PortfolioPages";

export default function HomePage() {
  return (
    <main className="bg-portfolioBlack text-portfolioText">
      {/* 新固定导航：带黑色羽化底。 */}
      <FixedHeader />

      {/* 首页只保留 PDF 第 1-4 页。 */}
      <PortfolioPages />
    </main>
  );
}
