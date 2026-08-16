import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Sparkles } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'Which industries do you specialize in?',
      answer: 'We specialize in Finance, Healthcare, E-commerce, and Manufacturing. However, our modular engineering approach allows us to build high-performance solutions for any complex business model.',
    },
    {
      question: 'What is the typical development timeline?',
      answer: 'Project timelines depend on scope. A rapid MVP can take 4-8 weeks, while enterprise-grade ecosystems usually span 3-6 months. We prioritize agile delivery to get you to market faster.',
    },
    {
      question: 'Do you offer long-term technical partnership?',
      answer: 'Yes, we don’t just deliver and disappear. We offer comprehensive maintenance, scaling, and security support packages to ensure your digital products evolve with your business.',
    },
    {
      question: 'Can you integrate with our existing stack?',
      answer: 'Absolutely. Our engineers are experts at seamless integration with legacy systems, third-party APIs, and modern cloud infrastructures while maintaining data integrity and security.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-32 bg-slate-50/50 dark:bg-slate-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="text-primary-500" size={14} />
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary-600 dark:text-primary-400">
              Assistance
            </span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            Got <span className="text-primary-500">Questions?</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Everything you need to know about our high-end engineering services and strategic approach.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`border rounded-3xl overflow-hidden transition-all duration-500 ${
                activeIndex === i 
                  ? 'border-primary-500/30 bg-white dark:bg-slate-900 shadow-xl shadow-primary-500/5' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full px-8 py-7 flex items-center justify-between text-left group transition-colors"
              >
                <span className={`text-xl font-bold tracking-tight transition-colors ${activeIndex === i ? 'text-primary-500' : 'text-slate-900 dark:text-white'}`}>
                  {faq.question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-500 ${activeIndex === i ? 'bg-primary-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-8 pb-8 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
