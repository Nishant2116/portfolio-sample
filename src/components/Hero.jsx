import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 180; // Approx frames for 8s video @ 24fps? adjusted to match build.txt (192 generated, but let's stick to reliable count or dynamic)
// build.txt says "Run FFmpeg...". We generated 192 frames. Let's use 180 for safety or check.
// Using 180 for now.

const fonts = {
  header: 'font-syne',
  body: 'font-satoshi'
};

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  // Use a ref for images so we can access the latest array in the render loop without re-running the effect
  const imagesRef = useRef([]);

  // Load images
  useEffect(() => {
    const runLoading = async () => {
      const initialBatchSize = 30;
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        // Check if image already exists (hot reload safety)
        if (imagesRef.current[i-1]) continue;

        const img = new Image();
        img.src = `/frames/frame_${String(i).padStart(4, '0')}.webp`;
        
        const p = new Promise((resolve) => {
          img.onload = () => {
            imagesRef.current[i-1] = img;
            setImagesLoaded((prev) => prev + 1);
            resolve();
          };
          img.onerror = () => resolve(); // Don't block
        });
        promises.push(p);

        // Batch loading: await every N requests to free up main thread
        if (i === initialBatchSize) {
           await Promise.all(promises);
        }
      }
    };

    runLoading();
  }, []);

  // Canvas Animation
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    canvas.width = 1920;
    canvas.height = 1080;

    const render = (index) => {
        const img = imagesRef.current[index];
        if (img) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
    };

    // Initial render
    render(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
          }
      });

      let obj = { frame: 0 };
      tl.to(obj, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          onUpdate: () => {
              render(Math.round(obj.frame));
          }
      });
    }, containerRef);

    return () => ctx.revert(); // ONLY revert this component's triggers
  }, []); // Run once on mount. The render function uses the ref, so it always has access to latest images.

  // Re-render canvas when loading critical frames to ensure poster isn't stuck if user hasn't scrolled
  useEffect(() => {
      if (imagesLoaded < 30) {
          const canvas = canvasRef.current;
          if (canvas) {
              const context = canvas.getContext('2d');
              if (imagesRef.current[0]) {
                  context.drawImage(imagesRef.current[0], 0, 0, canvas.width, canvas.height);
              }
          }
      }
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative h-[800vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster / Loading State */}
        {imagesLoaded < 30 && (
             <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
                <img src="/video-poster.webp" className="w-full h-full object-cover opacity-50" alt="Loading..." />
             </div>
        )}

        {/* Canvas */}
        <canvas 
            ref={canvasRef} 
            className="w-full h-full object-cover filter saturate-[1.25]"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        <div className="absolute inset-0 z-10 pointer-events-none" 
             style={{background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.4) 100%)'}} />
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black/80 to-transparent z-10" />

        {/* Content */}
        <div className="absolute inset-0 z-30 flex flex-col justify-between p-8 md:p-12 text-white">
            {/* Top Right */}
            <div className="flex flex-col items-end gap-2 text-sm md:text-base font-satoshi opacity-80 mix-blend-difference">
                <a href="#" className="hover:text-gray-300 transition-colors">LinkedIn ↗</a>
                <a href="mailto:email@example.com" className="hover:text-gray-300 transition-colors">Get in touch</a>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <h1 className={`${fonts.header} text-6xl md:text-9xl font-bold leading-none tracking-tighter`}>
                    AI/ML<br/>ENGINEER
                </h1>

                <div className="max-w-xs md:max-w-sm flex flex-col gap-4">
                    <p className={`${fonts.body} text-lg md:text-xl text-gray-300 leading-relaxed`}>
                        Building intelligent systems using advanced orchestration and state-of-the-art models.
                    </p>
                    {/* Scroll Indicator */}
                    <div className="animate-bounce mt-4 opacity-50">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden md:block">
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                        <span className="md:hidden text-xs uppercase tracking-widest">Scroll</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
