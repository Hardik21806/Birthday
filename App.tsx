
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import WishCard from './components/WishCard';
import InteractiveCake from './components/InteractiveCake';
import { BirthdayWish } from './types';
import { generatePalakWish } from './services/geminiService';

const App: React.FC = () => {
  const [wish, setWish] = useState<BirthdayWish | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchWish = async () => {
    setLoading(true);
    const newWish = await generatePalakWish();
    setWish(newWish);
    setLoading(false);
  };

  useEffect(() => {
    fetchWish();
    // Auto-show celebration after a delay
    setTimeout(() => setShowConfetti(true), 1500);
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-sky-200">
      {/* Floating Confetti Layer */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, x: `${Math.random() * 100}vw`, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: '100vh', 
                  rotate: 360,
                  x: `${(Math.random() * 100) + (Math.sin(i) * 10)}vw` 
                }}
                transition={{ 
                  duration: 4 + Math.random() * 6, 
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 3 === 0 ? 'bg-sky-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-yellow-400'
                }`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <Hero />
      
      <WishCard 
        wish={wish} 
        loading={loading} 
        onRefresh={fetchWish} 
      />

      <InteractiveCake />

      {/* Footer Section */}
      <footer className="py-12 bg-sky-950 text-sky-100 text-center border-t border-sky-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <span className="text-3xl">🎂</span>
          </div>
          <p className="text-lg font-serif italic mb-2">
            "Aging like fine wine, but staying as chaotic as ever."
          </p>
          <p className="text-sky-400/60 text-sm tracking-widest uppercase">
            Stay Awesome Palak (The Real Kalii Dayan)
          </p>
          <div className="mt-8 pt-8 border-t border-sky-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
            <p>© 2024 Built with ❤️ for our favorite chaotic queen</p>
            <div className="flex gap-6">
              <span className="hover:text-sky-300 cursor-pointer transition">Anger Management Crew</span>
              <span className="hover:text-sky-300 cursor-pointer transition">Dayan Vibes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
