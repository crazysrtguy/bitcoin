import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface BrainwashingLevelProps {
  level: number;
  zombieCount: number;
  onLevelChange?: (level: number) => void;
}

const BrainwashingContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 10px;
  border: 3px solid #ff6600;
  z-index: 1000;
  text-align: center;
  min-width: 200px;
`;

const BrainwashTitle = styled.h3`
  color: #ff6600;
  margin-bottom: 10px;
  font-size: 1em;
`;

const BrainwashBar = styled.div`
  width: 100%;
  height: 20px;
  background: #333;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
  border: 2px solid #ff6600;
`;

const BrainwashProgress = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(90deg, #ff6600, #ffaa00, #ff0000);
  width: ${props => props.$level}%;
  transition: width 0.5s ease-out;
  animation: progressPulse 2s ease-in-out infinite;
`;

const BrainwashStatus = styled.div`
  font-weight: bold;
  color: #ffaa00;
  margin-top: 5px;
`;

const ZombieCounter = styled.div`
  font-size: 12px;
  color: #aaa;
  margin-top: 10px;
`;

const BrainwashingLevel: React.FC<BrainwashingLevelProps> = ({ level, zombieCount, onLevelChange }) => {
  const [status, setStatus] = useState('Normie');
  
  useEffect(() => {
    // Update status based on level
    if (level > 80) setStatus('Bitcoin Maximalist');
    else if (level > 60) setStatus('Cult Member');
    else if (level > 40) setStatus('True Believer');
    else if (level > 20) setStatus('Crypto Curious');
    else if (level > 0) setStatus('Slightly Infected');
    else setStatus('Normie');
    
    // Apply filter to body based on brainwash level
    if (level > 75) {
      document.body.style.filter = `hue-rotate(${level * 2}deg)`;
    } else {
      document.body.style.filter = 'none';
    }
    
    // Call the onLevelChange callback if provided
    if (onLevelChange) {
      onLevelChange(level);
    }
  }, [level, onLevelChange]);
  
  return (
    <BrainwashingContainer>
      <BrainwashTitle>BRAINWASHING LEVEL</BrainwashTitle>
      <BrainwashBar>
        <BrainwashProgress $level={level} />
      </BrainwashBar>
      <BrainwashStatus>{status} ({Math.round(level)}%)</BrainwashStatus>
      <ZombieCounter>
        Zombies Created: {zombieCount}
      </ZombieCounter>
    </BrainwashingContainer>
  );
};

export default BrainwashingLevel;
