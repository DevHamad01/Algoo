import { useParams, useNavigate } from "react-router-dom";
import { algorithms } from "@/content/algorithms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Play, Clock, Database } from "lucide-react";
import { useEffect } from "react";

const AlgorithmDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const algorithm = algorithms.find((algo) => algo.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Algorithm Not Found</h1>
          <p className="text-muted-foreground">The algorithm you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/learn")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Learn
          </Button>
        </div>
      </div>
    );
  }

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

  const handleTryInVisualizer = () => {
    // Navigate to visualizer with pre-selected algorithm
    navigate(`/visualizer?algorithm=${algorithm.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/learn")}
          className="mb-6 hover-scale"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learn
        </Button>

        {/* Header */}
        <div className="space-y-6 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {algorithm.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {algorithm.description}
            </p>
          </div>

          {/* Badges & Complexity */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className={getCategoryColor(algorithm.category)}>
              {algorithm.category}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(algorithm.difficulty)}>
              {algorithm.difficulty}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Time Complexity:</span>
              <code className="text-foreground bg-muted px-2 py-1 rounded font-mono">
                {algorithm.timeComplexity}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Space Complexity:</span>
              <code className="text-foreground bg-muted px-2 py-1 rounded font-mono">
                {algorithm.spaceComplexity}
              </code>
            </div>
          </div>

          {/* Try in Visualizer Button */}
          <Button
            size="lg"
            onClick={handleTryInVisualizer}
            className="hover-scale"
          >
            <Play className="w-5 h-5 mr-2" />
            Try in Visualizer
          </Button>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                    {children}
                  </ol>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) {
                    return (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                        <code className="text-sm text-foreground font-mono">
                          {children}
                        </code>
                      </pre>
                    );
                  }
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm text-foreground font-mono">
                      {children}
                    </code>
                  );
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full border border-border rounded-lg">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left text-foreground font-semibold border-b border-border">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-muted-foreground border-b border-border">
                    {children}
                  </td>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {algorithm.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button
            size="lg"
            onClick={handleTryInVisualizer}
            className="hover-scale"
          >
            <Play className="w-5 h-5 mr-2" />
            Try {algorithm.title} in Visualizer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDetail;
