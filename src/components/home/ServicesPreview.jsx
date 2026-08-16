import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Smartphone, Database, Shield, Cloud, Bot, ArrowRight, Sparkles, X, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const ServicesPreview = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Web Engineering',
      desc: 'High-performance React & Next.js applications built with enterprise-grade architecture.',
      documentation: 'Our Web Engineering services focus on building robust, scalable applications using React, Next.js, and modern ecosystems. We emphasize enterprise-grade architecture, ensuring secure, fast, and SEO-optimized web experiences. Our development lifecycle includes comprehensive testing, CI/CD pipelines, and rigorous code reviews to maintain the highest quality standards.',
      icon: Laptop,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Mobile Innovation',
      desc: 'Premium native and cross-platform mobile experiences for iOS and Android platforms.',
      documentation: 'We deliver premium native and cross-platform mobile experiences for both iOS and Android. Using technologies like React Native and Flutter, or native Swift and Kotlin, we ensure smooth animations, responsive interfaces, and seamless integration with complex backends to provide users with engaging and reliable mobile applications.',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Custom Systems',
      desc: 'Scalable backend architectures and cloud-native solutions for complex business needs.',
      documentation: 'Our custom system solutions are designed to handle complex business requirements through scalable backend architectures and microservices. We utilize Node.js, Python, and Go to build resilient APIs and data pipelines that integrate smoothly with your existing operations and third-party services.',
      icon: Database,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'AI & Machine Learning',
      desc: 'Intelligent automation and data-driven insights to transform your decision making.',
      documentation: 'Transform your business with intelligent automation and advanced data analytics. Our AI & ML services include building predictive models, natural language processing tools, and custom AI agents that integrate seamlessly into your software to provide real-time, data-driven insights and automate repetitive tasks.',
      icon: Bot,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Cloud Infrastructure',
      desc: 'Secure, reliable, and high-available cloud deployments with expert management.',
      documentation: 'We offer expert cloud infrastructure management, utilizing AWS, Google Cloud, and Azure. Our services cover everything from initial architecture design to migration, continuous monitoring, and optimization. We ensure your applications are secure, reliable, and highly available with automated scaling and disaster recovery plans.',
      icon: Cloud,
      color: 'from-sky-500 to-blue-500',
    },
    {
      title: 'Digital Security',
      desc: 'Comprehensive security audits and hardening for your mission-critical applications.',
      documentation: 'Protect your mission-critical assets with our comprehensive digital security services. We conduct thorough vulnerability assessments, penetration testing, and code audits. Our security hardening protocols ensure your applications comply with industry standards and are safeguarded against the latest cyber threats.',
      icon: Shield,
      color: 'from-red-500 to-rose-500',
    },
  ];

  const handleDownloadPDF = (service) => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add styling
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // slate-800
    doc.text(service.title, margin, margin + 10);
    
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 241); // primary-500
    doc.text("SERVICE DOCUMENTATION", margin, margin + 20);
    
    // Line separator
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(margin, margin + 25, pageWidth - margin, margin + 25);
    
    // Add text content with word wrap
    doc.setFontSize(12);
    doc.setTextColor(71, 85, 105); // slate-600
    const splitText = doc.splitTextToSize(service.documentation, pageWidth - margin * 2);
    doc.text(splitText, margin, margin + 40);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("Automiq Tech", margin, doc.internal.pageSize.getHeight() - 20);
    
    doc.save(`${service.title.replace(/\s+/g, '_').toLowerCase()}_documentation.pdf`);
  };

  return (
    <section className="py-32 relative">
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
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400">
                Our Core Expertise
              </span>
            </motion.div>
            <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Solutions that <br />
              <span className="text-primary-500">Scale</span> with your Vision.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
              We leverage cutting-edge technologies to build digital products that define industries and empower users across the globe.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/services"
              className="group flex items-center space-x-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-5 rounded-2xl font-bold transition-all hover:bg-primary-500 dark:hover:bg-primary-500 dark:hover:text-white"
            >
              <span>Explore All Services</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="premium-card group relative"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg shadow-primary-500/10 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon size={28} />
              </div>
              
              <h3 className="text-2xl font-extrabold mb-4 group-hover:text-primary-500 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">
                {service.desc}
              </p>
              
              <button
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center space-x-2 text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-primary-500 transition-all focus:outline-none"
              >
                <span>Discover More</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Featured Service Visual Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[2.5rem] bg-slate-950 border border-slate-800 overflow-hidden relative group p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                Featured Infrastructure
              </span>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Enterprise Cloud & Cyber Defense Platform
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                Our automated cloud deployment pipelines and real-time security monitoring guarantee 99.99% uptime with end-to-end data encryption.
              </p>
              <Link
                to="/services"
                className="inline-flex items-center space-x-3 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary-500/20"
              >
                <span>Learn About Cloud Security</span>
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="/images/cloud-security.png"
                alt="Cloud & AI Security Dashboard"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 z-10"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${selectedService.color}`} />
              
              <div className="p-8 sm:p-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center space-x-5">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedService.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <selectedService.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {selectedService.title}
                      </h3>
                      <p className="text-sm font-bold text-primary-500 uppercase tracking-wider mt-1">
                        Service Documentation
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400 focus:outline-none"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedService.documentation}
                  </p>
                </div>
                
                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <button
                    onClick={() => handleDownloadPDF(selectedService)}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors focus:outline-none shadow-lg shadow-primary-500/20"
                  >
                    <Download size={18} />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesPreview;

