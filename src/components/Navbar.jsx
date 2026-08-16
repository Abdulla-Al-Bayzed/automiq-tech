import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Career', path: '/career' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'mt-4 mx-4 md:mx-auto max-w-5xl glass rounded-full py-2 px-6 shadow-2xl shadow-primary-500/10'
          : 'py-6 bg-transparent px-4 sm:px-6 lg:px-8'
        }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="group-hover:rotate-[15deg] transition-all duration-500 shadow-lg shadow-primary-500/10 overflow-hidden w-12 h-12 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Automiq Tech" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute inset-0 bg-primary-500 blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              Automiq <span className="text-primary-500">Tech</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-semibold transition-all group overflow-hidden ${isActive(link.path)
                  ? 'text-primary-500'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <span className="relative z-10">{link.name}</span>
              {isActive(link.path) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                />
              )}
              <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 -z-0" />
            </Link>
          ))}

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-4" />

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-90"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/contact"
            className="ml-4 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full text-sm font-bold transition-all hover:shadow-lg hover:shadow-primary-500/25 active:scale-95 flex items-center space-x-2"
          >
            <span>Start Project</span>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full glass active:scale-90"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full glass active:scale-90"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 mx-4 glass rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-bold transition-all ${isActive(link.path)
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                >
                  <span>{link.name}</span>
                  {isActive(link.path) && <Sparkles size={16} />}
                </Link>
              ))}
              <div className="pt-2 pb-1">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-primary-500 text-white rounded-2xl font-bold shadow-lg shadow-primary-500/20"
                >
                  Start Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
