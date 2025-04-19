import { GameState, Choice } from '@shared/schema';
import StatBar from '@/components/StatBar';
import { getEffectHint } from '@/lib/apocalypseData';

interface QuestionScreenProps {
  gameState: GameState;
  onSelectChoice: (index: number) => void;
}

export default function QuestionScreen({ gameState, onSelectChoice }: QuestionScreenProps) {
  // Make sure currentQuestion exists, otherwise return null
  if (gameState.currentQuestion >= gameState.questions.length) {
    return null;
  }
  
  const currentQuestion = gameState.questions[gameState.currentQuestion];
  
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
                Question {gameState.currentQuestion + 1}/5
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
      
      {/* Question Content */}
      <div className="pt-28 pb-10 max-w-3xl mx-auto w-full animate-fade-in">
        <div className="bg-apocalypse-dark border-2 border-apocalypse-yellow rounded-lg p-6 shadow-lg mb-4">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {currentQuestion.text}
          </h2>
          
          <div className="space-y-4">
            {currentQuestion.choices.map((choice: Choice, index: number) => (
              <div 
                key={index}
                onClick={() => onSelectChoice(index)}
                className="choice-option bg-apocalypse-dark border border-apocalypse-light hover:border-apocalypse-yellow rounded-lg p-4 transition-all duration-200 cursor-pointer"
              >
                <p className="mb-1">{choice.text}</p>
                <div className="text-xs">
                  {Object.entries(choice.effects).map(([stat, change]) => (
                    change !== 0 && (
                      <span key={stat} className={`${change > 0 ? "text-apocalypse-green" : "text-apocalypse-red"} mr-2`}>
                        {change > 0 ? `↑ ${stat} (+${change})` : `↓ ${stat} (${change})`}
                      </span>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
