import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSoundContext } from '../context/SoundContext';

const ToggleContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(247, 147, 26, 0.5);
  border: 2px solid #f7931a;
`;

const IconContainer = styled.div`
  color: #f7931a;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Sound on/off icons using SVG for better control
const SoundOnIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="#f7931a" />
    <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12Z" fill="#f7931a" />
    <path d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="#f7931a" />
  </svg>
);

const SoundOffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.34 2.93L2.93 4.34L7.29 8.7L7 9H3V15H7L12 20V13.41L16.18 17.59C15.69 17.97 15.16 18.27 14.58 18.47V20.5C15.55 20.24 16.45 19.82 17.26 19.26L19.66 21.66L21.07 20.25L4.34 2.93Z" fill="#f7931a" />
    <path d="M12 4L9.91 6.09L12 8.18V4Z" fill="#f7931a" />
    <path d="M19 12C19 12.82 18.85 13.61 18.59 14.34L20.12 15.87C20.68 14.7 21 13.39 21 12C21 7.72 18.01 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12Z" fill="#f7931a" />
    <path d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12Z" fill="#f7931a" />
  </svg>
);

const SoundToggle: React.FC = () => {
  const { isMuted, toggleMute } = useSoundContext();

  return (
    <ToggleContainer
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <IconContainer>
        {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
      </IconContainer>
    </ToggleContainer>
  );
};

export default SoundToggle;
