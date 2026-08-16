import { motion } from 'framer-motion';
import { Users, Briefcase, Star, Globe, TrendingUp } from 'lucide-react';

const Stats = () => {
  const stats = [
    { label: 'Global Clients', value: '500+', icon: Users, color: 'text-primary-500' },
    { label: 'Success Projects', value: '1.2k+', icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Countries Reached', value: '25+', icon: Globe, color: 'text-green-500' },
    { label: 'Service Rating', value: '4.9/5', icon: Star, color: 'text-yellow-500' },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-500/[0.02] blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="premium-card !p-10 group text-center lg:text-left overflow-hidden"
            >
              {/* Card Background Glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 mb-8 group-hover:scale-110 group-hover:bg-primary-500/5 group-hover:border-primary-500/20 transition-all duration-500">
                  <stat.icon className={`${stat.color} group-hover:text-primary-500`} size={24} />
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-3 mb-2">
                  <h3 className="text-5xl font-extrabold tracking-tighter text-slate-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <div className="flex items-center space-x-1 text-green-500 text-xs font-bold uppercase tracking-widest pb-1.5">
                    <TrendingUp size={12} />
                    <span>Growth</span>
                  </div>
                </div>
                
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Clients Section */}
        <div className="mt-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-800 to-transparent mb-12" />
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase mb-16 text-center">
              Trusted by World's Best Tech Teams
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 dark:opacity-30 hover:opacity-100 transition-all duration-700 grayscale">
              {['Vercel', 'Stripe', 'Framer', 'Linear', 'Github', 'Raycast'].map((client) => (
                <span key={client} className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white hover:text-primary-500 transition-colors cursor-default">
                  {client}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
