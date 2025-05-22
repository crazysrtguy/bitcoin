import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Styled components
const PopupContainer = styled(motion.div)<{ $x: number; $y: number; $severity: number }>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background: ${props => {
    switch(props.$severity) {
      case 3: return 'linear-gradient(135deg, #ff0000, #990000)';
      case 2: return 'linear-gradient(135deg, #ff6600, #cc3300)';
      default: return 'linear-gradient(135deg, #ffcc00, #ff9900)';
    }
  }};
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  font-family: 'VT323', monospace;
  font-size: 20px;
  font-weight: bold;
  box-shadow: ${props => {
    switch(props.$severity) {
      case 3: return '0 0 25px rgba(255, 0, 0, 0.8)';
      case 2: return '0 0 20px rgba(255, 102, 0, 0.7)';
      default: return '0 0 15px rgba(255, 204, 0, 0.6)';
    }
  }};
  z-index: 999; /* Make sure popups are on top */
  max-width: 300px;
  text-align: center;
  pointer-events: auto;
  border: 3px solid white;
  position: relative;
  transform-origin: center center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  color: #ff0000;
  border: 2px solid #ff0000;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0;
  line-height: 1;

  &:hover {
    background: #ff0000;
    color: white;
  }
`;

// Messages that try to convince the user to release
const popupMessages = [
  {
    text: "SELL NOW BEFORE IT'S TOO LATE!",
    severity: 1
  },
  {
    text: "CLICK HERE FOR A FREE TESLA!",
    severity: 1
  },
  {
    text: "YOUR FINGER MUST BE TIRED!",
    severity: 1
  },
  {
    text: "BITCOIN IS CRASHING! SELL SELL SELL!",
    severity: 2
  },
  {
    text: "RELEASE TO CLAIM 10 FREE BITCOINS!",
    severity: 2
  },
  {
    text: "YOUR EXCHANGE IS BEING RAIDED BY THE FBI!",
    severity: 2
  },
  {
    text: "EMERGENCY: RELEASE IMMEDIATELY!",
    severity: 3
  },
  {
    text: "BITCOIN NETWORK COMPROMISED!",
    severity: 3
  },
  {
    text: "SATOSHI JUST SOLD ALL HIS COINS!",
    severity: 3
  },
  {
    text: "RELEASE OR LOSE EVERYTHING!",
    severity: 3
  }
];

interface PopupProps {
  isHolding: boolean;
  gameActive: boolean;
}

interface PopupItem {
  id: number;
  text: string;
  severity: number;
  x: number;
  y: number;
}

const DiamondHandsPopup: React.FC<PopupProps> = ({ isHolding, gameActive }) => {
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [counter, setCounter] = useState(0);

  // Create a popup when holding
  useEffect(() => {
    if (!isHolding || !gameActive) {
      // Clear popups when not holding
      setPopups([]);
      return;
    }

    // Create initial popup
    createPopup();

    // Set interval to create popups - more frequently
    const interval = setInterval(() => {
      if (isHolding && gameActive) {
        createPopup();
      }
    }, 600); // Faster popup generation

    return () => {
      clearInterval(interval);
    };
  }, [isHolding, gameActive]);

  const createPopup = () => {
    // Limit number of popups
    if (popups.length >= 5) {
      setPopups(prev => prev.slice(1));
    }

    // Get random message
    const randomMessage = popupMessages[Math.floor(Math.random() * popupMessages.length)];

    // Get the center of the screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Generate position close to the center (where the diamond button is)
    // Use a radius of 100-300px from the center
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = 100 + Math.random() * 200; // Distance from center (100-300px)

    // Calculate position using polar coordinates
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    // Ensure popup is fully visible on screen
    const safeX = Math.max(50, Math.min(window.innerWidth - 250, x));
    const safeY = Math.max(50, Math.min(window.innerHeight - 100, y));

    console.log("Creating popup at position:", safeX, safeY);

    // Create popup
    const newPopup: PopupItem = {
      id: counter,
      text: randomMessage.text,
      severity: randomMessage.severity,
      x: safeX,
      y: safeY
    };

    // Add to list
    setPopups(prev => [...prev, newPopup]);
    setCounter(prev => prev + 1);

    // Auto-remove after delay
    setTimeout(() => {
      setPopups(prev => prev.filter(p => p.id !== newPopup.id));
    }, 3000);
  };

  const closePopup = (id: number) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AnimatePresence>
      {popups.map(popup => (
        <PopupContainer
          key={popup.id}
          $x={popup.x}
          $y={popup.y}
          $severity={popup.severity}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            rotate: popup.severity > 1 ? [-3, 3, -3, 3, 0] : 0
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.5,
            scale: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8
            },
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.5
            }
          }}
          whileHover={{ scale: 1.2 }}
        >
          {popup.text}
          <CloseButton onClick={() => closePopup(popup.id)}>✕</CloseButton>
        </PopupContainer>
      ))}
    </AnimatePresence>
  );
};

export default DiamondHandsPopup;
