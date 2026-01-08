export const Legend = () => {
  const items = [
    { color: "bg-[hsl(var(--node-start))]", label: "Start Node" },
    { color: "bg-[hsl(var(--node-end))]", label: "End Node" },
    { color: "bg-[hsl(var(--node-wall))]", label: "Wall" },
    { color: "bg-[hsl(var(--node-visited))]", label: "Visited" },
    { color: "bg-[hsl(var(--node-path))]", label: "Shortest Path" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border border-border shadow-sm">
      <span className="text-sm font-semibold text-foreground">Legend:</span>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded border-2 border-border ${item.color}`} />
          <span className="text-sm text-foreground font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
