import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Download } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '../components/BrandIcons';

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/421310-1W3-GATICA-NAHUEL',
      icon: <GitHubIcon size={20} />,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nahuel-gatica-295925190',
      icon: <LinkedInIcon size={20} />,
    },
    {
      label: 'Email',
      href: 'mailto:gaticanahuel70@gmail.com',
      icon: <Mail size={20} />,
    },
  ];

  return (
    <footer className="w-full bg-dark border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-bold font-mono text-white">{'<NG/>'}</span>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.tagline')}</p>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <MapPin size={14} className="text-electric-cyan" />
              Argentina · {t('hero.remote')}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-1">{t('footer.navigate')}</h4>
            {[
              { key: 'about', href: '#about' },
              { key: 'skills', href: '#skills' },
              { key: 'projects', href: '#projects' },
              { key: 'contact', href: '#contact' },
            ].map(({ key, href }) => (
              <a key={key} href={href} className="text-gray-400 hover:text-electric-cyan transition-colors text-sm">
                {t(`nav.${key}`)}
              </a>
            ))}
          </div>

          {/* Social & CV */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold mb-1">{t('footer.connect')}</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  <span className="text-electric-cyan">{icon}</span>
                  {label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <h4 className="text-white font-semibold text-sm">Curriculum Vitae</h4>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="/cv-nahuel-gatica-es.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-2 text-xs bg-dark-paper border border-gray-700 hover:border-electric-cyan/50 text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  <Download size={12} /> 🇦🇷 Español
                </a>
                <a
                  href="/cv-nahuel-gatica-en.pdf"
                  download
                  className="flex items-center gap-2 px-3 py-2 text-xs bg-dark-paper border border-gray-700 hover:border-electric-cyan/50 text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  <Download size={12} /> 🇺🇸 English
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800/60 flex flex-col md:flex-row items-center justify-between gap-3 text-gray-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Nahuel Gatica. {t('footer.rights')}</p>
          <p className="font-mono">Built with React · TypeScript · Vercel</p>
        </div>
      </div>
    </footer>
  );
}
