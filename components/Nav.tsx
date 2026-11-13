"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDIO } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="wrap top">
      <Link className="word" href="/">
        Wilfred Hirst
      </Link>
      <nav aria-label="Primary">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={path === l.href ? "here" : undefined} aria-current={path === l.href ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <a href={STUDIO}>Studio</a>
      </nav>
    </header>
  );
}
