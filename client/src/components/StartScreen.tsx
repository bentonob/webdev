interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center animate-fade-in">
      <h1 
        className="glitch-text font-gameFont text-4xl md:text-5xl mb-8 text-apocalypse-red" 
        data-text="HOW LONG WOULD YOU SURVIVE?"
      >
        HOW LONG WOULD YOU SURVIVE?
      </h1>
      
      <div className="w-full max-w-md bg-apocalypse-dark border-2 border-apocalypse-red rounded-lg p-6 shadow-lg relative overflow-hidden">
        <div className="mb-8">
          <p className="text-lg text-apocalypse-light mb-6">
            Can you outlast the coming doom? Take this quiz to find out your fate!
          </p>
          <div className="animate-pulse flex justify-center mb-4">
            <span className="text-5xl">☠️</span>
          </div>
          <p className="text-sm opacity-75 mb-6">
            Answer 5 questions to determine your survival skills in a randomly chosen apocalypse scenario.
          </p>
        </div>
        <button 
          onClick={onStart}
          className="w-full py-3 px-6 bg-apocalypse-red text-white font-bold text-lg rounded hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
        >
          START SURVIVAL TEST
        </button>
      </div>
      <p className="mt-4 text-xs opacity-50">
        Warning: Results may be terrifying, hilarious, or both.
      </p>
    </div>
  );
}
