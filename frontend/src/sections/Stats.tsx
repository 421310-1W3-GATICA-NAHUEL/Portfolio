import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Code2, Database, Globe } from 'lucide-react';

export default function Stats() {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <Briefcase className="text-electric-cyan" size={28} />,
      value: '3+',
      label: t('stats.experience'),
    },
    {
      icon: <Code2 className="text-electric-violet" size={28} />,
      value: '15+',
      label: t('stats.projects'),
    },
    {
      icon: <Database className="text-primary-light" size={28} />,
      value: '6',
      label: t('stats.databases'),
    },
    {
      icon: <Globe className="text-electric-blue" size={28} />,
      value: '2',
      label: t('stats.languages'),
    },
  ];

  return (
    <section className="relative w-full py-12 bg-dark-paper border-y border-gray-800/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="p-3 bg-dark rounded-xl mb-1">
                {stat.icon}
              </div>
              <span className="text-4xl font-bold text-gradient">{stat.value}</span>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
