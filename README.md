# Nahuel Gatica — Portfolio

Mi portfolio personal construido para mostrar quién soy, qué sé hacer y cómo pienso cuando desarrollo software.

No es un sitio estático. Tiene un backend real con funciones serverless, API documentada, validación de datos y está pensado para escalar fácilmente cuando conectemos las bases de datos.

---

## ¿Por qué este stack?

- **React + Vite + TypeScript** — porque el tipado me ahorra bugs antes de llegar a producción
- **TailwindCSS** — utilidades directamente en el JSX, sin saltar entre archivos de CSS
- **Framer Motion** — animaciones que se sienten naturales, no forzadas
- **Node.js + Express serverless** — funciona en Vercel sin fricciones y escala gratis
- **MongoDB Atlas** (próximamente conectado) — ya tengo los modelos listos, es solo enchufar las variables de entorno
- **Zod** — validación de formularios en el backend, sin depender del cliente

---

## Estructura del proyecto

```
/
├── frontend/               # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/     # Navbar, cursor, footer, etc.
│   │   ├── sections/       # Hero, About, Skills, Projects, Contact
│   │   ├── i18n/           # Traducciones ES / EN
│   │   └── three/          # Escenas 3D (reservado para futuras versiones)
│   └── public/             # Imágenes, CV en PDF, favicon
│
├── api/                    # Backend serverless (Vercel Functions)
│   ├── routes/
│   │   ├── projects.ts     # GET /api/projects
│   │   └── contact.ts      # POST /api/contact
│   └── index.ts            # Entry point del servidor Express
│
└── vercel.json             # Configuración de rutas para el monorepo
```

---

## Correr en local

### Requisitos
- Node.js 18+
- npm 9+

### Instalar y arrancar

```bash
# Clonar el repo
git clone https://github.com/421310-1W3-GATICA-NAHUEL/portfolio.git
cd portfolio

# Instalar dependencias del frontend
cd frontend
npm install
npm run dev
# → http://localhost:5173

# En otra terminal, instalar y arrancar el backend
cd ../api
npm install
npx ts-node local.ts
# → http://localhost:3001
```

### Variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env
```

Los proyectos y el formulario de contacto funcionan con datos mock sin necesitar configurar nada. Las variables solo son necesarias para conectar MongoDB, Redis y el servicio de email.

---

## Deploy en Vercel

El proyecto está configurado como monorepo para Vercel. El `vercel.json` ya maneja el ruteo entre el frontend estático y las funciones serverless del backend.

```bash
# Si tenés Vercel CLI instalado
vercel deploy
```

O conectás el repo desde el dashboard de Vercel y se despliega automáticamente en cada push a `main`.

---

## Roadmap / Próximas features

- [ ] Conectar MongoDB Atlas para proyectos dinámicos
- [ ] Upstash Redis para rate-limiting del formulario
- [ ] Envío real de emails con Resend
- [ ] Panel `/admin` con autenticación JWT para cargar proyectos sin tocar código
- [ ] Documentación de la API con Swagger/OpenAPI en `/api/docs`
- [ ] Tests unitarios con Jest para las rutas del backend

---

## Contacto

- **Email** — gaticanahuel70@gmail.com
- **LinkedIn** — [nahuel-gatica-295925190](https://www.linkedin.com/in/nahuel-gatica-295925190)
- **GitHub** — [421310-1W3-GATICA-NAHUEL](https://github.com/421310-1W3-GATICA-NAHUEL)
