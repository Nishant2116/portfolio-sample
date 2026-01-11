import React from 'react';
import useLenis from './hooks/useLenis';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';

function App() {
  useLenis();

  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <BentoGrid />
      
      {/* Footer / Credits if needed */}
      <footer className="py-8 text-center text-white/20 text-xs font-satoshi flex flex-col gap-2">
        <p>© 2026 Nishant / Portfolio</p>
      </footer>
    </div>
  );
}

export default App;
