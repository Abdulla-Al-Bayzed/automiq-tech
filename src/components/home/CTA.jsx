import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3.5rem] overflow-hidden bg-slate-900 px-8 py-24 text-center border border-slate-800 shadow-2xl"
        >
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent animate-pulse" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-5 py-2 mb-10 backdrop-blur-md"
            >
              <Sparkles className="text-primary-500" size={16} />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary-400">
                Ready to transform?
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-[1] tracking-tight">
              Let's build the <br />
              <span className="text-primary-500">Next Big Thing</span> <br />
              together.
            </h2>

            <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              We're ready to partner with you to engineer a digital product that defines your industry.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-primary-500 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-primary-600 transition-all hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-3 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/portfolio"
                className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-white/10 backdrop-blur-md transition-all hover:-translate-y-1 active:scale-95"
              >
                View Our Portfolio
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
