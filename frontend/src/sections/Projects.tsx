import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, ExternalLink, Loader2 } from 'lucide-react';

interface Project {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  technologies: string[];
  imageUrl: string;
  repoUrl?: string;
  demoUrl?: string;
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const currentLang = i18n.language as 'en' | 'es';

  useEffect(() => {
    const isDev = import.meta.env.MODE === 'development';
    const baseUrl = isDev ? 'http://localhost:3001' : '';

    fetch(`${baseUrl}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(t('projects.error_loading'));
        setLoading(false);
      });
  }, [t]);

  // Build unique tech tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.technologies.forEach(tech => tags.add(tech)));
    return ['All', ...Array.from(tags)];
  }, [projects]);

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.technologies.includes(activeFilter)),
    [projects, activeFilter]
  );

  return (
    <section id="projects" className="relative w-full py-24 bg-dark overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">{t('projects.title')}</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-electric-cyan to-electric-violet mx-auto rounded-full" />
        </motion.div>

        {/* Filter chips */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all ${
                  activeFilter === tag
                    ? 'bg-electric-cyan text-dark border-electric-cyan shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-dark-paper text-gray-400 border-gray-700 hover:border-electric-cyan/50 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-electric-cyan w-12 h-12" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10 font-mono">
            {error}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-glass rounded-2xl overflow-hidden group border border-gray-800 hover:border-electric-cyan/50 transition-colors flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-dark-paper">
                  <div className="absolute inset-0 bg-electric-cyan/10 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.imageUrl}
                    alt={project.title[currentLang]}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {project.title[currentLang] || project.title['en']}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {project.description[currentLang] || project.description['en']}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        onClick={() => setActiveFilter(tech)}
                        className={`text-xs font-mono px-2 py-1 rounded cursor-pointer transition-colors ${
                          activeFilter === tech
                            ? 'bg-electric-cyan text-dark'
                            : 'text-electric-cyan bg-electric-cyan/10 hover:bg-electric-cyan/20'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <Code2 size={16} /> Code
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm text-electric-cyan hover:text-electric-cyan/80 transition-colors"
                      >
                        <ExternalLink size={16} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-electric-violet/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
