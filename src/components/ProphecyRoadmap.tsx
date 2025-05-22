import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 10px rgba(247, 147, 26, 0.5); }
  50% { box-shadow: 0 0 30px rgba(247, 147, 26, 0.8); }
  100% { box-shadow: 0 0 10px rgba(247, 147, 26, 0.5); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const RoadmapSection = styled.section`
  min-height: 800px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0a0a, #1a0033);
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const RoadmapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const RoadmapTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 0 10px rgba(247, 147, 26, 0.5);
`;

const RoadmapDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  margin: 60px 0;
  padding-bottom: 40px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 6px;
    background: linear-gradient(to bottom, #f7931a, #ff00ff, #00ffff);
    transform: translateX(-50%);
    z-index: 1;

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)<{ $isLeft: boolean }>`
  position: relative;
  width: 50%;
  padding: 0 40px;
  margin-bottom: 60px;
  ${props => props.$isLeft ? 'left: 0;' : 'left: 50%;'}

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 70px;
    left: 0;
  }
`;

const TimelineContent = styled(motion.div)<{ $phase: number }>`
  position: relative;
  padding: 30px;
  border-radius: 15px;
  background: ${props => {
    switch(props.$phase) {
      case 1: return 'linear-gradient(135deg, #330066, #000033)';
      case 2: return 'linear-gradient(135deg, #660033, #330033)';
      case 3: return 'linear-gradient(135deg, #663300, #331800)';
      case 4: return 'linear-gradient(135deg, #006633, #003333)';
      case 5: return 'linear-gradient(135deg, #990000, #330000)';
      default: return 'linear-gradient(135deg, #330066, #000033)';
    }
  }};
  border: 3px solid ${props => {
    switch(props.$phase) {
      case 1: return '#f7931a';
      case 2: return '#ff00ff';
      case 3: return '#ffcc00';
      case 4: return '#00ffcc';
      case 5: return '#ff3300';
      default: return '#f7931a';
    }
  }};
  box-shadow: 0 0 20px rgba(247, 147, 26, 0.3);
  animation: ${glow} 3s infinite ease-in-out;

  &:hover {
    animation: ${pulse} 1s infinite ease-in-out;
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.$phase % 2 === 1 ? 'right: -15px; transform: translateY(-50%) rotate(45deg);' : 'left: -15px; transform: translateY(-50%) rotate(-135deg);'}
    width: 30px;
    height: 30px;
    background: inherit;
    border: 3px solid ${props => {
      switch(props.$phase) {
        case 1: return '#f7931a';
        case 2: return '#ff00ff';
        case 3: return '#ffcc00';
        case 4: return '#00ffcc';
        case 5: return '#ff3300';
        default: return '#f7931a';
      }
    }};
    border-width: 3px 3px 0 0;
    z-index: 2;

    @media (max-width: 768px) {
      left: -15px;
      transform: translateY(-50%) rotate(-135deg);
    }
  }
`;

const TimelineDate = styled.div<{ $phase: number }>`
  position: absolute;
  top: -30px;
  ${props => props.$phase % 2 === 1 ? 'right: 40px;' : 'left: 40px;'}
  background: ${props => {
    switch(props.$phase) {
      case 1: return '#f7931a';
      case 2: return '#ff00ff';
      case 3: return '#ffcc00';
      case 4: return '#00ffcc';
      case 5: return '#ff3300';
      default: return '#f7931a';
    }
  }};
  color: #000;
  padding: 10px 20px;
  border-radius: 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  font-weight: bold;
  z-index: 3;

  @media (max-width: 768px) {
    left: 70px;
    font-size: 12px;
    padding: 8px 15px;
  }
`;

const TimelineIcon = styled(motion.div)<{ $phase: number }>`
  position: absolute;
  top: 50%;
  ${props => props.$phase % 2 === 1 ? 'right: -73px;' : 'left: -73px;'}
  width: 50px;
  height: 50px;
  background: #000;
  border-radius: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border: 3px solid ${props => {
    switch(props.$phase) {
      case 1: return '#f7931a';
      case 2: return '#ff00ff';
      case 3: return '#ffcc00';
      case 4: return '#00ffcc';
      case 5: return '#ff3300';
      default: return '#f7931a';
    }
  }};
  z-index: 4;
  animation: ${float} 3s infinite ease-in-out;

  @media (max-width: 768px) {
    left: 5px;
  }
`;

const TimelineTitle = styled.h3<{ $phase: number }>`
  margin-bottom: 15px;
  color: ${props => {
    switch(props.$phase) {
      case 1: return '#f7931a';
      case 2: return '#ff00ff';
      case 3: return '#ffcc00';
      case 4: return '#00ffcc';
      case 5: return '#ff3300';
      default: return '#f7931a';
    }
  }};
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TimelineText = styled.p`
  margin-bottom: 15px;
  font-size: 1rem;
  line-height: 1.6;
`;

const TimelineFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 15px 0;
  text-align: left;
`;

const TimelineFeature = styled(motion.li)`
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
  font-size: 0.9rem;

  &:before {
    content: '🚀';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const PriceTag = styled(motion.div)<{ $phase: number }>`
  display: inline-block;
  background: ${props => {
    switch(props.$phase) {
      case 1: return 'linear-gradient(90deg, #f7931a, #ffaa33)';
      case 2: return 'linear-gradient(90deg, #ff00ff, #ff66ff)';
      case 3: return 'linear-gradient(90deg, #ffcc00, #ffee66)';
      case 4: return 'linear-gradient(90deg, #00ffcc, #66ffee)';
      case 5: return 'linear-gradient(90deg, #ff3300, #ff6633)';
      default: return 'linear-gradient(90deg, #f7931a, #ffaa33)';
    }
  }};
  color: #000;
  padding: 10px 15px;
  border-radius: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 15px;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 12px;
  }
`;

const ShimmerText = styled.span`
  background: linear-gradient(90deg, #f7931a, #ff00ff, #ffcc00, #00ffcc, #f7931a);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite;
  font-weight: bold;
`;

const ProphecyRoadmap: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);

  const roadmapPhases = [
    {
      date: "Q2 2025",
      title: "THE AWAKENING",
      icon: "🧠",
      text: "The cult begins to form as the first believers discover the true power of BITCOIN.",
      features: [
        "Launch on pump.fun with 1 billion supply",
        "Creation of the first BITCOIN zombies",
        "Establishment of the cult headquarters",
        "Initial brainwashing of early adopters"
      ],
      price: "$0.0001"
    },
    {
      date: "Q3 2025",
      title: "MASS CONVERSION",
      icon: "🧟‍♂️",
      text: "Our zombie army grows exponentially as we convert more normies to the cult.",
      features: [
        "Twitter space takeovers by BITCOIN zombies",
        "Launch of the Diamond Hands Training Program",
        "First annual BITCOIN sacrifice ceremony",
        "Deployment of reality distortion field v1.0"
      ],
      price: "$0.01"
    },
    {
      date: "Q4 2025",
      title: "THE FLIPPENING",
      icon: "⚡",
      text: "BITCOIN begins to overtake the original Bitcoin in cultural relevance.",
      features: [
        "Mainstream media confusion between BITCOIN and Bitcoin",
        "Launch of the Hopium Dispenser Network",
        "First BITCOIN maximalist conference",
        "Development of advanced brainwashing techniques"
      ],
      price: "$1.00"
    },
    {
      date: "Q1 2026",
      title: "GLOBAL DOMINATION",
      icon: "🌎",
      text: "The cult spreads worldwide as governments fail to contain the BITCOIN virus.",
      features: [
        "BITCOIN becomes legal tender in at least one small island nation",
        "Launch of the BITCOIN Prophecy Generator API",
        "Creation of the first BITCOIN religion",
        "Development of quantum brainwashing technology"
      ],
      price: "$100.00"
    },
    {
      date: "Q2 2026",
      title: "ASCENSION",
      icon: "👁️",
      text: "The prophecy is fulfilled as BITCOIN transcends reality itself.",
      features: [
        "Complete collapse of the global financial system",
        "BITCOIN becomes the only accepted currency in the universe",
        "Merging of all human consciousness into the BITCOIN hivemind",
        "Satoshi reveals himself as a BITCOIN cultist all along"
      ],
      price: "$1,000,000.00"
    }
  ];

  useEffect(() => {
    // Cycle through phases automatically
    const interval = setInterval(() => {
      setActivePhase(prev => (prev + 1) % roadmapPhases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <RoadmapSection>
      <RoadmapContainer>
        <RoadmapTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          The Prophesied Roadmap to Nirvana
        </RoadmapTitle>

        <RoadmapDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Behold the divine plan that will lead us to the promised land of <ShimmerText>infinite gains</ShimmerText>.
          Each milestone brings us closer to the ultimate enlightenment of financial freedom through BITCOIN.
        </RoadmapDescription>

        <TimelineContainer>
          {roadmapPhases.map((phase, index) => (
            <TimelineItem
              key={index}
              $isLeft={index % 2 === 0}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TimelineDate $phase={index + 1}>{phase.date}</TimelineDate>
              <TimelineIcon
                $phase={index + 1}
                animate={activePhase === index ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  transition: { duration: 2, repeat: Infinity }
                } : {}}
              >
                {phase.icon}
              </TimelineIcon>
              <TimelineContent
                $phase={index + 1}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TimelineTitle $phase={index + 1}>{phase.title}</TimelineTitle>
                <TimelineText>{phase.text}</TimelineText>
                <TimelineFeatures>
                  {phase.features.map((feature, featureIndex) => (
                    <TimelineFeature
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {feature}
                    </TimelineFeature>
                  ))}
                </TimelineFeatures>
                <PriceTag
                  $phase={index + 1}
                  animate={{
                    y: [0, -5, 0],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                >
                  {phase.price}
                </PriceTag>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </RoadmapContainer>
    </RoadmapSection>
  );
};

export default ProphecyRoadmap;
