import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

export const HeroEyeGraphic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Motion values for smooth 3D physics tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, physics-based rotation
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [24, -24]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), springConfig);
  const scale = useSpring(isInteracting ? 1.05 : 1, springConfig);
  const glareOpacity = useSpring(isInteracting ? 0.75 : 0.25, springConfig);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  // Handle pointer/mouse move (Desktop)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || isSpinning) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    setIsInteracting(true);
  }, [isSpinning, mouseX, mouseY]);

  // Handle touch move (Mobile)
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || isSpinning || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const clampedY = Math.max(-0.5, Math.min(0.5, y));
    mouseX.set(clampedX);
    mouseY.set(clampedY);
    setIsInteracting(true);
  }, [isSpinning, mouseX, mouseY]);

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Device orientation / Gyroscope tilt on Mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (isInteracting || isSpinning) return;
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.max(-0.5, Math.min(0.5, (e.gamma / 45) * 0.5));
        const y = Math.max(-0.5, Math.min(0.5, ((e.beta - 45) / 45) * 0.5));
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    if (window.DeviceOrientationEvent && typeof (window.DeviceOrientationEvent as any).requestPermission !== 'function') {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isInteracting, isSpinning, mouseX, mouseY]);

  // Tap/Click 3D Spin celebration burst
  const handleMedallionTap = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.4 },
        colors: ['#ea580c', '#f59e0b', '#fbbf24', '#ffffff']
      });
    } catch (e) {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handleInteractionEnd}
      onTouchStart={() => setIsInteracting(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
      className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-square mx-auto flex items-center justify-center select-none touch-none"
      style={{ perspective: 1200 }}
    >
      
      {/* Outer Glowing Atmospheric Radial Halos */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-orange-500/30 via-amber-400/25 to-yellow-300/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute inset-8 rounded-full bg-radial from-orange-500/20 to-transparent blur-2xl pointer-events-none" />

      {/* Layer 1: Outer Rotating Golden Orbital Track */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-2 sm:inset-3 rounded-full border-2 border-dashed border-orange-400/40 pointer-events-none"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-20px)' }}
      />

      {/* Layer 2: Counter-Rotating Optical Reticle Track with Cardinal Crosshairs */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-7 sm:inset-9 rounded-full border border-amber-300/50 pointer-events-none"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-10px)' }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-400" />
        <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-500" />
      </motion.div>

      {/* Layer 3: 3D Interactive Float & Tilt Medallion */}
      <motion.div
        onClick={handleMedallionTap}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        animate={isSpinning ? { rotateY: [0, 360, 720] } : (isInteracting ? {} : { y: [-8, 8, -8] })}
        transition={
          isSpinning 
            ? { duration: 1.2, ease: 'easeInOut' }
            : { y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }
        }
        className="relative z-20 w-[82%] h-[82%] rounded-full p-3 sm:p-4 bg-gradient-to-tr from-amber-400/40 via-orange-500/35 to-amber-200/50 backdrop-blur-xl border-2 border-orange-300/80 shadow-2xl shadow-orange-500/35 cursor-grab active:cursor-grabbing transform-gpu flex items-center justify-center transition-shadow duration-300 hover:shadow-orange-500/50"
      >
        {/* Holographic Specular Glare Effect */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div 
            className="w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-transparent via-white/40 to-transparent blur-md"
            style={{
              left: glareX,
              top: glareY
            }}
          />
        </motion.div>

        {/* Inner Porcelain Medallion Core */}
        <div 
          className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-white/95 via-orange-50/80 to-white/95 shadow-inner border border-white/90 relative"
          style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
        >
          {/* Subtle Golden Radial Flare Background */}
          <div className="absolute inset-0 bg-radial from-amber-200/40 via-orange-100/20 to-transparent pointer-events-none" />

          {/* 3D Elevated Sacred Emblem (Pops out in 3D Space) */}
          <motion.div
            className="w-full h-full flex items-center justify-center relative z-10 filter drop-shadow-2xl"
            style={{ transform: 'translateZ(45px)' }}
          >
            <img
              src="/assets/images/sankara-sacred-eye-logo.png"
              alt="Sankara Eye Hospital Sacred 3D Emblem"
              className="w-full h-full object-contain filter drop-shadow-xl scale-110 pointer-events-none transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/images/sankara-50-years-medallion.png';
              }}
            />
          </motion.div>
        </div>

      </motion.div>

    </div>
  );
};
