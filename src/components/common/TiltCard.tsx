import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glowColor?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scaleOnHover = 1.02,
  glowColor = 'rgba(234, 88, 12, 0.15)'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? scaleOnHover : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative ${className}`}
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 200px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 80%)`
          }}
        />
      )}
      {children}
    </motion.div>
  );
};
