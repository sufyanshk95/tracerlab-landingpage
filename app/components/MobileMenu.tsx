"use client";

import { useEffect, useRef } from "react";

// Mobile nav: a native <details> disclosure (renders and works without JS;
// keyboard-operable). The only JS is closing it — on link click, on Escape,
// and on a click outside — since the anchors point at same-page sections and
// the disclosure would otherwise stay open over the content.
export default function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const close = () => d.removeAttribute("open");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDoc = (e: MouseEvent) => {
      if (d.open && !d.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDoc);
    };
  }, []);
  return (
    <details ref={ref} className="group relative md:hidden">
      <summary
        aria-label="Open menu"
        className="flex h-9 w-9 cursor-pointer list-none items-center justify-center text-ink/70 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden"
      >
        <svg className="h-5 w-5 group-open:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg className="hidden h-5 w-5 group-open:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
      </summary>
      <nav aria-label="Primary (mobile)" className="fixed inset-x-0 top-16 z-50 flex flex-col border-b border-ink/12 bg-page py-2 shadow-[var(--nt-underglow)]">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => ref.current?.removeAttribute("open")}
            className="px-6 py-3 text-[1rem] font-medium text-ink/75 hover:bg-ink/[0.05] hover:text-ink"
            style={{ fontFamily: "var(--font-archivo), system-ui, sans-serif" }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
