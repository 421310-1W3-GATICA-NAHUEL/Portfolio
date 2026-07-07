import { Router } from 'express';
import { z } from 'zod';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import sanitizeHtml from 'sanitize-html';

const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuración de Upstash Redis para el Rate Limiting
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Límite: 3 mensajes por IP cada 1 hora
const ratelimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
}) : null;

// Zod schema for validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message is too short'),
});

router.post('/', async (req, res) => {
  try {
    // 1. RATE LIMITING (Anti-Spam)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    
    if (ratelimit) {
      const { success, limit, remaining, reset } = await ratelimit.limit(ip as string);
      
      res.setHeader('X-RateLimit-Limit', limit.toString());
      res.setHeader('X-RateLimit-Remaining', remaining.toString());
      res.setHeader('X-RateLimit-Reset', reset.toString());

      if (!success) {
        console.warn(`[RATE LIMIT] IP bloqueada temporalmente: ${ip}`);
        return res.status(429).json({ 
          error: 'Has enviado demasiados mensajes. Por favor, intentá de nuevo más tarde.' 
        });
      }
    } else {
      console.warn('⚠️ Redis no configurado. Rate Limit deshabilitado.');
    }

    // 2. VALIDACIÓN BASE
    const data = contactSchema.parse(req.body);

    // 3. SANITIZACIÓN (Anti-XSS / Hacks)
    // Eliminamos cualquier etiqueta HTML maliciosa (<script>, <iframe>, etc)
    const cleanName = sanitizeHtml(data.name, { allowedTags: [], allowedAttributes: {} });
    const cleanMessage = sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: {} });

    if (!process.env.RESEND_API_KEY) {
      console.warn('⚠️ No RESEND_API_KEY found, mocking email send:', { cleanName, email: data.email, cleanMessage });
      await new Promise(resolve => setTimeout(resolve, 1000));
      return res.json({ success: true, message: 'Mock sent (API key missing).' });
    }

    const toEmail = process.env.CONTACT_EMAIL || 'gaticanahuel70@gmail.com';

    // 4. ENVÍO DEL CORREO
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: data.email,
      subject: `Nuevo mensaje de ${cleanName} desde tu Portfolio`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${cleanName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${cleanMessage.replace(/\n/g, '<br/>')}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Error al enviar el email por el proveedor.' });
    }

    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: (error as any).errors });
    } else {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;
