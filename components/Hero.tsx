import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-50 px-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#0ea5e9' : '#f472b6',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center"
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-sky-600 uppercase bg-sky-100 rounded-full border border-sky-200">
          Birthday Celebration
        </span>
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          Happy Birthday, <br />
          <span className="gradient-text">Subhi!</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Celebrating the grace of a <span className="text-sky-600 font-bold">chaotic queen</span>, our favorite <span className="text-sky-500 font-semibold italic">Gen Z Icon</span>.
        </p>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-sky-400 to-transparent"></div>
          <span className="mt-4 text-sky-400 text-sm uppercase tracking-widest font-semibold">Scroll for some Truth</span>
        </motion.div>
      </motion.div>

      {/* Floating Sparkles Icons */}
      <div className="absolute inset-0 pointer-events-none">
         <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-1/4 text-pink-300 opacity-40 text-4xl"><i className="fas fa-sparkles"></i></motion.div>
         <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/3 right-1/4 text-sky-300 opacity-40 text-5xl"><i className="fas fa-fire"></i></motion.div>
         <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/4 right-1/3 text-purple-300 opacity-40 text-3xl"><i className="fas fa-ghost"></i></motion.div>
      </div>
    </section>
  );
};

export default Hero;