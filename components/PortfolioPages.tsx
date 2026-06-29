import LanyardBadge from "@/components/LanyardBadge";
import TextType from "@/components/TextType/TextType";

export type PdfPage = {
  id: string;
  image: string;
  height: number;
  alt: string;
};

export type CatalogButton = {
  href: string;
  image: string;
  alt: string;
  ariaLabel: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

export const homePages: PdfPage[] = [
  { id: "page-01", image: "/clean-images/page-01-clean.png", height: 900, alt: "PDF 第 1 页：首页" },
  { id: "page-02", image: "/clean-images/page-02-clean.png", height: 900, alt: "PDF 第 2 页：关于我" },
  { id: "page-03", image: "/clean-images/page-03-clean.png", height: 1800, alt: "PDF 第 3 页：作品目录" },
  { id: "page-04", image: "/clean-images/page-04-clean.png", height: 900, alt: "PDF 第 4 页：感谢观看" }
];

export const detailPages: Record<string, PdfPage> = {
  "page-05": { id: "page-05", image: "/clean-images/page-05-interactive-base.png", height: 3150, alt: "PDF 第 5 页：Lumen 独立游戏设计" },
  "page-06": { id: "page-06", image: "/clean-images/page-06-clean.png", height: 1800, alt: "PDF 第 6 页：cat.zip 品牌设计" },
  "page-07": { id: "page-07", image: "/clean-images/page-07-clean.png", height: 2700, alt: "PDF 第 7 页：2025 磁带日历" },
  "page-08": { id: "page-08", image: "/clean-images/page-08-clean.png", height: 3150, alt: "PDF 第 8 页：PLAN N+ UI 设计" },
  "page-09": { id: "page-09", image: "/clean-images/page-09-clean.png", height: 1800, alt: "PDF 第 9 页：字体设计" },
  "page-10": { id: "page-10", image: "/clean-images/page-10-clean.png", height: 900, alt: "PDF 第 10 页：VIDEO" },
  "page-11": { id: "page-11", image: "/clean-images/page-11-clean.png", height: 900, alt: "PDF 第 11 页：PHOTO" }
};

const catalogButtons: CatalogButton[] = [
  { href: "/page-06", image: "/images/catalog-left-01-page06.png", alt: "目录左侧第一张图片，对应第 6 页", ariaLabel: "打开第 6 页 cat.zip", left: 128.23, top: 180.9, width: 328.81, height: 219.71 },
  { href: "/page-08", image: "/images/catalog-left-02-page08.png", alt: "目录左侧第二张图片，对应第 8 页", ariaLabel: "打开第 8 页 PLAN N+", left: 318.85, top: 467.44, width: 322.54, height: 344.7 },
  { href: "/page-09", image: "/images/catalog-left-03-page09.png", alt: "目录左侧第三张图片，对应第 9 页", ariaLabel: "打开第 9 页字体设计", left: 169.19, top: 971.21, width: 401.61, height: 340.82 },
  { href: "/page-11", image: "/images/catalog-left-04-page11.png", alt: "目录左侧第四张图片，对应第 11 页", ariaLabel: "打开第 11 页 PHOTO", left: 280, top: 1448.72, width: 400.17, height: 252.05 },
  { href: "/page-05", image: "/images/catalog-right-01-page05.png", alt: "目录右侧第一张图片，对应第 5 页", ariaLabel: "打开第 5 页 Lumen", left: 829.84, top: 121.47, width: 501.66, height: 279.24 },
  { href: "/page-07", image: "/images/catalog-right-02-page07.png", alt: "目录右侧第二张图片，对应第 7 页", ariaLabel: "打开第 7 页 2025 磁带日历", left: 784.2, top: 581.34, width: 344.95, height: 480 },
  { href: "/page-10", image: "/images/catalog-right-03-page10.png", alt: "目录右侧第三张图片，对应第 10 页", ariaLabel: "打开第 10 页 VIDEO", left: 859.75, top: 1226.25, width: 500, height: 281.25 }
];

const introText = [
  "我是叶子，一名跨领域视觉设计师。我的创作涵\n盖游戏设计、品牌设计、UI 设计、3D 视觉、动\n态影像与交互体验，关注概念表达与用户感受之\n间的联系。希望通过多元化的设计语言，将抽象\n想法转化为具有视觉吸引力与体验价值的作品。"
];

export function PdfSection({ page, children }: { page: PdfPage; children?: React.ReactNode }) {
  return (
    <section id={page.id} className="pdf-page" style={{ height: `${page.height}px` }}>
      {/* 清理后的 PDF 页面图：删除旧顶部导航，保留原页面背景和网格。 */}
      <img className="page-image" src={page.image} alt={page.alt} />
      {children}
    </section>
  );
}

export default function PortfolioPages() {
  return (
    <div className="portfolio">
      {homePages.map((page) => (
        <PdfSection key={page.id} page={page}>
          {/* 第 1 页自我介绍：使用 TextType 打字入场效果。 */}
          {page.id === "page-01" && (
            <TextType
              className="type-intro"
              text={introText}
              typingSpeed={38}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              loop={false}
            />
          )}

          {/* 第 2 页：挂绳工牌，正面为第一页 Yzzz. logo，背面为第二页右侧人像。 */}
          {page.id === "page-02" && <LanyardBadge />}

          {/* 第 3 页目录：图片按钮跳转到独立页面，首页不包含第 5-11 页。 */}
          {page.id === "page-03" &&
            catalogButtons.map((button) => (
              <a
                key={button.image}
                className="catalog-button"
                href={button.href}
                aria-label={button.ariaLabel}
                style={{ left: `${button.left}px`, top: `${button.top}px`, width: `${button.width}px`, height: `${button.height}px` }}
              >
                <img src={button.image} alt={button.alt} />
              </a>
            ))}
        </PdfSection>
      ))}
    </div>
  );
}

