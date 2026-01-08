
import React from 'react';
import { motion } from 'framer-motion';
import { BirthdayWish } from '../types';

interface WishCardProps {
  wish: BirthdayWish | null;
  loading: boolean;
  onRefresh: () => void;
}

const WishCard: React.FC<WishCardProps> = ({ wish, loading, onRefresh }) => {
  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-glass rounded-[40px] p-8 md:p-16 shadow-2xl border border-white/50 relative"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 p-8">
            <i className="fas fa-quote-right text-sky-100 text-8xl -z-10"></i>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-6">
              <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sky-500 font-medium animate-pulse">Consulting the magic mirrors...</p>
            </div>
          ) : (
            <div className="space-y-8 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-800 leading-tight">
                {wish?.title}
              </h2>
              <div className="w-20 h-1 bg-sky-400 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed font-light italic">
                "{wish?.message}"
              </p>
              <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
                <p className="text-sky-600 font-semibold text-lg md:text-xl">
                  {wish?.wittyRemark}
                </p>
                <button
                  onClick={onRefresh}
                  className="px-8 py-3 bg-slate-900 text-white rounded-full hover:bg-sky-600 transition-colors duration-300 flex items-center gap-2 group shadow-lg"
                >
                  <i className="fas fa-redo-alt group-hover:rotate-180 transition-transform duration-500"></i>
                  Another Wish
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-pink-100 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-sky-100 rounded-full blur-[100px] opacity-60"></div>
    </section>
  );
};

export default WishCard;
