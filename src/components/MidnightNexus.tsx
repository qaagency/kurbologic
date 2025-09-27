import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

interface DataColumn {
  x: number;
  speed: number;
  characters: string[];
  positions: number[];
  opacities: number[];
}

const MidnightNexus: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const isVisibleRef = useRef(true);
  
  // Animation constants for consistency across viewports
  const RAIN_COLS = 85;
  const RAIN_SPEED = 0.8;
  const RAIN_OPACITY = 0.4;
  const TRAIL_LEN = 16;
  const PARTICLES = 75;
  const PT_OPACITY = 0.32;
  const COLOR_PRIMARY = '#7a5cff';
  const COLOR_ACCENT = '#36c2ff';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let dataColumns: DataColumn[] = [];
    let time = 0;

    const resizeCanvas = () => {
      const hero = canvas.closest('.hero') as HTMLElement;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        canvas.width = Math.max(1, Math.round(rect.width));
        canvas.height = Math.max(1, Math.round(rect.height));
        initializeAnimation();
      }
    };

    const initializeAnimation = () => {
      // Initialize particles
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < Math.max(30, Math.min(particleCount, PARTICLES)); i++) {
        // Distribute particles across entire canvas with slight bias away from left on desktop
        const xBias = window.innerWidth > 1024 ? 0.3 : 0;
        const xPos = Math.random() * (canvas.width * (1 - xBias)) + (canvas.width * xBias);
        particles.push({
          x: xPos,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          opacity: Math.random() * 0.25 + 0.15,
          size: Math.random() * 2 + 1
        });
      }

      // Initialize data columns
      dataColumns = [];
      const columnSpacing = Math.max(20, canvas.width / RAIN_COLS);
      const columnCount = Math.floor(canvas.width / columnSpacing);
      const characters = '01ABCDEF◊∑∆√∫μπΩ≈≠≤≥⊂⊃∩∪∈∉∀∃λφψχω';
      
      for (let i = 0; i < columnCount; i++) {
        const characterCount = Math.floor(Math.random() * 12) + 8;
        const columnX = i * columnSpacing + (columnSpacing / 2);
        
        dataColumns.push({
          x: columnX,
          speed: (Math.random() * 0.6 + 0.3) * RAIN_SPEED,
          characters: Array.from({ length: characterCount }, () => 
            characters[Math.floor(Math.random() * characters.length)]
          ),
          positions: Array.from({ length: characterCount }, (_, index) => 
            (index / characterCount) * canvas.height - Math.random() * canvas.height
          ),
          opacities: Array.from({ length: characterCount }, () => Math.random() * 0.3 + 0.2)
        });
      }
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(11, 19, 38, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      // Draw data streams
      dataColumns.forEach((column) => {
        column.characters.forEach((char, index) => {
          // Update position
          column.positions[index] += column.speed;
          
          // Reset if off screen
          if (column.positions[index] > canvas.height + 30) {
            column.positions[index] = -30;
            column.opacities[index] = Math.random() * 0.3 + 0.2;
          }

          // Draw character
          ctx.save();
          ctx.globalAlpha = column.opacities[index] * RAIN_OPACITY;
          const hue = 250 + Math.sin(time * 0.5 + index * 0.1) * 30;
          ctx.fillStyle = `hsl(${hue}, 65%, 65%)`;
          ctx.font = `${Math.max(10, canvas.width / 120)}px monospace`;
          ctx.fillText(char, column.x, column.positions[index]);
          ctx.restore();
        });
      });

      // Draw and animate particles
      particles.forEach((particle, index) => {
        // Update position with sine wave drift
        particle.x += particle.vx + Math.sin(time * 0.3 + index * 0.1) * 0.06;
        particle.y += particle.vy + Math.cos(time * 0.3 + index * 0.15) * 0.06;

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity * PT_OPACITY * (0.9 + Math.sin(time * 0.4 + index) * 0.1);
        const particleHue = 250 + Math.sin(time * 0.7 + index * 0.2) * 40;
        ctx.fillStyle = `hsl(${particleHue}, 70%, 70%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    // Initialize
    resizeCanvas();
    
    // Use ResizeObserver on hero element for accurate sizing
    const hero = canvas.closest('.hero') as HTMLElement;
    if ('ResizeObserver' in window) {
      resizeObserverRef.current = new ResizeObserver(resizeCanvas);
      if (hero) {
        resizeObserverRef.current.observe(hero);
      }
    }
    
    // Fallback resize listener
    window.addEventListener('resize', resizeCanvas, { passive: true });
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-media"
    />
  );
};

export default MidnightNexus;