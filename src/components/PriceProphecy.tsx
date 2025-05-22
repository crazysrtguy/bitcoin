import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import MockSmsDisplay from './MockSmsDisplay';

const ProphecySection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const ProphecyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const ProphecyTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const ProphecyDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const OracleContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CrystalBall = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 70px 70px,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(247, 147, 26, 0.3) 40%,
    rgba(0, 0, 0, 0.8) 100%
  );
  box-shadow: 0 0 30px rgba(247, 147, 26, 0.5),
              inset 0 0 30px rgba(247, 147, 26, 0.3);
  position: relative;
  margin-bottom: 40px;
  cursor: pointer;
  overflow: hidden;
`;

const CrystalInner = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(247, 147, 26, 0.2) 0%,
    rgba(255, 0, 255, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const BitcoinSymbol = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: rgba(247, 147, 26, 0.7);
`;

const SacrificeForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputLabel = styled.label`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #f7931a;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 5px;
  color: white;
  font-family: 'VT323', monospace;
  font-size: 18px;

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(247, 147, 26, 0.5);
  }
`;

const SacrificeButton = styled(motion.button)`
  background: #f7931a;
  color: black;
  border: none;
  padding: 12px 24px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #ff00ff;
    color: white;
  }
`;

const ProphecyDisplay = styled(motion.div)`
  width: 100%;
  min-height: 150px;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
  text-align: left;
  font-family: 'VT323', monospace;
  font-size: 1.2rem;
  color: #00ff00;
  position: relative;
  overflow: hidden;
`;

const ProphecyText = styled(motion.p)`
  margin-bottom: 15px;
  line-height: 1.5;
`;

const ProphecyDate = styled.span`
  color: #ff00ff;
  font-weight: bold;
`;

const ProphecyPrice = styled.span`
  color: #f7931a;
  font-weight: bold;
`;

const ProphecyBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/matrix-bg.jpg');
  opacity: 0.1;
  z-index: 0;
  pointer-events: none;
`;

const ProphecyContent = styled.div`
  position: relative;
  z-index: 1;
`;

// Price prophecy generator
const generateProphecy = () => {
  // Random year between current year + 1 and current year + 10
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 10) + 1;

  // Random month
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[Math.floor(Math.random() * months.length)];

  // Random price based on absurdity level
  const absurdityLevel = Math.random();
  let price;

  if (absurdityLevel < 0.2) {
    // Somewhat reasonable (100k - 500k)
    price = Math.floor(Math.random() * 400000) + 100000;
  } else if (absurdityLevel < 0.5) {
    // Pretty absurd (500k - 1M)
    price = Math.floor(Math.random() * 500000) + 500000;
  } else if (absurdityLevel < 0.8) {
    // Very absurd (1M - 10M)
    price = Math.floor(Math.random() * 9000000) + 1000000;
  } else {
    // Completely insane (10M - 100M)
    price = Math.floor(Math.random() * 90000000) + 10000000;
  }

  // Format price with commas
  const formattedPrice = price.toLocaleString();

  // Random prophecy templates
  const prophecyTemplates = [
    `By <DATE>, one Bitcoin will be worth $<PRICE>. The prophecy is clear. The signs are all around us.`,
    `The oracle reveals that in <DATE>, Bitcoin will reach $<PRICE>. Those who HODL shall be rewarded.`,
    `$<PRICE> per Bitcoin by <DATE>. This is not a prediction. This is mathematical certainty.`,
    `The cosmic alignment of <DATE> will bring Bitcoin to $<PRICE>. The non-believers will weep.`,
    `When the moon is full in <DATE>, Bitcoin shall ascend to $<PRICE>. This is the way.`,
    `The ancient scrolls predict Bitcoin will reach $<PRICE> by <DATE>. Satoshi's vision will be fulfilled.`,
    `The stars have aligned. By <DATE>, Bitcoin will be worth $<PRICE>. Prepare for the new world order.`,
    `The prophecy is written in code: $<PRICE> per Bitcoin in <DATE>. Those who doubt will be left behind.`,
    `The Bitcoin gods have spoken. In <DATE>, one coin shall be worth $<PRICE>. This is the divine truth.`,
    `As foretold in the whitepaper, Bitcoin shall reach $<PRICE> by <DATE>. The revolution is inevitable.`
  ];

  const template = prophecyTemplates[Math.floor(Math.random() * prophecyTemplates.length)];
  const prophecy = template
    .replace('<DATE>', `${month} ${year}`)
    .replace('<PRICE>', formattedPrice);

  return {
    text: prophecy,
    date: `${month} ${year}`,
    price: formattedPrice
  };
};

const PriceProphecy: React.FC = () => {
  const [wallet, setWallet] = useState('');
  const [phone, setPhone] = useState('');
  const [prophecy, setProphecy] = useState<{ text: string, date: string, price: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sacrificeCount, setSacrificeCount] = useState(0);
  const [showSmsDisplay, setShowSmsDisplay] = useState(false);

  const crystalControls = useAnimation();
  const prophecyControls = useAnimation();

  // Sound effects
  const crystalSound = new Howl({
    src: ['/crystal-ball.mp3'],
    volume: 0.5,
  });

  const prophecySound = new Howl({
    src: ['/prophecy.mp3'],
    volume: 0.7,
  });

  const handleCrystalClick = () => {
    crystalControls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 1 }
    });

    crystalSound.play();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!wallet && !phone) return;

    setIsGenerating(true);
    crystalSound.play();

    // Animate crystal ball
    crystalControls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
      transition: { duration: 2 }
    });

    // Generate prophecy after animation
    setTimeout(() => {
      const newProphecy = generateProphecy();
      setProphecy(newProphecy);
      setIsGenerating(false);
      setSacrificeCount(prev => prev + 1);

      // If phone number was provided, show the SMS display
      if (phone) {
        // Short delay before showing SMS display
        setTimeout(() => {
          setShowSmsDisplay(true);
        }, 1000);
      }

      // Clear form
      setWallet('');
      // Don't clear phone if we're showing SMS display
      if (!phone) {
        setPhone('');
      }

      // Play prophecy sound
      prophecySound.play();

      // Animate prophecy display
      prophecyControls.start({
        opacity: [0, 1],
        y: [50, 0],
        transition: { duration: 0.5 }
      });
    }, 2000);
  };

  return (
    <ProphecySection>
      <ProphecyContainer>
        <ProphecyTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Price Prophecy Generator
        </ProphecyTitle>

        <ProphecyDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Sacrifice your wallet address or phone number to receive increasingly absurd Bitcoin price predictions.
          The oracle demands personal information in exchange for glimpses of the future.
        </ProphecyDescription>

        <OracleContainer>
          <CrystalBall
            onClick={handleCrystalClick}
            animate={crystalControls}
            whileHover={{ scale: 1.05 }}
          >
            <CrystalInner
              animate={{
                rotate: 360,
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3, repeat: Infinity, repeatType: "mirror" }
              }}
            />
            <BitcoinSymbol
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              ₿
            </BitcoinSymbol>
          </CrystalBall>

          <SacrificeForm onSubmit={handleSubmit}>
            <InputGroup>
              <InputLabel>Sacrifice Your Wallet Address:</InputLabel>
              <Input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Your Solana wallet address (e.g., 8xpGJ..."
              />
            </InputGroup>

            <InputGroup>
              <InputLabel>OR Your Phone Number:</InputLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(123) 456-7890"
              />
            </InputGroup>

            <SacrificeButton
              type="submit"
              disabled={isGenerating || (!wallet && !phone)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? "CONSULTING THE ORACLE..." : "RECEIVE PROPHECY"}
            </SacrificeButton>
          </SacrificeForm>

          {prophecy && (
            <ProphecyDisplay
              animate={prophecyControls}
              initial={{ opacity: 0, y: 50 }}
            >
              <ProphecyBackground
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              <ProphecyContent>
                <ProphecyText>
                  {prophecy.text.split('<DATE>').map((part, i, arr) => {
                    if (i === arr.length - 1) return part;
                    return (
                      <React.Fragment key={i}>
                        {part}<ProphecyDate>{prophecy.date}</ProphecyDate>
                      </React.Fragment>
                    );
                  }).reduce((prev, curr) => (
                    <>{prev}{curr}</>
                  ))}
                </ProphecyText>

                {sacrificeCount > 1 && (
                  <ProphecyText>
                    The more you sacrifice, the more accurate the prophecy becomes.
                    Your faith in the oracle grows stronger with each offering.
                  </ProphecyText>
                )}

                {sacrificeCount > 2 && (
                  <ProphecyText>
                    You have made {sacrificeCount} sacrifices to the oracle.
                    Your devotion is noted. The prophecy grows more certain.
                  </ProphecyText>
                )}
              </ProphecyContent>
            </ProphecyDisplay>
          )}
        </OracleContainer>

        {/* Mock SMS Display */}
        <AnimatePresence>
          {showSmsDisplay && (
            <MockSmsDisplay
              phoneNumber={phone}
              onClose={() => {
                setShowSmsDisplay(false);
                setPhone(''); // Clear phone after closing
              }}
            />
          )}
        </AnimatePresence>
      </ProphecyContainer>
    </ProphecySection>
  );
};

export default PriceProphecy;
