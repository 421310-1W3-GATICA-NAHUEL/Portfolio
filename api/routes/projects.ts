import { Router } from 'express';

const router = Router();

const mockProjects = [
  {
    id: '1',
    title: { es: 'Kinesiólogo - Landing Page', en: 'Sports Physiotherapist - Landing Page' },
    description: {
      es: 'Landing page responsive para un kinesiólogo deportivo, con contacto directo por WhatsApp, formulario de reserva de turnos y SEO local (schema.org).',
      en: 'Responsive landing page for a sports physiotherapist, with direct WhatsApp contact, an appointment booking form, and local SEO (schema.org).'
    },
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Lucide Icons', 'GitHub Pages'],
    imageUrl: '/kinepage.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/Kinesiologo-Page',
    demoUrl: 'https://421310-1w3-gatica-nahuel.github.io/Kinesiologo-Page/'
  },
  {
    id: '2',
    title: {
      es: 'Plataforma de Licitaciones para Droguería',
      en: 'Bidding & Quoting Platform for Pharmacy Distributor'
    },
    description: {
      es: 'Desarrollo Full-Stack de una plataforma integral para la gestión de productos, inventario y cotizaciones. Permite a los administradores gestionar el catálogo de productos y a los clientes interactuar con un cotizador interactivo en tiempo real. Incluye autenticación segura mediante JWT, protección de rutas y despliegue automatizado en la nube con separación de entornos (Frontend/Backend).',
      en: 'Full-stack development of a comprehensive platform for product management, inventory, and quoting. Admins manage the product catalog while clients interact with a real-time interactive quoting tool. Includes secure JWT authentication, protected routes, and automated cloud deployment with environment separation (Frontend/Backend).'
    },
    technologies: ['React', 'Vite', 'TailwindCSS', 'React Router', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'bcrypt'],
    imageUrl: '/sistema-drog.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/demo-licitaciones',
    demoUrl: 'https://demo-licitaciones-mu.vercel.app'
  },
  {
    id: '3',
    title: { es: 'Sans Limit — E-commerce Streetwear', en: 'Sans Limit — Streetwear E-commerce' },
    description: {
      es: 'E-commerce full-stack de indumentaria y perfumería streetwear, con catálogo de productos por variantes (talle/color/stock), carrito y checkout, sistema de cupones con ruleta interactiva de descuentos, autenticación de usuarios y panel de administración con dashboard de métricas de ventas.',
      en: 'Full-stack e-commerce for streetwear apparel and fragrances, with product catalog by variants (size/color/stock), cart and checkout, a coupon system with an interactive discount wheel, user authentication, and an admin panel with a sales metrics dashboard.'
    },
    technologies: ['React 19', 'Vite', '.NET 8', 'C#', 'MongoDB', 'Docker', 'Vercel', 'Render', 'MongoDB Atlas'],
    imageUrl: '/SANSLMIT.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/SANSLIMT',
    demoUrl: 'https://sanslmit.vercel.app'
  },
  {
    id: '4',
    title: {
      es: 'Cantitas — Plataforma de Reservas para Peluquería Canina',
      en: 'Cantitas — Booking Platform for a Dog Grooming Salon'
    },
    description: {
      es: 'Aplicación full-stack para una peluquería canina: los clientes reservan turnos online (con validación de ficha médica de la mascota), la administradora gestiona la agenda, confirma/rechaza turnos, y sube fotos de antes/después con recorte automático de fondo por IA. Incluye sistema de fidelización por "huellitas", recuperación de contraseña por email y un panel de estadísticas para el negocio.',
      en: 'Full-stack application for a dog grooming salon: clients book appointments online (with pet medical record validation), the admin manages the schedule, confirms/rejects bookings, and uploads before/after photos with AI-powered automatic background removal. Includes a "pawprint" loyalty system, email password recovery, and a business stats dashboard.'
    },
    technologies: ['Java 21', 'Spring Boot 3', 'Spring Security', 'JWT', 'Hibernate', 'PostgreSQL', 'Flyway', 'React 19', 'Vite', 'Docker', 'nginx', 'GitHub Actions'],
    imageUrl: '/cantitas.png',
    demoUrl: 'https://cantitas.site'
  }
];

router.get('/', (req, res) => {
  res.json(mockProjects);
});

router.get('/:id', (req, res) => {
  const project = mockProjects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

export default router;
