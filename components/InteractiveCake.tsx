
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveCake: React.FC = () => {
  const [isBlown, setIsBlown] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      setIsListening(true);
      detectBlow();
    } catch (err) {
      console.error("Microphone access denied:", err);
      // Fallback: Just let them click to blow
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const check = () => {
      analyserRef.current?.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      setAudioLevel(average);
      
      if (average > 65) {
        setIsBlown(true);
        stopListening();
      } else {
        animationFrameRef.current = requestAnimationFrame(check);
      }
    };
    check();
  };

  const stopListening = () => {
    setIsListening(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
  };

  const resetCake = () => {
    setIsBlown(false);
    setAudioLevel(0);
  };

  return (
    <section className="py-24 bg-sky-50 px-4 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-serif font-bold text-slate-800 mb-4">Make a Wish, Palak</h2>
          <p className="text-slate-500">
            {isBlown 
              ? "Your wish is being processed by the universe! ✨" 
              : isListening 
                ? "Blow into your mic to put out the candles!" 
                : "Click the button below to start the ceremony."}
          </p>
        </motion.div>

        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence>
            {!isBlown && (
              <motion.div
                key="candles"
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                className="absolute top-0 flex gap-4"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [40, 45, 40] }}
                    transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                    className="w-4 h-24 bg-sky-300 rounded-full relative shadow-inner"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                        rotate: [-2, 2, -2]
                      }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px]"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* The Cake Base */}
          <div className="relative mt-20">
            <div className="w-64 h-32 bg-sky-200 rounded-t-3xl shadow-xl relative overflow-hidden border-b-4 border-sky-300">
               <div className="absolute top-0 w-full h-8 bg-white/40 flex">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex-1 h-12 bg-white/40 rounded-full -mt-6"></div>
                  ))}
               </div>
            </div>
            <div className="w-72 h-4 bg-sky-400 rounded-full -mx-4 -mt-2 shadow-lg"></div>
          </div>

          {/* Blow Sensitivity Visualization */}
          {isListening && !isBlown && (
             <motion.div 
               className="absolute bottom-0 w-full h-1 bg-slate-200 rounded-full overflow-hidden"
               initial={{ width: 0 }}
               animate={{ width: '100%' }}
             >
                <motion.div 
                  className="h-full bg-sky-400"
                  animate={{ width: `${(audioLevel / 70) * 100}%` }}
                />
             </motion.div>
          )}
        </div>

        <div className="mt-16 space-x-4">
          {!isListening && !isBlown && (
            <button
              onClick={startListening}
              className="px-10 py-4 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition shadow-xl font-semibold"
            >
              Start Microphone Blow 🎤
            </button>
          )}
          
          {isBlown && (
            <button
              onClick={resetCake}
              className="px-10 py-4 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition font-semibold"
            >
              Relight Candles
            </button>
          )}
          
          {!isListening && !isBlown && (
            <button
              onClick={() => setIsBlown(true)}
              className="px-8 py-4 bg-white text-sky-600 border border-sky-200 rounded-full hover:bg-sky-50 transition font-semibold"
            >
              (I'm shy, just click)
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCake;
