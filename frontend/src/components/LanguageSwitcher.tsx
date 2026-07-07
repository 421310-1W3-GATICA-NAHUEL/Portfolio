import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-dark-paper/50 hover:bg-dark-paper transition-colors text-sm font-mono border border-gray-800"
    >
      <Globe size={16} className="text-electric-cyan" />
      <span className="uppercase">{i18n.language}</span>
    </button>
  );
}
