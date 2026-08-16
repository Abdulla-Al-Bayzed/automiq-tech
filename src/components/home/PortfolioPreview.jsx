import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPreview = () => {
  const projects = [
    {
      title: 'NexGen ERP Ecosystem',
      category: 'Enterprise Software',
      image: '/images/hero-showcase.png',
      desc: 'A complete ERP solution for manufacturing industries with AI-driven analytics.',
      tags: ['React', 'Node.js', 'AWS'],
    },
    {
      title: 'HealthTrack Intelligent App',
      category: 'Mobile App',
      image: '/images/mobile-showcase.png',
      desc: 'Real-time health monitoring and consultation platform with predictive diagnostics.',
      tags: ['Flutter', 'Firebase', 'TensorFlow'],
    },
    {
      title: 'Cloud Core Cyber Suite',
      category: 'Cloud & AI',
      image: '/images/cloud-security.png',
      desc: 'High-availability multi-cloud data orchestration platform with AI threat defense.',
      tags: ['Kubernetes', 'Python', 'AWS'],
    },
  ];

  return (
    <section className="py-32 relative bg-slate-950 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="text-primary-500" size={14} />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-400">
                Showcase
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Digital <span className="text-primary-500">Products</span> <br />
              That Define Brands.
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              We've partnered with world-class companies to design and build high-performance digital experiences.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/portfolio"
              className="group flex items-center space-x-4 bg-white text-slate-950 px-8 py-5 rounded-2xl font-bold transition-all hover:bg-primary-500 hover:text-white"
            >
              <span>Explore Full Portfolio</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl"
            >
              {/* Image with zoom effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Overlay with glass effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-primary-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary-500/20">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-extrabold mb-4 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 leading-relaxed font-medium">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-400 border border-slate-700 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center space-x-3 text-sm font-black uppercase tracking-widest text-white group-hover:text-primary-500 transition-colors opacity-0 group-hover:opacity-100 duration-500 delay-200">
                    <span>View Case Study</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
