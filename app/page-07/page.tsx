import FixedHeader from "@/components/FixedHeader";
import ImageHoverZones, { HoverImageZone } from "@/components/ImageHoverZones";
import { detailPages, PdfSection } from "@/components/PortfolioPages";

const zones: HoverImageZone[] = [
  { left: 80, top: 884, width: 292, height: 206, src: "/hover/page-07/ppt-02.png", label: "page 7 calendar 01" },
  { left: 408, top: 884, width: 292, height: 206, src: "/hover/page-07/ppt-03.png", label: "page 7 calendar 02" },
  { left: 736, top: 884, width: 292, height: 206, src: "/hover/page-07/ppt-04.png", label: "page 7 calendar 03" },
  { left: 1064, top: 884, width: 292, height: 206, src: "/hover/page-07/ppt-05.png", label: "page 7 calendar 04" },
  { left: 80, top: 1136, width: 292, height: 206, src: "/hover/page-07/ppt-06.png", label: "page 7 calendar 05" },
  { left: 408, top: 1136, width: 292, height: 206, src: "/hover/page-07/ppt-07.png", label: "page 7 calendar 06" },
  { left: 736, top: 1136, width: 292, height: 206, src: "/hover/page-07/ppt-08.png", label: "page 7 calendar 07" },
  { left: 1064, top: 1136, width: 292, height: 206, src: "/hover/page-07/ppt-09.png", label: "page 7 calendar 08" },
  { left: 80, top: 1386, width: 292, height: 206, src: "/hover/page-07/ppt-10.png", label: "page 7 calendar 09" },
  { left: 408, top: 1386, width: 292, height: 206, src: "/hover/page-07/ppt-11.png", label: "page 7 calendar 10" },
  { left: 736, top: 1386, width: 292, height: 206, src: "/hover/page-07/ppt-12.png", label: "page 7 calendar 11" },
  { left: 1064, top: 1386, width: 292, height: 206, src: "/hover/page-07/ppt-13.png", label: "page 7 calendar 12" }
];

export default function Page() {
  const page = detailPages["page-07"];

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
