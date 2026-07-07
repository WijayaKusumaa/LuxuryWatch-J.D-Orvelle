import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Contact() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="w-full bg-[#050505] text-white flex flex-col justify-between min-h-screen pt-32 pb-8">

      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-8">

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="font-bodoni text-5xl md:text-7xl font-bold mb-4 uppercase">Acquire Excellence</h2>
            <p className="font-inter text-sm md:text-base text-white/60 tracking-[0.2em] uppercase">Schedule a private viewing at our boutiques.</p>
          </motion.div>

          <form className="w-full flex flex-col gap-12 font-inter">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-12">
              <div className="relative w-full group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors peer text-lg"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-4 text-white/40 uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-white/80 peer-valid:-top-4 peer-valid:text-white/80 cursor-text"
                >
                  Full Name
                </label>
              </div>

              <div className="relative w-full group">
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors peer text-lg"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-4 text-white/40 uppercase tracking-widest text-xs transition-all peer-focus:-top-4 peer-focus:text-white/80 peer-valid:-top-4 peer-valid:text-white/80 cursor-text"
                >
                  Email Address
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-full">
              <select
                id="boutique"
                required
                className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors appearance-none text-lg text-white/90"
              >
                <option value="" disabled selected hidden>Select Boutique Location</option>
                <option value="geneva" className="bg-[#050505] text-white">Geneva - Rue du Rhône</option>
                <option value="paris" className="bg-[#050505] text-white">Paris - Place Vendôme</option>
                <option value="newyork" className="bg-[#050505] text-white">New York - 5th Avenue</option>
                <option value="tokyo" className="bg-[#050505] text-white">Tokyo - Ginza</option>
                <option value="Jawa Timur" className="bg-[#050505] text-white">Gedangan - JosJis Avenue</option>
              </select>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                ▼
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center mt-8">
              <button
                type="submit"
                className="px-12 py-4 rounded-full border border-white/20 font-inter text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 w-full md:w-auto"
              >
                Request Appointment
              </button>
            </motion.div>
          </form>
        </motion.div>

      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-8 mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 font-inter text-xs tracking-widest text-white/40 uppercase">
        <div className="font-bodoni text-2xl text-white font-bold tracking-widest">J D'Orvelle</div>

        <div className="flex gap-8">
          <a href="https://www.instagram.com/haswaltch_/" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Journal</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>

        <div>
          &copy; {new Date().getFullYear()} J Kusuma All rights reserved.
        </div>
      </footer>
    </section>
  );
}
