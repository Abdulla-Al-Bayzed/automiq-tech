import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Work', path: '/portfolio' },
      { name: 'Expertise', path: '/services' },
      { name: 'Careers', path: '/career' },
    ],
    services: [
      { name: 'Web Engineering', path: '/services' },
      { name: 'Mobile Innovation', path: '/services' },
      { name: 'Cloud Solutions', path: '/services' },
      { name: 'AI & Automation', path: '/services' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ]
  };

  return (
    <footer className="relative bg-slate-950 text-white pt-32 pb-12 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="premium-card !bg-primary-500 !p-12 mb-32 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative"
        >
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Ready to scale your vision?
            </h2>
            <p className="text-primary-100 text-lg font-medium opacity-90">
              Join the world's most innovative teams and build something extraordinary with Automiq Tech.
            </p>
          </div>

          <Link
            to="/contact"
            className="relative z-10 group bg-white text-primary-600 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:bg-slate-50 hover:-translate-y-1 active:scale-95 flex items-center space-x-3 shadow-2xl"
          >
            <span>Start a Project</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-primary-500/10 w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Automiq Tech" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none">
                  Automiq <span className="text-primary-500">Tech</span>
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              We engineer high-performance digital products for the next generation of companies. Our mission is to bridge the gap between complex ideas and seamless execution.
            </p>
            <div className="flex space-x-5">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/automiqtech', label: 'Facebook' },
                { icon: Twitter, href: 'https://x.com/AutomiqTech', label: 'Twitter' },
                { icon: Instagram, href: 'https://www.instagram.com/automiqtech/', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/company/automiqtech/', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-primary-500 hover:text-white hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-8">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-8">Services</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-primary-500 mb-8">Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-primary-500 transition-colors">
                  <Mail size={18} className="text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Email Us</div>
                  <div className="text-slate-300 font-bold">hello@automiqtech.com</div>
                </div>
              </div>
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-primary-500 transition-colors">
                  <Phone size={18} className="text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Call Us</div>
                  <div className="text-slate-300 font-bold">+8801708019889</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-medium">
          <p>© {currentYear} Automiq Tech. Handcrafted with precision.</p>
          <div className="flex space-x-10">
            {footerLinks.legal.map((link) => (
              <a key={link.name} href={link.path} className="hover:text-primary-500 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
