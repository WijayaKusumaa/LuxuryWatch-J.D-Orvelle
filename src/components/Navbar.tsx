import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.4 } }
  };

  return (
    <>
      <nav className={twMerge(
        clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-8 py-6 flex justify-between items-center",
          scrolled || menuOpen ? "bg-black/20 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent border-b border-transparent"
        )
      )}>
        <div className="text-xl font-bodoni font-bold uppercase tracking-widest text-white z-50">
          J D'Orvelle
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-inter tracking-[0.2em] text-white/70">
          <a href="#collections" className="hover:text-white transition-colors uppercase">Collections</a>
          <a href="#heritage" className="hover:text-white transition-colors uppercase">Heritage</a>
          <a href="#craftsmanship" className="hover:text-white transition-colors uppercase">Savoir-Faire</a>
          <a href="#contact" className="hover:text-white transition-colors uppercase">Boutiques</a>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden text-white z-50 focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-lg font-inter tracking-[0.25em] text-white/80">
              <a 
                href="#collections" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors uppercase"
              >
                Collections
              </a>
              <a 
                href="#heritage" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors uppercase"
              >
                Heritage
              </a>
              <a 
                href="#craftsmanship" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors uppercase"
              >
                Savoir-Faire
              </a>
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="hover:text-white transition-colors uppercase"
              >
                Boutiques
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
