'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const loveMessages = [
  "I love you more than all the stars in the sky! ✨❤️✨",
  "Please give us another chance, Kamama 💕",
  "You're the best thing that ever happened to me! 🥰",
  "I promise to never hurt you again ❤️",
  "My heart belongs to you, now and forever 💖",
  "I can't imagine my life without you in it 💝",
  "You're my everything, my heart and soul 💓",
  "I'll spend the rest of my life making this up to you 💗"
];

export default function FinalSection() {
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);

  const handleForgiveClick = () => {
    // Show random love message
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    alert(randomMessage);
    
    // Trigger heart explosion
    setShowHeartExplosion(true);
    setTimeout(() => setShowHeartExplosion(false), 3000);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white to-red-50 text-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6 font-serif">
            I Love You More Than Words Can Say
          </h2>
          <p className="text-gray-700 mb-10 text-xl leading-relaxed max-w-2xl mx-auto">
            Kamama ❤️, I know I messed up and I can't express how sorry I am.
          </p>
          
          <motion.button
            onClick={handleForgiveClick}
            className="relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-5 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl group"
            whileHover={{ 
              background: ['linear-gradient(to right, #ef4444, #ec4899, #ef4444)']
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              PLEASE FORGIVE ME
            </span>
            <motion.span 
              className="absolute inset-0 bg-white/20"
              initial={{ width: 0, opacity: 0 }}
              whileHover={{ width: '100%', opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-red-100"
        >
          <p className="text-gray-600 mb-6 text-lg font-medium">Made with all my love for Kamama</p>
          <div className="flex justify-center space-x-3 text-3xl mb-8">
            <motion.span 
              className="text-red-400 hover:text-red-500 cursor-pointer"
              whileHover={{ scale: 1.3, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >❤️</motion.span>
            <motion.span 
              className="text-pink-400 hover:text-pink-500 cursor-pointer"
              whileHover={{ scale: 1.3, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.1 }}
            >💕</motion.span>
            <motion.span 
              className="text-red-400 hover:text-red-500 cursor-pointer"
              whileHover={{ scale: 1.3, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10, delay: 0.2 }}
            >❤️</motion.span>
          </div>
          <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white/30 shadow-sm">
            <p className="text-gray-600 italic text-lg">
              "Love is not about how many days, months, or years you have been together.
              It's about how much you love each other every single day."
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Heart Explosion Effect */}
      {showHeartExplosion && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl text-red-500"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 1000,
                y: (Math.random() - 0.5) * 1000,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 2,
                ease: 'easeOut',
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
