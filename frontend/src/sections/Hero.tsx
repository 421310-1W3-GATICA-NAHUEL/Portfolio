import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import MatrixBackground from '../components/MatrixBackground';
import { LinkedInIcon } from '../components/BrandIcons';
import { MapPin, ChevronDown } from 'lucide-react';

// Typing animation hook
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      setDisplay(prev => {
        if (!isDeleting) {
          const next = currentWord.slice(0, prev.length + 1);
          if (next === currentWord) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), pause);
          }
          return next;
        } else {
          const next = currentWord.slice(0, prev.length - 1);
          if (next === '') {
            setIsDeleting(false);
            setWordIndex(i => i + 1);
          }
          return next;
        }
      });
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeoutRef.current);
  }, [display, isDeleting, wordIndex, words, speed, pause]);

  return display;
}

export default function Hero() {
  const { t } = useTranslation();

  const roles = [
    t('hero.role'),
    'Backend Engineer',
    'API Architect',
    'Database Expert',
  ];
  const typedRole = useTypingEffect(roles);

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-dark">
      <MatrixBackground />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Available for work badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
          <span className="text-green-400 text-sm font-mono">{t('hero.available')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          {t('hero.greeting')} <span className="text-gradient">Nahuel Gatica</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-10 flex items-center justify-center mb-4"
        >
          <p className="text-xl md:text-2xl text-electric-cyan font-mono">
            {typedRole}
            <span className="ml-0.5 border-r-2 border-electric-cyan animate-pulse">&nbsp;</span>
          </p>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-1 text-gray-500 text-sm mb-8"
        >
          <MapPin size={14} />
          Argentina · {t('hero.remote')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-electric-blue hover:bg-blue-600 text-white font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]"
          >
            {t('hero.cta_projects')}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white/5 border border-gray-700 hover:border-electric-cyan/50 text-white font-medium transition-all"
          >
            {t('hero.cta_contact')}
          </a>
          <a
            href="https://www.linkedin.com/in/nahuel-gatica-295925190"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-full bg-[#0077B5]/20 border border-[#0077B5]/40 hover:bg-[#0077B5]/30 text-white font-medium transition-all flex items-center gap-2"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* Gradient bottom */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-dark to-transparent z-10" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
