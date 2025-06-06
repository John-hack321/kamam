'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

const messageImages = [
  { id: 1, src: "/Pasted image (2).png" },
  { id: 2, src: "/Pasted image (3).png" },
  { id: 3, src: "/Pasted image (4).png" },
  { id: 4, src: "/Pasted image (5).png" },
  { id: 5, src: "/Pasted image (6).png" },
  { id: 6, src: "/Pasted image (7).png" },
  { id: 7, src: "/Pasted image (8).png" },
  { id: 8, src: "/Pasted image (9).png" },
  { id: 9, src: "/Pasted image (10).png" },
  { id: 10, src: "/Pasted image (11).png" },
  { id: 11, src: "/Pasted image (12).png" },
  { id: 12, src: "/Pasted image (13).png" },
  { id: 13, src: "/Pasted image (14).png" },
  { id: 14, src: "/Pasted image (15).png" },
  { id: 15, src: "/Pasted image (16).png" },
  { id: 16, src: "/Pasted image (17).png" },
  { id: 17, src: "/Pasted image (18).png" },
  { id: 18, src: "/Pasted image (19).png" },
  { id: 19, src: "/Pasted image (20).png" },
  { id: 20, src: "/Pasted image (21).png" },
  { id: 21, src: "/Pasted image (22).png" },
  { id: 22, src: "/Pasted image (23).png" }
];

const FloatingMessage = ({ img }: { img: { id: number; src: string } }) => {
  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0,
    aspectRatio: 1
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imgElement = new window.Image();
    imgElement.onload = () => {
      setDimensions({
        width: imgElement.naturalWidth,
        height: imgElement.naturalHeight,
        aspectRatio: imgElement.naturalWidth / imgElement.naturalHeight
      });
      setIsLoaded(true);
    };
    imgElement.src = img.src.startsWith('/') ? img.src : `/${img.src}`;
    
    return () => {
      imgElement.onload = null;
    };
  }, [img.src]);

  if (!isLoaded) return null;

  // Calculate dimensions to maintain aspect ratio (50% larger than before)
  const maxWidth = 300; // Increased from 200 to 300 (50% larger)
  const width = Math.min(maxWidth, dimensions.width);
  const height = width / dimensions.aspectRatio;

  const duration = 20 + Math.random() * 20;
  const delay = Math.random() * 5;
  
  const startY = typeof window !== 'undefined' ? window.innerHeight + 50 : 0;
  const endY = -height - 50;
  
  const maxX = typeof window !== 'undefined' ? window.innerWidth - width - 20 : 0;
  const xPos = Math.random() * maxX;
  
  return (
    <motion.div
      className="absolute overflow-visible z-0 pointer-events-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${xPos}px`,
        bottom: 0,
        zIndex: 1, // Ensure it's above the background but below the hero content
        rotate: `${Math.random() * 30 - 15}deg`,
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [startY, endY],
        opacity: [0, 1, 1, 0],
        x: [xPos, xPos + (Math.random() * 100 - 50)]
      }}
      transition={{
        y: {
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'linear',
        },
        opacity: {
          duration: duration * 0.3,
          times: [0, 0.1, 0.9, 1],
          repeat: Infinity,
          repeatType: 'loop',
          delay: delay,
        },
        x: {
          duration: duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      }}
    >
      <div className="w-full h-full relative group">
        <div className="relative w-full h-full">
          <Image
            src={img.src}
            alt={`Memory ${img.id}`}
            width={300}
            height={300}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 shadow-lg rounded-lg"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  // Shuffle the message images array
  const shuffledMessages = useMemo(() => {
    return [...messageImages].sort(() => Math.random() - 0.5).slice(0, 5);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden bg-gradient-to-br from-red-400 to-red-500">
      {/* Floating messages */}
      <div className="absolute inset-0 overflow-hidden">
        {shuffledMessages.map((img) => (
          <FloatingMessage key={img.id} img={img} />
        ))}
      </div>
      
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-200 text-2xl"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: '100vh',
              opacity: 0.6,
            }}
            animate={{
              y: '-100px',
              opacity: 0,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            {Math.random() > 0.5 ? '❤️' : '💕'}
          </motion.div>
        ))}
      </div>

      <div className="container  items-center flex justify-center  px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div 
            className="w-64 h-80 md:w-80 md:h-96 mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 relative bg-white/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image 
                src="/joy.png" 
                alt="Special Memory" 
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute inset-0 border-8 border-white/20 rounded-xl pointer-events-none"></div>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 mb-4">I&apos;m Sorry Kamama</h1>
          <p className="text-xl md:text-2xl text-white/90">I still need you a lot</p>
        </motion.div>
      </div>
    </section>
  );
}
