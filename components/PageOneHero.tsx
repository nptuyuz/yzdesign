import Image from "next/image";

const introLines = [
  "我是叶子，一名跨领域视觉设计师。我的创作涵",
  "盖游戏设计、品牌设计、UI 设计、3D 视觉、动",
  "态影像与交互体验，关注概念表达与用户感受之",
  "间的联系。希望通过多元化的设计语言，将抽象",
  "想法转化为具有视觉吸引力与体验价值的作品。"
];

export default function PageOneHero() {
  return (
    <section id="home" className="relative h-[900px] overflow-hidden bg-portfolioBlack">
      {/* 左上角作者名：对应 PDF 第 1 页 x=40 y=50 的 Yzzz.。 */}
      <p className="absolute left-10 top-[50px] text-[14px] leading-none text-portfolioText">
        Yzzz.
      </p>

      {/* 自我介绍文案：逐行保留 PDF 的换行和宽度节奏。 */}
      <div className="absolute left-[100px] top-[96px] w-[390px] text-[18px] leading-[21.6px] text-portfolioText">
        {introLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {/* 关联图片 page-01-hero.png：从 PDF 第 1 页右下主视觉裁切，位置对应 x=400-1400 y=476-860。 */}
      <div className="absolute left-[400px] top-[476px] h-[384px] w-[1000px] overflow-hidden">
        <Image
          src="/images/page-01-hero.png"
          alt="第一页右下白色材质主视觉，来源于 PDF 第 1 页裁切图"
          fill
          priority
          sizes="1000px"
          className="object-cover"
        />
      </div>
    </section>
  );
}
