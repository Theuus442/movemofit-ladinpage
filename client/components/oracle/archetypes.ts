export type ArchetypeKey = "forca" | "resistencia" | "equilibrio";

export interface ArchetypeConfig {
  key: ArchetypeKey;
  label: string;
  colorHsl: string; // HSL tokens
  titleCTA: string;
  ctaLink: string;
  products: { name: string; tagline: string; img: string; hoverImg: string; href: string }[];
}

export const ARCHETYPES: Record<ArchetypeKey, ArchetypeConfig> = {
  forca: {
    key: "forca",
    label: "A FORÇA",
    colorHsl: "326 100% 41%",
    titleCTA: "CONSTRUA A SUA FORÇA.",
    ctaLink: "https://movemodefit.com.br/acessorios-fitness",
    products: [
      {
        name: "Kit 11 Elásticos Extensores",
        tagline: "Treino funcional completo",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Feb86a1d17cfc4564828db1fffd8eca26?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Feb86a1d17cfc4564828db1fffd8eca26?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/kit-11-elasticos-extensores-treino-funcional-completo-para-academia-ou-em-casa",
      },
      {
        name: "Corda de Pular (tema Força)",
        tagline: "Ritmo e potência",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2F6ce0fae7054343b7b4767abe37c319b5?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2F6ce0fae7054343b7b4767abe37c319b5?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/kit-11-elasticos-extensores-treino-funcional-completo-para-academia-ou-em-casa",
      },
      {
        name: "Mini Bicicleta Ergométrica",
        tagline: "Endurance focado em casa",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fc0353bdb7d5d4ddc8d5e698df5281572?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fc0353bdb7d5d4ddc8d5e698df5281572?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/mini-bicicleta-ergometrica-de-pedal-exercitador-portatil-para-pernas-bracos-e-joelhos-ideal-para-idosos",
      },
    ],
  },
  resistencia: {
    key: "resistencia",
    label: "A RESISTÊNCIA",
    colorHsl: "200 100% 50%",
    titleCTA: "ELEVE SUA RESISTÊNCIA.",
    ctaLink: "https://movemodefit.com.br/saude-e-bem-estar",
    products: [
      {
        name: "Calça Legging Térmica Feminina",
        tagline: "Conforto e UV50",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Ff30886b9718049298ae05bbed225b4cc?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Ff30886b9718049298ae05bbed225b4cc?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/calca-legging-termica-feminina-snugg-wear-protecao-uv50-e-conforto-para-o-treino1",
      },
      {
        name: "Conjunto de Academia em Poliamida",
        tagline: "Zero transparência",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fcb14bb1ba32a4d1f9fbe3d35cd9c68cd?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fcb14bb1ba32a4d1f9fbe3d35cd9c68cd?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/conjunto-de-academia-em-poliamida-conforto-e-zero-transparencia-para-seus-treinos",
      },
      {
        name: "Calça Pantalona Feminina Yoga",
        tagline: "Conforto e estilo",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fcc0776a6375047df879fcadf92f634d6?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fcc0776a6375047df879fcadf92f634d6?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/calca-pantalona-feminina-yoga-conforto-e-estilo-do-brasil1",
      },
    ],
  },
  equilibrio: {
    key: "equilibrio",
    label: "O EQUILÍBRIO",
    colorHsl: "170 75% 55%",
    titleCTA: "ALCANCE SEU EQUILÍBRIO.",
    ctaLink: "https://movemodefit.com.br/moda-casual-fit",
    products: [
      {
        name: "Rolo Meia-Roda de Espuma",
        tagline: "Equilíbrio e massagem",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fd7380038f10648ef89ddd12094e4d6d8?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fd7380038f10648ef89ddd12094e4d6d8?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/rolo-meia-roda-de-espuma-yoga-pilates-equilibrio-e-massagem-muscular",
      },
      {
        name: "Discos Deslizantes (2 peças)",
        tagline: "Mobilidade e core",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fff59d5c395a840fa8f5f5ccb06a54e7f?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2Fff59d5c395a840fa8f5f5ccb06a54e7f?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/conjunto-de-discos-deslizantes-para-yoga-e-fitness-abdominal-e-modelagem-corporal-2-pecas",
      },
      {
        name: "Tapete Guia de Posição 80x35cm",
        tagline: "Técnica de agachamento",
        img: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2F69a57459ba684783aed223c6de79230a?format=webp&width=800",
        hoverImg: "https://cdn.builder.io/api/v1/image/assets%2F27616bbd92374c3bb6a5c8839e5544f3%2F69a57459ba684783aed223c6de79230a?format=webp&width=800",
        href: "https://movemodefit.com.br/produtos/tapete-de-guia-de-posicao-para-agachamento-80x35cm-multiuso-para-yoga-pilates-e-treinamento-de-quadril-e-perna",
      },
    ],
  },
};
