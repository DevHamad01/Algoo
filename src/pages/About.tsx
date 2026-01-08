import { Compass, Github, Lightbulb, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Compass className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            About This Project
          </h1>
        </div>

        <div className="space-y-8">
          <section className="bg-card p-8 rounded-lg border border-border space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Purpose</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This pathfinding visualizer was created to help students and developers understand how different pathfinding algorithms work. 
              By visualizing the algorithms in real-time, users can see exactly how each algorithm explores the grid and finds the optimal path.
            </p>
          </section>

          <section className="bg-card p-8 rounded-lg border border-border space-y-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Technology</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Built with modern web technologies for a smooth, interactive experience:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                React + TypeScript for type-safe component development
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Vite for blazing-fast development and builds
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Tailwind CSS for beautiful, responsive design
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                React Router for seamless navigation
              </li>
            </ul>
          </section>

          <section className="bg-card p-8 rounded-lg border border-border space-y-4">
            <div className="flex items-center gap-3">
              <Github className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Credits</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Created by <span className="text-foreground font-semibold">Hamad</span> as an educational tool for learning pathfinding algorithms.
            </p>
          </section>

          <section className="bg-card p-8 rounded-lg border border-border space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Future Plans</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>AI-assisted path prediction and optimization suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Interactive quizzes to test algorithm knowledge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>Custom graph drawing tool for advanced scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>More algorithms: Floyd-Warshall, Bellman-Ford, Prim's, Kruskal's</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                <span>User accounts to save and share custom mazes</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
