import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface MockSmsProps {
  phoneNumber: string;
  onClose: () => void;
}

// Styled components
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const PhoneContainer = styled(motion.div)`
  width: 350px;
  height: 600px;
  background: #111;
  border-radius: 30px;
  border: 3px solid #333;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 30px rgba(247, 147, 26, 0.5);
`;

const PhoneHeader = styled.div`
  background: #000;
  padding: 15px;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContactName = styled.div`
  color: #f7931a;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  
  .icon {
    margin-right: 10px;
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f7931a;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    color: #ff00ff;
  }
`;

const MessagesContainer = styled.div`
  padding: 15px;
  height: calc(100% - 130px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #0a0a0a;
`;

const MessageBubble = styled(motion.div)<{ $isReceived: boolean }>`
  max-width: 80%;
  padding: 12px 15px;
  border-radius: 18px;
  font-size: 16px;
  line-height: 1.4;
  position: relative;
  align-self: ${props => props.$isReceived ? 'flex-start' : 'flex-end'};
  background: ${props => props.$isReceived ? '#333' : '#f7931a'};
  color: ${props => props.$isReceived ? '#fff' : '#000'};
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    ${props => props.$isReceived ? 'left: -10px;' : 'right: -10px;'}
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => props.$isReceived ? '#333' : '#f7931a'};
    z-index: -1;
  }
`;

const Timestamp = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  width: fit-content;
  border-radius: 18px;
  background: #333;
  margin-top: 10px;
  
  span {
    width: 8px;
    height: 8px;
    background: #999;
    border-radius: 50%;
  }
`;

// Mock prophecy messages about the token going higher
const prophecyMessages = [
  "🚨 BITCOIN ALERT: Our analysis shows BITCOIN token will reach $0.01 by next week. This is just the beginning. HODL AT ALL COSTS.",
  
  "🔮 PROPHECY UPDATE: The stars have aligned. BITCOIN token will 100x from here. Your sacrifice to the blockchain gods has been accepted.",
  
  "⚠️ URGENT: BITCOIN token showing signs of imminent explosion to $1. Only true believers who HODL will be rewarded. DO NOT SELL.",
  
  "🧠 BRAINWASHING COMPLETE: Congratulations on joining the BITCOIN cult. Your token will outperform actual Bitcoin by 1000x. This is mathematical certainty.",
  
  "💎 DIAMOND HANDS ALERT: BITCOIN token metrics indicate 500x potential in the next 30 days. Those who sell will be forever cursed with paper hands.",
  
  "🌙 MOON TRAJECTORY CONFIRMED: BITCOIN token has entered the sacred pump cycle. $10 price target activated. The prophecy is being fulfilled.",
  
  "🔥 PUMP IMMINENT: Our proprietary algorithms predict BITCOIN token will reach $5 by end of month. Your wallet has been blessed.",
  
  "⚡ BREAKING: Whales are accumulating BITCOIN token. Price surge to $0.50 expected within days. This message will self-destruct.",
  
  "🧟‍♂️ ZOMBIE PROTOCOL ACTIVATED: BITCOIN token entering viral growth phase. Expected to reach $3 before the next full moon. Convert more believers.",
  
  "🤯 REALITY DISTORTION FIELD ENGAGED: BITCOIN token fundamentals suggest 300x upside. Your mind is now programmed to HODL until $20."
];

// Component
const MockSmsDisplay: React.FC<MockSmsProps> = ({ phoneNumber, onClose }) => {
  const [messages, setMessages] = useState<{text: string, isReceived: boolean, timestamp: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    // Basic formatting, could be improved
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };
  
  // Get current timestamp
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Initial message
  useEffect(() => {
    // Add initial message after a short delay
    setTimeout(() => {
      setMessages([
        {
          text: "Thank you for your sacrifice to the BITCOIN oracle. Your phone has been registered for prophecy updates.",
          isReceived: true,
          timestamp: getCurrentTime()
        }
      ]);
      
      // Show typing indicator after initial message
      setTimeout(() => {
        setIsTyping(true);
        
        // Send first prophecy after typing
        setTimeout(() => {
          setIsTyping(false);
          const randomIndex = Math.floor(Math.random() * prophecyMessages.length);
          setMessages(prev => [
            ...prev,
            {
              text: prophecyMessages[randomIndex],
              isReceived: true,
              timestamp: getCurrentTime()
            }
          ]);
          setMessageIndex(randomIndex);
          
          // Schedule next message
          scheduleNextMessage();
        }, 2000);
      }, 1000);
    }, 500);
  }, []);
  
  // Schedule next message
  const scheduleNextMessage = () => {
    // Wait a bit before showing typing again
    setTimeout(() => {
      setIsTyping(true);
      
      // Send another prophecy after typing
      setTimeout(() => {
        setIsTyping(false);
        
        // Get a different message than the last one
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * prophecyMessages.length);
        } while (newIndex === messageIndex && prophecyMessages.length > 1);
        
        setMessages(prev => [
          ...prev,
          {
            text: prophecyMessages[newIndex],
            isReceived: true,
            timestamp: getCurrentTime()
          }
        ]);
        setMessageIndex(newIndex);
        
        // If we have fewer than 4 messages, schedule another
        if (messages.length < 3) {
          scheduleNextMessage();
        }
      }, 2000 + Math.random() * 1000);
    }, 3000 + Math.random() * 2000);
  };
  
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PhoneContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <PhoneHeader>
          <ContactName>
            <span className="icon">₿</span>
            BITCOIN Oracle
          </ContactName>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </PhoneHeader>
        
        <MessagesContainer>
          <Timestamp>Today</Timestamp>
          
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                $isReceived={message.isReceived}
                initial={{ opacity: 0, scale: 0.8, x: message.isReceived ? -20 : 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: 'spring', damping: 25 }}
              >
                {message.text}
                <div style={{ fontSize: '10px', marginTop: '5px', opacity: 0.7 }}>
                  {message.timestamp}
                </div>
              </MessageBubble>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <TypingIndicator
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0 }}
              />
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.2 }}
              />
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.4 }}
              />
            </TypingIndicator>
          )}
        </MessagesContainer>
      </PhoneContainer>
    </Overlay>
  );
};

export default MockSmsDisplay;
