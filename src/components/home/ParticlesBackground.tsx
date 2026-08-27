import React, { useEffect, useRef } from 'react';

export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Particle Configuration (particles.js repulse mode)
    const count = Math.min(Math.floor(window.innerWidth / 15), 90);
    const maxLinkDistance = 135;
    const repulseRadius = 160;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      originalVx: number;
      originalVy: number;
      radius: number;
      color: string;
      baseAlpha: number;
    }

    const brandColors = [
      '#EA580C', // Saffron / Orange-600
      '#F97316', // Orange-500
      '#F59E0B', // Amber-500
      '#D97706', // Amber-600
      '#EA580C', // Orange-600
      '#64748B'  // Slate-500 accent
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 0.9;
      const vy = (Math.random() - 0.5) * 0.9;
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || 600),
        vx,
        vy,
        originalVx: vx,
        originalVy: vy,
        radius: Math.random() * 2.2 + 1.6,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        baseAlpha: Math.random() * 0.4 + 0.45
      });
    }

    // Mouse Tracking for Repulsion
    const mouse = {
      x: -1000,
      y: -1000,
      radius: repulseRadius,
      isActive: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Push / Repulse shockwave on click
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = clickX - p.x;
        const dy = clickY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220 && dist > 0) {
          const force = (220 - dist) / 220;
          p.vx -= (dx / dist) * force * 6;
          p.vy -= (dy / dist) * force * 6;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Animation Loop
    const render = () => {
      if (!ctx || width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update and Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Repulsion physics from mouse cursor
        if (mouse.isActive) {
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < mouse.radius && distMouse > 0) {
            // Push particles away smoothly (particles.js repulse formula)
            const force = (mouse.radius - distMouse) / mouse.radius;
            const repulseFactor = force * 4.5;
            p.x -= (dxMouse / distMouse) * repulseFactor;
            p.y -= (dyMouse / distMouse) * repulseFactor;
          }
        }

        // Return velocity smoothly towards original drift speed
        p.vx += (p.originalVx - p.vx) * 0.04;
        p.vy += (p.originalVy - p.vy) * 0.04;

        // Move by velocity
        p.x += p.vx;
        p.y += p.vy;

        // Bounce smoothly on canvas boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; p.originalVx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; p.originalVx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; p.originalVy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; p.originalVy *= -1; }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // 2. Draw Inter-Particle Connecting Network Lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            const lineAlpha = (1 - dist / maxLinkDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#F97316';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
};
