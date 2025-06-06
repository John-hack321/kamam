'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

interface MessageImage {
  id: number;
  src: string;
  position: {
    top: string;
    left?: string;
    right?: string;
    width: string;
    height: string;
  };
  rotation?: number;
  zIndex?: number;
}

const messageImages: MessageImage[] = [
  { 
    id: 1, 
    src: "/Pasted image (2).png",
    position: { top: '5%', left: '5%', width: '180px', height: '240px' },
    rotation: -5,
    zIndex: 1
  },
  { 
    id: 2, 
    src: "/Pasted image (3).png",
    position: { top: '15%', right: '8%', width: '200px', height: '260px' },
    rotation: 3,
    zIndex: 2
  },
  { 
    id: 3, 
    src: "/Pasted image (4).png",
    position: { top: '35%', left: '10%', width: '190px', height: '250px' },
    rotation: -2,
    zIndex: 1
  },
  { 
    id: 4, 
    src: "/Pasted image (5).png",
    position: { top: '50%', right: '5%', width: '210px', height: '280px' },
    rotation: 4,
    zIndex: 2
  },
  { 
    id: 5, 
    src: "/Pasted image (6).png",
    position: { top: '65%', left: '8%', width: '200px', height: '270px' },
    rotation: -3,
    zIndex: 1
  },
  { 
    id: 6, 
    src: "/Pasted image (7).png",
    position: { top: '75%', right: '10%', width: '190px', height: '250px' },
    rotation: 2,
    zIndex: 2
  },
  { 
    id: 7, 
    src: "/Pasted image (8).png",
    position: { top: '20%', left: '60%', width: '200px', height: '270px' },
    rotation: -4,
    zIndex: 1
  },
  { 
    id: 8, 
    src: "/Pasted image (9).png",
    position: { top: '70%', left: '45%', width: '220px', height: '290px' },
    rotation: 3,
    zIndex: 2
  },
  // Additional images for more variety
  { 
    id: 9, 
    src: "/Pasted image (10).png",
    position: { top: '10%', right: '60%', width: '190px', height: '250px' },
    rotation: -2,
    zIndex: 1
  },
  { 
    id: 10, 
    src: "/Pasted image (11).png",
    position: { top: '80%', left: '65%', width: '200px', height: '270px' },
    rotation: 4,
    zIndex: 2
  }
];

const FloatingImage = ({ img }: { img: MessageImage }) => {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ 
    width: 0, 
    height: 0,
    aspectRatio: 1
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Preload image to get its dimensions
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

  if (!mounted || !isLoaded) return null;

  // Calculate dimensions to maintain aspect ratio (50% larger than before)
  const maxWidth = 300; // Increased from 200 to 300 (50% larger)
  const width = Math.min(maxWidth, dimensions.width);
  const height = width / dimensions.aspectRatio;

  const duration = 20 + Math.random() * 20; // 20-40 seconds for slower movement
  const delay = Math.random() * 5; // 0-5 seconds
  
  // Calculate start and end positions
  const startY = typeof window !== 'undefined' ? window.innerHeight + 50 : 0;
  const endY = -height - 50; // Stop before reaching the top
  
  // Calculate horizontal position
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
        zIndex: 0,
        rotate: `${Math.random() * 30 - 15}deg`, // Random rotation between -15 and 15 degrees
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [startY, endY],
        opacity: [0, 1, 1, 0],
        x: [xPos, xPos + (Math.random() * 100 - 50)] // Slight horizontal movement
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
        <Image
          src={img.src.startsWith('/') ? img.src : `/${img.src}`}
          alt={`Memory ${img.id}`}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-110 shadow-lg rounded-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}
          sizes="(max-width: 768px) 100vw, 300px"
          priority={false}
        />
      </div>
    </motion.div>
  );
};

export default function ApologyCard() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const imageElements = useMemo(() => {
    if (!mounted) return [];
    
    return messageImages.map((img) => (
      <FloatingImage key={img.id} img={img} />
    ));
  }, [mounted]);

  return (
    <section className="relative min-h-[150vh] flex items-start justify-center py-20 p-4 md:p-12 overflow-hidden bg-gradient-to-br from-red-400 to-red-500">
      {/* Background images - these will float up from the bottom */}
      <div className="absolute inset-0 overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
        {mounted && imageElements}
      </div>

      {/* Main Apology Card */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-visible border-2 border-white/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="p-8 md:p-16 space-y-16">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-16 text-center font-serif">I Miss You Kamama</h2>
          <div className="space-y-12 text-gray-800 text-xl md:text-2xl leading-relaxed font-medium">
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">I miss my baby, kamama, I&apos;m sorry for being selfish, it was not okay for me to just do what I did without considering how you would feel about it, that was selfish.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">Na pia I totally respect your decision, whatever you decide to do I will be okay with it, but pia usiache everything that we have worked for to go in vain.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">I know I&apos;m difficult to deal with and I have a lot of personality and also a weirdo but can you please give this a second chance. Give us a second chance, let&apos;s start from the top again, and I know nothing is ever the same twice, even finding someone in the same person twice is also not possible at times but can we give this try again.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">Nimemiss kuitwa kababa, so do something about it, but its up to you. You can take as long as you want ata kama ni a whole year, I will be here waiting for you, but again its up to you, ka unaona we go back to being strangers na kupitana like we never knew each other pia ni sawa.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">Though sincerely I don&apos;t know why I ran into that decision in the first place, I guess again it was my sub-conscious doing its thing once more, but we whatever utaamua kamama I will be okay with it.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">Na najua hapa pia there might be typos kwa hii webiste because I&apos;ve tried to build this website as fast as possible but at least imekufikia , that&apos;s what matters.</p>
            </div>
            
            <div className="space-y-8">
              <p className="bg-white/30 p-6 rounded-lg backdrop-blur-sm shadow-sm">Me I still love you, and I&apos;m here waiting for you, you take all the time you need.</p>
            </div>
            
            <p className="text-right mt-8 text-2xl font-bold text-red-600">Bye. Take care.</p>
          </div>
          
          <div className="flex justify-center mt-16 mb-8">
            <motion.div
              className="w-16 h-16 bg-red-500/90 rounded-full flex items-center justify-center text-white shadow-lg"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse' 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
