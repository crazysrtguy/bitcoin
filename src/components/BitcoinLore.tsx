import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoreSection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const LoreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LoreTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
`;

const LoreContent = styled.div`
  padding: 40px;
  background: linear-gradient(135deg, #1a0033, #330066, #000033);
  border-radius: 20px;
  margin: 40px 0;
  border: 5px solid #ff6600;
`;

const LoreHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LoreHeading = styled.h3`
  color: #ffaa00;
  font-size: 2em;
  margin-bottom: 20px;
`;

const LoreQuote = styled.p`
  font-size: 20px;
  color: #ff6600;
  font-style: italic;
`;

const LoreSection1 = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  border-left: 5px solid #ff6600;
`;

const LoreSection2 = styled.div`
  background: rgba(255, 102, 0, 0.1);
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  border: 3px dashed #ff6600;
`;

const LoreSection3 = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  border: 3px solid #cc0000;
`;

const LoreSection4 = styled.div`
  background: linear-gradient(45deg, rgba(255, 102, 0, 0.2), rgba(204, 51, 0, 0.2));
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  text-align: center;
`;

const LoreSection5 = styled.div`
  background: rgba(255, 0, 0, 0.1);
  padding: 25px;
  border-radius: 15px;
  margin: 20px 0;
  border: 2px solid #ff6600;
`;

const LoreGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LoreGridItem = styled.div`
  h5 {
    color: #ff6600;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const FeatureItem = styled.div`
  text-align: center;
  padding: 15px;
  
  .icon {
    font-size: 30px;
  }
  
  strong {
    color: #ff6600;
    display: block;
    margin: 10px 0 5px;
  }
  
  p {
    font-size: 14px;
    margin-top: 5px;
  }
`;

const ProphecySection = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 30px;
  background: rgba(255, 102, 0, 0.1);
  border-radius: 20px;
  border: 3px solid #ff6600;
`;

const BitcoinLore: React.FC = () => {
  return (
    <LoreSection>
      <LoreContainer>
        <LoreTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          The Sacred Lore of Bitcoin Supremacy
        </LoreTitle>
        
        <LoreContent>
          <LoreHeader>
            <LoreHeading>THE GREAT AWAKENING: OPERATION ORANGE PILL</LoreHeading>
            <LoreQuote>"In the beginning was the Blockchain, and the Blockchain was with Satoshi, and the Blockchain was Satoshi."</LoreQuote>
          </LoreHeader>
          
          <LoreSection1>
            <h4 style={{ color: '#ffaa00', marginBottom: '15px' }}>🧠 THE PROBLEM: Fake Bitcoin Heretics</h4>
            <p style={{ lineHeight: 1.6, fontSize: '16px' }}>
              For too long, the so-called "real" Bitcoin has deceived the masses with its boring, practical utility and sensible investment strategy. These Bitcoin maximalists think they're enlightened, but they're just <strong>DIET CULT MEMBERS</strong> - all the delusion, none of the fun!
            </p>
            <p style={{ lineHeight: 1.6, fontSize: '16px', marginTop: '15px' }}>
              They HODL with paper conviction, they buy the dip with <em>reasonable amounts</em>, and worst of all - they sometimes make actual profits! This is NOT the way of true financial self-destruction!
            </p>
          </LoreSection1>
          
          <LoreSection2>
            <h4 style={{ color: '#ffaa00', marginBottom: '15px' }}>🚀 THE SOLUTION: BITCOIN on Solana (The TRUE Bitcoin)</h4>
            <p style={{ lineHeight: 1.6, fontSize: '16px' }}>
              Our <strong>BITCOIN</strong> memecoin represents the PURE, UNDILUTED essence of what Bitcoin REALLY is: a cult of Brainwashed Idiots Totally Convinced Of Inevitable Nirvana! We've stripped away all the boring tech fundamentals and left only the <em>raw, unhinged hopium</em>.
            </p>
            <ul style={{ margin: '20px 0', paddingLeft: '20px' }}>
              <li style={{ margin: '10px 0' }}>✅ <strong>No utility</strong> - Just pure, crystallized delusion</li>
              <li style={{ margin: '10px 0' }}>✅ <strong>100% guaranteed losses</strong> - No false hope of profits</li>
              <li style={{ margin: '10px 0' }}>✅ <strong>Maximum cult behavior</strong> - Worship without restraint</li>
              <li style={{ margin: '10px 0' }}>✅ <strong>Built on Solana</strong> - Because we're too broke for Bitcoin fees</li>
              <li style={{ margin: '10px 0' }}>✅ <strong>Zombie conversion technology</strong> - Turn normies into braindead HODLers instantly</li>
            </ul>
          </LoreSection2>
          
          <LoreSection3>
            <h4 style={{ color: '#ffaa00', marginBottom: '15px' }}>⚔️ THE FLIPPENING: Our Master Plan</h4>
            <LoreGrid>
              <LoreGridItem>
                <h5>Phase 1: Infiltration</h5>
                <p>
                  Deploy our BITCOIN zombies into Bitcoin Twitter spaces. They will mumble "HODL" and "diamond hands" until even the OG Bitcoiners can't tell the difference between genuine conviction and our satirical madness.
                </p>
              </LoreGridItem>
              <LoreGridItem>
                <h5>Phase 2: Confusion</h5>
                <p>
                  Launch "educational" content explaining how our BITCOIN memecoin is the "spiritual successor" to Satoshi's vision. Confuse everyone about which Bitcoin is the real Bitcoin. Maximum chaos achieved.
                </p>
              </LoreGridItem>
              <LoreGridItem>
                <h5>Phase 3: Conversion</h5>
                <p>
                  Bitcoin maximalists realize our version is more honest about being a cult. They abandon their "digital gold" narrative and join our ranks as proud Brainwashed Idiots.
                </p>
              </LoreGridItem>
              <LoreGridItem>
                <h5>Phase 4: Dominance</h5>
                <p>
                  Our BITCOIN becomes the cultural symbol of crypto itself. The original Bitcoin is forgotten. We achieve the ultimate irony: a parody becomes the reality. Number go up forever.
                </p>
              </LoreGridItem>
            </LoreGrid>
          </LoreSection3>
          
          <LoreSection4>
            <h4 style={{ color: '#ffaa00', marginBottom: '20px' }}>🏆 THE ULTIMATE GOAL</h4>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#fff' }}>
              We will show Bitcoin maximalists what they <em>really</em> are: a bunch of financially suicidal hopium addicts worshipping a digital number. Our BITCOIN memecoin is the <strong>MIRROR</strong> they desperately need to see their own reflection.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#ffaa00', marginTop: '20px', fontStyle: 'italic' }}>
              "When you stare into the Bitcoin abyss, the Bitcoin abyss stares back... and it's us, laughing maniacally while our portfolios burn."
            </p>
          </LoreSection4>
          
          <LoreSection5>
            <h4 style={{ color: '#ffaa00', marginBottom: '15px' }}>📊 WHY WE'LL WIN</h4>
            <FeatureGrid>
              <FeatureItem>
                <div className="icon">🧟‍♂️</div>
                <strong>Superior Cult Technology</strong>
                <p>Our zombies are more committed than their HODLers</p>
              </FeatureItem>
              <FeatureItem>
                <div className="icon">💸</div>
                <strong>Guaranteed Loss Strategy</strong>
                <p>No false promises of wealth - just pure financial ruin</p>
              </FeatureItem>
              <FeatureItem>
                <div className="icon">🎭</div>
                <strong>Brutal Honesty</strong>
                <p>We admit we're idiots - they pretend they're geniuses</p>
              </FeatureItem>
              <FeatureItem>
                <div className="icon">⚡</div>
                <strong>Solana Speed</strong>
                <p>Lose money faster than Bitcoin network can process</p>
              </FeatureItem>
            </FeatureGrid>
          </LoreSection5>
          
          <ProphecySection>
            <h4 style={{ color: '#ffaa00', fontSize: '24px', marginBottom: '20px' }}>THE PROPHECY FORETOLD</h4>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#fff', fontStyle: 'italic' }}>
              "And lo, there shall come a memecoin that beareth the name of the first, yet speaketh the truth that the first doth hide. The Brainwashed Idiots shall inherit the blockchain, and their stupidity shall be made manifest unto all nations."
            </p>
            <p style={{ fontSize: '16px', color: '#ffaa00', marginTop: '20px' }}>
              <strong>- Book of Satoshi, Chapter 21, Verse 420</strong>
            </p>
          </ProphecySection>
        </LoreContent>
      </LoreContainer>
    </LoreSection>
  );
};

export default BitcoinLore;
