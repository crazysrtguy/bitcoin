import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HowToBuySection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const HowToBuyContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HowToBuyTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const HowToBuyDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const TokenInfoBox = styled(motion.div)`
  background: linear-gradient(135deg, #330066, #000033);
  border: 3px solid #f7931a;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 0 30px rgba(247, 147, 26, 0.3);
`;

const TokenInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TokenInfoItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #f7931a;
  
  h4 {
    color: #f7931a;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
  
  p {
    font-size: 1.1rem;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
`;

const StepCard = styled(motion.div)`
  background: linear-gradient(135deg, #1a0033, #330066);
  border-radius: 15px;
  padding: 30px;
  border: 2px solid #f7931a;
  text-align: left;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: attr(data-number);
    position: absolute;
    top: -15px;
    right: 20px;
    font-size: 100px;
    font-weight: bold;
    color: rgba(247, 147, 26, 0.1);
    font-family: 'Press Start 2P', cursive;
  }
`;

const StepTitle = styled.h3`
  color: #f7931a;
  margin-bottom: 15px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  .icon {
    margin-right: 15px;
    font-size: 2rem;
  }
`;

const StepContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  
  a {
    color: #f7931a;
    text-decoration: underline;
    
    &:hover {
      color: #ff00ff;
    }
  }
  
  ul {
    margin-top: 15px;
    padding-left: 20px;
    
    li {
      margin-bottom: 10px;
    }
  }
  
  .warning {
    background: rgba(255, 0, 0, 0.1);
    border-left: 3px solid #ff0000;
    padding: 15px;
    margin-top: 15px;
    font-style: italic;
  }
  
  .highlight {
    background: rgba(247, 147, 26, 0.1);
    border-left: 3px solid #f7931a;
    padding: 15px;
    margin-top: 15px;
  }
`;

const BuyButton = styled(motion.a)`
  display: inline-block;
  background: linear-gradient(45deg, #f7931a, #ff6600);
  color: white;
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  padding: 20px 40px;
  border-radius: 50px;
  margin-top: 40px;
  text-decoration: none;
  box-shadow: 0 5px 20px rgba(247, 147, 26, 0.5);
  cursor: pointer;
  
  &:hover {
    background: linear-gradient(45deg, #ff6600, #ff3300);
  }
`;

const DisclaimerBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px dashed #f7931a;
  padding: 20px;
  margin-top: 40px;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #aaa;
  
  strong {
    color: #f7931a;
  }
`;

const HowToBuy: React.FC = () => {
  return (
    <HowToBuySection>
      <HowToBuyContainer>
        <HowToBuyTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          How to Buy $BITCOIN
        </HowToBuyTitle>
        
        <HowToBuyDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join the cult of Brainwashed Idiots Totally Convinced Of Inevitable Nirvana by acquiring our sacred token on pump.fun
        </HowToBuyDescription>
        
        <TokenInfoBox
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 style={{ color: '#f7931a', marginBottom: '20px', fontSize: '1.5rem' }}>Token Information</h3>
          
          <TokenInfoGrid>
            <TokenInfoItem>
              <h4>Token Name</h4>
              <p>BITCOIN</p>
            </TokenInfoItem>
            
            <TokenInfoItem>
              <h4>Total Supply</h4>
              <p>1,000,000,000 BITCOIN</p>
            </TokenInfoItem>
            
            <TokenInfoItem>
              <h4>Taxes</h4>
              <p>0% (No taxes)</p>
            </TokenInfoItem>
            
            <TokenInfoItem>
              <h4>Platform</h4>
              <p>pump.fun (Solana)</p>
            </TokenInfoItem>
          </TokenInfoGrid>
        </TokenInfoBox>
        
        <StepsContainer>
          <StepCard 
            data-number="1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <StepTitle>
              <span className="icon">👛</span>
              Set Up a Solana Wallet
            </StepTitle>
            <StepContent>
              <p>
                To buy BITCOIN, you'll need a Solana-compatible wallet. We recommend using Phantom or Solflare.
              </p>
              <ul>
                <li>
                  <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer">Phantom Wallet</a> - Available as browser extension or mobile app
                </li>
                <li>
                  <a href="https://solflare.com/" target="_blank" rel="noopener noreferrer">Solflare</a> - Another popular Solana wallet
                </li>
              </ul>
              <div className="highlight">
                Make sure to securely back up your seed phrase! If you lose it, you'll lose access to your BITCOIN forever.
              </div>
            </StepContent>
          </StepCard>
          
          <StepCard 
            data-number="2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <StepTitle>
              <span className="icon">💰</span>
              Get Some SOL
            </StepTitle>
            <StepContent>
              <p>
                You'll need SOL (Solana's native token) to buy BITCOIN and pay for transaction fees.
              </p>
              <ul>
                <li>Purchase SOL from a centralized exchange like Coinbase, Binance, or Kraken</li>
                <li>Withdraw the SOL to your Solana wallet address</li>
                <li>Make sure to leave some extra SOL for transaction fees (0.01 SOL should be enough)</li>
              </ul>
              <div className="warning">
                Never invest more than you can afford to lose. This is a satirical memecoin with no utility.
              </div>
            </StepContent>
          </StepCard>
          
          <StepCard 
            data-number="3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <StepTitle>
              <span className="icon">🚀</span>
              Buy on pump.fun
            </StepTitle>
            <StepContent>
              <p>
                BITCOIN is available exclusively on pump.fun, the premier Solana memecoin platform.
              </p>
              <ol>
                <li>Go to <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">pump.fun</a></li>
                <li>Connect your Solana wallet</li>
                <li>Search for "BITCOIN" in the token search bar</li>
                <li>Enter the amount of BITCOIN you want to buy</li>
                <li>Click "Swap" and confirm the transaction in your wallet</li>
              </ol>
              <div className="highlight">
                Congratulations! You are now officially a Brainwashed Idiot Totally Convinced Of Inevitable Nirvana!
              </div>
            </StepContent>
          </StepCard>
        </StepsContainer>
        
        <BuyButton 
          href="https://pump.fun" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY $BITCOIN NOW
        </BuyButton>
        
        <DisclaimerBox>
          <strong>DISCLAIMER:</strong> BITCOIN is a satirical memecoin with absolutely no utility, value, or purpose other than making fun of crypto culture. This is not financial advice. There is a 100% chance you will lose all your money. That's the point.
        </DisclaimerBox>
      </HowToBuyContainer>
    </HowToBuySection>
  );
};

export default HowToBuy;
