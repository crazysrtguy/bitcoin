import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSoundContext } from '../context/SoundContext';

interface WarningModalProps {
  onClose: () => void;
}

const Warning = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  color: #ff0000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  text-align: center;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #ff6600;
  }

  p {
    max-width: 600px;
    margin-bottom: 20px;
    line-height: 1.6;
  }

  button {
    background: linear-gradient(45deg, #ff6600, #cc3300);
    color: white;
    border: none;
    padding: 15px 30px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    border-radius: 10px;
    margin: 20px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 102, 0, 0.5);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 102, 0, 0.8);
    }
  }
`;

const WarningModal: React.FC<WarningModalProps> = ({ onClose }) => {
  const { playBackgroundMusic } = useSoundContext();

  const handleEnterClick = () => {
    // Start playing the background music
    console.log("Starting background music...");
    playBackgroundMusic();
    console.log("Background music started");

    // Close the warning modal
    onClose();
  };

  return (
    <Warning
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>⚠️ SEIZURE WARNING ⚠️</h2>
      <p>
        This website contains flashing lights, rapid movements, and other effects that may trigger seizures in people with photosensitive epilepsy. Viewer discretion is advised.
      </p>
      <p>
        This is a satirical website. Nothing here constitutes financial advice. BITCOIN is a fictional memecoin that doesn't exist.
      </p>
      <button onClick={handleEnterClick}>
        I UNDERSTAND THE RISKS AND WANT TO ENTER THE CULT
      </button>
    </Warning>
  );
};

export default WarningModal;
