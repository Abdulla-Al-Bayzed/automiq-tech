import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Zap, Shield, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardPreview from './DashboardPreview';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-indigo-500/5 rounded-full blur-[100px]" />
        
        {/* Animated Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-500/5 border border-primary-500/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
            >
              <Sparkles className="text-primary-500" size={14} />
              <span className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
                Empowering Innovation at Automiq Tech
              </span>
            </motion.div>

            <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1] bg-clip-text text-transparent bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400">
              Building the <br />
              <span className="text-primary-500">Next Generation</span> <br />
              of Digital.
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl font-medium">
              Enterprise-grade software solutions designed for high-end startups and established companies. We turn complex ideas into seamless digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-5 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 transition-all shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2 group"
              >
                <span>Start Your Project</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/portfolio"
                className="w-full sm:w-auto px-10 py-5 glass rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Our Work</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex items-center space-x-8 text-slate-400 dark:text-slate-500"
            >
              <div className="flex items-center space-x-2">
                <Zap size={18} className="text-primary-500/50" />
                <span className="text-sm font-semibold uppercase tracking-widest">Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={18} className="text-primary-500/50" />
                <span className="text-sm font-semibold uppercase tracking-widest">Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket size={18} className="text-primary-500/50" />
                <span className="text-sm font-semibold uppercase tracking-widest">Scalable</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element: Premium Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
