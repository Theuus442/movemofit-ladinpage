import ProductCard from "@/components/flagship/ProductCard";

export default function OracleProducts({ items }: { items: { name: string; tagline: string; img: string; hoverImg: string; href: string }[] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="opacity-0 translate-y-6 animate-[fadeInUp_0.9s_ease_forwards]" style={{ animationDelay: `${i * 120}ms` }}>
            <ProductCard name={it.name} tagline={it.tagline} href={it.href} img={it.img} hoverImg={it.hoverImg} imgAlt={it.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
