import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

interface ZombieHordeProps {
  brainwashLevel?: number;
  onZombieCreated?: () => void;
}

interface ZombieType {
  id: number;
  x: number;
  y: number;
  emoji: string;
  phrase: string | null;
  showPhrase: boolean;
}

const ZombieSection = styled(motion.section)`
  min-height: 500px;
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.8);
  padding: 40px 0;
  border: 3px solid #ff6600;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
  backdrop-filter: blur(10px);
  margin: 60px 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><text x="50" y="100" font-size="50" opacity="0.05" fill="orange">₿</text></svg>');
    opacity: 0.1;
    pointer-events: none;
    animation: backgroundScroll 30s linear infinite;
  }

  @keyframes backgroundScroll {
    from { background-position: 0 0; }
    to { background-position: 200px 200px; }
  }
`;

const ZombieContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const ZombieTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #ff6600;
  text-shadow: 0 0 10px #ff6600, 0 0 20px #ff6600;
  font-size: 2.5em;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #ff6600, transparent);
  }
`;

const ZombieDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #ffaa00;
  text-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
`;

const ZombiePlayground = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 500px; /* Increased height for more space */
  border: 3px solid #ff6600;
  background: radial-gradient(circle, rgba(0,0,0,0.9) 0%, rgba(51,0,51,0.9) 100%);
  box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
  overflow: hidden;
  cursor: none;
  border-radius: 15px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="30" y="50" font-size="30" opacity="0.05" fill="orange">₿</text></svg>');
    opacity: 0.1;
    pointer-events: none;
  }
`;

const BitcoinCursor = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, #ff6600, #ffaa00);
  border-radius: 50%;
  position: absolute;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  box-shadow: 0 0 30px rgba(255, 102, 0, 0.8);

  &:before {
    content: '₿';
    color: #000;
    font-weight: bold;
    font-size: 28px;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }

  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px solid #ffaa00;
    border-radius: 50%;
    opacity: 0.5;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.2; }
  }
`;

const Zombie = styled(motion.div)`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  z-index: 5;
  filter: drop-shadow(0 0 5px rgba(0, 255, 0, 0.5));
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);

  &:hover {
    filter: drop-shadow(0 0 10px rgba(0, 255, 0, 0.8));
    transform: scale(1.2);
  }
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #ff6600;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  border: 2px solid #ff6600;
  z-index: 6;
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.6);

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #ff6600;
  }
`;

const ZombieCounter = styled(motion.div)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #ff6600;
  border: 2px solid #ff6600;
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.5);
  animation: pulse 2s infinite ease-in-out;

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 15px rgba(255, 102, 0, 0.5); }
    50% { box-shadow: 0 0 25px rgba(255, 102, 0, 0.8); }
  }
`;

const zombiePhrases = [
  "HODL...",
  "Buy the dip...",
  "To the moon...",
  "Trust the whitepaper...",
  "Diamond hands...",
  "Fiat is dying...",
  "Stack sats...",
  "Number go up...",
  "This is the way...",
  "Not your keys...",
  "Have fun staying poor...",
  "Bitcoin fixes this...",
  "Satoshi is my god...",
  "1 BTC = 1 BTC",
  "Hyperbitcoinization soon...",
  "WAGMI...",
  "Few understand...",
  "Nocoiners will suffer...",
  "Banks are evil...",
  "Inflation is theft...",
  "Central banks are the enemy...",
  "Bitcoin is freedom...",
  "Fiat is a ponzi...",
  "Laser eyes activated...",
  "Never sell...",
  "Generational wealth...",
  "Digital gold...",
  "Tick tock next block...",
  "Infinite money glitch...",
  "Citadel soon...",
  "Bitcoin is hope...",
  "Proof of work is perfect...",
  "21 million only...",
  "Halving is coming...",
  "Satoshi's vision...",
  "Orange pill taken...",
  "Fiat slaves...",
  "Crypto revolution..."
];

const zombieEmojis = ['🧟‍♂️', '🧟‍♀️', '🧟', '🤑', '🧠', '💰', '🪙', '💎', '🚀', '👾', '🤖'];

const ZombieHorde: React.FC<ZombieHordeProps> = ({ brainwashLevel = 0, onZombieCreated }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [zombies, setZombies] = useState<ZombieType[]>([]);
  const [isActive, setIsActive] = useState(false);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const zombieCountRef = useRef(0);
  const timeOnPageRef = useRef(0);

  // Sound effects
  const zombieSound = useRef<Howl | null>(null);

  useEffect(() => {
    // Initialize zombie sound
    zombieSound.current = new Howl({
      src: ['/zombie-groan.mp3'],
      volume: 0.3,
      loop: true,
    });

    // Start timer for zombie spawning
    const timer = setInterval(() => {
      timeOnPageRef.current += 1;

      // Add new zombies with increasing frequency based on brainwash level
      const spawnRate = Math.max(3 - Math.floor((timeOnPageRef.current + brainwashLevel) / 15), 1);

      // Chance to spawn multiple zombies at once increases with brainwash level
      const multipleSpawnChance = Math.min(0.1 + (brainwashLevel / 200), 0.5);

      if (timeOnPageRef.current % spawnRate === 0) {
        // Always spawn at least one zombie
        addZombie();

        // Chance to spawn additional zombies
        if (Math.random() < multipleSpawnChance) {
          const extraZombies = Math.floor(Math.random() * 3) + 1; // 1-3 extra zombies
          for (let i = 0; i < extraZombies; i++) {
            setTimeout(() => addZombie(), i * 200); // Stagger spawns
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      zombieSound.current?.stop();
    };
  }, [brainwashLevel]);

  useEffect(() => {
    // Update zombie positions based on cursor
    if (!isActive || zombies.length === 0) return;

    const interval = setInterval(() => {
      setZombies(prevZombies =>
        prevZombies.map(zombie => {
          // Calculate direction to cursor
          const dx = cursorPos.x - zombie.x;
          const dy = cursorPos.y - zombie.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Prevent division by zero
          if (distance < 0.1) {
            return {
              ...zombie,
              showPhrase: Math.random() < 0.05 // Higher chance to show phrase when close to cursor
            };
          }

          // Normalize and scale - speed increases with brainwash level
          const baseSpeed = 2 + (brainwashLevel / 25); // Increased base speed
          const speed = baseSpeed * (1 + Math.random() * 0.5); // Add some randomness
          const vx = (dx / distance) * speed;
          const vy = (dy / distance) * speed;

          // Random chance to show speech bubble
          const showPhrase = Math.random() < 0.01;

          return {
            ...zombie,
            x: zombie.x + vx,
            y: zombie.y + vy,
            showPhrase: showPhrase
          };
        })
      );
    }, 30); // Faster update interval for smoother movement

    return () => clearInterval(interval);
  }, [cursorPos, isActive, zombies.length, brainwashLevel]);

  const addZombie = () => {
    if (!playgroundRef.current) return;

    const playground = playgroundRef.current.getBoundingClientRect();

    // Add zombie at random position on the edge
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;

    switch (side) {
      case 0: // top
        x = Math.random() * playground.width;
        y = 0;
        break;
      case 1: // right
        x = playground.width;
        y = Math.random() * playground.height;
        break;
      case 2: // bottom
        x = Math.random() * playground.width;
        y = playground.height;
        break;
      case 3: // left
        x = 0;
        y = Math.random() * playground.height;
        break;
      default:
        x = 0;
        y = 0;
    }

    // Determine if this should be a special zombie (higher chance with higher brainwash level)
    const isSpecialZombie = Math.random() < (0.05 + (brainwashLevel / 500));

    // Special zombies have different appearance and are more likely to speak
    const newZombie: ZombieType = {
      id: zombieCountRef.current++,
      x,
      y,
      emoji: isSpecialZombie ? '🧠' : zombieEmojis[Math.floor(Math.random() * zombieEmojis.length)],
      phrase: isSpecialZombie
        ? "WE ARE ALL SATOSHI!"
        : zombiePhrases[Math.floor(Math.random() * zombiePhrases.length)],
      showPhrase: isSpecialZombie ? true : false
    };

    setZombies(prev => [...prev, newZombie]);

    // Notify parent component
    if (onZombieCreated) {
      onZombieCreated();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!playgroundRef.current) return;

    const playground = playgroundRef.current.getBoundingClientRect();
    const x = e.clientX - playground.left;
    const y = e.clientY - playground.top;

    setCursorPos({ x, y });

    if (!isActive) {
      setIsActive(true);
      zombieSound.current?.play();
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    zombieSound.current?.pause();
  };

  return (
    <ZombieSection
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: [
          '0 0 30px rgba(255, 102, 0, 0.5)',
          '0 0 50px rgba(255, 102, 0, 0.8)',
          '0 0 30px rgba(255, 102, 0, 0.5)'
        ]
      }}
      transition={{
        duration: 1,
        boxShadow: {
          repeat: Infinity,
          duration: 4,
          repeatType: "mirror"
        }
      }}
    >
      <ZombieContainer>
        <ZombieTitle
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            textShadow: [
              '0 0 10px #ff6600, 0 0 20px #ff6600',
              '0 0 15px #ff6600, 0 0 30px #ff6600',
              '0 0 10px #ff6600, 0 0 20px #ff6600'
            ]
          }}
          transition={{
            duration: 0.8,
            textShadow: {
              repeat: Infinity,
              duration: 2,
              repeatType: "mirror"
            }
          }}
          viewport={{ once: true }}
        >
          🧟‍♂️ Zombie HODLERS Chasing Nirvana
        </ZombieTitle>

        <ZombieDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            color: ['#ffaa00', '#ff6600', '#ffaa00']
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            color: {
              repeat: Infinity,
              duration: 3,
              repeatType: "mirror"
            }
          }}
          viewport={{ once: true }}
        >
          Move your cursor around to see the brainwashed crypto zombies chase the Bitcoin.
          The longer you stay, the more zombies appear until your browser starts lagging.
          This is a metaphor for something. We're not sure what.
        </ZombieDescription>

        <ZombiePlayground
          ref={playgroundRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            boxShadow: [
              '0 0 30px rgba(255, 102, 0, 0.5)',
              '0 0 50px rgba(255, 102, 0, 0.8)',
              '0 0 30px rgba(255, 102, 0, 0.5)'
            ]
          }}
          transition={{
            duration: 1,
            boxShadow: {
              repeat: Infinity,
              duration: 3,
              repeatType: "mirror"
            }
          }}
        >
          {isActive && (
            <BitcoinCursor
              style={{
                left: `${cursorPos.x - 25}px`,
                top: `${cursorPos.y - 25}px`,
                position: 'absolute'
              }}
              animate={{
                rotate: [0, 360],
                boxShadow: [
                  '0 0 20px rgba(255, 102, 0, 0.8)',
                  '0 0 30px rgba(255, 102, 0, 1)',
                  '0 0 20px rgba(255, 102, 0, 0.8)'
                ],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                boxShadow: { repeat: Infinity, duration: 2, repeatType: "mirror" },
                scale: { repeat: Infinity, duration: 1.5, repeatType: "mirror" }
              }}
            />
          )}

          {zombies.map(zombie => (
            <React.Fragment key={zombie.id}>
              <Zombie
                style={{
                  left: `${zombie.x - 30}px`,
                  top: `${zombie.y - 30}px`,
                  position: 'absolute'
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotate: { repeat: Infinity, duration: 2, repeatType: "mirror" }
                }}
              >
                {zombie.emoji}
                {zombie.showPhrase && (
                  <SpeechBubble
                    initial={{ opacity: 0, y: 10, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {zombie.phrase}
                  </SpeechBubble>
                )}
              </Zombie>
            </React.Fragment>
          ))}

          <ZombieCounter
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { repeat: Infinity, duration: 2, repeatType: "mirror" }
            }}
          >
            🧟‍♂️ Zombies: {zombies.length}
          </ZombieCounter>
        </ZombiePlayground>
      </ZombieContainer>
    </ZombieSection>
  );
};

export default ZombieHorde;
