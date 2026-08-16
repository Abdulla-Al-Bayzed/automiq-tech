import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Laptop, Smartphone, Database, Shield, Cloud, Bot, Code2, Layers, Cpu, Globe, Rocket, Zap,
  CheckCircle2, ArrowRight, Send, Loader2, Sparkles, Server, Info, AlertCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Services = () => {
  const allServices = [
    {
      title: 'Web Development',
      desc: 'We build fast, secure, and SEO-friendly websites using React, Next.js, and Node.js. From landing pages to complex web platforms.',
      icon: Laptop,
      tech: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'MongoDB'],
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Mobile App Development',
      desc: 'Expertise in building high-quality mobile applications for both iOS and Android using React Native and Flutter.',
      icon: Smartphone,
      tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Custom Software',
      desc: 'Tailor-made software solutions designed to fit your unique business processes and challenges.',
      icon: Database,
      tech: ['Python', 'Java', 'C#', '.NET', 'PostgreSQL'],
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      title: 'ERP Solutions',
      desc: 'Streamline your business operations with our custom ERP systems for inventory, HR, and finance management.',
      icon: Layers,
      tech: ['SAP', 'Odoo', 'Custom Oracle', 'Enterprise Cloud'],
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
    {
      title: 'POS Systems',
      desc: 'Robust point-of-sale systems for retail and restaurant businesses with real-time analytics.',
      icon: Cpu,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
      tech: ['Electron', 'React', 'SQLite', 'Cloud Sync'],
    },
    {
      title: 'E-commerce Development',
      desc: 'Complete e-commerce solutions with payment gateway integration, inventory management, and user-friendly UX.',
      icon: Globe,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      tech: ['Shopify', 'WooCommerce', 'MERN Stack', 'Stripe'],
    },
    {
      title: 'Cloud Solutions',
      desc: 'AWS, Azure, and Google Cloud services including migration, management, and architecture design.',
      icon: Cloud,
      color: 'text-sky-500',
      bg: 'bg-sky-500/10',
      tech: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
    },
    {
      title: 'AI Automation',
      desc: 'Leverage the power of AI and machine learning to automate repetitive tasks and gain business insights.',
      icon: Bot,
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      tech: ['Python', 'TensorFlow', 'OpenAI API', 'PyTorch'],
    },
    {
      title: 'Cybersecurity',
      desc: 'Comprehensive security audits, vulnerability testing, and implementation of robust security protocols.',
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      tech: ['Ethical Hacking', 'Pen Testing', 'SSL', 'Encryption'],
    },
  ];

  // Interactive Solution Planner Configs
  const platforms = [
    { id: 'web', name: 'Web App / SaaS', icon: Laptop, desc: 'Responsive, cloud-hosted web portals & SaaS applications', tech: ['React', 'Next.js', 'Node.js', 'Tailwind CSS'] },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, desc: 'Native & cross-platform apps for iOS and Android devices', tech: ['React Native', 'Flutter', 'Swift', 'Kotlin'] },
    { id: 'custom', name: 'Custom Software', icon: Code2, desc: 'Bespoke custom software solutions tailored to workflow logic', tech: ['Python', 'Go', 'Node.js', 'GraphQL'] },
    { id: 'erp', name: 'Enterprise ERP', icon: Layers, desc: 'Unified enterprise platforms for HR, inventory & logistics', tech: ['Odoo', 'React', 'PostgreSQL', 'Docker'] },
    { id: 'ai', name: 'AI & Automation', icon: Bot, desc: 'Intelligent automation systems, LLM integrations & agents', tech: ['Python', 'TensorFlow', 'OpenAI API', 'LangChain'] },
    { id: 'security', name: 'Cybersecurity Suite', icon: Shield, desc: 'Hardened systems with proactive scanning, encryption & firewalls', tech: ['Cloudflare', 'OWASP Top 10', 'IAM Roles', 'AES-256'] },
  ];

  const featuresList = [
    { id: 'auth', name: 'Secure Auth & Roles', icon: Shield, desc: 'Multi-tenant auth, OAuth, & custom permission logic', tech: ['JWT', 'OAuth2', 'bcryptjs'] },
    { id: 'payments', name: 'Payment Integrations', icon: Zap, desc: 'Subscription Billing, checkout gateways & invoicing', tech: ['Stripe', 'PayPal', 'Webhooks'] },
    { id: 'chat', name: 'Real-time WebSockets', icon: Globe, desc: 'Instant chat messaging, push notifications & live feeds', tech: ['Socket.io', 'WebSockets', 'Redis'] },
    { id: 'ai', name: 'AI & ML Capabilities', icon: Bot, desc: 'Semantic search, automated insights, or AI chatbots', tech: ['OpenAI SDK', 'Vector DB', 'Pinecone'] },
    { id: 'analytics', name: 'Analytics Dashboard', icon: Cpu, desc: 'Beautiful charts, activity logging, & exports', tech: ['Chart.js', 'Recharts', 'Aggregation Pipelines'] },
    { id: 'scaling', name: 'Autoscaling Cloud infra', icon: Cloud, desc: 'Highly available setup with load balancing & CDN routing', tech: ['AWS ECS/EKS', 'Docker', 'NGINX', 'CDNs'] },
    { id: 'database', name: 'Redundant Backups', icon: Database, desc: 'Auto-backups, multi-region replication & security auditing', tech: ['MongoDB Atlas', 'PostgreSQL replication', 'AWS S3'] },
  ];

  const scales = [
    { id: 'startup', name: 'MVP / Startup Scale', complexity: 'MVP Phase', timeline: '2 - 4 Weeks', team: '2 Full-Stack Engineers', desc: 'Fast-track MVP launch focused on core user journeys and cloud scalability.' },
    { id: 'business', name: 'Growth Enterprise', complexity: 'Growth Phase', timeline: '6 - 10 Weeks', team: '4 Engineers + 1 DevOps', desc: 'High-availability microservices architecture built for rapid user acquisition.' },
    { id: 'enterprise', name: 'Mission Critical Enterprise', complexity: 'Enterprise Phase', timeline: '12 - 16 Weeks', team: 'Dedicated Pod + Solution Architect', desc: 'Fault-tolerant multi-region cluster with enterprise SLA, compliance, and 24/7 support.' },
  ];

  // States
  const [selectedPlatform, setSelectedPlatform] = useState('web');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'analytics']);
  const [selectedScale, setSelectedScale] = useState('business');

  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Bespoke Solution Architect Request', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activePlatform = platforms.find(p => p.id === selectedPlatform) || platforms[0];
  const activeScale = scales.find(s => s.id === selectedScale) || scales[0];

  const handleFeatureToggle = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const getCompiledTechStack = () => {
    let tech = [...activePlatform.tech];
    selectedFeatures.forEach(featId => {
      const feat = featuresList.find(f => f.id === featId);
      if (feat) {
        feat.tech.forEach(t => {
          if (!tech.includes(t)) {
            tech.push(t);
          }
        });
      }
    });
    return tech;
  };

  // Compile full text summary for the inquiry message field
  const generateMessageSummary = () => {
    const stack = getCompiledTechStack().join(', ');
    const features = selectedFeatures.map(f => featuresList.find(fl => fl.id === f)?.name).filter(Boolean).join(', ');
    return `Hi Coderize Team,\n\nI have configured a custom project using your Interactive Solution Architect. Here are my specifications:\n\n` +
      `- **Platform**: ${activePlatform.name}\n` +
      `- **Target Scale**: ${activeScale.name} (${activeScale.timeline})\n` +
      `- **Key Capabilities**: ${features || 'None selected'}\n` +
      `- **Calculated Stack**: ${stack}\n\n` +
      `Please review this blueprint and let me know the next steps for a custom consultation.`;
  };

  const handleOpenForm = () => {
    setFormData(prev => ({
      ...prev,
      message: generateMessageSummary()
    }));
    setShowInquiryForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in your name and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/messages', formData);
      if (response.status === 201) {
        toast.success('Architecture Inquiry Sent! Our engineering team will review your blueprint.');
        setFormData({ name: '', email: '', subject: 'Bespoke Solution Architect Request', message: '' });
        setShowInquiryForm(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Coderize Enterprise IT Services",
    "provider": {
      "@type": "Organization",
      "name": "Coderize IT Solution",
      "url": "https://coderize-it.com"
    },
    "description": "Comprehensive IT solutions including Web Development, Mobile Apps, ERP Systems, AI Automation, and Cybersecurity."
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <SEO
        title="Our Services & Enterprise Solution Architect"
        description="Comprehensive IT solutions tailored to your business needs. Build fast, secure web & mobile apps, ERP systems, and AI automation."
        keywords="web development, mobile app development, custom software, ERP solutions, POS systems, e-commerce, cloud solutions, AI automation, cybersecurity"
        canonical="/services"
        schemaData={serviceSchema}
      />

      <PageHeader
        title="Our Services"
        subtitle="Comprehensive IT solutions tailored to your business needs. We use the latest technologies to deliver excellence."
      />

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="premium-card group"
            >
              <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={service.color} size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {service.desc}
              </p>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Solution Architect Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <style>{`
          @keyframes glowPulse {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          .blueprint-bg {
            background-size: 28px 28px;
            background-image: radial-gradient(circle, rgba(99, 102, 241, 0.15) 1.5px, transparent 1.5px);
          }
        `}</style>

        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
            <span>Enterprise Blueprint Engine</span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-black mt-4 mb-6 tracking-tight">
            Interactive Solution Architect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Custom-build your enterprise platform step by step. Select your core infrastructure, microservices, and deployment scale to compile an architectural blueprint in real time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Configurator Left Panel */}
          <div className="lg:col-span-7 space-y-8">

            {/* Step 1: Platform Selection */}
            <div className="premium-card bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-primary-500 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-primary-500/30">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Select Core Platform</h3>
                    <p className="text-xs text-slate-400">Choose the foundation of your digital platform</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-primary-400 font-bold bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                  {activePlatform.name}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {platforms.map((plat) => {
                  const Icon = plat.icon;
                  const isSelected = selectedPlatform === plat.id;
                  return (
                    <button
                      key={plat.id}
                      onClick={() => setSelectedPlatform(plat.id)}
                      className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group ${isSelected
                          ? 'border-primary-500 bg-primary-500/10 shadow-xl shadow-primary-500/10 scale-[1.02]'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80'
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-primary-400">
                          <CheckCircle2 size={20} />
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${isSelected ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40' : 'bg-slate-800 text-slate-400 group-hover:text-white'
                        }`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white mb-1">{plat.name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{plat.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Capabilities / Microservices */}
            <div className="premium-card bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-indigo-500/30">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Incorporate Microservices & Modules</h3>
                    <p className="text-xs text-slate-400">Add high-performance integrations to your system</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  {selectedFeatures.length} Active
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {featuresList.map((feat) => {
                  const Icon = feat.icon;
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => handleFeatureToggle(feat.id)}
                      className={`text-left p-4 rounded-xl border flex items-center justify-between transition-all ${isChecked
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                        }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isChecked ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white">{feat.name}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{feat.desc}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-700 bg-slate-800'
                        }`}>
                        {isChecked && <CheckCircle2 size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Deployment Scale */}
            <div className="premium-card bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-500 text-white font-black flex items-center justify-center text-sm shadow-lg shadow-purple-500/30">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Deployment Scale & SLA</h3>
                    <p className="text-xs text-slate-400">Configure target SLA, cluster size, and deployment speed</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                  {activeScale.name}
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {scales.map((s) => {
                  const isSelected = selectedScale === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedScale(s.id)}
                      className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between ${isSelected
                          ? 'border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-500/10 scale-[1.02]'
                          : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                        }`}
                    >
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${isSelected ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-800 text-slate-400'
                          }`}>
                          {s.complexity.split(' ')[0]}
                        </span>
                        <h4 className="font-bold text-base text-white mt-3 mb-1">{s.name}</h4>
                        <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">{s.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800/80">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">Target Launch</span>
                        <div className="font-black text-sm text-purple-400">{s.timeline}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Compiled Blueprint Right Panel (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">

            {/* Visual Architecture Topology Display Card */}
            <div className="premium-card blueprint-bg relative overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-2xl p-6 lg:p-8">
              
              {/* Top Compiler Control Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
                <div className="flex items-center space-x-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">
                    Compiler: Connected
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                  REV 2.4.0
                </div>
              </div>

              {/* Topology Microservices Image Showcase */}
              <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl group mb-6 bg-slate-900">
                <img 
                  src="/images/architecture-blueprint.png" 
                  alt="Microservices Network Topology Diagram" 
                  className="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Live Spec Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between backdrop-blur-md bg-slate-950/80 border border-slate-800 p-2.5 rounded-xl text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <Shield size={14} className="text-primary-400" />
                    <span className="text-slate-200 font-bold">{activePlatform.name}</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    99.99% SLA Uptime
                  </div>
                </div>
              </div>

              {/* Live Architectural Metrics & Stack */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-slate-900/90 border border-slate-800/80 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Target Scale</span>
                    <span className="font-extrabold text-sm text-slate-100">{activeScale.complexity}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Estimated Delivery</span>
                    <span className="font-extrabold text-sm text-primary-400">{activeScale.timeline}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-2">Compiled Tech Fabric</span>
                  <div className="flex flex-wrap gap-1.5">
                    {getCompiledTechStack().map((tech) => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-semibold text-slate-200 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-3.5 flex items-start space-x-3">
                  <Info size={18} className="text-primary-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    <strong>Recommended Core Team:</strong> {activeScale.team}. Fully containerized Docker/K8s deployment with CI/CD automation.
                  </p>
                </div>
              </div>

            </div>

            {/* Config Action Buttons & Inline Lead Form */}
            <div className="premium-card bg-slate-900/60 dark:bg-slate-950/80 border border-slate-800 space-y-6">
              {!showInquiryForm ? (
                <>
                  <div className="text-center space-y-2">
                    <h4 className="font-bold text-lg text-white">Lock in your Custom Blueprint</h4>
                    <p className="text-xs text-slate-400">
                      Submit this compiled architecture configuration directly to our engineering team to request a detailed proposal.
                    </p>
                  </div>
                  <button
                    onClick={handleOpenForm}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-xl shadow-primary-500/25 active:scale-95"
                  >
                    <span>Request Proposal & Consultation</span>
                    <ArrowRight size={18} />
                  </button>
                </>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg text-white">Request Consultation</h4>
                    <button
                      type="button"
                      onClick={() => setShowInquiryForm(false)}
                      className="text-xs text-slate-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Compiled Architecture Blueprint</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none text-slate-300"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-500 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Submitting Architectural Inquiry...</span>
                        <Loader2 size={18} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Submit Architectural Proposal</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
