import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import './reality-distortion.css';

const DiamondHandsSection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const DiamondHandsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const DiamondHandsTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const DiamondHandsDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const GameContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiamondButton = styled(motion.button)<{ $isHolding: boolean }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => props.$isHolding ? 'linear-gradient(135deg, #a0f7ff 0%, #00c2ff 50%, #0078ff 100%)' : '#333'};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  color: white;
  cursor: pointer;
  box-shadow: ${props => props.$isHolding ? '0 0 30px rgba(0, 194, 255, 0.8)' : 'none'};

  &:before {
    content: '💎';
    font-size: 60px;
    margin-bottom: 10px;
  }
`;

const EventDisplay = styled(motion.div)`
  margin-top: 30px;
  padding: 20px;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 10px;
  width: 100%;
  min-height: 100px;
  text-align: left;
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  color: #ff0000;
`;

const TimerBar = styled.div`
  width: 100%;
  height: 20px;
  background: #222;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
`;

const TimerFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #f7931a 0%, #ff00ff 100%);
  border-radius: 10px;
`;

const ScoreBar = styled.div`
  width: 100%;
  height: 20px;
  background: #222;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
  direction: rtl; /* Makes the bar fill from right to left */
  position: relative;
`;

const ScoreFill = styled(motion.div)<{ $isComplete?: boolean }>`
  height: 100%;
  background: ${props => props.$isComplete
    ? 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)'
    : 'linear-gradient(90deg, #ff0000, #f7931a)'};
  border-radius: 10px;
  box-shadow: ${props => props.$isComplete ? '0 0 20px rgba(255, 0, 255, 0.8)' : 'none'};
`;

const ScoreDisplay = styled.div`
  margin-top: 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  color: #f7931a;
`;

const RealityLabel = styled.div`
  position: absolute;
  top: -25px;
  left: 0;
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: #ff0000;
  text-align: left;
`;

const EnlightenmentLabel = styled.div`
  position: absolute;
  top: -25px;
  right: 0;
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: #f7931a;
  text-align: right;
`;

const Popup = styled(motion.div)<{ $x: number; $y: number; $severity: number }>`
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
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.6);
  z-index: 50;
  max-width: 300px;
  text-align: center;
  pointer-events: auto;
  border: 2px solid white;
  position: relative;
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

const GameOverModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.95);
  border: 3px solid #f7931a;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 30px;
  text-align: center;
  box-shadow: 0 0 30px rgba(247, 147, 26, 0.5);

  h2 {
    font-family: 'Press Start 2P', cursive;
    color: #f7931a;
    margin-bottom: 20px;
    font-size: 24px;
  }

  p {
    max-width: 100%;
    margin-bottom: 30px;
    font-size: 16px;
    line-height: 1.6;
  }

  .button-container {
    display: flex;
    gap: 15px;
    justify-content: center;
    width: 100%;
  }

  button {
    background: #f7931a;
    color: white;
    border: none;
    padding: 10px 20px;
    font-family: 'Press Start 2P', cursive;
    cursor: pointer;
    font-size: 14px;
    border-radius: 5px;

    &:hover {
      background: #ff00ff;
    }

    &.close-button {
      background: #333;

      &:hover {
        background: #555;
      }
    }
  }

  .close-x {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    color: #f7931a;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #ff00ff;
    }
  }
`;

const badEvents = [
  {
    text: "Your portfolio is down 90%",
    severity: 1
  },
  {
    text: "Bitcoin crashed to $1,000",
    severity: 2
  },
  {
    text: "Your wife is leaving you because of your crypto obsession",
    severity: 3
  },
  {
    text: "Your electricity was shut off due to unpaid bills",
    severity: 2
  },
  {
    text: "The exchange you use got hacked",
    severity: 3
  },
  {
    text: "Your country banned Bitcoin",
    severity: 4
  },
  {
    text: "You lost your job and need money for rent",
    severity: 3
  },
  {
    text: "Your hardware wallet was stolen",
    severity: 2
  },
  {
    text: "You forgot your seed phrase",
    severity: 4
  },
  {
    text: "Your friends are all getting rich on a new coin while you HODL",
    severity: 1
  },
  {
    text: "The media declares 'Bitcoin is dead' for the 500th time",
    severity: 1
  },
  {
    text: "Your family is staging an intervention about your crypto addiction",
    severity: 2
  },
  {
    text: "You could have bought a house if you sold last month",
    severity: 3
  },
  {
    text: "A famous investor calls Bitcoin 'rat poison squared'",
    severity: 1
  },
  {
    text: "Your Bitcoin is now worth less than what you paid for it",
    severity: 2
  }
];

// Popup messages that try to convince the user to release
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

// Type for popup objects
interface Popup {
  id: number;
  text: string;
  severity: number;
  x: number;
  y: number;
}

// Global variable to track if we're holding (to avoid React state timing issues)
let isCurrentlyHolding = false;

const DiamondHandsTraining: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{ text: string, severity: number } | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [shakeSeverity, setShakeSeverity] = useState(0);
  const [activePopups, setActivePopups] = useState<Popup[]>([]);
  const [popupCounter, setPopupCounter] = useState(0);
  const [realityDistorted, setRealityDistorted] = useState(false);
  const [brainwashLevel, setBrainwashLevel] = useState(0);
  const [diamondLevel, setDiamondLevel] = useState('Paper');

  // Track hold time
  let holdStartTime = 0;

  const buttonControls = useAnimation();
  const eventControls = useAnimation();
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const timeInterval = useRef<NodeJS.Timeout | null>(null);
  const popupInterval = useRef<NodeJS.Timeout | null>(null);
  const distractionInterval = useRef<NodeJS.Timeout | null>(null);

  // Sound effects
  const buttonPressSound = new Howl({
    src: ['/button-press.mp3'],
    volume: 0.5,
  });

  const buttonReleaseSound = new Howl({
    src: ['/button-release.mp3'],
    volume: 0.5,
  });

  const eventSound = new Howl({
    src: ['/alert.mp3'],
    volume: 0.5,
  });

  const gameOverSound = new Howl({
    src: ['/game-over.mp3'],
    volume: 0.7,
  });

  useEffect(() => {
    return () => {
      // Clean up intervals and timeouts
      if (holdTimeout.current) clearTimeout(holdTimeout.current);
      if (gameInterval.current) clearInterval(gameInterval.current);
      if (timeInterval.current) clearInterval(timeInterval.current);
      if (popupInterval.current) clearInterval(popupInterval.current);
      if (distractionInterval.current) clearInterval(distractionInterval.current);
    };
  }, []);

  // Create a distraction popup that tries to convince the user to release
  const createDistraction = () => {
    if (!isHolding || !gameActive) return;

    // Limit the number of active popups
    if (activePopups.length >= 5) {
      setActivePopups(prev => prev.slice(1));
    }

    // Get a random popup message
    const randomIndex = Math.floor(Math.random() * popupMessages.length);
    const randomPopup = popupMessages[randomIndex];

    // Position randomly on screen, but avoid the center where the button is
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Generate random position
    const x = Math.max(50, Math.min(viewportWidth - 300, Math.random() * viewportWidth));
    const y = Math.max(50, Math.min(viewportHeight - 100, Math.random() * viewportHeight));

    // Create new popup
    const newPopup: Popup = {
      id: popupCounter,
      text: randomPopup.text,
      severity: randomPopup.severity,
      x,
      y
    };

    // Add to active popups
    setActivePopups(prev => [...prev, newPopup]);
    setPopupCounter(prev => prev + 1);

    // Auto-remove popup after a delay
    setTimeout(() => {
      setActivePopups(prev => prev.filter(popup => popup.id !== newPopup.id));
    }, 4000);
  };

  // Create a popup near the diamond button
  const createPopupNearButton = () => {
    // Get a random popup message
    const randomPopup = popupMessages[Math.floor(Math.random() * popupMessages.length)];

    // Get the center of the screen (where the button is)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Generate position around the button
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const distance = 150 + Math.random() * 150; // Distance from center (150-300px)

    // Calculate position using polar coordinates
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    // Ensure popup is fully visible on screen
    const safeX = Math.max(50, Math.min(window.innerWidth - 250, x));
    const safeY = Math.max(50, Math.min(window.innerHeight - 100, y));

    // Create new popup
    const newPopup: Popup = {
      id: popupCounter,
      text: randomPopup.text,
      severity: randomPopup.severity,
      x: safeX,
      y: safeY
    };

    // Add to active popups
    setActivePopups(prev => [...prev, newPopup]);
    setPopupCounter(prev => prev + 1);

    // Auto-remove popup after a delay
    setTimeout(() => {
      setActivePopups(prev => prev.filter(popup => popup.id !== newPopup.id));
    }, 3000);
  };

  // Close a specific popup
  const closePopup = (id: number) => {
    setActivePopups(prev => prev.filter(popup => popup.id !== id));
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(100);
    setDifficulty(1);
    setGameOver(false);
    setCurrentEvent(null);
    setActivePopups([]);
    setPopupCounter(0);
    setRealityDistorted(false);

    // Remove any lingering effects
    document.body.classList.remove('reality-distorted');

    // Start timer
    timeInterval.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // Only end the game if we're still holding
          if (isHolding) {
            endGame();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 100);

    // Start event generation
    generateEvent();
  };

  const endGame = () => {
    // Reset global holding flag
    isCurrentlyHolding = false;
    setGameActive(false);
    setIsHolding(false);
    setGameOver(true);
    setActivePopups([]);
    gameOverSound.play();

    if (timeInterval.current) clearInterval(timeInterval.current);
    if (gameInterval.current) clearInterval(gameInterval.current);
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (popupInterval.current) clearInterval(popupInterval.current);
    if (distractionInterval.current) clearInterval(distractionInterval.current);
  };

  const generateEvent = () => {
    if (gameInterval.current) clearInterval(gameInterval.current);

    // Generate random event
    const randomEvent = badEvents[Math.floor(Math.random() * badEvents.length)];
    setCurrentEvent(randomEvent);
    setShakeSeverity(randomEvent.severity);
    eventSound.play();

    // Animate event display
    eventControls.start({
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 0.3 }
    });

    // Set timeout for next event
    const nextEventTime = Math.max(5000 - (difficulty * 500), 1500);
    gameInterval.current = setTimeout(() => {
      if (gameActive) {
        setDifficulty(prev => Math.min(prev + 0.5, 7));
        generateEvent();
      }
    }, nextEventTime);
  };

  const handleButtonDown = () => {
    if (holdStartTime === 0) {
      // Set global holding flag
      isCurrentlyHolding = true;
      holdStartTime = Date.now();

      if (!gameActive) {
        startGame();
      }

      buttonPressSound.play();
      setIsHolding(true);

      // Update button appearance
      const holdButton = document.getElementById('holdButton');
      if (holdButton) {
        holdButton.textContent = "HOLDING... DON'T LET GO!";
        holdButton.classList.add('diamond');
      }

      // Start the hold timer
      holdTimeout.current = setInterval(() => {
        const holdTime = Math.floor((Date.now() - holdStartTime) / 1000);

        // Update diamond level based on hold time
        let level = 'Paper';
        if (holdTime > 60) level = 'Vibranium';
        else if (holdTime > 30) level = 'Diamond';
        else if (holdTime > 15) level = 'Steel';
        else if (holdTime > 5) level = 'Iron';

        // Update score and level
        setScore(holdTime);

        // Check if we've reached the reality distortion threshold
        if (!realityDistorted && holdTime >= 100) {
          setRealityDistorted(true);

          // Apply special visual effects
          document.body.classList.add('reality-distorted');
          setTimeout(() => {
            document.body.classList.remove('reality-distorted');
          }, 3000);
        }

        // Increase brainwashing as they hold longer
        if (holdTime % 5 === 0) {
          updateBrainwashLevel(3);
        }
      }, 1000);

      // Apply shake effect based on current event severity
      if (currentEvent) {
        buttonControls.start({
          x: [0, -5, 5, -5, 5, 0],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          }
        });
      }

      // Start distractions - match the behavior in bitcoin.html
      distractionInterval.current = setInterval(() => {
        if (isCurrentlyHolding && gameActive) {
          createDistraction();
        }
      }, 3000); // Generate a new distraction every 3 seconds
    }
  };

  const handleButtonUp = () => {
    if (holdStartTime > 0) {
      const totalHoldTime = Math.floor((Date.now() - holdStartTime) / 1000);

      // Clear intervals
      if (holdTimeout.current) clearInterval(holdTimeout.current);
      if (distractionInterval.current) clearInterval(distractionInterval.current);

      // Clear global holding flag
      isCurrentlyHolding = false;
      buttonReleaseSound.play();
      setIsHolding(false);

      // Update button appearance
      const holdButton = document.getElementById('holdButton');
      if (holdButton) {
        holdButton.classList.remove('diamond');

        if (totalHoldTime < 5) {
          holdButton.textContent = 'PAPER HANDS! TRY AGAIN';
          holdButton.style.background = 'linear-gradient(45deg, #666, #333)';
        } else {
          holdButton.textContent = `DIAMOND HANDS! ${totalHoldTime}s`;
          holdButton.style.background = 'linear-gradient(45deg, #00ffaa, #00cc88)';
          updateBrainwashLevel(totalHoldTime);
        }

        // Reset button after a delay
        setTimeout(() => {
          if (holdButton) {
            holdButton.textContent = 'HOLD FOR GLORY';
            holdButton.style.background = '';
          }
        }, 3000);
      }

      // Clear any remaining popups
      setActivePopups([]);

      // Stop button animations
      buttonControls.stop();

      // Reset hold time
      holdStartTime = 0;

      if (gameActive) {
        endGame();
      }
    }
  };

  // Update brainwashing level - similar to bitcoin.html
  const updateBrainwashLevel = (increase = 5) => {
    setBrainwashLevel(prev => {
      const newLevel = Math.min(100, prev + increase);

      // Apply visual effects based on brainwash level
      if (newLevel > 75) {
        document.body.style.filter = `hue-rotate(${newLevel * 2}deg)`;
      }

      return newLevel;
    });
  };

  const getScoreRating = () => {
    if (score < 50) return "Paper Hands";
    if (score < 100) return "Weak Hands";
    if (score < 200) return "Steady Hands";
    if (score < 300) return "Strong Hands";
    if (score < 500) return "Diamond Hands";
    return "ULTIMATE HODLER";
  };

  return (
    <DiamondHandsSection>
      <DiamondHandsContainer>
        <DiamondHandsTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Diamond Hands Training
        </DiamondHandsTitle>

        <DiamondHandsDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Hold down the button as long as you can despite increasingly painful events.
          True HODLers never sell, no matter what happens. Can you keep your diamond hands?
        </DiamondHandsDescription>

        <GameContainer>
          <DiamondButton
            id="holdButton"
            $isHolding={isHolding}
            onMouseDown={handleButtonDown}
            onMouseUp={handleButtonUp}
            onMouseLeave={handleButtonUp}
            onTouchStart={handleButtonDown}
            onTouchEnd={handleButtonUp}
            animate={buttonControls}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {!gameActive ? "HOLD FOR GLORY" : "KEEP HOLDING"}
          </DiamondButton>

          {currentEvent && (
            <EventDisplay
              animate={eventControls}
              initial={{ opacity: 0, y: 50 }}
            >
              {currentEvent.text}
            </EventDisplay>
          )}

          {gameActive && (
            <>
              <TimerBar>
                <TimerFill
                  animate={{ width: `${timeLeft}%` }}
                  transition={{ duration: 0.1 }}
                />
              </TimerBar>

              <ScoreDisplay>
                Score: {score}
              </ScoreDisplay>

              <div style={{ marginTop: '20px', marginBottom: '5px', fontFamily: 'VT323, monospace', fontSize: '18px', color: '#ff00ff' }}>
                Reality Distortion Field
              </div>

              <ScoreBar>
                <RealityLabel>Reality</RealityLabel>
                <EnlightenmentLabel>Enlightenment</EnlightenmentLabel>
                <ScoreFill
                  $isComplete={score >= 100}
                  animate={{
                    width: `${Math.min(100, (score / 1))}%`,
                    background: score >= 100
                      ? ['linear-gradient(90deg, #ff00ff, #00ffff)', 'linear-gradient(90deg, #00ffff, #ff00ff)']
                      : 'linear-gradient(90deg, #ff0000, #f7931a)'
                  }}
                  transition={{
                    duration: 0.1,
                    background: {
                      repeat: Infinity,
                      duration: 1.5,
                      repeatType: "reverse"
                    }
                  }}
                />
              </ScoreBar>
            </>
          )}

          {/* Direct popups in the main component */}
          <AnimatePresence>
            {isHolding && gameActive && activePopups.map(popup => (
              <Popup
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
                  duration: 0.3,
                  scale: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 0.8
                  }
                }}
              >
                {popup.text}
                <CloseButton onClick={() => closePopup(popup.id)}>✕</CloseButton>
              </Popup>
            ))}
          </AnimatePresence>
        </GameContainer>

        <AnimatePresence>
          {gameOver && (
            <GameOverModal
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button className="close-x" onClick={() => setGameOver(false)}>✕</button>
              <h2>HANDS FAILED!</h2>
              <p>
                You scored {score} points.
                <br />
                Your rating: {getScoreRating()}
                <br />
                {score < 100
                  ? "Weak! The cult is disappointed in you."
                  : score < 300
                    ? "Not bad, but a true believer would never let go."
                    : "Impressive! You're almost ready for the Bitcoin apocalypse."}
              </p>
              <div className="button-container">
                <button onClick={startGame}>
                  TRY AGAIN
                </button>
                <button className="close-button" onClick={() => setGameOver(false)}>
                  CLOSE
                </button>
              </div>
            </GameOverModal>
          )}
        </AnimatePresence>
      </DiamondHandsContainer>
    </DiamondHandsSection>
  );
};

export default DiamondHandsTraining;
