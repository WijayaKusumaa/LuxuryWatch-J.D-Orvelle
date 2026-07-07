import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: '01',
    name: 'Royal Ocean',
    headline: 'Precision Beyond The Horizon',
    desc: 'Forged in the depths, designed for the surface. The Royal Ocean is the ultimate companion for those who command the seas.',
    specs: { mov: 'Calibre 400', res: '70 Hours', case: 'Titanium', water: '300m' },
    image: `${import.meta.env.BASE_URL}images/watch_blue.png`,
    bgClass: 'bg-slate-950',
    accentClass: 'text-blue-400'
  },
  {
    id: '02',
    name: 'Sahara Heritage',
    headline: 'The Spirit of Exploration',
    desc: 'Inspired by the vast golden sands. Sahara Heritage is built to withstand extreme environments with absolute legibility.',
    specs: { mov: 'Calibre 702', res: '80 Hours', case: 'Bronze', water: '150m' },
    image: `${import.meta.env.BASE_URL}images/watch_desert.png`,
    bgClass: 'bg-zinc-950',
    accentClass: 'text-amber-600'
  },
  {
    id: '03',
    name: 'Rose Elegance',
    headline: 'A Symphony of Rose Gold',
    desc: 'Where high fashion meets master mechanics. The Rose Elegance showcases delicate finishing and a solid 18k gold case.',
    specs: { mov: 'Calibre 120', res: '48 Hours', case: '18k Rose Gold', water: '50m' },
    image: `${import.meta.env.BASE_URL}images/watch_rose.png`,
    bgClass: 'bg-neutral-950',
    accentClass: 'text-rose-400'
  },
  {
    id: '04',
    name: 'Noir Crimson',
    headline: 'Built for Passion and Power',
    desc: 'Bold, provocative, and immensely powerful. The Noir Crimson leaves an unforgettable impression.',
    specs: { mov: 'Calibre 900', res: '120 Hours', case: 'Carbon Fiber', water: '200m' },
    image: `${import.meta.env.BASE_URL}images/watch_sensual.png`,
    bgClass: 'bg-red-950',
    accentClass: 'text-red-400'
  }
];

export default function CollectionsShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=2000px",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map progress (0 to 1) to activeIndex (0 to 3)
        let index = Math.floor(progress * collections.length);
        if (index === collections.length) index = collections.length - 1;
        
        if (index !== prevIndexRef.current) {
          setActiveIndex(index);
          prevIndexRef.current = index;
        }
      }
    });

    triggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  const handleNavClick = (index: number) => {
    if (!triggerRef.current || !containerRef.current) return;
    const startScroll = triggerRef.current.start;
    const endScroll = triggerRef.current.end;
    const totalScroll = endScroll - startScroll;
    const segment = totalScroll / collections.length;
    const targetScroll = startScroll + (index + 0.5) * segment;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const activeData = collections[activeIndex];

  return (
    <section ref={containerRef} id="collections" className={`relative h-screen w-full overflow-hidden transition-colors duration-1000 ${activeData.bgClass}`}>
      {/* Particles Overlay (Mocked with random static dots for simplicity, ideally SVGs) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-white rounded-full blur-[1px] animate-pulse"></div>
        <div className="absolute top-[60%] left-[80%] w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse delay-75"></div>
        <div className="absolute top-[80%] left-[30%] w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-pulse delay-150"></div>
      </div>

      {/* Unified Responsive Layout */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Column (Title & Discover) */}
        <div className="w-full md:w-1/3 flex flex-col justify-center text-center md:text-left h-auto md:h-full z-20 mt-4 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`left-${activeIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className={`text-base md:text-xl font-bodoni italic ${activeData.accentClass}`}>{activeData.id}</span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bodoni font-black uppercase mt-1 md:mt-4 mb-2 md:mb-6 leading-none text-white">
                {activeData.name.split(' ').map((word, i) => (
                  <div key={i} className="inline-block md:block mr-2 md:mr-0">{word}</div>
                ))}
              </h2>
              <p className="font-inter text-[10px] md:text-sm tracking-widest text-white/70 uppercase mb-4 md:mb-8">
                {activeData.headline}
              </p>
              <button className="px-6 md:px-8 py-2 md:py-3 rounded-full border border-white/20 font-inter text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 mx-auto md:mx-0">
                Discover
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Column (Watch Image) */}
        <div className="w-full md:w-1/3 h-[35vh] md:h-full flex items-center justify-center relative z-10 my-4 md:my-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={`img-${activeIndex}`}
              src={activeData.image}
              alt={activeData.name}
              initial={{ y: "100%", opacity: 0, scale: 0.8 }}
              animate={{ y: "0%", opacity: 1, scale: 1 }}
              exit={{ y: "-100%", opacity: 0, scale: 0.8 }}
              whileHover={{ 
                scale: 1.08, 
                rotate: 2,
                y: -15,
                filter: "drop-shadow(0 35px 35px rgba(255,255,255,0.15))",
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute max-h-[30vh] md:max-h-[75vh] max-w-[75vw] md:max-w-[90%] object-contain drop-shadow-2xl pointer-events-auto cursor-pointer"
            />
          </AnimatePresence>
        </div>

        {/* Right Column (Desc & Specs) */}
        <div className="w-full md:w-1/3 flex flex-col justify-center h-auto md:h-full z-20 text-center md:text-left mt-2 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`right-${activeIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-inter text-xs md:text-base text-white/60 leading-relaxed mb-4 md:mb-12 max-w-xs md:max-w-sm mx-auto md:mx-0">
                {activeData.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 md:gap-y-8 gap-x-4 max-w-xs mx-auto md:mx-0">
                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-0.5 md:mb-1">Movement</span>
                  <span className="block font-bodoni text-sm md:text-xl text-white">{activeData.specs.mov}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-0.5 md:mb-1">Reserve</span>
                  <span className="block font-bodoni text-sm md:text-xl text-white">{activeData.specs.res}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-0.5 md:mb-1">Case</span>
                  <span className="block font-bodoni text-sm md:text-xl text-white">{activeData.specs.case}</span>
                </div>
                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-0.5 md:mb-1">Water Res.</span>
                  <span className="block font-bodoni text-sm md:text-xl text-white">{activeData.specs.water}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Indicators (Supports Scroll Sync & Auto-Scroll Click) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {collections.map((item, i) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(i)}
            className="group flex items-center gap-2 focus:outline-none cursor-pointer pointer-events-auto"
          >
            <span className={`h-2 rounded-full transition-all duration-500 ${
              activeIndex === i 
                ? 'w-8 bg-white' 
                : 'w-2 bg-white/30 group-hover:bg-white/60'
            }`} />
            
            <AnimatePresence>
              {activeIndex === i && (
                <motion.span 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] tracking-[0.2em] font-inter uppercase text-white/80 hidden md:inline"
                >
                  {item.name}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}
