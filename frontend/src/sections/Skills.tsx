import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, Server, Layout, Monitor, Wrench } from 'lucide-react';

export default function Skills() {
  const { t } = useTranslation();

  const skillGroups = [
    {
      title: 'Frontend',
      icon: <Layout className="text-electric-cyan" />,
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Angular', 'TailwindCSS']
    },
    {
      title: 'Backend',
      icon: <Server className="text-electric-violet" />,
      skills: ['Node.js', 'Java', 'Spring Boot']
    },
    {
      title: 'Databases',
      icon: <Database className="text-electric-blue" />,
      skills: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'Neo4j']
    },
    {
      title: 'Desktop & Enterprise',
      icon: <Monitor className="text-primary-light" />,
      skills: ['C# (.NET)', 'Windows Forms']
    },
    {
      title: 'DevOps & Tools',
      icon: <Wrench className="text-gray-400" />,
      skills: ['Docker', 'Git', 'GitHub', 'Postman', 'VS Code', 'Jira', 'Trello', 'n8n']
    }
  ];

  return (
    <section id="skills" className="relative w-full py-24 bg-dark-paper overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('skills.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-cyan to-electric-violet mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="bg-dark p-6 rounded-2xl border border-gray-800 hover:border-electric-violet/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-dark-paper rounded-lg">
                  {group.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-dark-paper text-gray-300 rounded-full text-sm font-mono border border-gray-700 hover:text-electric-cyan hover:border-electric-cyan/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-electric-violet/20 to-transparent" />
    </section>
  );
}
