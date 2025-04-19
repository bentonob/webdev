import { useState, useEffect } from 'react';
import { GameState } from '@shared/schema';
import { initializeGame } from '@/lib/apocalypseData';
import StartScreen from '@/components/StartScreen';
import ApocalypseReveal from '@/components/ApocalypseReveal';
import QuestionScreen from '@/components/QuestionScreen';
import ResultsScreen from '@/components/ResultsScreen';
import StatChange from '@/components/StatChange';
import { calculateSurvivalTime, generateDeathDescription } from '@/lib/apocalypseData';

// Different screens in the quiz
type ScreenType = 'start' | 'apocalypse-reveal' | 'question' | 'results';

export default function ApocalypseQuiz() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [statChange, setStatChange] = useState<{ [key: string]: number } | null>(null);
  
  // Reset game when restarting
  const handleStartGame = () => {
    setGameState(initializeGame());
    setCurrentScreen('apocalypse-reveal');
  };
  
  const handleContinueToQuestions = () => {
    setCurrentScreen('question');
  };
  
  const handleChoiceSelection = (choiceIndex: number) => {
    const currentQuestion = gameState.questions[gameState.currentQuestion];
    const selectedChoice = currentQuestion.choices[choiceIndex];
    const effects = selectedChoice.effects;
    
    // Update stats based on choice
    const newStats = { ...gameState.stats };
    for (const [stat, change] of Object.entries(effects)) {
      if (change !== 0) {
        newStats[stat as keyof typeof newStats] = Math.max(
          0, 
          Math.min(100, newStats[stat as keyof typeof newStats] + change)
        );
      }
    }
    
    // Show stat change notification
    setStatChange(effects);
    setTimeout(() => setStatChange(null), 2000);
    
    // Check if this is the last question
    const isLastQuestion = gameState.currentQuestion + 1 >= gameState.questions.length;
    
    if (isLastQuestion) {
      // Calculate results before showing results screen
      const { time, severity } = calculateSurvivalTime(newStats);
      const description = severity === 0 
        ? `You not only survived the ${gameState.apocalypseType.type.toLowerCase()}, but thrived. You established a safe community and became a legend among survivors. The history books (if anyone's still writing them) will remember you.`
        : generateDeathDescription({ ...gameState, stats: newStats }, severity);
      
      // Update game state with final results and immediately go to results screen
      setGameState(prevState => ({
        ...prevState,
        stats: newStats,
        currentQuestion: prevState.currentQuestion + 1,
        survivalTime: time,
        deathDescription: description
      }));
      
      // Wait for stat change animation to finish before showing results
      setTimeout(() => {
        setCurrentScreen('results');
      }, 2000);
    } else {
      // Just go to next question
      setGameState(prevState => ({
        ...prevState,
        stats: newStats,
        currentQuestion: prevState.currentQuestion + 1
      }));
    }
  };
  
  const handleRestartGame = () => {
    handleStartGame();
  };
  
  return (
    <div className="font-mono text-apocalypse-light relative scanner">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}
      
      {currentScreen === 'apocalypse-reveal' && (
        <ApocalypseReveal 
          apocalypse={gameState.apocalypseType} 
          onContinue={handleContinueToQuestions} 
        />
      )}
      
      {currentScreen === 'question' && (
        <QuestionScreen 
          gameState={gameState} 
          onSelectChoice={handleChoiceSelection} 
        />
      )}
      
      {currentScreen === 'results' && gameState.survivalTime && gameState.deathDescription && (
        <ResultsScreen 
          gameState={gameState} 
          onRestart={handleRestartGame} 
        />
      )}
      
      {statChange && <StatChange changes={statChange} />}
    </div>
  );
}
