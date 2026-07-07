import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, MapPin, Target, Code2 } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <User className="text-electric-cyan" size={32} />,
      title: t('about.who_am_i_title'),
      desc: t('about.who_am_i_desc')
    },
    {
      icon: <MapPin className="text-electric-violet" size={32} />,
      title: t('about.where_title'),
      desc: t('about.where_desc')
    },
    {
      icon: <Code2 className="text-primary-light" size={32} />,
      title: t('about.what_i_do_title'),
      desc: t('about.what_i_do_desc')
    },
    {
      icon: <Target className="text-electric-blue" size={32} />,
      title: t('about.my_idea_title'),
      desc: t('about.my_idea_desc')
    }
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('about.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-cyan to-electric-violet mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-glass p-8 rounded-2xl hover:border-electric-cyan/50 transition-colors group"
            >
              <div className="mb-6 p-4 bg-dark rounded-xl inline-block group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric-violet/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
    </section>
  );
}
