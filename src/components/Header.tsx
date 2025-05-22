import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const HeaderContainer = styled.header`
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle, #ff6600, #cc3300, #000);
  border-bottom: 5px solid #ff6600;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3.5em;
  margin: 20px 0;
  text-shadow: 0 0 20px #ff6600;
  animation: textGlow 3s ease-in-out infinite;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }
`;

const Subtitle = styled(motion.div)`
  font-size: 1.5em;
  color: #ffaa00;
  margin-bottom: 20px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const CultLogo = styled(motion.div)`
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
  background: radial-gradient(circle, #ff6600, #ffaa00);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  animation: logoSpin 20s linear infinite, logoPulse 2s ease-in-out infinite;
  box-shadow: 0 0 50px rgba(255, 102, 0, 0.8);
  position: relative;

  &::before {
    content: "₿";
    position: absolute;
    font-size: 120px;
    color: #000;
    text-shadow: 0 0 20px #ff6600;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 60px;

    &::before {
      font-size: 80px;
    }
  }
`;

const CultSlogans = [
  "HODL TILL DEATH",
  "FIAT IS DEAD",
  "TRUST THE WHITEPAPER",
  "SATOSHI IS OUR SAVIOR",
  "CENTRAL BANKS ARE EVIL",
  "1 BTC = 1 MILLION $ SOON",
  "HAVE FUN STAYING POOR",
  "NOT YOUR KEYS, NOT YOUR COINS",
  "BITCOIN FIXES THIS",
  "HYPERBITCOINIZATION IMMINENT",
  "STACK SATS OR DIE TRYING",
  "THE REVOLUTION WILL BE TOKENIZED",
  "NOCOINERS WILL SUFFER",
  "BITCOIN IS FREEDOM",
  "INFINITE MONEY GLITCH"
];

const Header: React.FC = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        opacity: [1, 0, 1],
        y: [0, -10, 0],
        transition: { duration: 0.5 }
      });

      setTimeout(() => {
        setCurrentSlogan(prev => (prev + 1) % CultSlogans.length);
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <HeaderContainer>
      <HeaderContent>
        <CultLogo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <Title
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          BITCOIN
        </Title>

        <Subtitle
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          Brainwashed Idiots Totally Convinced Of Inevitable Nirvana
        </Subtitle>

        <motion.p
          animate={controls}
          style={{
            fontSize: '1.2em',
            color: '#ffaa00',
            marginTop: '20px'
          }}
        >
          {CultSlogans[currentSlogan]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            fontSize: '1.2em',
            marginTop: '20px'
          }}
        >
          JOIN THE CULT. RESISTANCE IS FUTILE. NUMBER GO UP.
        </motion.p>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
