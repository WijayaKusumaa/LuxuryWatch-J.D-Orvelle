import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: '/images/gallery1.png', alt: 'Ocean Diver Masterpiece', caption: 'Deep sea reliability meets elegant design.' },
  { id: 2, src: '/images/gallery2.png', alt: 'Rose Gold Elegance', caption: 'The ultimate statement in high fashion and luxury.' },
  { id: 3, src: '/images/gallery3.png', alt: 'Tourbillon Precision', caption: 'Defying gravity with our proprietary tourbillon.' },
  { id: 4, src: '/images/gallery4.png', alt: 'Diamond Encrusted', caption: 'Radiant brilliance for the highest echelons of society.' },
  { id: 5, src: '/images/gallery5.png', alt: 'Vintage Chronograph', caption: 'Racing heritage captured in a timeless classic.' },
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const scrollWrapper = scrollWrapperRef.current;
    if (!containerRef.current || !scrollWrapper) return;

    const sections = itemsRef.current;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const totalWidth = scrollWrapper.scrollWidth - window.innerWidth;
      
      // Horizontal Scroll
      const st1 = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalWidth}`,
        pin: true,
        scrub: 1, // Smooth scrub
        animation: gsap.to(scrollWrapper, {
          x: -totalWidth,
          ease: "none"
        })
      });

      // Velocity Skew Effect
      const setSkew = gsap.quickSetter(sections, "skewX", "deg");
      const proxy = { skew: 0 };
      let clamp = gsap.utils.clamp(-15, 15);

      const st2 = ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -100);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => setSkew(proxy.skew)
            });
          }
        }
      });

      return () => {
        st1.kill();
        st2.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <>
      <section ref={containerRef} className="relative h-screen w-full bg-[#020202] overflow-hidden">
        
        {/* Title */}
        <div className="absolute top-24 left-8 md:left-16 z-10 pointer-events-none mix-blend-difference">
          <h2 className="font-bodoni text-5xl md:text-7xl font-bold text-white uppercase tracking-wider">
            The Gallery
          </h2>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollWrapperRef} 
          className="h-full flex items-center pt-24 px-[10vw] gap-12 md:gap-24 overflow-x-auto md:overflow-x-visible w-full md:w-max snap-x snap-mandatory md:snap-none scrollbar-none"
        >
          {galleryImages.map((img, i) => (
            <div 
              key={img.id}
              ref={addToRefs}
              className="gallery-item relative w-[80vw] md:w-[40vw] lg:w-[30vw] h-[60vh] md:h-[70vh] cursor-pointer group snap-center flex-shrink-0"
              onClick={() => openModal(i)}
            >
              <div className="absolute inset-0 overflow-hidden rounded-sm bg-black">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-10 left-0 text-white/50 font-inter text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                {String(i + 1).padStart(2, '0')} — {img.alt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white/70 hover:text-white hover:rotate-90 transition-all duration-300 z-50 p-4"
              onClick={closeModal}
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Navigation */}
            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-4 transition-colors z-50"
              onClick={prevImage}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-4 transition-colors z-50"
              onClick={nextImage}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Image Container */}
            <div 
              className="w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center px-12 md:px-32 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full flex flex-col items-center justify-center"
                >
                  <img 
                    src={galleryImages[selectedImage].src} 
                    alt={galleryImages[selectedImage].alt}
                    className="max-w-full max-h-[85%] object-contain mb-8 drop-shadow-2xl"
                  />
                  <div className="text-center">
                    <h3 className="font-bodoni text-3xl md:text-4xl font-bold mb-3">{galleryImages[selectedImage].alt}</h3>
                    <p className="font-inter text-sm md:text-base text-white/60 tracking-wider uppercase">{galleryImages[selectedImage].caption}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
