import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Background scale and parallax
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.fromTo(bgRef.current, 
        { scale: 1, y: "0%" },
        { scale: 1.15, y: "20%", ease: "none" }
      )
    });

    // Text fade in/out
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      }
    });

    textTl
      .fromTo(textRef.current, 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
      .to(textRef.current, 
        { opacity: 0, scale: 1.1, duration: 1, ease: "power2.in" },
        "+=1" // hold it for a bit
      );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === sectionRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="craftsmanship" className="relative h-[150vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Rotating clockwork border element */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none mix-blend-overlay">
          <div className="w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] border-[1px] border-dashed border-amber-500 rounded-full animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[100vw] h-[100vw] border-[1px] border-dotted border-white rounded-full animate-[spin_90s_linear_infinite_reverse]" />
        </div>

        {/* Background Image */}
        <img 
          ref={bgRef}
          src={`${import.meta.env.BASE_URL}images/craftsmanship.png`} 
          alt="Watch movement macro"
          className="absolute inset-0 w-full h-[120%] object-cover opacity-40 top-[-10%]"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        {/* Foreground Text */}
        <div ref={textRef} className="relative z-10 text-center px-4">
          <p className="font-inter text-amber-500 text-xs md:text-sm tracking-[0.5em] uppercase mb-6 drop-shadow-lg">
            Savoir-Faire
          </p>
          <h2 className="font-bodoni text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tight text-white drop-shadow-2xl mix-blend-lighten">
            Unseen<br />Precision
          </h2>
        </div>

      </div>
    </section>
  );
}
