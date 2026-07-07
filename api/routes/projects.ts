import { Router } from 'express';

const router = Router();

const mockProjects = [
  {
    id: '1',
    title: { es: 'Smart Parking UTN', en: 'Smart Parking UTN' },
    description: {
      es: 'Sistema inteligente para la gestión y monitoreo de estacionamientos en tiempo real. Optimiza el uso del espacio y facilita la reserva de lugares (Proyecto Académico).',
      en: 'Smart system for real-time parking management and monitoring. Optimizes space usage and facilitates spot reservations (Academic Project).'
    },
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'IoT'],
    imageUrl: '/project_dashboard.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/SmartParkingUTN',
    demoUrl: '#'
  },
  {
    id: '2',
    title: { es: 'Sistema Droguería', en: 'Pharmacy System' },
    description: {
      es: 'Plataforma integral para la gestión de inventario, ventas y facturación de droguerías. Incluye control de stock en tiempo real, alertas de vencimiento y reportes de ventas.',
      en: 'Comprehensive platform for pharmacy inventory management, sales, and billing. Includes real-time stock control, expiration alerts, and sales reporting.'
    },
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    imageUrl: '/project_ecommerce.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/sistema-drogueria',
  },
  {
    id: '3',
    title: { es: 'SANSLIMT', en: 'SANSLIMT' },
    description: {
      es: 'Aplicación web interactiva enfocada en la experiencia del usuario con animaciones fluidas, diseño responsivo y optimización de rendimiento.',
      en: 'Interactive web application focused on user experience with fluid animations, responsive design, and performance optimization.'
    },
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Web Animations'],
    imageUrl: '/project_microservices.png',
    repoUrl: 'https://github.com/421310-1W3-GATICA-NAHUEL/SANSLIMT',
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
