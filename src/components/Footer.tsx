import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterSection = styled.footer`
  background: #000;
  padding: 40px 0;
  border-top: 2px solid #f7931a;
  position: relative;
  overflow: hidden;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: #f7931a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(247, 147, 26, 0.5);
  
  &:before {
    content: '₿';
    font-size: 40px;
    color: white;
    font-weight: bold;
  }
`;

const FooterTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  color: #f7931a;
  margin-bottom: 20px;
`;

const FooterText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  max-width: 600px;
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  color: #666;
  max-width: 800px;
  margin-top: 30px;
  font-style: italic;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: #222;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f7931a;
  font-size: 20px;
  text-decoration: none;
  
  &:hover {
    background: #f7931a;
    color: #000;
  }
`;

const CopyrightText = styled.p`
  font-size: 14px;
  color: #555;
  margin-top: 20px;
`;

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterLogo
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        
        <FooterTitle>BITCOIN</FooterTitle>
        <FooterText>
          Brainwashed Idiots Totally Convinced Of Inevitable Nirvana
        </FooterText>
        
        <SocialLinks>
          <SocialLink 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            𝕏
          </SocialLink>
          <SocialLink 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            📱
          </SocialLink>
          <SocialLink 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            💬
          </SocialLink>
          <SocialLink 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            📺
          </SocialLink>
        </SocialLinks>
        
        <DisclaimerText>
          DISCLAIMER: This website is 100% satire. BITCOIN (Brainwashed Idiots Totally Convinced Of Inevitable Nirvana) is not a real cryptocurrency. 
          Nothing on this website constitutes financial advice. The creators of this website are not responsible for any financial decisions you make after visiting.
          If you're looking for actual investment advice, please consult a qualified financial advisor, not a ridiculous meme website.
        </DisclaimerText>
        
        <CopyrightText>
          © {new Date().getFullYear()} BITCOIN Cult | All Rights Reserved | No Refunds | No Responsibility | No Rationality
        </CopyrightText>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
