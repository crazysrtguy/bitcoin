import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Howl } from 'howler';

const InitiationSection = styled.section`
  min-height: 600px;
  position: relative;
  overflow: hidden;
  background: #111;
  padding: 40px 0;
  border-bottom: 2px solid #f7931a;
`;

const InitiationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const InitiationTitle = styled(motion.h2)`
  margin-bottom: 30px;
  color: #f7931a;
  font-family: 'Press Start 2P', cursive;
`;

const InitiationDescription = styled(motion.p)`
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.2rem;
`;

const QuizContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 0 20px rgba(247, 147, 26, 0.5);
`;

const QuestionNumber = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  color: #f7931a;
  margin-bottom: 20px;
  text-align: left;
`;

const Question = styled(motion.h3)`
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  margin-bottom: 30px;
  text-align: left;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const AnswerOption = styled(motion.button)<{ $selected?: boolean }>`
  background: ${props => props.$selected ? '#f7931a' : '#222'};
  color: ${props => props.$selected ? '#000' : '#fff'};
  border: 2px solid ${props => props.$selected ? '#f7931a' : '#444'};
  border-radius: 5px;
  padding: 15px;
  text-align: left;
  font-family: 'VT323', monospace;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$selected ? '#f7931a' : '#333'};
    border-color: #f7931a;
  }
`;

const NextButton = styled(motion.button)`
  background: #f7931a;
  color: #000;
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
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #222;
  border-radius: 5px;
  margin-top: 30px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, #f7931a 0%, #ff00ff 100%);
  border-radius: 5px;
`;

const ResultContainer = styled(motion.div)`
  padding: 30px;
  background: #000;
  border: 2px solid #f7931a;
  border-radius: 10px;
  margin-top: 30px;
  text-align: center;
`;

const ResultTitle = styled.h3`
  font-family: 'Press Start 2P', cursive;
  font-size: 24px;
  color: #f7931a;
  margin-bottom: 20px;
`;

const ResultDescription = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ResultImage = styled.div`
  font-size: 80px;
  margin: 20px 0;
`;

const BackgroundSwirl = styled(motion.div)<{ $intensity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    rgba(247, 147, 26, ${props => 0.1 * props.$intensity}) 0%,
    rgba(255, 0, 255, ${props => 0.1 * props.$intensity}) 50%,
    rgba(0, 0, 0, 0) 70%
  );
  pointer-events: none;
  z-index: 0;
  opacity: ${props => props.$intensity * 0.5};
`;

// Quiz questions that get progressively more cult-like
const questions = [
  {
    id: 1,
    text: "What do you think about Bitcoin?",
    options: [
      { id: 'a', text: "It's an interesting technology but I'm skeptical" },
      { id: 'b', text: "It could be a good investment among many others" },
      { id: 'c', text: "It's a revolutionary technology that will change finance" },
      { id: 'd', text: "It's the only true money that will save humanity from slavery" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 2,
    text: "How much of your savings would you invest in Bitcoin?",
    options: [
      { id: 'a', text: "None, it's too risky" },
      { id: 'b', text: "Maybe 5-10% as part of a diversified portfolio" },
      { id: 'c', text: "Around 50%, I believe in its long-term potential" },
      { id: 'd', text: "ALL OF IT! And I'd take out loans to buy more!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 3,
    text: "What happens when Bitcoin's price drops significantly?",
    options: [
      { id: 'a', text: "I'd sell to prevent further losses" },
      { id: 'b', text: "I'd be concerned but would wait to see what happens" },
      { id: 'c', text: "I'd buy more if I had extra money available" },
      { id: 'd', text: "I'D SELL MY ORGANS TO BUY THE DIP! BLOOD FOR THE BITCOIN GOD!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 4,
    text: "Would you name your firstborn child after Bitcoin?",
    options: [
      { id: 'a', text: "Absolutely not, that's ridiculous" },
      { id: 'b', text: "Maybe a normal name that subtly references it" },
      { id: 'c', text: "I'd consider 'Satoshi' as a middle name" },
      { id: 'd', text: "SATOSHI NAKAMOTO BLOCKCHAIN HODL SMITH IS A BEAUTIFUL NAME!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 5,
    text: "How do you feel about people who don't own Bitcoin?",
    options: [
      { id: 'a', text: "That's a personal choice, not everyone needs to invest" },
      { id: 'b', text: "They might be missing out on a good opportunity" },
      { id: 'c', text: "They don't understand the future of money yet" },
      { id: 'd', text: "NOCOINERS WILL SERVE THE BITCOIN ELITE IN THE NEW WORLD ORDER!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 6,
    text: "If Bitcoin dropped to $1, would you...",
    options: [
      { id: 'a', text: "Accept it was a failed experiment" },
      { id: 'b', text: "Be disappointed but move on with life" },
      { id: 'c', text: "Buy some more, it might recover eventually" },
      { id: 'd', text: "SELL MY HOUSE, CAR, AND FAMILY TO BUY AS MUCH AS POSSIBLE!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 7,
    text: "How often do you check Bitcoin's price?",
    options: [
      { id: 'a', text: "Rarely, maybe once a month" },
      { id: 'b', text: "A few times a week" },
      { id: 'c', text: "Several times a day" },
      { id: 'd', text: "I HAVE PRICE CHARTS TATTOOED ON MY EYELIDS SO I SEE THEM EVEN WHEN I BLINK!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 8,
    text: "What's your relationship with the Bitcoin community?",
    options: [
      { id: 'a', text: "I don't really engage with it" },
      { id: 'b', text: "I follow some news and discussions" },
      { id: 'c', text: "I'm active in forums and attend meetups" },
      { id: 'd', text: "THE COMMUNITY IS MY FAMILY NOW. I'VE DISOWNED MY BLOOD RELATIVES FOR DOUBTING BITCOIN!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 9,
    text: "Do you believe Bitcoin will replace all government currencies?",
    options: [
      { id: 'a', text: "No, that's extremely unlikely" },
      { id: 'b', text: "It might coexist with traditional currencies" },
      { id: 'c', text: "It could become the global reserve currency eventually" },
      { id: 'd', text: "THE BITCOIN STANDARD WILL CRUSH ALL FIAT CURRENCIES AND CENTRAL BANKS WILL BURN!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  },
  {
    id: 10,
    text: "WILL YOU PLEDGE YOUR ETERNAL SOUL TO THE BITCOIN REVOLUTION?",
    options: [
      { id: 'a', text: "What? No, that's insane" },
      { id: 'b', text: "I'm just here for the investment opportunity" },
      { id: 'c', text: "I'm committed to supporting Bitcoin long-term" },
      { id: 'd', text: "I PLEDGE MY SOUL, MY BLOOD, AND MY FIRSTBORN TO THE GLORIOUS BITCOIN REVOLUTION!" }
    ],
    cultLevel: { a: 0, b: 1, c: 2, d: 3 }
  }
];

const CultInitiation: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [cultScore, setCultScore] = useState(0);
  const [maxCultScore] = useState(questions.length * 3); // Maximum possible cult score
  const [showResult, setShowResult] = useState(false);
  const [backgroundIntensity, setBackgroundIntensity] = useState(0);
  
  const questionControls = useAnimation();
  const backgroundControls = useAnimation();
  
  // Sound effects
  const selectSound = new Howl({
    src: ['/select.mp3'],
    volume: 0.3,
  });
  
  const nextSound = new Howl({
    src: ['/next.mp3'],
    volume: 0.5,
  });
  
  const cultSound = new Howl({
    src: ['/cult-chant.mp3'],
    volume: 0.3,
    loop: true,
  });
  
  const resultSound = new Howl({
    src: ['/result.mp3'],
    volume: 0.7,
  });
  
  useEffect(() => {
    // Animate background based on cult score percentage
    const intensity = cultScore / maxCultScore;
    setBackgroundIntensity(intensity);
    
    // Start cult chanting if score is high enough
    if (intensity > 0.5 && !showResult) {
      cultSound.play();
    } else {
      cultSound.stop();
    }
    
    // Clean up
    return () => {
      cultSound.stop();
    };
  }, [cultScore, maxCultScore, showResult]);
  
  useEffect(() => {
    // Animate background swirl
    backgroundControls.start({
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: { 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 5, repeat: Infinity, repeatType: "mirror" }
      }
    });
  }, [backgroundControls]);
  
  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    selectSound.play();
    
    // Update cult score based on answer
    const question = questions[currentQuestion];
    const answerCultLevel = question.cultLevel[answerId as keyof typeof question.cultLevel];
    setCultScore(prev => prev + answerCultLevel);
  };
  
  const handleNextQuestion = () => {
    nextSound.play();
    
    // Animate question transition
    questionControls.start({
      opacity: [1, 0, 1],
      x: [0, 50, 0],
      transition: { duration: 0.5 }
    });
    
    // Move to next question or show result
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
        resultSound.play();
        cultSound.stop();
      }
    }, 300);
  };
  
  const getCultRating = () => {
    const percentage = (cultScore / maxCultScore) * 100;
    
    if (percentage < 25) {
      return {
        title: "Rational Skeptic",
        description: "You still have your critical thinking intact. The cult has failed to brainwash you. You're probably a no-coiner who will have fun staying poor.",
        emoji: "🧠"
      };
    } else if (percentage < 50) {
      return {
        title: "Curious Investor",
        description: "You see potential in Bitcoin but haven't drunk the Kool-Aid yet. There's still hope for your indoctrination into the cult.",
        emoji: "🤔"
      };
    } else if (percentage < 75) {
      return {
        title: "Bitcoin Believer",
        description: "You're well on your way to becoming a true cultist. Your friends and family are concerned about your constant crypto talk.",
        emoji: "🙏"
      };
    } else {
      return {
        title: "FULLY INDOCTRINATED MAXIMALIST",
        description: "CONGRATULATIONS! You are now a brainwashed Bitcoin zealot! Your personality has been completely replaced by crypto memes and price charts. HODL TILL DEATH!",
        emoji: "🧟‍♂️"
      };
    }
  };
  
  const currentQuestionData = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const cultRating = getCultRating();
  
  return (
    <InitiationSection>
      <InitiationContainer>
        <InitiationTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Cult Initiation Simulator
        </InitiationTitle>
        
        <InitiationDescription
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Take this interactive questionnaire that gradually brainwashes you.
          Watch as the background transforms from normal to hypnotic swirls as you progress.
          How deep into the Bitcoin cult will you go?
        </InitiationDescription>
        
        <QuizContainer>
          <BackgroundSwirl 
            $intensity={backgroundIntensity}
            animate={backgroundControls}
          />
          
          {!showResult ? (
            <>
              <QuestionNumber>Question {currentQuestion + 1} of {questions.length}</QuestionNumber>
              
              <Question
                animate={questionControls}
                initial={{ opacity: 1 }}
              >
                {currentQuestionData.text}
              </Question>
              
              <AnswerList>
                {currentQuestionData.options.map(option => (
                  <AnswerOption
                    key={option.id}
                    $selected={selectedAnswer === option.id}
                    onClick={() => handleAnswerSelect(option.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.text}
                  </AnswerOption>
                ))}
              </AnswerList>
              
              <NextButton
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                whileHover={{ scale: selectedAnswer ? 1.05 : 1 }}
                whileTap={{ scale: selectedAnswer ? 0.95 : 1 }}
              >
                {currentQuestion < questions.length - 1 ? "NEXT QUESTION" : "SEE RESULTS"}
              </NextButton>
              
              <ProgressBar>
                <ProgressFill
                  $progress={progress}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </ProgressBar>
            </>
          ) : (
            <ResultContainer
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResultTitle>{cultRating.title}</ResultTitle>
              <ResultImage>{cultRating.emoji}</ResultImage>
              <ResultDescription>{cultRating.description}</ResultDescription>
              <ResultDescription>
                Cult Score: {cultScore} / {maxCultScore} ({Math.round((cultScore / maxCultScore) * 100)}% Brainwashed)
              </ResultDescription>
              
              <NextButton
                onClick={() => {
                  setCurrentQuestion(0);
                  setSelectedAnswer(null);
                  setCultScore(0);
                  setShowResult(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RETAKE QUIZ
              </NextButton>
            </ResultContainer>
          )}
        </QuizContainer>
      </InitiationContainer>
    </InitiationSection>
  );
};

export default CultInitiation;
