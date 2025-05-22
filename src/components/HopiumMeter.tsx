import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

interface HopiumMeterProps {
  onEnlightenment?: () => void;
}

const HopiumSection = styled(motion.section)`
  min-height: 600px;
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

const HopiumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const HopiumTitle = styled(motion.h2)`
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

const HopiumDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #ffaa00;
  text-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
`;

const BreathingContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 20px rgba(255, 102, 0, 0.3);
`;

const BreathingCircle = styled(motion.button)<{ $level: number; $active: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 102, 0, 1) 0%,
    rgba(255, 0, 255, ${props => 0.3 + props.$level * 0.7}) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  box-shadow: 0 0 ${props => 20 + props.$level * 50}px rgba(255, 102, 0, ${props => 0.5 + props.$level * 0.5});
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: visible;

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    filter: brightness(0.9);
  }

  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 3px solid rgba(255, 102, 0, ${props => 0.3 + props.$level * 0.7});
    border-radius: 50%;
    opacity: ${props => props.$active ? 1 : 0.5};
  }
`;

const BreathingText = styled(motion.div)`
  margin-top: 30px;
  font-size: 28px;
  color: #ffaa00;
  text-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
  font-weight: bold;
  letter-spacing: 1px;
`;

const HopiumMeter = styled.div`
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 40px;
  overflow: hidden;
  border: 2px solid #ff6600;
  box-shadow: 0 0 10px rgba(255, 102, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;

  &:before {
    content: 'HOPIUM LEVEL';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
    z-index: 1;
    letter-spacing: 2px;
  }
`;

const HopiumFill = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(
    90deg,
    #ff6600 0%,
    #ffaa00 50%,
    #ff00ff ${props => props.$level * 100}%
  );
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(255, 102, 0, 0.8);
  position: relative;
  z-index: 0;
`;

const HallucinationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 102, 0, 0.9) 0%,
    rgba(255, 0, 255, 0.9) 50%,
    rgba(0, 255, 0, 0.9) 100%
  );
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  text-align: center;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const EnlightenmentText = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 30px;
  background: linear-gradient(to right, #ff6600, #ffaa00, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  font-weight: bold;
  letter-spacing: 3px;
`;

const EnlightenmentDescription = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 800px;
  margin-bottom: 40px;
  line-height: 1.6;
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
`;

const BitcoinRain = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const BitcoinSymbol = styled(motion.div)<{ $x: number, $size: number, $delay: number }>`
  position: absolute;
  top: -50px;
  left: ${props => props.$x}px;
  font-size: ${props => props.$size}px;
  color: #ff6600;
  text-shadow: 0 0 15px rgba(255, 102, 0, 0.8);
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
`;

const BreathCounter = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

const BreathBubble = styled(motion.div)<{ $active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$active ? '#ff6600' : 'rgba(255, 102, 0, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 15px rgba(255, 102, 0, 0.8)' : 'none'};
  transition: all 0.3s ease;
  margin: 0 5px;

  &:after {
    content: ${props => props.$active ? '"✓"' : '""'};
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

const InstructionText = styled(motion.div)`
  margin-top: 20px;
  font-size: 18px;
  color: #ffaa00;
  opacity: 0.8;
  font-style: italic;
`;

const HopiumMeterComponent: React.FC<HopiumMeterProps> = ({ onEnlightenment }) => {
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'ready'>('ready');
  const [breathCount, setBreathCount] = useState(0);
  const [hopiumLevel, setHopiumLevel] = useState(0);
  const [showEnlightenment, setShowEnlightenment] = useState(false);
  const [bitcoinSymbols, setBitcoinSymbols] = useState<{ id: number, x: number, size: number, delay: number }[]>([]);
  const [isBreathing, setIsBreathing] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [breathingInstructions, setBreathingInstructions] = useState('Click the circle to start breathing');

  const circleControls = useAnimation();
  const textControls = useAnimation();
  const containerControls = useAnimation();

  // Sound effects
  const inhaleSound = useRef(new Howl({
    src: ['/inhale.mp3'],
    volume: 0.5,
  }));

  const exhaleSound = useRef(new Howl({
    src: ['/exhale.mp3'],
    volume: 0.5,
  }));

  const enlightenmentSound = useRef(new Howl({
    src: ['/hallucination.mp3'],
    volume: 0.7,
  }));

  const clickSound = useRef(new Howl({
    src: ['/click.mp3'],
    volume: 0.3,
  }));

  // Initialize breathing container animation and set initial instructions
  useEffect(() => {
    // Set initial instructions
    setBreathingInstructions('Click the circle to start breathing');

    // Start container animation
    containerControls.start({
      boxShadow: [
        'inset 0 0 20px rgba(255, 102, 0, 0.2)',
        'inset 0 0 30px rgba(255, 102, 0, 0.4)',
        'inset 0 0 20px rgba(255, 102, 0, 0.2)'
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror"
      }
    });

    // Preload sounds
    inhaleSound.current.load();
    exhaleSound.current.load();
    clickSound.current.load();
    enlightenmentSound.current.load();
  }, [containerControls]);

  // Handle breath click
  const handleBreathClick = () => {
    if (!canClick) return;

    clickSound.current.play();

    // If we're already breathing, do nothing (wait for animation to complete)
    if (isBreathing && breathingPhase !== 'ready') {
      return;
    }

    // Start or continue breathing
    setIsBreathing(true);

    // If we're ready for the next breath, increment count and start next breath
    if (breathingPhase === 'ready' && breathCount > 0) {
      // Increment breath count and hopium level
      const newBreathCount = breathCount + 1;
      setBreathCount(newBreathCount);

      // Calculate new hopium level (0 to 1)
      const newHopiumLevel = Math.min(newBreathCount / 5, 1);
      setHopiumLevel(newHopiumLevel);

      // Check if we should trigger enlightenment
      if (newBreathCount >= 5) {
        triggerEnlightenment();
        return;
      }
    }

    // Start the breathing animation
    startBreath();
  };

  const startBreath = async () => {
    try {
      // Disable clicking during animation
      setCanClick(false);

      // Inhale phase
      setBreathingPhase('inhale');
      setBreathingInstructions('Breathe in deeply...');
      inhaleSound.current.play();

      // Inhale animation - make the circle bigger
      await circleControls.start({
        scale: 2,
        boxShadow: '0 0 50px rgba(255, 102, 0, 0.8)',
        transition: { duration: 4, ease: "easeInOut" }
      });

      // Hold phase
      setBreathingPhase('hold');
      setBreathingInstructions('Hold your breath...');

      // Hold animation - keep the circle big
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Exhale phase
      setBreathingPhase('exhale');
      setBreathingInstructions('Exhale slowly...');
      exhaleSound.current.play();

      // Exhale animation - make the circle smaller again
      await circleControls.start({
        scale: 1,
        boxShadow: '0 0 20px rgba(255, 102, 0, 0.5)',
        transition: { duration: 4, ease: "easeInOut" }
      });

      // Completed one breath
      if (breathCount === 0) {
        // First breath just completed
        setBreathCount(1);
        setHopiumLevel(0.1);
      }

      // Ready for next breath
      setBreathingPhase('ready');
      setBreathingInstructions('Click again for next breath');
      setCanClick(true);
    } catch (error) {
      console.error("Error in breathing animation:", error);
      // Reset to a safe state
      setBreathingPhase('ready');
      setCanClick(true);
    }
  };

  const triggerEnlightenment = () => {
    enlightenmentSound.current.play();
    setShowEnlightenment(true);

    // Generate Bitcoin symbols for the rain
    const symbols = [];
    for (let i = 0; i < 100; i++) {
      symbols.push({
        id: i,
        x: Math.random() * window.innerWidth,
        size: 20 + Math.random() * 60,
        delay: Math.random() * 3
      });
    }
    setBitcoinSymbols(symbols);

    // Notify parent component
    if (onEnlightenment) {
      onEnlightenment();
    }

    // Reset after enlightenment
    setTimeout(() => {
      setShowEnlightenment(false);
      setBreathCount(0);
      setHopiumLevel(0);
      setIsBreathing(false);
      setBreathingPhase('ready');
      setBreathingInstructions('Click the circle to start breathing');

      // Reset circle
      circleControls.set({
        scale: 1,
        boxShadow: '0 0 20px rgba(255, 102, 0, 0.5)'
      });
    }, 15000);
  };

  const getBreathingText = () => {
    switch (breathingPhase) {
      case 'inhale':
        return 'Breathe in the hopium...';
      case 'hold':
        return 'Hold the hopium...';
      case 'exhale':
        return 'Exhale the FUD...';
      case 'ready':
        if (breathCount === 0) {
          return 'Click the circle to begin';
        } else if (breathCount < 5) {
          return `${breathCount}/5 breaths completed`;
        } else {
          return 'Enlightenment achieved!';
        }
      default:
        return '';
    }
  };

  return (
    <HopiumSection
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
      <HopiumContainer>
        <HopiumTitle
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
          The Hopium Meter
        </HopiumTitle>

        <HopiumDescription
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
          Click the circle to breathe in the hopium and exhale the FUD.
          Complete 5 breaths to achieve Bitcoin enlightenment.
          Each breath increases your hopium level and brings you closer to financial nirvana.
        </HopiumDescription>

        <BreathingContainer
          animate={containerControls}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            style={{ position: 'relative' }}
            animate={
              canClick && breathingPhase === 'ready'
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: canClick && breathingPhase === 'ready' ? Infinity : 0,
              repeatType: "mirror"
            }}
          >
            {canClick && breathingPhase === 'ready' && (
              <motion.div
                style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#ffaa00',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 5px rgba(255, 170, 0, 0.5)',
                  zIndex: 10
                }}
                animate={{
                  y: [-5, 0, -5],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                CLICK ME
              </motion.div>
            )}
            <BreathingCircle
              $level={hopiumLevel}
              $active={breathingPhase !== 'ready'}
              animate={circleControls}
              initial={{ scale: 1 }}
              onClick={handleBreathClick}
              disabled={!canClick}
              style={{
                cursor: canClick ? 'pointer' : 'default',
                opacity: canClick ? 1 : 0.9
              }}
            >
              ₿
            </BreathingCircle>
          </motion.div>

          <BreathingText
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            {getBreathingText()}
          </BreathingText>

          <InstructionText
            animate={{
              opacity: [0.7, 1, 0.7],
              color: breathingPhase === 'inhale'
                ? ['#ffaa00', '#ff6600', '#ffaa00']
                : breathingPhase === 'hold'
                  ? ['#ff00ff', '#ff66ff', '#ff00ff']
                  : breathingPhase === 'exhale'
                    ? ['#00ff00', '#66ff66', '#00ff00']
                    : ['#ffaa00', '#ff6600', '#ffaa00']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
            }}
          >
            {breathingInstructions}
          </InstructionText>

          <HopiumMeter>
            <HopiumFill
              $level={hopiumLevel}
              animate={{
                width: `${hopiumLevel * 100}%`,
                boxShadow: hopiumLevel > 0.8 ? [
                  '0 0 10px rgba(255, 102, 0, 0.8)',
                  '0 0 20px rgba(255, 102, 0, 1)',
                  '0 0 10px rgba(255, 102, 0, 0.8)'
                ] : undefined
              }}
              transition={{
                duration: 0.5,
                boxShadow: {
                  repeat: Infinity,
                  duration: 1,
                  repeatType: "mirror"
                }
              }}
            />
          </HopiumMeter>

          <BreathCounter>
            {[...Array(5)].map((_, i) => (
              <BreathBubble
                key={i}
                $active={i < breathCount}
                animate={i < breathCount ? {
                  scale: [1, 1.2, 1],
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05
                }}
              />
            ))}
          </BreathCounter>
        </BreathingContainer>

        {showEnlightenment && (
          <HallucinationOverlay
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              background: [
                'radial-gradient(circle, rgba(255, 102, 0, 0.9) 0%, rgba(255, 0, 255, 0.9) 50%, rgba(0, 255, 0, 0.9) 100%)',
                'radial-gradient(circle, rgba(0, 255, 0, 0.9) 0%, rgba(255, 102, 0, 0.9) 50%, rgba(255, 0, 255, 0.9) 100%)',
                'radial-gradient(circle, rgba(255, 0, 255, 0.9) 0%, rgba(0, 255, 0, 0.9) 50%, rgba(255, 102, 0, 0.9) 100%)',
                'radial-gradient(circle, rgba(255, 102, 0, 0.9) 0%, rgba(255, 0, 255, 0.9) 50%, rgba(0, 255, 0, 0.9) 100%)',
              ]
            }}
            transition={{
              opacity: { duration: 15, times: [0, 0.1, 0.9, 1] },
              background: { duration: 10, repeat: 5, repeatType: "mirror" }
            }}
            exit={{ opacity: 0 }}
          >
            <EnlightenmentText
              animate={{
                scale: [1, 1.1, 1],
                filter: [
                  'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                  'drop-shadow(0 0 30px rgba(255, 255, 255, 0.8))',
                  'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              BITCOIN ENLIGHTENMENT
            </EnlightenmentText>

            <EnlightenmentDescription
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              You have transcended the physical realm and achieved Bitcoin nirvana!
              Your consciousness now exists on the blockchain, immortal and immutable.
              The fiat world fades away as you ascend to the crypto heavens.
            </EnlightenmentDescription>

            <BitcoinRain>
              {bitcoinSymbols.map(symbol => (
                <BitcoinSymbol
                  key={symbol.id}
                  $x={symbol.x}
                  $size={symbol.size}
                  $delay={symbol.delay}
                  animate={{
                    y: [0, window.innerHeight + 100],
                    rotate: [0, 360],
                    filter: [
                      'drop-shadow(0 0 5px rgba(255, 102, 0, 0.8))',
                      'drop-shadow(0 0 15px rgba(255, 102, 0, 1))',
                      'drop-shadow(0 0 5px rgba(255, 102, 0, 0.8))'
                    ]
                  }}
                  transition={{
                    y: {
                      duration: 5 + Math.random() * 5,
                      delay: symbol.delay,
                      repeat: Infinity,
                      repeatType: "loop"
                    },
                    rotate: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    filter: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }
                  }}
                >
                  ₿
                </BitcoinSymbol>
              ))}
            </BitcoinRain>
          </HallucinationOverlay>
        )}
      </HopiumContainer>
    </HopiumSection>
  );
};

export default HopiumMeterComponent;
