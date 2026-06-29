const navItems = [
  { label: "HOME", href: "/#page-01" },
  { label: "WORK", href: "/#page-03" },
  { label: "ABOUT ME", href: "/#page-02" }
];

export default function FixedHeader() {
  return (
    <>
      {/* 黑色底与边缘羽化：压住 PDF 原顶部区域，让新导航更清晰。 */}
      <div className="nav-veil" />

      {/* 固定 CREATED BY：新的顶部署名。 */}
      <a className="fixed-brand" href="/#page-01" aria-label="Back to first page">
        CREATED BY
      </a>

      {/* 固定 Yzzz.：新的第二行作者名。 */}
      <p className="fixed-name">Yzzz.</p>

      {/* 固定右上导航：HOME=第一页，WORK=第三页，ABOUT ME=第二页。 */}
      <nav className="fixed-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );
}
