import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: '', email: '', message: '' };

    if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.err_name');
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = t('contact.err_email');
      isValid = false;
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.err_message');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear the specific error when the user starts typing again
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('loading');
    
    const isDev = import.meta.env.MODE === 'development';
    const baseUrl = isDev ? 'http://localhost:3001' : '';

    try {
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(t('contact.error_msg'));
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative w-full py-24 bg-dark-paper overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('contact.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-cyan to-electric-violet mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 font-mono">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-dark p-8 md:p-10 rounded-2xl border border-gray-800 shadow-2xl relative"
        >
          {/* Subtle glow behind form */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-electric-violet/5 rounded-2xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-dark-paper border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                    errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-electric-cyan focus:ring-electric-cyan'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{t('contact.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-dark-paper border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-electric-cyan focus:ring-electric-cyan'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-dark-paper border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-colors resize-none ${
                  errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-700 focus:border-electric-cyan focus:ring-electric-cyan'
                }`}
                placeholder={t('contact.message_placeholder')}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full md:w-auto px-8 py-4 bg-electric-blue hover:bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            >
              {status === 'loading' ? (
                <><Loader2 className="animate-spin" /> {t('contact.sending')}</>
              ) : status === 'success' ? (
                <><CheckCircle2 /> {t('contact.success')}</>
              ) : status === 'error' ? (
                <><XCircle /> {t('contact.error')}</>
              ) : (
                <><Send size={20} /> {t('contact.send')}</>
              )}
            </button>
            
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
