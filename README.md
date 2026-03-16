# Daniel Di Giorgio – Portfolio Cinematográfico

Portfólio em formato de narrativa cinematográfica, inspirado em páginas de produto da Apple e portfólios de desenvolvedores de alto nível.

## Stack

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP + ScrollTrigger
- Three.js (@react-three/fiber, @react-three/drei)
- Lenis (smooth scroll)
- next-intl (EN / PT)
- lucide-react

## Estrutura de pastas

```
app/
  [locale]/
    layout.tsx
    page.tsx
  globals.css
  layout.tsx
components/
  hero/        (PlanetHero, ZoomIntro)
  chapters/   (Chapter, ChapterText, ChapterImage)
  timeline/   (Timeline, TimelineConnection)
  effects/    (Earth, Stars, Particles, Parallax)
content/
  career.en.ts
  career.pt.ts
  types.ts
i18n/
  config.ts
  request.ts
  routing.ts
public/
  profile/    daniel.png
  companies/  canoastec.png, unimed.png, sigmatek.png, pagbrasil.png
  earth/      earth.png
```

## Imagens necessárias

Coloque os arquivos nas pastas indicadas para a experiência completa:

- `public/profile/daniel.png` – foto de perfil
- `public/earth/earth.png` – textura do globo (ex.: mapa-múndi)
- `public/companies/canoastec.png`, `unimed.png`, `sigmatek.png`, `pagbrasil.png` – logos das empresas

Sem `earth.png`, a cena do hero pode falhar ao carregar a textura; as demais imagens têm fallback ou não bloqueiam.

## Como rodar

```bash
npm install
npm run dev
```

Abrir: [http://localhost:3000](http://localhost:3000)

- Inglês: `/` ou `/en`
- Português: `/pt`

O idioma é detectado pelo `Accept-Language` do navegador (se começar com `pt`, usa português).

## Build

```bash
npm run build
npm start
```

## Regras de design

- Tema escuro, cinematográfico e minimalista
- Cores: `#0B0F19`, `#111827`, `#1F2937`, `#3B82F6`
- Fontes: Inter (sans), Satoshi (display)
- Uso de glow, gradientes leves e glassmorphism
