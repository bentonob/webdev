import { GameState } from '@shared/schema';
import { useState, useEffect } from 'react';

interface ResultsScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export default function ResultsScreen({ gameState, onRestart }: ResultsScreenProps) {
  const [showNarrative, setShowNarrative] = useState(false);
  const [narrativeText, setNarrativeText] = useState("");
  const [showStats, setShowStats] = useState(true);
  const [raccoonClicks, setRaccoonClicks] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggText, setEasterEggText] = useState("");
  
  // Easter egg for clicking raccoon
  const handleRaccoonClick = () => {
    setRaccoonClicks(prev => prev + 1);
    if (raccoonClicks === 4) { // Will become 5 after state update
      setEasterEggText("Ascended to raccoon heaven. You win.");
      setShowEasterEgg(true);
      
      // Immediately show narrative instead of stats
      setShowNarrative(true);
      setShowStats(false);
      
      // Play a chime sound effect or visual feedback
      // We'll use a visual effect with CSS animation
      const emoji = document.querySelector('.emoji-trigger');
      if (emoji) {
        emoji.classList.add('animate-spin');
        setTimeout(() => {
          emoji.classList.remove('animate-spin');
          emoji.classList.add('animate-bounce');
        }, 1000);
      }
    }
  };
  
  // Check if player chose all worst options
  useEffect(() => {
    // The worst choices are those with the most negative total impact
    const allStats = Object.values(gameState.stats);
    const totalStats = allStats.reduce((sum, stat) => sum + stat, 0);
    
    // If all stats are extremely low (below 30 on average), trigger easter egg
    if (totalStats < 120 && !showEasterEgg) { // 30 average x 4 stats = 120
      setEasterEggText("You invented a new form of failure.");
      setShowEasterEgg(true);
      
      // Apply some visual effect to show failure in a dramatic way
      setTimeout(() => {
        // Add red flashing effect to the screen
        const container = document.querySelector('.results-container');
        if (container) {
          container.classList.add('bg-apocalypse-red', 'animate-failure');
          
          // After a while, show the narrative
          setTimeout(() => {
            setShowNarrative(true);
            setShowStats(false);
          }, 1500);
        }
      }, 500);
    }
  }, []);
  
  // Narrative text based on survival time
  const generateNarrative = () => {
    // If Easter egg is triggered, return that instead
    if (showEasterEgg) {
      return easterEggText;
    }
    
    let narrative = "";
    
    if (gameState.survivalTime === 'INDEFINITELY') {
      narrative = "You survived for years, watching seasons change. The apocalypse that once terrified you became your new normal. You built not just shelter, but a home. Not just defenses, but a community. History will remember you not as a survivor, but as a founder of what comes next.";
    } else if (gameState.survivalTime === '2 YEARS') {
      narrative = "You survived for 730 days. Then one morning, you spotted a caravan in the distance. They wore clean clothes and carried fresh food. 'We're from New Harbor,' they said. 'We've been rebuilding. Come with us.' For the first time in years, you felt something dangerous: hope.";
    } else if (gameState.survivalTime === '6 MONTHS') {
      narrative = "You survived for 182 days. Then one morning, the skies cleared. You heard a voice on the radio: 'Safe zone in Nevada.' You packed your things and walked west, one last time. The road ahead was long, but for once, it led somewhere.";
    } else if (gameState.survivalTime === '3 WEEKS') {
      narrative = "You survived for 21 days. In your final moments, you found strange comfort watching the sunset. 'At least it was beautiful,' you whispered to no one in particular. The apocalypse claimed you, but it never claimed your humanity.";
    } else {
      narrative = "You survived for 48 hours. Your journey was brief but intense. In those final moments, clutching the photo of those you loved, you realized that even in an apocalypse, it was your humanity—not your survival skills—that defined you.";
    }
    
    return narrative;
  };
  
  // Type-writer effect
  useEffect(() => {
    const narrative = generateNarrative();
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < narrative.length) {
        setNarrativeText(narrative.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [showEasterEgg, easterEggText]);
  
  // Show narrative after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNarrative(true);
      setShowStats(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex-col items-center justify-center p-4 flex animate-fade-in">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-apocalypse-dark border-2 border-apocalypse-red rounded-lg p-6 shadow-lg text-center relative overflow-hidden results-container">
          {/* Normal stats view */}
          <div className={`transition-opacity duration-1000 ${showStats ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="font-gameFont text-apocalypse-yellow text-lg md:text-2xl mb-2">
              SURVIVAL ASSESSMENT
            </h2>
            
            <div className="flex justify-center my-6">
              <div 
                className="text-6xl md:text-8xl animate-pulse-slow cursor-pointer emoji-trigger"
                onClick={handleRaccoonClick}
                title={raccoonClicks > 0 ? `Raccoon clicks: ${raccoonClicks}/5` : ""}
              >
                {gameState.apocalypseType.emoji}
              </div>
            </div>
            
            <h1 className="font-gameFont text-apocalypse-red text-xl md:text-3xl mb-4">
              YOU SURVIVED FOR
            </h1>
            <div className="text-3xl md:text-5xl font-bold text-apocalypse-green mb-6">
              {gameState.survivalTime}
            </div>
            
            <div className="px-4 py-6 bg-black bg-opacity-30 rounded-lg mb-6">
              <h3 className="text-apocalypse-light font-bold mb-3">
                {gameState.survivalTime === 'INDEFINITELY' ? 'HOW YOU SURVIVED:' : 'CAUSE OF DEATH:'}
              </h3>
              <p className="text-lg">
                {gameState.deathDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="stat-result">
                <div className="text-sm mb-1">Final Health:</div>
                <div className="font-bold text-apocalypse-red">{gameState.stats.health}%</div>
              </div>
              <div className="stat-result">
                <div className="text-sm mb-1">Final Morale:</div>
                <div className="font-bold text-apocalypse-yellow">{gameState.stats.morale}%</div>
              </div>
              <div className="stat-result">
                <div className="text-sm mb-1">Final Supplies:</div>
                <div className="font-bold text-apocalypse-green">{gameState.stats.supplies}%</div>
              </div>
              <div className="stat-result">
                <div className="text-sm mb-1">Final Stealth:</div>
                <div className="font-bold text-apocalypse-blue">{gameState.stats.stealth}%</div>
              </div>
            </div>
          </div>
          
          {/* Narrative view */}
          <div 
            className={`absolute inset-0 bg-apocalypse-dark p-6 flex flex-col items-center justify-center transition-opacity duration-1000 ${showNarrative ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="max-w-2xl">
              <div 
                className="text-4xl mb-6 cursor-pointer emoji-trigger"
                onClick={handleRaccoonClick}
                title={raccoonClicks > 0 ? `Raccoon clicks: ${raccoonClicks}/5` : ""}
              >
                {gameState.apocalypseType.emoji}
              </div>
              <p className="text-xl text-apocalypse-light leading-relaxed font-mono mb-8 text-left">
                {narrativeText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={onRestart}
            className="py-3 px-8 bg-apocalypse-green text-apocalypse-dark font-bold rounded hover:bg-green-500 transition-all z-10 relative"
          >
            TRY ANOTHER APOCALYPSE
          </button>
        </div>
      </div>
    </div>
  );
}
