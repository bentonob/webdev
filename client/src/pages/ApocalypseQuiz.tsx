import { useState, useEffect } from 'react';
import { GameState, AdventureNode, AdventureChoice } from '@shared/schema';
import { initializeAdventureGame } from '@/lib/apocalypseData';
import StartScreen from '@/components/StartScreen';
import ApocalypseReveal from '@/components/ApocalypseReveal';
import ResultsScreen from '@/components/ResultsScreen';
import StatChange from '@/components/StatChange';
import { calculateSurvivalTime, generateDeathDescription } from '@/lib/apocalypseData';

// Different screens in the adventure
type ScreenType = 'start' | 'apocalypse-reveal' | 'adventure' | 'results';

export default function ApocalypseQuiz() {
  const [gameState, setGameState] = useState<GameState>(initializeAdventureGame());
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('start');
  const [statChange, setStatChange] = useState<{ [key: string]: number } | null>(null);
  
  // Reset game when restarting
  const handleStartGame = () => {
    setGameState(initializeAdventureGame());
    setCurrentScreen('apocalypse-reveal');
  };
  
  const handleContinueToAdventure = () => {
    setCurrentScreen('adventure');
  };
  
  // Get current adventure node
  const getCurrentNode = (): AdventureNode | null => {
    if (!gameState.currentNodeId || !gameState.adventureScenario) return null;
    return gameState.adventureScenario.nodes[gameState.currentNodeId];
  };
  
  const handleChoiceSelection = (choiceIndex: number) => {
    const currentNode = getCurrentNode();
    if (!currentNode) return;
    
    const selectedChoice = currentNode.choices[choiceIndex];
    const effects = selectedChoice.effects;
    const nextNodeId = selectedChoice.nextNodeId;
    
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
    
    // Get the next node
    const nextNode = gameState.adventureScenario.nodes[nextNodeId];
    
    // Check if this is an end node
    if (nextNode.isEndNode) {
      // Calculate results for the ending
      const { time, severity } = calculateSurvivalTime(newStats);
      const description = severity === 0 
        ? `You not only survived the ${gameState.apocalypseType.type.toLowerCase()}, but thrived. ${nextNode.text}`
        : nextNode.text;
      
      // Update game state with final results and go to results screen
      setGameState(prevState => ({
        ...prevState,
        stats: newStats,
        currentNodeId: nextNodeId,
        visitedNodeIds: [...prevState.visitedNodeIds, nextNodeId],
        survivalTime: time,
        deathDescription: description
      }));
      
      // Wait for stat change animation to finish before showing results
      setTimeout(() => {
        setCurrentScreen('results');
      }, 2000);
    } else {
      // Move to next node in the adventure
      setGameState(prevState => ({
        ...prevState,
        stats: newStats,
        currentNodeId: nextNodeId,
        visitedNodeIds: [...prevState.visitedNodeIds, nextNodeId]
      }));
    }
  };
  
  const handleRestartGame = () => {
    handleStartGame();
  };
  
  // The current node in the adventure
  const currentNode = getCurrentNode();
  
  return (
    <div className="font-mono text-apocalypse-light relative scanner">
      {currentScreen === 'start' && (
        <StartScreen onStart={handleStartGame} />
      )}
      
      {currentScreen === 'apocalypse-reveal' && (
        <ApocalypseReveal 
          apocalypse={gameState.apocalypseType} 
          onContinue={handleContinueToAdventure} 
        />
      )}
      
      {currentScreen === 'adventure' && currentNode && (
        <AdventureScreen 
          node={currentNode}
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

// New Adventure Screen Component 
interface AdventureScreenProps {
  node: AdventureNode;
  gameState: GameState;
  onSelectChoice: (index: number) => void;
}

function AdventureScreen({ node, gameState, onSelectChoice }: AdventureScreenProps) {
  return (
    <div className="min-h-screen flex-col items-center justify-center p-4 flex">
      {/* Stats Header */}
      <div className="fixed top-0 left-0 right-0 bg-apocalypse-dark bg-opacity-90 p-4 border-b border-apocalypse-yellow z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="mr-2">{gameState.apocalypseType.emoji}</span>
              <span className="text-sm font-bold text-apocalypse-yellow">
                {gameState.apocalypseType.type}
              </span>
            </div>
            <div>
              <span className="text-sm">
                Decision {gameState.visitedNodeIds.length}/{gameState.visitedNodeIds.length + 4}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBar 
              name="Health" 
              emoji="🩸" 
              value={gameState.stats.health} 
              color="bg-apocalypse-red" 
            />
            <StatBar 
              name="Morale" 
              emoji="😅" 
              value={gameState.stats.morale} 
              color="bg-apocalypse-yellow" 
            />
            <StatBar 
              name="Supplies" 
              emoji="🍞" 
              value={gameState.stats.supplies} 
              color="bg-apocalypse-green" 
            />
            <StatBar 
              name="Stealth" 
              emoji="🕵️‍♂️" 
              value={gameState.stats.stealth} 
              color="bg-apocalypse-blue" 
            />
          </div>
        </div>
      </div>
      
      {/* Adventure Content */}
      <div className="pt-28 pb-10 max-w-3xl mx-auto w-full animate-fade-in">
        <div className="bg-apocalypse-dark border-2 border-apocalypse-yellow rounded-lg p-6 shadow-lg mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {node.text}
          </h2>
          
          <div className="space-y-4 mt-8">
            {node.choices.map((choice: AdventureChoice, index: number) => (
              <div 
                key={index}
                onClick={() => onSelectChoice(index)}
                className="choice-option bg-apocalypse-dark border border-apocalypse-light hover:border-apocalypse-yellow rounded-lg p-4 transition-all duration-200 cursor-pointer"
              >
                <p>{choice.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Imported from StatBar component to make it available
interface StatBarProps {
  name: string;
  emoji: string;
  value: number;
  color: string;
}

function StatBar({ name, emoji, value, color }: StatBarProps) {
  return (
    <div className="stat-bar">
      <div className="flex items-center mb-1">
        <span className="mr-1">{emoji}</span>
        <span className="text-xs">{name}</span>
        {/* Removed percentage display for added difficulty */}
      </div>
      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
        <div 
          className={`${color} stat-meter rounded-full`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
