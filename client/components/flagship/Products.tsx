import ProductCard from "./ProductCard";

export default function Products() {
  const items = [
    {
      name: "Top Pulse",
      tagline: "O top de sustentação definitiva",
      href: "https://movemodefit.com.br/",
      img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
      hoverImg: "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?q=80&w=1600&auto=format&fit=crop",
      alt: "Top esportivo",
    },
    {
      name: "Legging Flux",
      tagline: "Compressão precisa. Liberdade total.",
      href: "https://movemodefit.com.br/",
      img: "https://images.unsplash.com/photo-1596357395102-38b8d6f89a83?q=80&w=1600&auto=format&fit=crop",
      hoverImg: "https://images.unsplash.com/photo-1594402913057-0f993a21f8ab?q=80&w=1600&auto=format&fit=crop",
      alt: "Legging técnica",
    },
    {
      name: "Jaqueta Aero",
      tagline: "Proteção leve para qualquer clima",
      href: "https://movemodefit.com.br/",
      img: "https://images.unsplash.com/photo-1535747790212-30c585ab4860?q=80&w=1600&auto=format&fit=crop",
      hoverImg: "https://images.unsplash.com/photo-1517341720771-2aebd0a54b63?q=80&w=1600&auto=format&fit=crop",
      alt: "Jaqueta técnica",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 text-left">
        <h2 className="font-serif text-4xl md:text-5xl">Seleção Curada</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="opacity-0 translate-y-6 animate-[fadeInUp_0.9s_ease_forwards]" style={{ animationDelay: `${i * 120}ms` }}>
            <ProductCard name={it.name} tagline={it.tagline} href={it.href} img={it.img} hoverImg={it.hoverImg} imgAlt={it.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
