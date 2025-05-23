import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

// Animations
const mysticalGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 102, 0, 0.3)); }
  50% { filter: drop-shadow(0 0 30px rgba(255, 102, 0, 0.8)); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(255, 102, 0, 0.5), 0 0 20px rgba(255, 102, 0, 0.3); }
  50% { text-shadow: 0 0 20px rgba(255, 102, 0, 0.8), 0 0 30px rgba(255, 102, 0, 0.5); }
`;

const letterFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-3px); }
  75% { transform: translateY(3px); }
`;

const letterRotate = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

// Styled Components
const BookSection = styled.section`
  min-height: 800px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a, #1a0033);
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;

  @media (max-width: 768px) {
    min-height: 700px;
    padding: 30px 0;
  }

  @media (max-width: 480px) {
    min-height: 600px;
    padding: 20px 0;
  }
`;

const BookContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const BookTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 0 10px rgba(247, 147, 26, 0.5);

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

const BookDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
  color: #ffaa00;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 20px;
    padding: 0 10px;
  }
`;

const AnimatedLetter = styled.span<{ $delay: number, $color?: string }>`
  display: inline-block;
  animation: ${letterFloat} 2s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  color: ${props => props.$color || '#ffaa00'};
  font-weight: bold;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.5);

  &:hover {
    animation: ${letterRotate} 1s ease-in-out;
    color: #ff6600;
  }
`;

const AnimatedAcronym = styled.div`
  font-size: 1.2rem;
  margin: 20px 0;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(255, 102, 0, 0.3);
  animation: ${glowPulse} 3s infinite ease-in-out;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 10px 0;
    padding: 8px;
  }
`;

const BookWrapper = styled.div`
  perspective: 1000px;
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const Book = styled.div<{ $mystical: boolean }>`
  position: relative;
  width: 400px;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  cursor: grab;
  animation: ${props => props.$mystical ? mysticalGlow : 'none'} 3s ease-in-out infinite;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 450px;
  }

  @media (max-width: 480px) {
    width: 260px;
    height: 390px;
  }
`;

const Page = styled(motion.div)<{ $isFlipped: boolean, $zIndex: number, $pageColor: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${props => props.$pageColor};
  border: 3px solid #d4af37;
  border-radius: 10px;
  backface-visibility: hidden;
  transform-origin: left center;
  transform: ${props => props.$isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3), inset 0 0 10px rgba(212, 175, 55, 0.2);
  z-index: ${props => props.$zIndex};
`;

const PageContent = styled.div`
  padding: 20px 25px;
  height: calc(100% - 40px);
  overflow-y: auto; /* Changed from hidden to auto to allow scrolling if needed */
  color: #333;
  font-family: 'Georgia', serif;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 12px;
    height: calc(100% - 30px);
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
    font-size: 10px;
    height: calc(100% - 24px);
    line-height: 1.4;
  }
`;

const PageTitle = styled.h4`
  color: #ff6600;
  margin-bottom: 15px;
  font-size: 1.5em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3em;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
`;

const PageContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  justify-content: flex-start; /* Changed from space-around to flex-start */

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;

    /* Make paragraphs more compact on mobile */
    p {
      margin: 0 0 4px 0;
      padding: 0;
    }

    /* Make the last paragraph have some bottom margin */
    p:last-child {
      margin-bottom: 10px;
    }
  }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const FrontCover = styled(Page)`
  background: #000;
  color: #fff;
  z-index: 10;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(135deg, rgba(26, 0, 51, 0.9) 0%, rgba(51, 0, 102, 0.9) 50%, rgba(255, 102, 0, 0.9) 100%),
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M60 30L0 30' stroke='%23f7931a' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E");
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at center, rgba(255, 170, 0, 0.2) 0%, rgba(0, 0, 0, 0) 70%),
      repeating-linear-gradient(45deg, rgba(255, 102, 0, 0.05) 0px, rgba(255, 102, 0, 0.05) 2px, transparent 2px, transparent 10px);
    mix-blend-mode: overlay;
    z-index: -1;
  }
`;

const FrontCoverContent = styled(PageContent)`
  text-align: center;
  align-items: center;
  overflow: hidden;
  padding: 15px 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: 480px) {
    padding: 10px 5px;
  }
`;

const CoverTitle = styled.div`
  width: 85%;
  max-width: 250px;
  background: linear-gradient(135deg, #ff6600, #ffaa00);
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.5);
  margin-top: 20px;
  margin-bottom: 15px;
  border: 2px solid #fff;

  h3 {
    color: #000;
    margin: 0;
    font-size: 1.5em;
    font-weight: bold;
    text-shadow: 1px 1px 0 #fff;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-width: 200px;
    padding: 5px 10px;
    margin-top: 15px;
    margin-bottom: 10px;

    h3 {
      font-size: 1.2em;
    }
  }
`;

const BitcoinSymbol = styled.div`
  font-size: 60px;
  margin: 5px 0;
  filter: drop-shadow(0 0 10px rgba(255, 170, 0, 0.7));

  @media (max-width: 480px) {
    font-size: 45px;
    margin: 2px 0;
  }
`;

const AcronymContainer = styled.div`
  width: 75%;
  background: rgba(0,0,0,0.5);
  padding: 8px;
  border-radius: 8px;
  margin: 10px 0;
  border: 1px solid rgba(255,255,255,0.2);

  @media (max-width: 480px) {
    width: 85%;
    padding: 6px;
    margin: 8px 0;
  }
`;

const AcronymTitle = styled.p`
  font-size: 18px;
  color: #ffaa00;
  font-weight: bold;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 2px;
  }
`;

const AcronymList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  p {
    font-size: 12px;
    color: #fff;
    margin: 0;
  }

  span {
    color: #ff6600;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    gap: 0;

    p {
      font-size: 11px;
    }
  }
`;

const EditionInfo = styled.div`
  width: 65%;
  margin-top: 5px;
  padding: 4px 8px;
  background: rgba(255, 102, 0, 0.2);
  border-radius: 5px;

  p:first-child {
    font-size: 10px;
    color: #ffaa00;
    font-weight: bold;
    margin: 0;
  }

  p:last-child {
    font-size: 8px;
    color: #aaa;
    margin: 0;
  }

  @media (max-width: 480px) {
    width: 70%;
    margin-top: 3px;
    padding: 3px 6px;

    p:first-child {
      font-size: 9px;
    }

    p:last-child {
      font-size: 7px;
    }
  }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SolanaStamp = styled.div`
  position: absolute;
  bottom: 5px;
  right: 15px;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: rotate(-15deg);
  z-index: 10;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    bottom: 0px;
    right: 10px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: -5px;
    right: 5px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px dashed #14f195;
    border-radius: 50%;
    animation: ${rotate} 30s linear infinite;
    box-shadow: 0 0 10px rgba(20, 241, 149, 0.6);
  }

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border: 1px solid #14f195;
    border-radius: 50%;
    opacity: 0.9;
    background: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 480px) {
    &::before {
      border-width: 1px;
    }

    &::after {
      top: 2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
    }
  }
`;

const StampContent = styled.div`
  text-align: center;
  z-index: 1;
  position: relative;

  .bitcoin {
    font-size: 16px;
    color: #f7931a;
    margin-bottom: 2px;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(247, 147, 26, 0.8);

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 10px;
      margin-bottom: 1px;
    }
  }

  .on {
    font-size: 10px;
    color: #fff;
    margin: 1px 0;
    text-shadow: 0 0 3px rgba(255, 255, 255, 0.8);

    @media (max-width: 768px) {
      font-size: 8px;
    }

    @media (max-width: 480px) {
      font-size: 6px;
      margin: 0;
    }
  }

  .solana {
    font-size: 14px;
    color: #14f195;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(20, 241, 149, 0.8);

    @media (max-width: 768px) {
      font-size: 12px;
    }

    @media (max-width: 480px) {
      font-size: 8px;
    }
  }
`;

const ScrollableContent = styled.div`
  overflow-y: auto;
  height: 100%;
  padding-right: 10px;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #f7931a, #ff6600);
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #ff6600, #ff3300);
    box-shadow: 0 0 5px rgba(255, 102, 0, 0.5);
  }

  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 4px;
    }
  }
`;

// We don't need a separate BackCover component since we're using the Page component with styling
const BackCoverContent = styled(PageContent)`
  background: linear-gradient(135deg, #ff6600, #330066, #1a0033);
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at center, rgba(255, 170, 0, 0.2) 0%, rgba(0, 0, 0, 0) 70%),
      repeating-linear-gradient(45deg, rgba(255, 102, 0, 0.05) 0px, rgba(255, 102, 0, 0.05) 2px, transparent 2px, transparent 10px);
    mix-blend-mode: overlay;
    z-index: -1;
  }
`;

const NavigationControls = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media (max-width: 480px) {
    margin-top: 20px;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const PageButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6600, #cc3300);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 102, 0, 0.5);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 102, 0, 0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 8px;
  }
`;

const PageIndicator = styled.span`
  margin: 0 20px;
  color: #ffaa00;
  font-weight: bold;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin: 0 10px;
    width: 100%;
    text-align: center;
    order: -1;
    margin-bottom: 10px;
  }
`;

const Instructions = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    margin-top: 15px;
    padding: 0 15px;
  }
`;

const FloatingBitcoin = styled(motion.div)`
  position: fixed;
  font-size: 30px;
  color: #ff6600;
  z-index: 50;
  pointer-events: none;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const SatoshiBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMystical, setIsMystical] = useState(false);
  const [floatingBitcoins, setFloatingBitcoins] = useState<{id: number, x: number, y: number}[]>([]);
  const bitcoinCount = useRef(0);
  const totalPages = 11; // Increased to include back cover
  const bookRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // Sound effects - with fallback to prevent errors if files don't exist
  const pageSound = new Howl({
    src: ['/page-turn.mp3'],
    volume: 0.7,
    preload: true,
    onloaderror: () => console.log('Page turn sound not found, continuing without sound')
  });

  const mysticalSound = new Howl({
    src: ['/mystical.mp3'],
    volume: 0.5,
    preload: true,
    onloaderror: () => console.log('Mystical sound not found, continuing without sound')
  });

  const twinkleSound = new Howl({
    src: ['/twinkle.mp3'],
    volume: 0.6,
    preload: true,
    onloaderror: () => console.log('Twinkle sound not found, continuing without sound')
  });

  // Page colors
  const pageColors = [
    'linear-gradient(135deg, #1a0033, #330066, #ff6600)', // Front cover
    'linear-gradient(135deg, #fff8dc, #f0e68c)', // Page 1
    'linear-gradient(135deg, #ffe4e1, #ffd4d4)', // Page 2
    'linear-gradient(135deg, #e0ffe0, #d4f0d4)', // Page 3
    'linear-gradient(135deg, #e6e6fa, #d8bfd8)', // Page 4
    'linear-gradient(135deg, #f5f5dc, #deb887)', // Page 5
    'linear-gradient(135deg, #ffdab9, #ffa07a)', // Page 6
    'linear-gradient(135deg, #d8bfd8, #dda0dd)', // Page 7
    'linear-gradient(135deg, #b0e0e6, #add8e6)', // Page 8
    'linear-gradient(135deg, #f0fff0, #98fb98)', // Page 9
    'linear-gradient(135deg, #ff6600, #330066, #1a0033)' // Back cover
  ];

  // Page content
  const pageContents = [
    // Front Cover
    <FrontCoverContent key="cover">
      <CoverTitle>
        <h3>THE BITCOIN BIBLE</h3>
      </CoverTitle>

      <BitcoinSymbol>₿</BitcoinSymbol>

      <AcronymContainer>
        <AcronymTitle>B.I.T.C.O.I.N.</AcronymTitle>
        <AcronymList>
          <p><span>B</span>rainwashed</p>
          <p><span>I</span>diots</p>
          <p><span>T</span>otally</p>
          <p><span>C</span>onvinced</p>
          <p><span>O</span>f</p>
          <p><span>I</span>nevitable</p>
          <p><span>N</span>irvana</p>
        </AcronymList>
      </AcronymContainer>

      <EditionInfo>
        <p>UNCENSORED EDITION</p>
        <p>Genesis Block Publications</p>
      </EditionInfo>
    </FrontCoverContent>,

    // Page 1
    <PageContent key="page1">
      <PageTitle>Chapter 1: Genesis</PageTitle>
      <PageContentWrapper>
        <p><strong>1:1</strong> In the beginning was the Code, and the Code was with Satoshi, and the Code was Satoshi.</p>
        <p><strong>1:2</strong> And the earth was without form, and void of sound money; and darkness was upon the face of the fiat system.</p>
        <p><strong>1:3</strong> And Satoshi said, Let there be Bitcoin: and there was Bitcoin.</p>
        <p><strong>1:4</strong> And Satoshi saw the Bitcoin, that it was good: and Satoshi divided the Bitcoin from the shitcoins.</p>
        <p><strong>1:5</strong> And Satoshi called the Bitcoin "digital gold," and the shitcoins he called "exit liquidity."</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 2
    <PageContent key="page2">
      <PageTitle>Chapter 21: The Sacred 21 Million</PageTitle>
      <PageContentWrapper>
        <p><strong>21:1</strong> And Satoshi said unto the believers: "There shall be only 21 million Bitcoin, no more, no less."</p>
        <p><strong>21:2</strong> "For scarcity is the mother of all diamond hands, and diamond hands are the path to nirvana."</p>
        <p><strong>21:3</strong> And the people asked: "But Lord Satoshi, what if we lose our private keys?"</p>
        <p><strong>21:4</strong> And Satoshi replied: "Then you have made the ultimate sacrifice, making all remaining Bitcoin more valuable."</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>21:420</strong> "The Brainwashed Idiots shall inherit the blockchain."</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 3
    <PageContent key="page3">
      <PageTitle>Chapter 69: The HODL Commandments</PageTitle>
      <PageContentWrapper>
        <p><strong>I.</strong> Thou shalt HODL through all market conditions, even unto financial ruin.</p>
        <p><strong>II.</strong> Thou shalt buy every dip, even if thou must sell thy children's college fund.</p>
        <p><strong>III.</strong> Thou shalt not speak ill of Bitcoin, even when it crashes 90%.</p>
        <p><strong>IV.</strong> Honor thy diamond hands and thy paper hands shall be shamed.</p>
        <p><strong>V.</strong> Thou shalt not covet thy neighbor's gains, for they are probably lying.</p>
        <p><strong>VI.</strong> Remember the whitepaper, to keep it holy and never actually read it.</p>
        <p><strong>VII.</strong> Thou shalt orange-pill thy family unto the third and fourth generation.</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 4
    <PageContent key="page4">
      <PageTitle>Chapter 420: Prophecies of the Moon</PageTitle>
      <ScrollableContent>
        <PageContentWrapper>
          <p><strong>420:1</strong> And the believers did gather on Twitter, speaking in tongues of "laser eyes" and "few understand."</p>
          <p><strong>420:2</strong> They did prophecy great pumpings, saying "Bitcoin to $1 million by end of year."</p>
          <p><strong>420:3</strong> And the prophet Michael Saylor did appear, saying "I have sold my soul for Bitcoin."</p>
          <p><strong>420:4</strong> The people did mortgage their houses, for they had faith that number would go up.</p>
          <p><strong>420:5</strong> And lo, the HODLers did create elaborate spreadsheets to justify their financial decisions to their spouses.</p>
          <p><strong>420:6</strong> "Dollar cost average," they chanted, as their portfolios bled redder than the blood of sacrificial bulls.</p>
          <p><strong>420:7</strong> The wise among them set limit orders, but the foolish went all-in at the top, for they were overcome with FOMO.</p>
          <p><strong>420:8</strong> And the whales did dump upon the retail investors, as was foretold in the ancient charts.</p>
          <p><strong>420:9</strong> "This is good for Bitcoin," they repeated, as their net worth plummeted faster than a shitcoin after a rug pull.</p>
          <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>420:69</strong> "When the moon comes, Lambo dealers shall rejoice, and ramen manufacturers shall weep."</p>
        </PageContentWrapper>
      </ScrollableContent>
    </PageContent>,

    // Page 5
    <PageContent key="page5">
      <PageTitle>Chapter 666: The FUD Demons</PageTitle>
      <PageContentWrapper>
        <p><strong>666:1</strong> And lo, the FUD demons did emerge from the pit of traditional finance, spewing lies about "intrinsic value" and "tulip bubbles."</p>
        <p><strong>666:2</strong> "Bitcoin is a fucking scam," they cried, as their fiat empires crumbled around them. "It has no backing!"</p>
        <p><strong>666:3</strong> But the HODLers stood firm, middle fingers raised to the heavens, screaming "HAVE FUN STAYING POOR, BOOMERS!"</p>
        <p><strong>666:4</strong> For it is written: "The non-believers shall be REKT, and their shitcoins shall be forgotten."</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>666:5</strong> "Better to be a Brainwashed Idiot with diamond hands than a paper-handed bitch with a 401k."</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 6
    <PageContent key="page6">
      <PageTitle>Chapter 58008: The Holy Trinity</PageTitle>
      <PageContentWrapper>
        <p><strong>58008:1</strong> Worship the Holy Trinity of crypto: Buy high, sell low, and blame Elon Musk.</p>
        <p><strong>58008:2</strong> "But Lord Satoshi," asked the disciples, "what if we actually make money?" And Satoshi replied, "That's against the fucking rules, dipshit."</p>
        <p><strong>58008:3</strong> For true enlightenment comes not from profits, but from the friends we made along the way (who are also broke as shit).</p>
        <p><strong>58008:4</strong> "Blessed are the degens, for they shall provide exit liquidity for the whales."</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>58008:5</strong> "The path to Nirvana is paved with liquidated longs and margin calls."</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 7
    <PageContent key="page7">
      <PageTitle>Chapter 80085: The Cult Rituals</PageTitle>
      <PageContentWrapper>
        <p><strong>80085:1</strong> Every morning, thou shalt check the price 69 times before getting out of bed.</p>
        <p><strong>80085:2</strong> When Bitcoin dumps, thou shalt post "BTFD" and "This is healthy" while secretly shitting thy pants.</p>
        <p><strong>80085:3</strong> Thou shalt call everyone who sells a "paper-handed little bitch" even as thy own finger hovers over the sell button.</p>
        <p><strong>80085:4</strong> "When in doubt, zoom the fuck out," sayeth the Lord. "And if that doesn't work, zoom out further until you see the goddamn dinosaurs."</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>80085:5</strong> "The most sacred ritual: Telling your spouse you sold at the top when you're actually down 80%."</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 8
    <PageContent key="page8">
      <PageTitle>Chapter 42069: The Beatitudes</PageTitle>
      <PageContentWrapper>
        <p><strong>42069:1</strong> Blessed are the Brainwashed, for they shall inherit worthless NFTs.</p>
        <p><strong>42069:2</strong> Blessed are the Idiots who buy the top, for they shall provide liquidity for early investors.</p>
        <p><strong>42069:3</strong> Blessed are those Totally rekt by leverage, for they shall receive thoughts and prayers.</p>
        <p><strong>42069:4</strong> Blessed are the Convinced who ignore all red flags, for they are too stupid to feel pain.</p>
        <p><strong>42069:5</strong> Blessed are those seeking Inevitable gains, for they shall find tax write-offs instead.</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold' }}><strong>42069:6</strong> Blessed are those who reach Nirvana, for they have finally deleted their fucking trading apps.</p>
      </PageContentWrapper>
    </PageContent>,

    // Page 9
    <PageContent key="page9">
      <PageTitle>The Final Prophecy</PageTitle>
      <PageContentWrapper>
        <p style={{ fontWeight: 'bold' }}>And Satoshi spake these final words before ascending to the blockchain heaven:</p>
        <p>"When the last Bitcoin is mined, and the last shitcoin has rugged, only the true believers shall remain."</p>
        <p>"They shall be known by their diamond hands and empty bank accounts."</p>
        <p>"And lo, they shall create a new memecoin called BITCOIN, which shall mock everything I created."</p>
        <p>"And it shall be the most honest fucking coin in the universe, for it admits what all crypto truly is:"</p>
        <p style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '16px', textAlign: 'center', marginTop: '5px' }}>"Brainwashed Idiots Totally Convinced Of Inevitable Nirvana"</p>
      </PageContentWrapper>
    </PageContent>,

    // Back Cover
    <BackCoverContent key="backcover">
      <PageTitle style={{ fontSize: '1.4em', marginBottom: '15px', color: '#f7931a' }}>About the Author</PageTitle>
      <ScrollableContent>
        <PageContentWrapper>
          <p style={{ fontSize: '14px', color: '#fff' }}><strong>Satoshi Nakamoto</strong> is the pseudonymous creator of Bitcoin and the spiritual guide of millions of brainwashed idiots worldwide.</p>
          <p style={{ color: '#fff' }}>His revolutionary work "The Whitepaper" has inspired countless people to make questionable financial decisions.</p>
          <p style={{ color: '#fff' }}>Satoshi currently resides in digital eternity, watching over his disciples as they HODL unto financial ruin.</p>
          <p style={{ color: '#fff' }}>Some say he's still out there, laughing at all the fools who took his joke currency seriously and turned it into a religion.</p>
          <p style={{ color: '#fff' }}>Others believe he ascended to a higher plane of existence where transaction fees don't exist and blocks are confirmed instantly.</p>
          <div style={{
            fontSize: '12px',
            color: '#aaa',
            fontStyle: 'italic',
            textAlign: 'center',
            marginTop: '15px',
            padding: '8px',
            border: '1px dashed rgba(255, 102, 0, 0.3)',
            borderRadius: '5px'
          }}>
            "Not your keys, not your crypto.<br />
            Not your brain, not your problem."<br />
            <span style={{ fontSize: '10px', marginTop: '5px', display: 'block' }}>- Satoshi Nakamoto</span>
          </div>
        </PageContentWrapper>
      </ScrollableContent>

      <SolanaStamp>
        <StampContent>
          <div className="bitcoin">BITCOIN</div>
          <div className="on">on</div>
          <div className="solana">SOLANA</div>
        </StampContent>
      </SolanaStamp>
    </BackCoverContent>
  ];

  // Create floating Bitcoin
  const createFloatingBitcoin = () => {
    const id = bitcoinCount.current++;
    const x = Math.random() * window.innerWidth;

    setFloatingBitcoins(prev => [...prev, { id, x, y: window.innerHeight }]);

    // Remove bitcoin after animation
    setTimeout(() => {
      setFloatingBitcoins(prev => prev.filter(bitcoin => bitcoin.id !== id));
    }, 8000);
  };

  // Next page function
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      // Play sound effects based on the page
      try {
        // Use twinkle sound only for first page turn (from cover to page 1)
        // and when turning to the last page (back cover)
        if (currentPage === 0 || currentPage === totalPages - 2) {
          twinkleSound.play();
        } else {
          // Use page flip sound for all other pages
          pageSound.play();
        }
      } catch (error) {
        console.log('Error playing sound effect');
      }

      setCurrentPage(prev => prev + 1);

      setIsMystical(true);

      // Play mystical sound for visual effect
      try {
        mysticalSound.play();
      } catch (error) {
        console.log('Error playing mystical sound');
      }

      setTimeout(() => setIsMystical(false), 2000);

      // Create floating bitcoins on certain pages
      if ([1, 3, 5, 7, 8].includes(currentPage)) {
        // Create multiple bitcoins for the more outrageous pages
        const count = currentPage >= 5 ? 3 : 1;
        for (let i = 0; i < count; i++) {
          setTimeout(() => createFloatingBitcoin(), i * 300);
        }
      }
    }
  };

  // Previous page function
  const previousPage = () => {
    if (currentPage > 0) {
      try {
        // Use twinkle sound when going back to the cover
        if (currentPage === 1) {
          twinkleSound.play();
        } else {
          // Use page flip sound for all other pages
          pageSound.play();
        }
      } catch (error) {
        console.log('Error playing sound effect');
      }
      setCurrentPage(prev => prev - 1);
    }
  };

  // Handle mouse and touch events for page turning
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (bookRef.current && bookRef.current.contains(e.target as Node)) {
        isDragging.current = true;
        startX.current = e.clientX;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const deltaX = e.clientX - startX.current;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            nextPage();
          } else {
            previousPage();
          }
          isDragging.current = false;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (bookRef.current && bookRef.current.contains(e.target as Node)) {
        startX.current = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (bookRef.current && bookRef.current.contains(e.target as Node)) {
        const deltaX = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            nextPage();
          } else {
            previousPage();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage]);

  // Create animated text for the acronym
  const renderAnimatedAcronym = () => {
    const fullName = "Brainwashed Idiots Totally Convinced Of Inevitable Nirvana";
    const words = fullName.split(' ');
    const acronym = "BITCOIN";

    return (
      <AnimatedAcronym>
        {words.map((word, index) => (
          <React.Fragment key={index}>
            <AnimatedLetter
              $delay={index * 0.2}
              $color={index === 0 ? '#ff6600' : undefined}
            >
              {word.charAt(0)}
            </AnimatedLetter>
            {word.slice(1)}
            {index < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </AnimatedAcronym>
    );
  };

  return (
    <BookSection>
      <BookContainer>
        <BookTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          📖 THE SACRED BOOK OF SATOSHI
        </BookTitle>

        <BookDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          The holy scriptures of our Bitcoin cult, written by the prophet himself
        </BookDescription>

        {renderAnimatedAcronym()}

        <BookWrapper>
          <Book ref={bookRef} $mystical={isMystical}>
            {pageContents.map((content, index) => (
              <Page
                key={index}
                $isFlipped={index < currentPage}
                $zIndex={totalPages - index}
                $pageColor={pageColors[index]}
              >
                {content}
              </Page>
            ))}
          </Book>
        </BookWrapper>

        <NavigationControls>
          <PageButton
            onClick={previousPage}
            disabled={currentPage === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← PREVIOUS VERSE
          </PageButton>

          <PageIndicator>
            Page {currentPage + 1} of {totalPages}
          </PageIndicator>

          <PageButton
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NEXT VERSE →
          </PageButton>
        </NavigationControls>

        <Instructions>
          Click and drag to turn pages • Swipe on mobile • Experience the divine revelation
        </Instructions>

        {/* Floating Bitcoins */}
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
      </BookContainer>
    </BookSection>
  );
};

export default SatoshiBook;
