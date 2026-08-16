import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechStream',
      text: 'Automiq Tech transformed our legacy systems into a modern, scalable platform. Their expertise and dedication are truly world-class.',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
    },
    {
      name: 'Mark Thompson',
      role: 'Product Lead at FinApp',
      text: 'The mobile app they developed is sleek, fast, and has significantly improved our engagement. They are our go-to engineering partner.',
      avatar: 'https://i.pravatar.cc/150?u=mark',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Founder of EduWise',
      text: 'From strategy to deployment, the team was professional and visionary. They didn’t just build software; they built our future.',
      avatar: 'https://i.pravatar.cc/150?u=elena',
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="text-primary-500" size={14} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400">
              Testimonials
            </span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Trusted by <br />
            <span className="text-primary-500">Visionary</span> Leaders.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Discover how we've helped leading companies achieve their digital ambitions through engineering excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="premium-card relative !p-12 group"
            >
              <div className="absolute top-10 right-10 text-primary-500/10 group-hover:text-primary-500/20 transition-colors">
                <Quote size={64} fill="currentColor" />
              </div>
              
              <div className="flex mb-10 space-x-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={14} className="text-primary-500 fill-current" />
                ))}
              </div>
              
              <p className="text-xl text-slate-700 dark:text-slate-300 mb-12 font-medium leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary-500 rounded-lg p-1 shadow-lg">
                    <Sparkles size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
