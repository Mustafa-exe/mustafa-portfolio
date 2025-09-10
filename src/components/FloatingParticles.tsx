import React from 'react';

const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 12,
    duration: Math.random() * 8 + 8,
    color: [
      'rgba(59, 130, 246, 0.4)',
      'rgba(139, 92, 246, 0.4)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(251, 146, 60, 0.4)',
      'rgba(34, 197, 94, 0.4)',
      'rgba(6, 182, 212, 0.4)',
    ][Math.floor(Math.random() * 6)]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Epic gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 gradient-rotate"
           style={{
             background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(139,92,246,0.2) 50%, transparent 70%)',
             filter: 'blur(40px)',
           }} />
      
      <div className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-25 gradient-rotate"
           style={{
             background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(251,146,60,0.2) 50%, transparent 70%)',
             filter: 'blur(35px)',
             animationDelay: '5s',
           }} />
      
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-20 pulse-epic"
           style={{
             background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)',
             filter: 'blur(30px)',
             transform: 'translate(-50%, -50%)',
           }} />
    </div>
  );
};

export default FloatingParticles;
