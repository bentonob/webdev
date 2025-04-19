interface StatChangeProps {
  changes: { [key: string]: number };
}

export default function StatChange({ changes }: StatChangeProps) {
  const hasChanges = Object.values(changes).some(change => change !== 0);
  
  if (!hasChanges) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-apocalypse-dark border border-apocalypse-yellow p-3 rounded shadow-lg animate-fade-in z-50">
      <div className="text-sm">
        {Object.entries(changes).map(([stat, change]) => (
          change !== 0 && (
            <div key={stat} className={change > 0 ? "text-apocalypse-green" : "text-apocalypse-red"}>
              {stat.charAt(0).toUpperCase() + stat.slice(1)}: {change > 0 ? "+" : ""}{change}%
            </div>
          )
        ))}
      </div>
    </div>
  );
}
