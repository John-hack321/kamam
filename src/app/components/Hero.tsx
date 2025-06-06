'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden bg-gradient-to-br from-red-400 to-red-500 -mt-20 pt-20">
      {/* Floating hearts background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 text-3xl"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: '100vh',
              opacity: 0.8,
              scale: 0.5,
            }}
            animate={{
              y: '-100vh',
              opacity: [0.8, 0.5, 0],
              scale: [0.5, 1, 1.5],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? '❤️' : '💕'}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto items-center flex justify-center  px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-64 h-80 md:w-80 md:h-96 mb-20 ml-60 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 relative">
            <div className="absolute inset-0 bg-red-300 flex items-center justify-center text-white text-lg">
              <Image src="/joy.png" alt="Joy" width={200} height={200} className="object-cover" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">I&apos;m Sorry Kamama</h1>
          <p className="text-xl md:text-2xl text-white/90">I still need you a lot</p>
        </motion.div>
      </div>
    </section>
  );
}
