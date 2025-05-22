import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

// Animations
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const JustifierSection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a, #1a0033);
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const JustifierContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const JustifierTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const JustifierDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const HypnoticContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HypnoticCircle = styled(motion.div)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: conic-gradient(
    #f7931a, #ff6600, #ff3300, #ff0066, #cc00ff, #6600ff, #0066ff, #00ccff, #00ffcc, #00ff66, #33ff00, #f7931a
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 0 50px rgba(247, 147, 26, 0.5);
  animation: ${rotate} 10s linear infinite;
  
  &::before {
    content: '';
    position: absolute;
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: conic-gradient(
      #f7931a, #ff6600, #ff3300, #ff0066, #cc00ff, #6600ff, #0066ff, #00ccff, #00ffcc, #00ff66, #33ff00, #f7931a
    );
    animation: ${rotate} 7s linear infinite reverse;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: conic-gradient(
      #f7931a, #ff6600, #ff3300, #ff0066, #cc00ff, #6600ff, #0066ff, #00ccff, #00ffcc, #00ff66, #33ff00, #f7931a
    );
    animation: ${rotate} 5s linear infinite;
  }
`;

const BitcoinLogo = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: #f7931a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: white;
  z-index: 10;
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::before {
    content: '₿';
  }
`;

const PriceInputContainer = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceSlider = styled.input`
  width: 80%;
  max-width: 500px;
  margin: 20px 0;
  -webkit-appearance: none;
  height: 15px;
  border-radius: 10px;
  background: linear-gradient(90deg, #f7931a, #ff0066, #6600ff);
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f7931a;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(247, 147, 26, 0.8);
  }
  
  &::-moz-range-thumb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f7931a;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(247, 147, 26, 0.8);
  }
`;

const PriceDisplay = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #f7931a;
  margin: 10px 0 30px;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 0 10px rgba(247, 147, 26, 0.5);
`;

const BrainwashButton = styled(motion.button)`
  background: linear-gradient(45deg, #f7931a, #ff3300);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-family: 'Press Start 2P', cursive;
  border-radius: 50px;
  cursor: pointer;
  margin: 20px 0;
  box-shadow: 0 0 20px rgba(247, 147, 26, 0.5);
  
  &:hover {
    background: linear-gradient(45deg, #ff3300, #ff0066);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const JustificationContainer = styled(motion.div)`
  margin-top: 40px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  border: 2px solid #f7931a;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const JustificationTitle = styled.h3`
  color: #f7931a;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

const JustificationList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: left;
`;

const JustificationItem = styled(motion.li)`
  margin: 15px 0;
  padding: 15px;
  background: rgba(247, 147, 26, 0.1);
  border-left: 3px solid #f7931a;
  font-size: 1.1rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SubliminalMessage = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  opacity: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
`;

const BitcoinJustifier: React.FC = () => {
  const [targetPrice, setTargetPrice] = useState(100000);
  const [justifications, setJustifications] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [brainwashLevel, setBrainwashLevel] = useState(0);
  const [subliminalMessages, setSubliminalMessages] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [messageCounter, setMessageCounter] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const justificationControls = useAnimation();
  
  // Sound effects
  const brainwashSound = new Howl({
    src: ['/brainwash.mp3'],
    volume: 0.5,
    preload: true,
    onloaderror: (id, error) => console.error("Error loading brainwash sound:", error)
  });
  
  // Generate justifications based on target price
  const generateJustifications = () => {
    setIsGenerating(true);
    brainwashSound.play();
    
    // Start showing subliminal messages
    const subliminalInterval = setInterval(() => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        
        const newMessage = {
          id: messageCounter,
          text: ["BUY BITCOIN", "HODL", "MOON SOON", "FIAT IS TRASH", "BITCOIN IS FREEDOM"][Math.floor(Math.random() * 5)],
          x: Math.random() * (width - 200),
          y: Math.random() * (height - 100)
        };
        
        setSubliminalMessages(prev => [...prev, newMessage]);
        setMessageCounter(prev => prev + 1);
        
        // Remove message after a short time
        setTimeout(() => {
          setSubliminalMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
        }, 200);
      }
    }, 300);
    
    // Generate justifications after a delay
    setTimeout(() => {
      const priceFormatted = targetPrice.toLocaleString();
      
      const newJustifications = [
        `Bitcoin will reach $${priceFormatted} because of its limited supply of 21 million coins.`,
        `$${priceFormatted} is inevitable due to institutional adoption and the collapse of fiat currencies.`,
        `When you consider hyperinflation, $${priceFormatted} Bitcoin is actually conservative.`,
        `The charts clearly show a cup and handle formation pointing to $${priceFormatted}.`,
        `My technical analysis confirms $${priceFormatted} by end of year.`,
        `Bitcoin's S2F model predicts $${priceFormatted} in the next cycle.`,
        `As governments print more money, Bitcoin will reach $${priceFormatted} as a hedge against inflation.`,
        `When Bitcoin replaces gold, each coin will be worth at least $${priceFormatted}.`,
        `The elite don't want you to know that Bitcoin will hit $${priceFormatted} soon.`,
        `$${priceFormatted} is FUD. The real target is $${(targetPrice * 10).toLocaleString()}.`
      ];
      
      setJustifications(newJustifications);
      setIsGenerating(false);
      setBrainwashLevel(prev => Math.min(prev + 20, 100));
      
      // Animate justifications
      justificationControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      });
      
      // Clear subliminal message interval
      clearInterval(subliminalInterval);
    }, 3000);
  };
  
  return (
    <JustifierSection>
      <JustifierContainer ref={containerRef}>
        <JustifierTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Bitcoin Price Justification Machine
        </JustifierTitle>
        
        <JustifierDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Generate bulletproof arguments for any Bitcoin price target. Convince yourself and others that your price prediction is based on "facts" and "logic".
        </JustifierDescription>
        
        <HypnoticContainer>
          <HypnoticCircle>
            <BitcoinLogo />
          </HypnoticCircle>
          
          <PriceInputContainer>
            <label htmlFor="price-slider" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              Select Your Target Bitcoin Price:
            </label>
            <PriceSlider
              id="price-slider"
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
            />
            <PriceDisplay>${targetPrice.toLocaleString()}</PriceDisplay>
          </PriceInputContainer>
          
          <BrainwashButton
            onClick={generateJustifications}
            disabled={isGenerating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? "BRAINWASHING IN PROGRESS..." : "GENERATE JUSTIFICATIONS"}
          </BrainwashButton>
          
          {brainwashLevel > 0 && (
            <div style={{ marginTop: '20px' }}>
              <p>Brainwashing Level: {brainwashLevel}%</p>
              <div style={{ 
                width: '100%', 
                height: '10px', 
                background: '#333', 
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${brainwashLevel}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #f7931a, #ff0066)',
                  transition: 'width 0.5s ease-in-out'
                }} />
              </div>
              {brainwashLevel >= 100 && (
                <p style={{ color: '#f7931a', marginTop: '10px' }}>
                  BRAINWASHING COMPLETE! YOU ARE NOW A BITCOIN MAXIMALIST!
                </p>
              )}
            </div>
          )}
        </HypnoticContainer>
        
        {justifications.length > 0 && (
          <JustificationContainer
            initial={{ opacity: 0, y: 50 }}
            animate={justificationControls}
          >
            <JustificationTitle>Your Bitcoin Price Justifications:</JustificationTitle>
            <JustificationList>
              {justifications.map((text, index) => (
                <JustificationItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {text}
                </JustificationItem>
              ))}
            </JustificationList>
          </JustificationContainer>
        )}
        
        {/* Subliminal Messages */}
        {subliminalMessages.map(message => (
          <SubliminalMessage
            key={message.id}
            style={{ left: message.x, top: message.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.2 }}
          >
            {message.text}
          </SubliminalMessage>
        ))}
      </JustifierContainer>
    </JustifierSection>
  );
};

export default BitcoinJustifier;
