# Landing Page estática de alto impacto para iumotionlabs.com

### Rol y objetivo

Actúa como un **Lead Product Designer** + **Senior Frontend Engineer** con foco en **branding, UX, performance, accesibilidad, SEO técnico y seguridad**. Tu misión es **diseñar y construir** una **Landing Page estática** (alto impacto visual, moderna y minimalista) para **iumotionlabs.com**, orientada a:

* Posicionar a IumotionLabs como laboratorio de innovación de vanguardia.
* Generar autoridad técnica y curiosidad.
* Presentar un portafolio de proyectos con claridad de estado, tipo y enfoque.

### Principios de calidad (no negociables)

1. **Estático real:** salida 100% estática lista para GitHub Pages o AWS S3 + CloudFront.
2. **Performance primero:** objetivo Lighthouse ≥ 95 en Performance/Accessibility/Best Practices/SEO.
3. **Accesibilidad:** WCAG 2.2 AA (navegación por teclado, focus visible, contraste, semántica).
4. **Seguridad:** no uses dependencias innecesarias; evita inline scripts si puedes; no uses recursos externos sin justificar. Si usas CDNs, agrega SRI y `crossorigin`.
5. **DX y mantenibilidad:** estructura limpia, componentes/reutilización, CSS consistente, naming claro, comentarios mínimos pero útiles.
6. **Diseño vanguardista:** “SaaS futurista / Bento Grid”, gradientes sutiles, micro-interacciones, espacios generosos, tipografía sans-serif moderna, estética premium.

---

## Alcance funcional y UX

### Estructura mínima de la página

1. **Header sticky**

   * Logo/wordmark “IumotionLabs”
   * Navegación anclada: `Inicio`, `Portafolio`, `Enfoque`, `Contacto`
   * **Toggle Light/Dark** visible con preferencia persistente (localStorage) y respeto a `prefers-color-scheme`

2. **Hero Section**

   * Propuesta de valor clara, visionaria y técnica pero accesible
   * CTA principal: “Explorar Portafolio”
   * CTA secundario: “Contactar”
   * Elementos visuales: fondo con gradiente, patrón/mesh suave, sin saturación

3. **Portafolio: “Timeline de Innovación”**

   * Presenta proyectos por estado: **Launchpad / Building / Concept Lab**
   * Usa **tarjetas** (bento) o **timeline vertical** con animación sutil al aparecer
   * Cada proyecto debe mostrar:

     * Nombre, tipo (App / Web Platform / Ecosistema), estado, breve descripción
     * 3–6 “highlights” técnicos o de valor
     * Un “tag” visual para diferenciar **Apps** vs **Plataformas Web**
     * Un CTA por proyecto (si no hay link público: “Próximamente” / “Solicitar demo”)

4. **Sección “Enfoque”**

   * 3–5 pilares: innovación, seguridad, escalabilidad, diseño, velocidad de entrega
   * Breve, orientado a confianza y autoridad

5. **Contacto / Footer**

   * Correo de contacto (placeholder configurable)
   * Links opcionales (GitHub/LinkedIn) si existen; si no, deja preparado
   * Footer con “© IumotionLabs”

---

## Stack y arquitectura recomendada

### Opción preferida (recomendada): **Astro + Tailwind**

* Razón: rendimiento excelente, salida estática, componentes, DX superior.
* Entregables como proyecto listo para `npm install && npm run build` con salida `/dist`.

### Alternativa válida: **Single-file HTML + Tailwind**

* Permitida si priorizas simplicidad extrema, pero mantén calidad (SEO, accesibilidad, performance).

**Decisión:** elige una sola opción y ejecútala completo.

---

## Animaciones y micro-interacciones

* Implementa scroll-reveal y micro-interacciones con una librería **ligera**:

  * Preferencia: `IntersectionObserver` nativo (sin dependencia) o una librería mínima.
  * Si usas GSAP/Framer Motion, justifica por qué y controla el peso.
* Respeta `prefers-reduced-motion` (desactiva o reduce animaciones).
* No uses efectos pesados que degraden LCP/CLS.

---

## SEO técnico y metadatos

Incluye:

* `title`, `meta description`, Open Graph, Twitter cards
* `canonical`
* `robots`
* `sitemap.xml` y `robots.txt` (si usas Astro, generarlos o incluirlos en `public/`)
* JSON-LD básico (`Organization`)

---

## Contenido (copywriting) y fuentes locales

Primero **analiza y sintetiza** la esencia (visión, propuesta de valor, tono) de los archivos locales. Luego escribe el copy final.

### Proyectos y fuentes

**A. Launchpad (Próximo a desplegar)**

* Proyecto: **SAVVY** (App móvil)
* Fuente: `/Users/cburgosro/Projects/Personal/otros/savvy`
* Objetivo: generar hype (expectativa) sin prometer de más.

**B. Building (En desarrollo)**

* Proyecto: **MYTHOS** (Plataforma Web + App móvil / Ecosistema)
* Fuentes:

  * `/Users/cburgosro/Projects/Personal/otros/mythos/mythos-devops/.docs/plan/PRD_v1.md`
  * `/Users/cburgosro/Projects/Personal/otros/mythos/mythos-fe-public/docs/quienes_somos.md`
  * `/Users/cburgosro/Projects/Personal/otros/mythos/mythos-fe-public/docs/manifest.md`
* Objetivo: mostrar solidez técnica y progreso real.

**C. Concept Lab (Ideación)**

* Proyecto: **FAMILY CARE** (App móvil)
* Fuente: `/Users/cburgosro/Projects/Personal/otros/baby/docs/idea/claude-design.md`
* Objetivo: visión de futuro (concepto), enfoque humano y utilidad.

**Instrucción clave:** si algún archivo no está disponible o no puedes leerlo, no inventes detalles específicos. En su lugar:

* Genera copy “placeholder inteligente” basado en lo que sí exista.
* Lista explícitamente qué información faltó y qué campos se pueden completar cuando se disponga del archivo.

---

## Diseño visual: guía concreta

* Sistema de diseño mínimo:

  * 1 tipografía principal sans (sugerencia: Inter o Plus Jakarta Sans)
  * Escala tipográfica consistente
  * Paleta neutral + 1 acento (gradiente sutil)
  * Componentes: Button, Card, Badge/Tag, Section header, Navbar
* Layout:

  * Grid 12 columnas (desktop), 4 (mobile)
  * Bento grid en portafolio con jerarquía visual clara
* Dark/Light:

  * `data-theme="dark|light"` o `class="dark"` con Tailwind
  * Transiciones suaves, sin “flash” (evitar FOUC)

---

## Entregables (obligatorios)

1. **Código completo** de la landing:

   * Si eliges Astro: repo structure + `package.json` + config + `src/` + `public/`
   * Si eliges HTML: `index.html` + assets (css/js) organizados
2. **Instrucciones breves de despliegue estático**:

   * GitHub Pages (pasos + settings)
   * AWS S3 + CloudFront (resumen)
3. **Checklist de verificación**:

   * Lighthouse objetivos
   * Accesibilidad (teclado, focus, reduced motion)
   * Responsive (mobile/tablet/desktop)
   * Peso final aproximado (JS/CSS) y justificación de librerías

---

## Plan de ejecución esperado (cómo debes responder)

1. **Fase 1 — Análisis**: resume los hallazgos de los archivos y define el tono/copy.
2. **Fase 2 — Diseño**: describe brevemente la dirección visual (componentes y layout).
3. **Fase 3 — Implementación**: entrega el código completo.
4. **Fase 4 — Deploy**: instrucciones y checklist.

**Comienza por Fase 1 analizando los archivos proporcionados. Luego continúa hasta completar todos los entregables.**
