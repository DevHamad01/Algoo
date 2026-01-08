import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { algorithms } from "@/content/algorithms";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, Clock, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredAlgorithms = algorithms.filter((algo) =>
    algo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    algo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "pathfinding":
        return "bg-primary/10 text-primary border-primary/20";
      case "graph":
        return "bg-accent/10 text-accent border-accent/20";
      case "tree":
        return "bg-secondary/50 text-secondary-foreground border-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Learn Algorithms
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master pathfinding and graph algorithms with detailed explanations, complexity analysis, and code examples
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search algorithms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algo, index) => (
            <Card
              key={algo.id}
              className="hover:border-primary/50 transition-all cursor-pointer hover-scale animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/learn/${algo.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {algo.title}
                  </CardTitle>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <CardDescription className="text-sm">
                  {algo.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={getCategoryColor(algo.category)}>
                    {algo.category}
                  </Badge>
                  <Badge variant="outline" className={getDifficultyColor(algo.difficulty)}>
                    {algo.difficulty}
                  </Badge>
                </div>

                {/* Complexity */}
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Time:</span>
                    <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">
                      {algo.timeComplexity}
                    </code>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Database className="w-4 h-4" />
                    <span className="font-medium">Space:</span>
                    <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">
                      {algo.spaceComplexity}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAlgorithms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No algorithms found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
