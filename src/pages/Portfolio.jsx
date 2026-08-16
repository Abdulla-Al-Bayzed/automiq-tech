import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Portfolio = () => {
  const categories = ['All', 'Web App', 'Mobile App', 'Enterprise', 'AI/ML'];
  const [activeCategory, setActiveCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'CodeGen ERP System',
      category: 'Enterprise',
      image: '/images/hero-showcase.png',
      desc: 'A comprehensive ERP solution for real-time business management.',
      demo: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'MockMaster Platform',
      category: 'Web App',
      image: '/images/about-workspace.png',
      desc: 'AI-powered Student Management & Learning Ecosystem.',
      demo: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Cloud Core Security',
      category: 'Enterprise',
      image: '/images/cloud-security.png',
      desc: 'Enterprise cloud infrastructure with active cyber defense.',
      demo: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'SecurePay & FitLife Hub',
      category: 'Mobile App',
      image: '/images/mobile-showcase.png',
      desc: 'Multi-platform mobile app suite with real-time analytics.',
      demo: '#',
      github: '#',
    },
    {
      id: 5,
      title: 'DataVision AI Engine',
      category: 'AI/ML',
      image: '/images/cloud-security.png',
      desc: 'Real-time data visualization and predictive modeling tool.',
      demo: '#',
      github: '#',
    },
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <PageHeader
        title="Our Portfolio"
        subtitle="A showcase of our best work. From complex enterprise systems to innovative mobile apps."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeCategory === cat
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 scale-105'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-8 flex flex-col justify-end">
                  <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-primary-400 font-bold text-sm mb-2 uppercase tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-slate-300 text-sm mb-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Stats Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Search size={200} />
          </div>
          <h2 className="text-4xl font-bold mb-8 relative z-10">Have a unique project idea?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
            We love challenges. Whether it's a niche industry or a complex technical requirement, we have the team to deliver.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className="bg-primary-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20 relative z-10"
          >
            Start a Conversation
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Portfolio;
