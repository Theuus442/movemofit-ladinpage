import React from "react";

interface Props {
  name: string;
  tagline: string;
  href: string;
  img: string;
  imgAlt: string;
  hoverImg: string;
  delay?: number;
}

export default function ProductCard({ name, tagline, href, img, hoverImg, imgAlt, delay = 0 }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      data-orb-hover
      className="group relative block overflow-hidden rounded-2xl bg-[#0b0b0b] text-white shadow-2xl ring-1 ring-white/10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img src={img} alt={imgAlt} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"/>
        <img src={hoverImg} alt={imgAlt} className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
      </div>
      <div className="space-y-1 p-5">
        <h3 className="font-semibold tracking-wide">{name}</h3>
        <p className="text-sm text-white/70">{tagline}</p>
        <span className="mt-2 inline-flex items-center gap-2 text-[13px] font-semibold tracking-widest text-brand">
          VER DETALHES <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </a>
  );
}
