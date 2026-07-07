import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', () => setClicking(true));
    window.addEventListener('mouseup', () => setClicking(false));

    // Detect hover over interactive elements
    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest('a, button, [role="button"]'));
    };
    window.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', () => setClicking(true));
      window.removeEventListener('mouseup', () => setClicking(false));
      window.removeEventListener('mouseover', handleOver);
    };
  }, []);

  // Smooth trail with requestAnimationFrame
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [pos]);

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-electric-cyan transition-all duration-150 ${
            clicking ? 'w-2 h-2 opacity-100' : hovering ? 'w-3 h-3 opacity-90' : 'w-2 h-2 opacity-80'
          }`}
        />
      </div>

      {/* Ring — follows with lag */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: trail.x,
          top: trail.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border border-electric-cyan/50 transition-all duration-200 ${
            clicking ? 'w-6 h-6 opacity-30' : hovering ? 'w-10 h-10 border-electric-cyan opacity-60' : 'w-8 h-8 opacity-30'
          }`}
        />
      </div>
    </>
  );
}
