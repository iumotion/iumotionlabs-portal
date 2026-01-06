# Instrucciones de Despliegue - IumotionLabs Landing Page

## Resumen del Build

| Métrica | Valor |
|---------|-------|
| **Tamaño total dist/** | ~216 KB |
| **CSS compilado** | ~27 KB |
| **JavaScript** | 0 KB (solo inline scripts) |
| **HTML** | ~38 KB |
| **Dependencias externas** | Ninguna (0 CDN) |

---

## Prerrequisitos

- Node.js 18+ (recomendado 20 LTS)
- npm 9+

## Instalación Local

```bash
# Clonar/navegar al proyecto
cd portal

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## Opción 1: GitHub Pages

### Pasos

1. **Crear repositorio en GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: IumotionLabs landing page"
   git branch -M main
   git remote add origin https://github.com/iumotionlabs/portal.git
   git push -u origin main
   ```

2. **Configurar GitHub Actions**

   Crear `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: "20"
             cache: "npm"

         - name: Install dependencies
           run: npm ci

         - name: Build
           run: npm run build

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Habilitar GitHub Pages**
   - Ir a Settings → Pages
   - Source: GitHub Actions
   - El despliegue se ejecutará automáticamente en cada push a `main`

4. **Configurar dominio personalizado** (opcional)
   - En Settings → Pages → Custom domain: `iumotionlabs.com`
   - Configurar DNS CNAME: `iumotionlabs.com` → `iumotionlabs.github.io`
   - Marcar "Enforce HTTPS"

---

## Opción 2: AWS S3 + CloudFront

### Paso 1: Crear Bucket S3

```bash
# Crear bucket
aws s3 mb s3://iumotionlabs-landing --region us-east-1

# Configurar como sitio web estático
aws s3 website s3://iumotionlabs-landing \
  --index-document index.html \
  --error-document index.html
```

### Paso 2: Subir archivos

```bash
# Build
npm run build

# Sincronizar con S3
aws s3 sync dist/ s3://iumotionlabs-landing \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude "sitemap.xml" \
  --exclude "robots.txt"

# Subir HTML y archivos sin cache largo
aws s3 sync dist/ s3://iumotionlabs-landing \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "sitemap.xml" \
  --include "robots.txt"
```

### Paso 3: Crear distribución CloudFront

1. **Ir a CloudFront Console** → Create distribution
2. **Origin domain**: `iumotionlabs-landing.s3.amazonaws.com`
3. **Origin access**: Origin access control settings (OAC)
4. **Default cache behavior**:
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Allowed HTTP methods: GET, HEAD
   - Cache policy: CachingOptimized
5. **Settings**:
   - Alternate domain name (CNAME): `iumotionlabs.com`, `www.iumotionlabs.com`
   - Custom SSL certificate: Solicitar en ACM (us-east-1)
   - Default root object: `index.html`
6. **Error pages**:
   - 404 → /index.html (para SPA fallback si se necesita)

### Paso 4: Configurar DNS en Route53

```
iumotionlabs.com        A     ALIAS → d1234567890.cloudfront.net
www.iumotionlabs.com    CNAME       → iumotionlabs.com
```

---

## Checklist de Verificación

### Performance (Lighthouse ≥ 95)

- [ ] Performance Score ≥ 95
- [ ] Accessibility Score ≥ 95
- [ ] Best Practices Score ≥ 95
- [ ] SEO Score ≥ 95
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

### Accesibilidad (WCAG 2.2 AA)

- [x] Skip link para navegación por teclado
- [x] Focus visible en todos los elementos interactivos
- [x] Contraste de colores cumple WCAG AA (4.5:1 para texto)
- [x] Navegación completa por teclado
- [x] ARIA labels en elementos interactivos
- [x] Respeto a `prefers-reduced-motion`
- [x] Estructura semántica HTML5 (header, main, footer, nav, article)
- [x] Textos alternativos en imágenes (o `aria-hidden` para decorativas)

### Responsive Design

- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Navegación móvil funcional
- [ ] Imágenes y layout adaptativo

### SEO Técnico

- [x] `<title>` único y descriptivo
- [x] `<meta name="description">` presente
- [x] Open Graph tags completos
- [x] Twitter Card tags completos
- [x] URL canónica definida
- [x] `robots.txt` presente
- [x] `sitemap.xml` presente
- [x] JSON-LD Organization schema
- [x] Estructura de encabezados correcta (h1 → h2 → h3)

### Seguridad

- [x] Sin dependencias externas innecesarias
- [x] Sin inline scripts no controlados
- [x] Sin recursos de CDN externos (todo local)
- [x] Fuente Inter cargada localmente
- [ ] Headers de seguridad en servidor (CSP, X-Frame-Options, etc.)

### Assets y Peso Final

| Archivo | Tamaño |
|---------|--------|
| CSS (compilado) | ~27 KB |
| HTML (index) | ~38 KB |
| Fuente Inter Variable | ~94 KB |
| JavaScript inline | ~2 KB |
| **Total dist/** | ~216 KB |

### Librerías/Dependencias

| Librería | Versión | Justificación |
|----------|---------|---------------|
| Astro | ^4.x | Framework SSG para salida 100% estática |
| Tailwind CSS | ^4.x | Sistema de diseño utility-first |

**Sin dependencias de animación externas** - Todas las animaciones usan:
- CSS `@keyframes` nativo
- `IntersectionObserver` nativo para scroll-reveal

---

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build local
npm run preview

# Analizar bundle (requiere vite-bundle-visualizer)
npm run build -- --analyze
```

---

## Notas Importantes

1. **Imagen OG**: Reemplazar `public/og-image.png` con una imagen real de 1200x630px
2. **Correo de contacto**: Actualizar `hello@iumotionlabs.com` en Footer.astro
3. **Links sociales**: Actualizar URLs de GitHub y LinkedIn en Footer.astro
4. **Dominio**: Cambiar `site` en `astro.config.mjs` si usas un dominio diferente
