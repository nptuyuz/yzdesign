import FixedHeader from "@/components/FixedHeader";
import ImageHoverZones, { HoverImageZone } from "@/components/ImageHoverZones";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

const zones: HoverImageZone[] = [
  { left: 86, top: 350, width: 320, height: 190, src: "/hover/page-09/font-02.png", label: "page 9 typography 01" },
  { left: 538, top: 350, width: 330, height: 190, src: "/hover/page-09/font-03.png", label: "page 9 typography 02" },
  { left: 558, top: 704, width: 380, height: 240, src: "/hover/page-09/font-06.jpg", label: "page 9 typography 03" },
  { left: 1018, top: 742, width: 342, height: 238, src: "/hover/page-09/font-05.jpg", label: "page 9 typography 04" },
  { left: 70, top: 1110, width: 830, height: 190, src: "/hover/page-09/font-04.png", label: "page 9 typography 05" },
  { left: 608, top: 1438, width: 750, height: 270, src: "/hover/page-09/font-01.png", label: "page 9 typography 06" },
  { left: 60, top: 1410, width: 360, height: 180, src: "/hover/page-09/font-07.png", label: "page 9 typography 07" }
];

export default function Page() {
  const page = detailPages["page-09"];

  return (
    <main className="bg-portfolioBlack text-portfolioText">
      <FixedHeader />
      <div className="portfolio">
        <PdfSection page={page}>
          <ImageHoverZones zones={zones} />
        </PdfSection>
      </div>
    </main>
  );
}
