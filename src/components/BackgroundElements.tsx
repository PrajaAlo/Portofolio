import { motion } from 'motion/react';

export function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Background gradient */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Chromatic Bubble Ring 1 - Bottom Left */}
      <motion.div 
        animate={{ 
          rotate: [0, 180, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-15%] left-[-10%] w-[50vw] max-w-[700px] aspect-square rounded-full opacity-60"
        style={{
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: `
            inset 30px 0 60px -10px rgba(139, 92, 246, 0.4),   /* Purple */
            inset -30px 0 60px -10px rgba(59, 130, 246, 0.4),  /* Blue */
            inset 0 30px 60px -10px rgba(236, 72, 153, 0.4),   /* Pink */
            inset 0 -30px 60px -10px rgba(14, 165, 233, 0.4),  /* Cyan */
            0 0 30px rgba(139, 92, 246, 0.1)
          `
        }}
      />

      {/* Chromatic Bubble Ring 2 - Top Right */}
      <motion.div 
        animate={{ 
          rotate: [360, 180, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-15%] w-[60vw] max-w-[800px] aspect-square rounded-full opacity-50"
        style={{
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: `
            inset 40px 0 70px -10px rgba(244, 63, 94, 0.3),    /* Rose */
            inset -40px 0 70px -10px rgba(168, 85, 247, 0.3),  /* Purple */
            inset 0 40px 70px -10px rgba(56, 189, 248, 0.3),   /* Light Blue */
            inset 0 -40px 70px -10px rgba(250, 204, 21, 0.2),  /* Yellow */
            0 0 40px rgba(168, 85, 247, 0.1)
          `
        }}
      />
      
      {/* Chromatic Bubble Ring 3 - Center */}
      <motion.div 
        animate={{ 
          rotate: [0, -90, -180, -270, -360],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[35%] left-[55%] w-[25vw] max-w-[350px] aspect-square rounded-full opacity-40"
        style={{
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: `
            inset 20px 0 40px -5px rgba(16, 185, 129, 0.4),     /* Emerald */
            inset -20px 0 40px -5px rgba(139, 92, 246, 0.4),    /* Purple */
            inset 0 20px 40px -5px rgba(236, 72, 153, 0.4),     /* Pink */
            inset 0 -20px 40px -5px rgba(59, 130, 246, 0.4),    /* Blue */
            0 0 30px rgba(16, 185, 129, 0.1)
          `
        }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
        }} 
      />
      
      {/* Subtle glows behind rings */}
      <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] w-[25vw] h-[25vw] rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />
    </div>
  );
}
