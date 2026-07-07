import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<HTMLDivElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(subtitleRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 0.2 }
    )
    .fromTo(titleRefs.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.15 },
      "-=1.2"
    );

    // Parallax fade-out on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(containerRef.current, {
        scale: 0.85,
        opacity: 0,
        ease: "none"
      })
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden origin-top">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_bg_watch.mp4" type="video/mp4" />
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-20">
        <p 
          ref={subtitleRef}
          className="font-inter text-sm md:text-base tracking-[0.4em] text-white/60 mb-8 uppercase"
        >
          The Pinnacle of Swiss Watchmaking
        </p>
        
        <h1 className="flex flex-col font-bodoni text-5xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tight">
          <div className="overflow-hidden py-2"><div ref={addToRefs}>Time Is</div></div>
          <div className="overflow-hidden py-2"><div ref={addToRefs}>An Art</div></div>
        </h1>
      </div>
    </section>
  );
}
