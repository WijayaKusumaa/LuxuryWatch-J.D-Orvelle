import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CollectionsShowcase from './components/CollectionsShowcase';
import Heritage from './components/Heritage';
import Craftsmanship from './components/Craftsmanship';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      // @ts-ignore - Some options might differ slightly between versions
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Prevent jitter
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-white/30 selection:text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Home />
        <CollectionsShowcase />
        <Heritage />
        <Craftsmanship />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}

export default App;
