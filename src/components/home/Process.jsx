import { motion } from 'framer-motion';
import { Search, PenTool, Code, Zap, CheckCircle, Sparkles } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      title: 'Strategic Discovery',
      desc: 'We deep dive into your business ecosystem to define a roadmap for success.',
      icon: Search,
      color: 'bg-blue-500',
    },
    {
      title: 'Architectural Design',
      desc: 'Crafting intuitive experiences and robust system designs that scale.',
      icon: PenTool,
      color: 'bg-purple-500',
    },
    {
      title: 'Agile Development',
      desc: 'Engineering your vision using world-class technologies and clean code.',
      icon: Code,
      color: 'bg-indigo-500',
    },
    {
      title: 'Optimization',
      desc: 'Rigorous testing and performance tuning for peak efficiency.',
      icon: Zap,
      color: 'bg-yellow-500',
    },
    {
      title: 'Global Launch',
      desc: 'Seamless deployment with continuous monitoring and scaling support.',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="text-primary-500" size={14} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400">
              Workflow
            </span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Our Path to <span className="text-primary-500">Excellence.</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            A battle-tested methodology designed to deliver high-impact digital solutions with speed and precision.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[2px] bg-slate-200 dark:bg-slate-800" />

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Circle */}
                <div className={`w-20 h-20 bg-white dark:bg-slate-950 rounded-full flex items-center justify-center mb-10 relative z-10 border-2 border-slate-100 dark:border-slate-800 shadow-xl group-hover:border-primary-500/50 transition-all duration-500`}>
                  <step.icon className="text-slate-400 group-hover:text-primary-500 transition-colors" size={32} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg shadow-primary-500/20">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold mb-4 group-hover:text-primary-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
                
                {/* Mobile Connection Arrow */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-8 text-slate-200 dark:text-slate-800 animate-bounce">
                    <Zap size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
