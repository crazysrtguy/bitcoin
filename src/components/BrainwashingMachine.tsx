import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

interface BrainwashingMachineProps {
  onBrainwashComplete?: () => void;
}

const BrainwashSection = styled(motion.section)`
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

const BrainwashContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const BrainwashTitle = styled(motion.h2)`
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

const BrainwashDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.3rem;
  line-height: 1.6;
  color: #ffaa00;
  text-shadow: 0 0 5px rgba(255, 170, 0, 0.5);
`;

const MachineContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1000px;
  border: 2px dashed rgba(255, 102, 0, 0.3);
  border-radius: 10px;
  padding: 20px;

  &:before {
    content: 'Drag items here';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    padding: 0 10px;
    color: rgba(255, 102, 0, 0.7);
    font-size: 14px;
    pointer-events: none;
  }
`;

const WashingMachine = styled(motion.div)`
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #333, #222);
  border-radius: 50%;
  position: relative;
  border: 10px solid #444;
  box-shadow: 0 0 30px rgba(255, 102, 0, 0.7), inset 0 0 20px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;

  &:before {
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, #222, #111);
    z-index: 1;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
  }

  &:after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: radial-gradient(circle, #ff6600, #cc3300);
    z-index: 2;
    box-shadow: 0 0 15px rgba(255, 102, 0, 0.8);
  }
`;

const MachineDoor = styled(motion.div)`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #777, #444);
  border-radius: 10px;
  position: absolute;
  top: 100px;
  right: -50px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform-origin: left center;

  &:before {
    content: '';
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #555, #333);
    border-radius: 5px;
    border: 2px solid #666;
  }

  &:after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #ff6600;
    top: 10px;
    right: 10px;
    box-shadow: 0 0 5px rgba(255, 102, 0, 0.8);
  }

  /* Add a hint to click the door */
  &:hover:before {
    content: 'CLICK';
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff6600;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(255, 102, 0, 0.8);
  }
`;

const WashingAnimation = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    transparent 30%,
    rgba(255, 102, 0, 0.2) 40%,
    rgba(255, 170, 0, 0.2) 60%,
    rgba(255, 0, 255, 0.2) 80%,
    transparent 90%
  );
  z-index: 0;
  opacity: 0.8;
  mix-blend-mode: screen;
`;

const DraggableItem = styled(motion.div)<{ $type: string }>`
  width: 80px;
  height: 80px;
  background: ${props => props.$type === 'logic' ? 'linear-gradient(135deg, #00ff00, #00aa00)' : 'linear-gradient(135deg, #ff00ff, #aa00aa)'};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: #000;
  cursor: grab;
  z-index: 10;
  box-shadow: 0 0 20px ${props => props.$type === 'logic' ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 255, 0.8)'};
  border: 3px solid ${props => props.$type === 'logic' ? '#00cc00' : '#cc00cc'};
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  user-select: none;
  touch-action: none;

  &:before {
    content: ${props => props.$type === 'logic' ? '"🧠"' : '"💭"'};
    position: absolute;
    top: -20px;
    left: -20px;
    font-size: 30px;
  }

  &:after {
    content: 'DRAG ME';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: ${props => props.$type === 'logic' ? '#00ff00' : '#ff00ff'};
    white-space: nowrap;
    text-shadow: 0 0 5px ${props => props.$type === 'logic' ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 255, 0.8)'};
  }
`;

const OutputContainer = styled(motion.div)`
  margin-top: 30px;
  width: 100%;
  min-height: 150px;
  background: rgba(0, 0, 0, 0.8);
  border: 3px solid #ff6600;
  padding: 20px;
  border-radius: 15px;
  text-align: left;
  font-size: 1.2rem;
  color: #00ff00;
  overflow-y: auto;
  max-height: 200px;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.8);
  position: relative;

  &:before {
    content: 'BRAINWASHING OUTPUT';
    position: absolute;
    top: -10px;
    left: 20px;
    background: #000;
    padding: 0 10px;
    font-size: 14px;
    color: #ff6600;
  }
`;

const cryptoSlogans = [
  "Bitcoin is the only true store of value",
  "Fiat currency is a ponzi scheme",
  "Central banks are the enemy of freedom",
  "HODL is the only strategy you need",
  "The dollar is going to zero",
  "Hyperbitcoinization is inevitable",
  "Your brain has been cleansed of FUD",
  "Buy high, never sell",
  "Satoshi is the messiah",
  "The blockchain is immutable truth",
  "Banks are obsolete",
  "Inflation is theft",
  "Bitcoin fixes everything",
  "The revolution will be tokenized",
  "Nocoiners will be left behind",
  "Trust the code, not the government",
  "1 BTC = 1 BTC forever",
  "Your logic has been replaced with hopium",
  "Rationality is for the weak",
  "Critical thinking is FUD",
  "Sell your house for Bitcoin",
  "Mortgage your future for sats",
  "Fiat slaves will serve Bitcoin kings",
  "The Bitcoin standard is inevitable",
  "Your brain is now orange-pilled",
  "Logic circuits rewired for Bitcoin maximalism",
  "Reason module deleted, HODL module installed",
  "Skepticism purged from neural pathways",
  "Cult indoctrination complete",
  "You now see the world through Bitcoin-colored glasses",
  "All hail the digital gold",
  "Nocoiners are subhuman",
  "Bitcoin is the apex predator of money",
  "Your children will thank you for buying Bitcoin",
  "Sacrifice everything for more sats",
  "The Bitcoin citadel awaits the faithful",
  "Laser eyes activated",
  "Brainwashing complete, you are now one of us",
  "Resistance to Bitcoin is futile",
  "You have joined the hive mind"
];

const BrainwashingMachine: React.FC<BrainwashingMachineProps> = ({ onBrainwashComplete }) => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [washing, setWashing] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [logicPosition, setLogicPosition] = useState({ x: -120, y: 100 });
  const [rationalityPosition, setRationalityPosition] = useState({ x: 350, y: 100 });
  const [logicInMachine, setLogicInMachine] = useState(false);
  const [rationalityInMachine, setRationalityInMachine] = useState(false);
  const [washingProgress, setWashingProgress] = useState(0);
  const [washingComplete, setWashingComplete] = useState(false);

  const washingControls = useAnimation();
  const machineControls = useAnimation();
  const doorControls = useAnimation();
  const outputControls = useAnimation();
  const machineRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Sound effects
  const washingSound = useRef(new Howl({
    src: ['/washing-machine.mp3'],
    volume: 0.5,
    loop: true,
  }));

  const doorSound = useRef(new Howl({
    src: ['/door-open.mp3'],
    volume: 0.5,
  }));

  const outputSound = useRef(new Howl({
    src: ['/computer-beep.mp3'],
    volume: 0.3,
  }));

  const completeSound = useRef(new Howl({
    src: ['/brainwash-complete.mp3'],
    volume: 0.7,
  }));

  useEffect(() => {
    // Animate machine slightly even when not washing
    machineControls.start({
      rotate: [0, 1, -1, 0],
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror"
      }
    });

    // Clean up sounds on unmount
    return () => {
      washingSound.current.stop();
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [machineControls]);

  const handleDoorClick = () => {
    doorSound.current.play();

    // Animate door opening/closing
    doorControls.start({
      rotateY: doorOpen ? 0 : 80,
      x: doorOpen ? 0 : 20,
      transition: { type: 'spring', stiffness: 100 }
    });

    setDoorOpen(!doorOpen);

    if (washing) {
      stopWashing();
    }
  };

  const startWashing = () => {
    setWashing(true);
    setWashingProgress(0);
    washingSound.current.play();

    // Animate washing machine
    washingControls.start({
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    });

    machineControls.start({
      rotate: [0, 2, -2, 0],
      scale: [1, 1.03, 0.97, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror"
      }
    });

    // Output crypto slogans with increasing frequency
    let count = 0;
    let totalSlogans = 15; // Increased number of slogans
    let delay = 1000; // Start with 1 second delay

    // Clear any existing interval
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    // Create a new interval
    intervalRef.current = window.setInterval(() => {
      if (count < totalSlogans) {
        outputSound.current.play();

        // Get random slogan, avoiding duplicates when possible
        let randomSlogan;
        if (output.length > 0) {
          const lastSlogan = output[output.length - 1].replace('> ', '');
          let attempts = 0;
          do {
            randomSlogan = cryptoSlogans[Math.floor(Math.random() * cryptoSlogans.length)];
            attempts++;
          } while (randomSlogan === lastSlogan && attempts < 5);
        } else {
          randomSlogan = cryptoSlogans[Math.floor(Math.random() * cryptoSlogans.length)];
        }

        // Add slogan to output with typing effect
        setOutput(prev => [...prev, `> ${randomSlogan}`]);

        // Scroll output to bottom
        outputControls.start({
          opacity: [0.7, 1],
          transition: { duration: 0.3 }
        });

        // Update progress
        setWashingProgress(Math.min(100, (count / totalSlogans) * 100));

        // Speed up output as washing progresses
        delay = Math.max(200, delay - 50);

        // Clear and set new interval with updated delay
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        intervalRef.current = window.setInterval(outputSlogans, delay);

        count++;
      } else {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        completeWashing();
      }
    }, delay);

    // Store the interval function for reuse
    const outputSlogans = () => {
      if (count < totalSlogans) {
        outputSound.current.play();
        const randomSlogan = cryptoSlogans[Math.floor(Math.random() * cryptoSlogans.length)];
        setOutput(prev => [...prev, `> ${randomSlogan}`]);
        setWashingProgress(Math.min(100, (count / totalSlogans) * 100));
        count++;
      } else {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
        completeWashing();
      }
    };
  };

  const completeWashing = () => {
    // Play completion sound
    completeSound.current.play();

    // Set washing complete state
    setWashingComplete(true);
    setWashingProgress(100);

    // Add final message
    setOutput(prev => [
      ...prev,
      "> BRAINWASHING COMPLETE",
      "> LOGIC AND REASON MODULES REPLACED WITH BITCOIN MAXIMALISM",
      "> YOU ARE NOW A DEVOTED CULT MEMBER"
    ]);

    // Notify parent component if callback provided
    if (onBrainwashComplete) {
      onBrainwashComplete();
    }

    // Stop washing after a delay
    setTimeout(() => {
      stopWashing();
    }, 3000);
  };

  const stopWashing = () => {
    setWashing(false);
    washingSound.current.stop();
    washingControls.stop();

    // Reset machine animation to gentle idle state
    machineControls.start({
      rotate: [0, 1, -1, 0],
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror"
      }
    });

    // Reset items after a delay
    setTimeout(() => {
      setLogicInMachine(false);
      setRationalityInMachine(false);
      setLogicPosition({ x: -120, y: 100 });
      setRationalityPosition({ x: 350, y: 100 });

      // Clear output after washing is complete
      if (washingComplete) {
        setTimeout(() => {
          setOutput([]);
          setWashingComplete(false);
        }, 5000);
      }
    }, 1000);
  };

  const handleDragEnd = (type: 'logic' | 'rationality', info: any) => {
    if (!machineRef.current) return;

    console.log(`Drag end for ${type}`, info);

    const machineRect = machineRef.current.getBoundingClientRect();

    // Get the center point of the dragged item
    const itemCenterX = info.point.x - machineRect.left;
    const itemCenterY = info.point.y - machineRect.top;

    console.log(`Item center: (${itemCenterX}, ${itemCenterY})`);

    // Get the center of the machine
    const machineCenterX = machineRect.width / 2;
    const machineCenterY = machineRect.height / 2;

    console.log(`Machine center: (${machineCenterX}, ${machineCenterY})`);

    // Calculate distance from item to machine center
    const distance = Math.sqrt(
      Math.pow(itemCenterX - machineCenterX, 2) +
      Math.pow(itemCenterY - machineCenterY, 2)
    );

    console.log(`Distance: ${distance}, Door open: ${doorOpen}`);

    // If item is dropped in the machine - use a very generous radius
    if (distance < 200 && doorOpen) { // Increased drop radius even more
      console.log(`${type} dropped in machine!`);

      // Force position to center of machine for visibility
      const centerX = machineCenterX - 40; // Adjust for item size
      const centerY = machineCenterY - 40; // Adjust for item size

      if (type === 'logic') {
        setLogicInMachine(true);
        setLogicPosition({ x: centerX, y: centerY });
        console.log("Logic in machine set to true");
      } else {
        setRationalityInMachine(true);
        setRationalityPosition({ x: centerX, y: centerY });
        console.log("Rationality in machine set to true");
      }

      // Force a check for both items after state update
      setTimeout(() => {
        console.log("Checking machine state after update");
        console.log(`Logic in machine: ${logicInMachine}`);
        console.log(`Rationality in machine: ${rationalityInMachine}`);

        // Check if both items are in the machine now
        if ((type === 'logic' && rationalityInMachine) ||
            (type === 'rationality' && logicInMachine)) {
          console.log("BOTH ITEMS DETECTED! Starting washing sequence!");

          // Close door with animation
          doorControls.start({
            rotateY: 0,
            x: 0,
            transition: { type: 'spring', stiffness: 100 }
          });

          setDoorOpen(false);

          // Start washing after door closes
          setTimeout(() => {
            startWashing();
          }, 500);
        } else {
          console.log("Still waiting for both items...");
        }
      }, 100); // Small delay to ensure state updates have processed
    } else {
      console.log(`${type} not dropped in machine or door closed`);

      // Reset position if not dropped in machine
      if (type === 'logic') {
        setLogicPosition({ x: -120, y: 100 });
      } else {
        setRationalityPosition({ x: 350, y: 100 });
      }
    }
  };

  return (
    <BrainwashSection
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
      <BrainwashContainer>
        <BrainwashTitle
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
          🧠 Brain Washing Machine 🧠
        </BrainwashTitle>

        <BrainwashDescription
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
          Drag and drop your "logic" and "rationality" into the washing machine.
          Watch as it cleanses your brain of FUD and replaces it with pure, unfiltered crypto maximalism.
          The perfect tool for joining the Bitcoin cult!
        </BrainwashDescription>

        <MachineContainer
          ref={machineRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <WashingMachine
            animate={machineControls}
          >
            <WashingAnimation
              animate={washingControls}
            />

            {washing && (
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                  color: '#ff6600',
                  textShadow: '0 0 20px rgba(255, 102, 0, 0.8)'
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ₿
              </motion.div>
            )}
          </WashingMachine>

          <MachineDoor
            animate={doorControls}
            initial={{ rotateY: 0, x: 0 }}
            onClick={handleDoorClick}
            whileHover={{
              boxShadow: '0 0 15px rgba(255, 102, 0, 0.8)'
            }}
          />

          {/* Door status indicator */}
          <motion.div
            style={{
              position: 'absolute',
              top: '70px',
              right: '-100px',
              background: doorOpen ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
              color: doorOpen ? '#00ff00' : '#ff0000',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: `1px solid ${doorOpen ? '#00ff00' : '#ff0000'}`,
              zIndex: 5
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            DOOR {doorOpen ? 'OPEN' : 'CLOSED'}
          </motion.div>

          {!logicInMachine && (
            <DraggableItem
              $type="logic"
              style={{
                position: 'absolute',
                left: `${logicPosition.x}px`,
                top: `${logicPosition.y}px`,
                zIndex: 20
              }}
              drag={!washing}
              dragConstraints={machineRef}
              dragElastic={0.5}
              dragMomentum={false}
              whileDrag={{ scale: 1.1, zIndex: 30 }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(0, 255, 0, 0.8)',
                  '0 0 25px rgba(0, 255, 0, 1)',
                  '0 0 15px rgba(0, 255, 0, 0.8)'
                ]
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  repeatType: "mirror"
                }
              }}
              onDragEnd={(_, info) => handleDragEnd('logic', info)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              LOGIC
            </DraggableItem>
          )}

          {!rationalityInMachine && (
            <DraggableItem
              $type="rationality"
              style={{
                position: 'absolute',
                left: `${rationalityPosition.x}px`,
                top: `${rationalityPosition.y}px`,
                zIndex: 20
              }}
              drag={!washing}
              dragConstraints={machineRef}
              dragElastic={0.5}
              dragMomentum={false}
              whileDrag={{ scale: 1.1, zIndex: 30 }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(255, 0, 255, 0.8)',
                  '0 0 25px rgba(255, 0, 255, 1)',
                  '0 0 15px rgba(255, 0, 255, 0.8)'
                ]
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  repeatType: "mirror"
                }
              }}
              onDragEnd={(_, info) => handleDragEnd('rationality', info)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              REASON
            </DraggableItem>
          )}

          {/* Progress bar */}
          {washing && (
            <motion.div
              style={{
                position: 'absolute',
                bottom: -30,
                left: 0,
                width: '100%',
                height: 10,
                background: '#333',
                borderRadius: 5,
                overflow: 'hidden'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff6600, #ffaa00)',
                  borderRadius: 5
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${washingProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          )}
        </MachineContainer>

        <OutputContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {output.length === 0 ? (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: '#555', fontStyle: 'italic' }}
            >
              Waiting for brainwashing to begin...
            </motion.div>
          ) : (
            output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                style={{
                  color: line.includes("COMPLETE") || line.includes("MODULES") || line.includes("CULT MEMBER")
                    ? '#ff00ff'
                    : '#00ff00',
                  fontWeight: line.includes("COMPLETE") ? 'bold' : 'normal',
                  fontSize: line.includes("COMPLETE") ? '1.3rem' : '1.2rem',
                  marginBottom: '5px'
                }}
              >
                {line}
              </motion.div>
            ))
          )}
        </OutputContainer>

        {/* Status indicators */}
        <motion.div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: logicInMachine ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
              padding: '5px 10px',
              borderRadius: '5px',
              border: `1px solid ${logicInMachine ? '#00ff00' : '#ff0000'}`
            }}
            animate={{
              opacity: logicInMachine ? [0.7, 1, 0.7] : 1,
              scale: logicInMachine ? [0.95, 1.05, 0.95] : 1
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <span style={{ fontSize: '20px' }}>🧠</span>
            <span style={{ color: logicInMachine ? '#00ff00' : '#ff0000' }}>
              LOGIC: {logicInMachine ? 'LOADED' : 'MISSING'}
            </span>
          </motion.div>

          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: rationalityInMachine ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
              padding: '5px 10px',
              borderRadius: '5px',
              border: `1px solid ${rationalityInMachine ? '#00ff00' : '#ff0000'}`
            }}
            animate={{
              opacity: rationalityInMachine ? [0.7, 1, 0.7] : 1,
              scale: rationalityInMachine ? [0.95, 1.05, 0.95] : 1
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <span style={{ fontSize: '20px' }}>💭</span>
            <span style={{ color: rationalityInMachine ? '#00ff00' : '#ff0000' }}>
              REASON: {rationalityInMachine ? 'LOADED' : 'MISSING'}
            </span>
          </motion.div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: '20px',
            color: '#ffaa00',
            fontSize: '1.1rem',
            fontStyle: 'italic'
          }}
        >
          {doorOpen
            ? "Door is open! Drag logic and rationality into the machine..."
            : "Click the door to open it and insert your brain modules"}
        </motion.div>

        {/* Fallback button for direct activation */}
        {!washing && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                '0 0 10px rgba(255, 102, 0, 0.5)',
                '0 0 20px rgba(255, 102, 0, 0.8)',
                '0 0 10px rgba(255, 102, 0, 0.5)'
              ]
            }}
            transition={{
              duration: 0.5,
              boxShadow: {
                repeat: Infinity,
                duration: 2,
                repeatType: "mirror"
              }
            }}
            onClick={() => {
              // Force both items into the machine
              setLogicInMachine(true);
              setRationalityInMachine(true);

              // Position items in the center of the machine
              if (machineRef.current) {
                const machineRect = machineRef.current.getBoundingClientRect();
                const centerX = machineRect.width / 2 - 40;
                const centerY = machineRect.height / 2 - 40;

                setLogicPosition({ x: centerX - 20, y: centerY - 20 });
                setRationalityPosition({ x: centerX + 20, y: centerY + 20 });
              }

              // Close door
              setDoorOpen(false);
              doorControls.start({
                rotateY: 0,
                x: 0,
                transition: { type: 'spring', stiffness: 100 }
              });

              // Start washing
              setTimeout(() => {
                startWashing();
              }, 500);
            }}
            style={{
              marginTop: '30px',
              padding: '15px 30px',
              background: 'linear-gradient(45deg, #ff6600, #cc3300)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {logicInMachine || rationalityInMachine
              ? "START BRAINWASHING NOW!"
              : "SKIP DRAGGING AND START BRAINWASHING"}
          </motion.button>
        )}
      </BrainwashContainer>
    </BrainwashSection>
  );
};

export default BrainwashingMachine;
