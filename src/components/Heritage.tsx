import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Heritage() {
  const containerRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Image mask reveal and parallax
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(imageContainerRef.current,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }
    );

    // Parallax on image inside container
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(imageRef.current, {
        y: "20%",
        ease: "none"
      })
    });

    // Staggered text reveal
    gsap.fromTo(textRefs.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} id="heritage" className="relative w-full py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Side (Image) */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div 
            ref={imageContainerRef}
            className="w-full max-w-md h-[50vh] md:h-[70vh] relative overflow-hidden rounded-sm"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
             <img 
              ref={imageRef}
              src={`${import.meta.env.BASE_URL}images/heritage.png`} 
              alt="J D'Orvelle Heritage" 
              className="absolute inset-0 w-full h-[120%] object-cover grayscale mix-blend-luminosity opacity-80 top-[-10%]"
            />
          </div>
        </div>

        {/* Right Side (Text) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="overflow-hidden">
            <div ref={addToRefs} className="text-amber-500 font-inter text-sm tracking-widest uppercase mb-4">
              Since 1884
            </div>
          </div>
          
          <div className="overflow-hidden mb-8">
            <div ref={addToRefs}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bodoni text-white">
                A Legacy of
              </h2>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bodoni font-black text-white italic mt-2">
                Perfection.
              </h2>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <div ref={addToRefs} className="text-white/60 font-inter leading-relaxed max-w-md">
              <p className="mb-6">
                For over a century, our J D'Orvelle has stood at the pinnacle of haute horlogerie. Every timepiece is a culmination of relentless dedication, marrying ancestral techniques with avant-garde innovation.
              </p>
              <p>
                From the first sketch to the final polish, our master artisans pour their souls into creating not just watches, but timeless artifacts meant to be passed down through generations.
              </p>
            </div>
          </div>

          <div className="overflow-hidden mt-12">
            <div ref={addToRefs}>
              <button className="px-8 py-3 rounded-full border border-white/20 font-inter text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
                Explore Our History
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
