import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, ShieldCheck, Heart } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const About = () => {
  const values = [
    { title: 'Excellence', icon: Award, desc: 'We strive for perfection in every line of code.' },
    { title: 'Integrity', icon: ShieldCheck, desc: 'Transparency and honesty are at the heart of our operations.' },
    { title: 'Innovation', icon: Target, desc: 'We stay ahead of the curve with emerging technologies.' },
    { title: 'Client First', icon: Heart, desc: 'Your success is our primary goal and motivation.' },
  ];

  const team = [
    { name: 'Abdulla Al Bayzed', role: 'Co-Founder & CEO', image: '/abdulla-al-bayzed.jpg' },
    { name: 'Asib Ahmed', role: 'Co-Founder & CTO', image: '/asib-ahmed.png' },
    { name: 'Hasibul Kabir Emon', role: 'Lead Architect', image: '/hasibul-kabir-emon.png' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <PageHeader
        title="Our Story"
        subtitle="Empowering businesses through innovative software solutions since 2018."
      />

      {/* Engineering Workspace Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group"
        >
          <div className="relative h-[450px] lg:h-[550px] overflow-hidden">
            <img 
              src="/images/about-workspace.png" 
              alt="Automiq Tech Innovation Lab Workspace" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <div className="max-w-3xl">
                <span className="inline-flex items-center space-x-2 bg-primary-500/20 border border-primary-500/30 text-primary-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 backdrop-blur-md">
                  State-of-the-Art Innovation Lab
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  Where Engineering Meets Vision.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed font-medium max-w-2xl">
                  Our R&D team collaborates in a high-tech environment designed to spark innovation, drive rapid prototyping, and deliver enterprise software solutions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="premium-card bg-primary-500 text-white border-none"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Target size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-white/80 leading-relaxed text-lg">
              To provide state-of-the-art digital solutions that enable our clients to achieve their business objectives with efficiency and scale.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="premium-card bg-slate-900 text-white border-none"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
              <Eye size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              To be a global leader in IT innovation, recognized for our excellence, creativity, and the positive impact we create for our partners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <h2 className="text-4xl font-bold mb-16">Core Values</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-center mb-6 text-primary-500">
                <v.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{v.title}</h3>
              <p className="text-slate-500 text-sm">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Meet the Experts</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">The brilliant minds behind Automiq Tech.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-6 inline-block">
                <div className="absolute inset-0 bg-primary-500 rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 opacity-20" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 shadow-xl"
                />
              </div>
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <h2 className="text-4xl font-bold mb-20 text-center">Our Journey</h2>
        <div className="space-y-12 relative before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 before:-translate-x-1/2">
          {[
            { year: '2018', title: 'Foundation', desc: 'Automiq Tech was born with a team of 3 passionate developers.' },
            { year: '2020', title: 'Growth', desc: 'Expanded our services to include Mobile Apps and Cloud Solutions.' },
            { year: '2022', title: 'Innovation', desc: 'Launched our AI research wing and served our 100th client.' },
            { year: '2026', title: 'Global Impact', desc: 'A team of 50+ experts delivering software worldwide.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <div className="text-2xl font-bold text-primary-500 mb-2">{item.year}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
              </div>
              <div className="w-4 h-4 bg-primary-500 rounded-full relative z-10 shadow-lg shadow-primary-500/50" />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default About;
