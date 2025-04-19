import { GameState } from '@shared/schema';

interface ResultsScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export default function ResultsScreen({ gameState, onRestart }: ResultsScreenProps) {
  return (
    <div className="min-h-screen flex-col items-center justify-center p-4 flex animate-fade-in">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-apocalypse-dark border-2 border-apocalypse-red rounded-lg p-6 shadow-lg text-center">
          <h2 className="font-gameFont text-apocalypse-yellow text-lg md:text-2xl mb-2">
            SURVIVAL ASSESSMENT
          </h2>
          
          <div className="flex justify-center my-6">
            <div className="text-6xl md:text-8xl animate-pulse-slow">
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
          
          <button 
            onClick={onRestart}
            className="py-3 px-8 bg-apocalypse-green text-apocalypse-dark font-bold rounded hover:bg-green-500 transition-all"
          >
            TRY ANOTHER APOCALYPSE
          </button>
        </div>
      </div>
    </div>
  );
}
