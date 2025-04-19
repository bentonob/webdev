import { ApocalypseScenario } from '@shared/schema';

interface ApocalypseRevealProps {
  apocalypse: ApocalypseScenario;
  onContinue: () => void;
}

export default function ApocalypseReveal({ apocalypse, onContinue }: ApocalypseRevealProps) {
  return (
    <div className="min-h-screen flex-col items-center justify-center p-4 text-center flex animate-fade-in">
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h2 className="font-gameFont text-apocalypse-yellow text-xl md:text-3xl mb-2">
            APOCALYPSE DETECTED
          </h2>
          <div className="text-6xl md:text-8xl mb-4 animate-pulse-slow">
            {apocalypse.emoji}
          </div>
          <h1 className="font-gameFont text-apocalypse-red text-2xl md:text-4xl mb-8 animate-glitch">
            {apocalypse.type}
          </h1>
          <p className="text-apocalypse-light text-lg mb-8">
            {apocalypse.description}
          </p>
          <button 
            onClick={onContinue}
            className="py-3 px-8 bg-apocalypse-yellow text-apocalypse-dark font-bold rounded hover:bg-yellow-400 transition-all animate-pulse"
          >
            PREPARE FOR SURVIVAL
          </button>
        </div>
      </div>
    </div>
  );
}
