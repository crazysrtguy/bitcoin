import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface RealityDistortionFieldProps {
  intensity: number;
}

const DistortionContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%), 
    rgba(255, 165, 0, var(--intensity, 0.1)) 0%, 
    rgba(255, 165, 0, calc(var(--intensity, 0.05) / 2)) 30%, 
    transparent 50%
  );
  transition: all 0.3s ease-out;
`;

const RealityDistortionField: React.FC<RealityDistortionFieldProps> = ({ intensity }) => {
  const [mousePosition, setMousePosition] = useState({ x: '50%', y: '50%' });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x: `${x}%`, y: `${y}%` });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate actual intensity based on prop (0-1 range)
  const actualIntensity = 0.1 + (intensity * 0.3);
  
  return (
    <DistortionContainer
      style={{
        '--x': mousePosition.x,
        '--y': mousePosition.y,
        '--intensity': actualIntensity
      } as React.CSSProperties}
    />
  );
};

export default RealityDistortionField;
