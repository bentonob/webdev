interface StatBarProps {
  name: string;
  emoji: string;
  value: number;
  color: string;
}

export default function StatBar({ name, emoji, value, color }: StatBarProps) {
  return (
    <div className="stat-container">
      <div className="flex justify-between mb-1">
        <span className="text-sm">{name} {emoji}</span>
        {/* Removed percentage display for added difficulty */}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`stat-meter ${color} rounded-full`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}
