import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const Card = ({ children, className, colSpan, rowSpan }) => (
  <div className={`
    relative overflow-hidden rounded-3xl 
    bg-zinc-900/50 backdrop-blur-xl border border-white/10
    shadow-lg hover:shadow-blue-500/10 hover:border-white/20 transition-all duration-500
    flex flex-col
    ${colSpan} ${rowSpan} ${className}
    group
  `}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    {children}
  </div>
);

const WallpaperGallery = () => {
    const wallpapers = [
        '/wall1.webp', '/wall2.webp', '/wall3.webp', '/wall4.webp', '/wall5.webp', '/wall6.webp', '/wall7.webp',
        '/wall1.webp', '/wall2.webp', '/wall3.webp', '/wall4.webp', '/wall5.webp', '/wall6.webp', '/wall7.webp' // Duplicate for loop
    ];
    return (
        <div className="flex items-center h-full relative overflow-hidden">
             <div className="flex gap-4 animate-slide-horizontal w-max grayscale group-hover:grayscale-0 transition-all duration-700">
                {wallpapers.map((src, i) => (
                    <img key={i} src={src} className="h-64 aspect-[9/16] object-cover rounded-xl" alt={`Wallpaper ${i}`} />
                ))}
             </div>
             {/* Gradients */}
             <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"/>
             <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"/>
        </div>
    );
};

const IntroCard = () => {
    const [sent, setSent] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div className="p-8 flex flex-col justify-between h-full relative">
            <div>
                <h2 className="text-4xl font-syne font-bold mb-4 text-white">Hi, I'm Nishant</h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-md mb-4 md:mb-0">
                    Passionate about creating intelligent digital experiences. 
                    Merging design physics with AI capabilities.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 md:mt-8 relative z-10">
                 <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Say hello..." 
                        className="bg-white/10 border border-white/10 rounded-full px-6 py-3 w-full text-white placeholder:text-white/30 focus:outline-none focus:bg-white/20 transition-all"
                    />
                    <button type="submit" className="bg-white text-black rounded-full px-6 py-3 font-bold hover:scale-105 transition-transform">
                        Send
                    </button>
                 </div>
                 {sent && (
                    <motion.div 
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="absolute -top-12 left-0 text-green-400 font-medium"
                    >
                        Message sent!
                    </motion.div>
                 )}
            </form>
            
             <div className="absolute top-0 right-0 opacity-10 pointer-events-none p-4">
                 <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                 </svg>
             </div>
        </div>
    );
};

const ToolsMarquee = () => {
    const tools = [
        { name: "React", src: "/react.svg" },
        { name: "Vite", src: "/vite.svg" },
        { name: "Framer", src: "/framer_logo_icon_169149.webp" },
        { name: "Spline", src: "/spline_logo.webp" },
        { name: "Ollama", src: "/ollama-icon.webp", invert: true },
        { name: "Groq", src: "/groq_logo.webp" },
        { name: "HuggingFace", src: "/huggingface-color.webp" },
        { name: "Antigravity", src: "/antigravity.webp" },
    ];

    return (
        <div className="flex items-center h-full relative overflow-hidden bg-white/5 w-full">
             <div className="flex gap-8 md:gap-12 items-center animate-marquee whitespace-nowrap px-4 md:px-12 w-full">
                {[...tools, ...tools].map((tool, i) => ( 
                    <div key={i} className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                        <img 
                            src={tool.src} 
                            alt={tool.name} 
                            className={`h-10 w-10 md:h-12 md:w-12 object-contain ${tool.invert ? 'filter invert' : ''}`}
                        />
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider block opacity-70">{tool.name}</span>
                    </div>
                ))}
             </div>
        </div>
    );
};

const ProfileCard = () => (
    <div className="h-full w-full relative group">
        <img 
            src="/mine_pic.webp" 
            alt="Profile" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs uppercase opacity-50">Status</p>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold">Available</span>
            </div>
        </div>
    </div>
);

const VideoCard = () => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);

    return (
        <div className="h-full w-full relative">
            <video 
                ref={videoRef}
                src="/carchase.mp4" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                autoPlay 
                loop 
                muted={muted} 
                playsInline
            />
            <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay pointer-events-none" />
            
            <button 
                onClick={() => setMuted(!muted)}
                className="absolute bottom-4 right-4 bg-black/50 backdrop-blur p-2 rounded-full hover:bg-white/20 transition-colors"
            >
                {muted ? (
                    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                    <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                )}
            </button>
        </div>
    );
};

const MusicPlayer = () => {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(new Audio('/NEFFEX_-_Best_of_Me_(mp3.pm).mp3'));

    useEffect(() => {
        const audio = audioRef.current;
        if(playing) audio.play();
        else audio.pause();
        return () => audio.pause(); 
    }, [playing]);

    return (
        <div className="h-full flex items-center gap-6 px-8 relative overflow-hidden group">
             {/* Background Blur */}
             <div className="absolute inset-0">
                <img src="/songpic.webp" className="w-full h-full object-cover blur-2xl opacity-30 scale-150" alt="" />
             </div>

             {/* Content */}
             <div className="relative z-10 flex items-center gap-4 w-full">
                 <div className="relative">
                    <img src="/songpic.webp" className={`w-20 h-20 rounded-lg shadow-2xl ${playing ? 'animate-[spin_4s_linear_infinite]' : ''}`} alt="Album Art" />
                    <button 
                        onClick={() => setPlaying(!playing)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    >
                        {playing ? (
                            <svg fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                        ) : (
                            <svg fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </button>
                 </div>
                 
                 <div className="flex-1">
                     <h3 className="text-xl font-bold font-syne text-white">Best of Me</h3>
                     <p className="text-white/60 text-sm">NEFFEX</p>
                 </div>

                 {/* Visualizer bars */}
                 <div className="flex gap-1 items-end h-8">
                     {[1,2,3,1,2].map((n, i) => (
                         <div 
                            key={i} 
                            className={`w-1.5 bg-green-400 rounded-full ${playing ? `animate-music-bar-${n}` : 'h-1'}`} 
                            style={{ animationDelay: `${i * 0.1}s` }} 
                        />
                     ))}
                 </div>
             </div>
        </div>
    );
};


// --- Main Component ---

const BentoGrid = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Stagger Animation
    const ctx = gsap.context(() => {
        ScrollTrigger.batch(".bento-card", {
            onEnter: batch => gsap.to(batch, {
                opacity: 1, 
                y: 0, 
                stagger: 0.1, 
                duration: 0.8, 
                ease: "power2.out"
            }),
            start: "top 80%",
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black py-24 px-4 md:px-8 lg:px-12 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 auto-rows-[180px] md:auto-rows-[220px] gap-4 md:gap-6">
        
        {/* Row 1-2 */}
        <Card colSpan="md:col-span-5" rowSpan="row-span-2 md:row-span-2" className="bento-card opacity-0 translate-y-20">
            <WallpaperGallery />
        </Card>
        <Card colSpan="md:col-span-7" rowSpan="row-span-2 md:row-span-2" className="bento-card opacity-0 translate-y-20">
            <IntroCard />
        </Card>

        {/* Row 3 */}
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-20">
            <ToolsMarquee />
        </Card>
        <Card colSpan="md:col-span-2" rowSpan="md:row-span-2" className="bento-card opacity-0 translate-y-20">
            <ProfileCard />
        </Card>
        <Card colSpan="md:col-span-4" rowSpan="md:row-span-2" className="bento-card opacity-0 translate-y-20">
            <VideoCard />
        </Card>

        {/* Row 4 */}
        <Card colSpan="md:col-span-6" rowSpan="md:row-span-1" className="bento-card opacity-0 translate-y-20">
            <MusicPlayer />
        </Card>

      </div>
    </section>
  );
};

export default BentoGrid;
