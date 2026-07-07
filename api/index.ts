import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import projectsRouter from './routes/projects';
import contactRouter from './routes/contact';

const app = express();

// 1. Helmet para esconder headers de Express y proteger contra vulnerabilidades web comunes
app.use(helmet());

// 2. CORS Estricto: Solo permitimos peticiones desde el frontend oficial o localhost
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL, 'http://localhost:5173']
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Si no hay origin (como un bot local o misma ruta en Vercel) o está en la lista blanca, pasa.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por política CORS estricta'));
    }
  }
}));

app.use(express.json());
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Vercel serverless functions require exporting the express app
export default app;
