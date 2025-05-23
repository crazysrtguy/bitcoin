import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import Header from './components/Header';
import ZombieHorde from './components/ZombieHorde';
import BitcoinJustifier from './components/BitcoinJustifier';
import HopiumMeter from './components/HopiumMeter';
import DiamondHandsTraining from './components/DiamondHandsTraining';
import PriceProphecy from './components/PriceProphecy';
import CultInitiation from './components/CultInitiation';
import BitcoinLore from './components/BitcoinLore';
import SatoshiBook from './components/SatoshiBook';
import HowToBuy from './components/HowToBuy';
import ProphecyRoadmap from './components/ProphecyRoadmap';
import Footer from './components/Footer';
import BrainwashingLevel from './components/BrainwashingLevel';
import RealityDistortionField from './components/RealityDistortionField';
import SoundToggle from './components/SoundToggle';
import WarningModal from './components/WarningModal';
import { SoundProvider } from './context/SoundContext';

// Theme
import { theme } from './styles/theme';

// Styled Components
const AppContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(45deg, #1a0033, #000066, #330066);
  background-size: 400% 400%;
  animation: hypnoticBg 10s ease-in-out infinite;
  color: ${props => props.theme.colors.text};
  overflow-x: hidden;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const FloatingBitcoin = styled(motion.div)`
  position: fixed;
  font-size: 30px;
  color: #ff6600;
  z-index: 50;
  pointer-events: none;
`;

// Warning modal moved to its own component

const App: React.FC = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [distortionLevel, setDistortionLevel] = useState(0);
  const [brainwashLevel, setBrainwashLevel] = useState(0);
  // Zombie count kept but not actively used since ZombieHorde is commented out
  const [zombieCount, setZombieCount] = useState(0);
  const [floatingBitcoins, setFloatingBitcoins] = useState<{id: number, x: number, y: number}[]>([]);
  const bitcoinCount = React.useRef(0);

  useEffect(() => {
    // Increase distortion over time
    const interval = setInterval(() => {
      setDistortionLevel(prev => Math.min(prev + 0.01, 0.3));
      setBrainwashLevel(prev => Math.min(prev + 0.2, 100));
    }, 10000);

    // Create floating bitcoins
    const bitcoinInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        createFloatingBitcoin();
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(bitcoinInterval);
    };
  }, []);

  const createFloatingBitcoin = () => {
    const id = bitcoinCount.current++;
    const x = Math.random() * window.innerWidth;

    setFloatingBitcoins(prev => [...prev, { id, x, y: window.innerHeight }]);

    // Remove bitcoin after animation
    setTimeout(() => {
      setFloatingBitcoins(prev => prev.filter(bitcoin => bitcoin.id !== id));
    }, 8000);
  };

  // Commented out since ZombieHorde component is not being used
  /*
  const handleZombieCreated = () => {
    setZombieCount(prev => prev + 1);
    setBrainwashLevel(prev => Math.min(prev + 0.5, 100));
  };
  */

  const handleBrainwashLevelChange = (level: number) => {
    setDistortionLevel(level / 300); // Scale down for distortion effect
  };

  return (
    <ThemeProvider theme={theme}>
      <SoundProvider>
        <Router>
          <AppContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
          {showWarning && (
            <WarningModal onClose={() => setShowWarning(false)} />
          )}

          <RealityDistortionField intensity={distortionLevel} />

          {floatingBitcoins.map(bitcoin => (
            <FloatingBitcoin
              key={bitcoin.id}
              initial={{ x: bitcoin.x, y: bitcoin.y, opacity: 1 }}
              animate={{ y: -100, rotate: 360, opacity: 0 }}
              transition={{ duration: 8, ease: "linear" }}
            >
              ₿
            </FloatingBitcoin>
          ))}

          <BrainwashingLevel
            level={brainwashLevel}
            zombieCount={zombieCount}
            onLevelChange={handleBrainwashLevelChange}
          />

          <Header />

          <ContentWrapper>
            <Routes>
              <Route path="/" element={
                <>
                  <BitcoinLore />
                  <SatoshiBook />
                  {/* Zombie Horde commented out to improve performance
                  <ZombieHorde
                    brainwashLevel={brainwashLevel}
                    onZombieCreated={handleZombieCreated}
                  />
                  */}
                  <BitcoinJustifier />
                  <HopiumMeter
                    onEnlightenment={() => setBrainwashLevel(prev => Math.min(prev + 20, 100))}
                  />
                  <DiamondHandsTraining />
                  <PriceProphecy />
                  <CultInitiation />
                  <ProphecyRoadmap />
                  <HowToBuy />
                </>
              } />
            </Routes>
          </ContentWrapper>

          <Footer />
          <SoundToggle />
        </AppContainer>
        </Router>
      </SoundProvider>
    </ThemeProvider>
  );
};

export default App;
