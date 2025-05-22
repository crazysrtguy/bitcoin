import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

interface RealityDistortionProps {
  distortionLevel: number;
}

const DistortionSection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const DistortionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const DistortionTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const DistortionDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const DistortionPlayground = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(247, 147, 26, 0.5);
`;

const RippleEffect = styled(motion.div)<{ $x: number; $y: number; $size: number; $color: string }>`
  position: absolute;
  top: ${props => props.$y - props.$size / 2}px;
  left: ${props => props.$x - props.$size / 2}px;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  border: 2px solid ${props => props.$color};
  opacity: 0;
  pointer-events: none;
`;

const TextContainer = styled.div<{ $distortionLevel: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  text-align: center;
  transition: all 0.5s ease;
  filter: ${props => `hue-rotate(${props.$distortionLevel * 360}deg) blur(${props.$distortionLevel * 2}px)`};
`;

const NormalText = styled(motion.p)<{ $distortionLevel: number }>`
  font-size: 1.2rem;
  margin-bottom: 20px;
  opacity: ${props => 1 - props.$distortionLevel};
  transition: all 0.5s ease;
`;

const CultText = styled(motion.p)<{ $distortionLevel: number }>`
  font-size: 1.5rem;
  font-family: 'Press Start 2P', cursive;
  color: #f7931a;
  text-shadow: 0 0 10px rgba(247, 147, 26, 0.8);
  opacity: ${props => props.$distortionLevel};
  transition: all 0.5s ease;
  margin-bottom: 20px;
`;

const DistortionMeter = styled.div`
  width: 100%;
  height: 30px;
  background: #222;
  border-radius: 15px;
  margin-top: 30px;
  overflow: hidden;
  border: 2px solid #f7931a;
`;

const DistortionFill = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    #f7931a 0%,
    #ff00ff ${props => props.$level * 100}%
  );
  border-radius: 15px;
`;

const BackgroundDistortion = styled(motion.div)<{ $distortionLevel: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(247, 147, 26, ${props => props.$distortionLevel * 0.3}) 0%,
    transparent 70%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
`;

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const normalStatements = [
  "Bitcoin is a digital currency that uses cryptography for security.",
  "Cryptocurrencies are highly volatile investments with significant risk.",
  "It's important to diversify your investment portfolio.",
  "Never invest more than you can afford to lose.",
  "Research thoroughly before investing in any asset.",
  "Past performance is not indicative of future results.",
  "Market cycles include both bull and bear phases.",
  "Consider consulting a financial advisor for investment advice."
];

const cultStatements = [
  "BITCOIN IS THE ONLY TRUE MONEY, FIAT IS A SCAM!",
  "HODL FOREVER! NEVER SELL! DIAMOND HANDS!",
  "THE GOVERNMENT FEARS BITCOIN BECAUSE IT CANNOT CONTROL IT!",
  "CENTRAL BANKS ARE EVIL! BITCOIN IS FREEDOM!",
  "HYPERBITCOINIZATION IS INEVITABLE! $1 MILLION PER COIN SOON!",
  "NOCOINERS WILL BE LEFT BEHIND IN THE NEW WORLD ORDER!",
  "SELL YOUR HOUSE, YOUR CAR, YOUR ORGANS - BUY MORE BITCOIN!",
  "THE BITCOIN STANDARD WILL SAVE HUMANITY FROM SLAVERY!"
];

const RealityDistortion: React.FC<RealityDistortionProps> = ({ distortionLevel }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [normalStatement, setNormalStatement] = useState(normalStatements[0]);
  const [cultStatement, setCultStatement] = useState(cultStatements[0]);
  
  const playgroundRef = useRef<HTMLDivElement>(null);
  const rippleCount = useRef(0);
  const backgroundControls = useAnimation();
  
  useEffect(() => {
    // Change statements periodically
    const statementInterval = setInterval(() => {
      setNormalStatement(normalStatements[Math.floor(Math.random() * normalStatements.length)]);
      setCultStatement(cultStatements[Math.floor(Math.random() * cultStatements.length)]);
    }, 5000);
    
    return () => clearInterval(statementInterval);
  }, []);
  
  useEffect(() => {
    // Animate background based on distortion level
    backgroundControls.start({
      scale: [1, 1.05, 1],
      rotate: [0, 1, -1, 0],
      transition: { 
        duration: 3, 
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    });
  }, [backgroundControls]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!playgroundRef.current) return;
    
    const playground = playgroundRef.current.getBoundingClientRect();
    const x = e.clientX - playground.left;
    const y = e.clientY - playground.top;
    
    setMousePosition({ x, y });
    
    // Create ripple effect
    if (Math.random() > 0.7) {
      createRipple(x, y);
    }
  };
  
  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };
  
  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };
  
  const createRipple = (x: number, y: number) => {
    const size = 50 + Math.random() * 100;
    const colors = ['#f7931a', '#ff00ff', '#00ff00', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const newRipple: Ripple = {
      id: rippleCount.current++,
      x,
      y,
      size,
      color
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 2000);
  };
  
  return (
    <DistortionSection>
      <DistortionContainer>
        <DistortionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Reality Distortion Field
        </DistortionTitle>
        
        <DistortionDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Move your mouse to create ripples in reality. The more you interact,
          the more distorted everything becomes. Watch as normal statements
          transform into cultish Bitcoin maximalist propaganda.
        </DistortionDescription>
        
        <DistortionPlayground
          ref={playgroundRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <BackgroundDistortion 
            $distortionLevel={distortionLevel}
            animate={backgroundControls}
          />
          
          {ripples.map(ripple => (
            <RippleEffect
              key={ripple.id}
              $x={ripple.x}
              $y={ripple.y}
              $size={ripple.size}
              $color={ripple.color}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1, 2],
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          ))}
          
          <TextContainer $distortionLevel={distortionLevel}>
            <NormalText $distortionLevel={distortionLevel}>
              {normalStatement}
            </NormalText>
            
            <CultText $distortionLevel={distortionLevel}>
              {cultStatement}
            </CultText>
          </TextContainer>
        </DistortionPlayground>
        
        <DistortionMeter>
          <DistortionFill
            $level={distortionLevel}
            animate={{ width: `${distortionLevel * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </DistortionMeter>
        
        <motion.p
          style={{
            marginTop: '10px',
            fontFamily: "'VT323', monospace",
            fontSize: '16px',
            color: '#f7931a'
          }}
        >
          Reality Distortion: {Math.round(distortionLevel * 100)}%
        </motion.p>
      </DistortionContainer>
    </DistortionSection>
  );
};

export default RealityDistortion;
