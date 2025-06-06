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
    <section className="relative py-20 px-4 bg-white text-center overflow-hidden">
      <div className="relative z-10 container mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16"
        >
          <div className="mb-12">
            <motion.div 
              className="w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center text-4xl text-red-500"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 4, repeat: Infinity }
              }}
            >
              ❤️
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              I Miss You
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Every moment without you feels incomplete. You&apos;re always in my thoughts.
            </p>
          </div>
          
          <motion.button
            onClick={handleForgiveClick}
            className="relative overflow-hidden bg-red-500 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-lg group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              I Miss You
            </span>
          </motion.button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-12 mt-16 border-t border-gray-100"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center space-x-4 text-2xl">
              <span className="text-red-400">❤️</span>
              <span className="text-pink-400">💕</span>
              <span className="text-red-400">❤️</span>
            </div>
            
            <div className="pt-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Made with love
              </p>
            </div>
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
