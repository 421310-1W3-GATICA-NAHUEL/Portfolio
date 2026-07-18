import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Download, ChevronDown } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cvDropOpen, setCvDropOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Detect scroll to add glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-gray-800/60 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold font-mono tracking-tighter text-white hover:text-electric-cyan transition-colors">
          {'<NG/>'}
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  activeSection === href.replace('#', '')
                    ? 'text-electric-cyan'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t(`nav.${key}`)}
                {activeSection === href.replace('#', '') && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-electric-cyan rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {/* CV Download dropdown */}
          <div className="relative">
            <button
              onClick={() => setCvDropOpen(!cvDropOpen)}
              onBlur={() => setTimeout(() => setCvDropOpen(false), 150)}
              className="flex items-center gap-2 px-4 py-2 bg-electric-blue hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-all shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:shadow-[0_0_18px_rgba(59,130,246,0.7)]"
            >
              <Download size={15} />
              CV
              <ChevronDown size={14} className={`transition-transform ${cvDropOpen ? 'rotate-180' : ''}`} />
            </button>

            {cvDropOpen && (
              <div className="absolute right-0 top-12 bg-dark-paper border border-gray-700 rounded-xl shadow-2xl py-2 w-44 z-10">
                <a
                  href="/cv-nahuel-gatica-es.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-electric-blue/10 transition-colors"
                >
                  🇦🇷 Español
                </a>
                <a
                  href="/cv-nahuel-gatica-en.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-electric-blue/10 transition-colors"
                >
                  🇺🇸 English
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-t border-gray-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="text-gray-400 hover:text-white transition-colors py-2"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="/cv-nahuel-gatica-es.pdf" download className="px-4 py-2 bg-electric-blue text-white text-sm rounded-full">
              🇦🇷 CV Español
            </a>
            <a href="/cv-nahuel-gatica-en.pdf" download className="px-4 py-2 bg-electric-blue text-white text-sm rounded-full">
              🇺🇸 CV English
            </a>
          </div>
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}
