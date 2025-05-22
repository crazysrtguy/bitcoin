import React, { useState, useEffect, useRef } from 'react';
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

const TokenAddressContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  max-width: 600px;
  width: 100%;
  position: relative;
`;

const TokenAddressBox = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid #ff6600;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 20px rgba(255, 102, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 30px rgba(255, 102, 0, 0.5);
    border-color: #ffaa00;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 102, 0, 0) 0%,
      rgba(255, 102, 0, 0) 40%,
      rgba(255, 102, 0, 0.4) 50%,
      rgba(255, 102, 0, 0) 60%,
      rgba(255, 102, 0, 0) 100%
    );
    transform: rotate(45deg);
    animation: shine 3s infinite;
    pointer-events: none;
  }

  @keyframes shine {
    0% {
      top: -50%;
      left: -50%;
    }
    100% {
      top: 150%;
      left: 150%;
    }
  }
`;

const TokenAddressLabel = styled.span`
  color: #ffaa00;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
`;

const TokenAddress = styled.span`
  color: white;
  font-family: monospace;
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  text-align: center;
  user-select: all;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }
`;

const CopyButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6600, #cc3300);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  margin-left: 10px;
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(45deg, #ffaa00, #ff6600);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    pointer-events: none;
  }
`;

const CopiedTooltip = styled(motion.div)`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #ffaa00;
  color: black;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ffaa00;
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
  const [showCopied, setShowCopied] = useState(false);
  const controls = useAnimation();
  const tokenAddressRef = useRef<HTMLSpanElement>(null);

  // Solana token address - replace with your actual token address
  const tokenAddress = "8xpGJ2Zd8CwmQWmZQQwXVKKGvwrJpBJ9JFf6mwJPFJQM";

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

  const copyToClipboard = async () => {
    try {
      // Try the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(tokenAddress);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      }
      // Fall back to the older execCommand method
      else if (tokenAddressRef.current) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(tokenAddressRef.current);
        selection?.removeAllRanges();
        selection?.addRange(range);

        const successful = document.execCommand('copy');
        selection?.removeAllRanges();

        if (successful) {
          setShowCopied(true);
          setTimeout(() => setShowCopied(false), 2000);
        } else {
          console.error('Failed to copy text with execCommand');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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

        <TokenAddressContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <TokenAddressBox>
            <TokenAddressLabel>$BITCOIN:</TokenAddressLabel>
            <TokenAddress ref={tokenAddressRef}>{tokenAddress}</TokenAddress>
            <CopyButton
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COPY
            </CopyButton>
          </TokenAddressBox>

          {showCopied && (
            <CopiedTooltip
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Copied to clipboard!
            </CopiedTooltip>
          )}
        </TokenAddressContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
