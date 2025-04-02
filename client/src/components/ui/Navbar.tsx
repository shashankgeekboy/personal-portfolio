import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';
import { useScroll } from '../../hooks/useScroll';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { playClick } = useAudio();
  const { scrollY } = useScroll();

  // Update navbar style based on scroll position
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  const toggleMenu = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    playClick();
    setIsOpen(false);
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Get the section by id
    const targetSection = document.querySelector(href);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Fallback to finding by index if id doesn't exist
    const sections = document.querySelectorAll('section');
    const sectionMap = {
      '#about': 1,
      '#projects': 2,
      '#testimonials': 3,
      '#contact': 4
    };
    
    const index = sectionMap[href as keyof typeof sectionMap];
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-lg shadow-primary/10' : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="relative h-10 w-10 mr-3">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-1 bg-primary/40 rounded-full transform rotate-45"></div>
              <div className="absolute inset-2 bg-primary/60 rounded-full transform -rotate-45"></div>
              <div className="absolute inset-3 bg-background rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">SM</span>
              </div>
            </div>
            <span className="text-white font-orbitron font-bold text-xl tracking-wider">
              SHASHANK<span className="text-primary">MISHRA</span>
            </span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                className={`group relative px-5 py-2 text-sm font-medium text-white rounded-md transition-all duration-200 hover:text-primary hover:shadow-[0_0_15px_rgba(120,0,255,0.3)] active:shadow-[0_0_5px_rgba(120,0,255,0.5)]`}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary focus:outline-none active:bg-primary/10 active:shadow-inner"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-md border-t border-primary/20">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ x: 5 }}
                  className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-white hover:bg-primary/10 hover:text-primary active:bg-primary/20 transition-all duration-200"
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 w-20 h-1 bg-primary/30 blur-sm"></div>
      <div className="absolute bottom-0 right-1/3 w-16 h-1 bg-accent/30 blur-sm"></div>
    </header>
  );
};

export default Navbar;