import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Zap,
  Target,
  Users,
  BookOpen,
  Code,
  Play,
  Star,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  School,
  ChevronDown,
  Rocket,
  Award,
  Clock,
  Layers,
  Brain,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Home = () => {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const algorithms = [
    {
      name: "Breadth-First Search",
      shortName: "BFS",
      difficulty: "Beginner",
      category: "Pathfinding",
      image: "/algorithm_bfs.png",
      description: "Explores nodes level by level",
    },
    {
      name: "Dijkstra's Algorithm",
      shortName: "Dijkstra",
      difficulty: "Intermediate",
      category: "Pathfinding",
      image: "/algorithm_dijkstra.png",
      description: "Finds shortest weighted path",
    },
    {
      name: "A* Search",
      shortName: "A*",
      difficulty: "Intermediate",
      category: "Pathfinding",
      icon: Target,
      description: "Optimal heuristic pathfinding",
    },
    {
      name: "Greedy Best-First",
      shortName: "Greedy",
      difficulty: "Beginner",
      category: "Pathfinding",
      icon: Zap,
      description: "Fast heuristic search",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-time Speed Control",
      description: "Adjust visualization speed from slow-motion to instant",
    },
    {
      icon: Layers,
      title: "Step-by-Step Breakdown",
      description: "Pause and analyze each algorithm step in detail",
    },
    {
      icon: Code,
      title: "Code + Visualization",
      description: "See code and visual execution side by side",
    },
    {
      icon: Brain,
      title: "Beginner Friendly",
      description: "No prior algorithm knowledge required",
    },
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Learn through hands-on visual experiences",
    },
    {
      icon: Rocket,
      title: "Production Ready",
      description: "Industry-standard algorithm implementations",
    },
  ];

  const targetAudience = [
    {
      icon: GraduationCap,
      title: "CS Students",
      benefit: "Master algorithms for exams and projects",
    },
    {
      icon: Code,
      title: "Self-Taught Developers",
      benefit: "Build strong algorithm fundamentals",
    },
    {
      icon: Briefcase,
      title: "Interview Prep",
      benefit: "Ace coding interviews with confidence",
    },
    {
      icon: School,
      title: "Teachers & Instructors",
      benefit: "Engage students with visual learning",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CS Student",
      feedback: "Dijkstra finally made sense after seeing it visualized. Game changer!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Software Engineer",
      feedback: "Helped me crack my FAANG interview. The visual approach is brilliant.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Bootcamp Graduate",
      feedback: "I went from confused to confident in pathfinding algorithms.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Is Algoo completely free?",
      answer: "Yes! All core features including algorithm visualization, learning resources, and practice exercises are 100% free.",
    },
    {
      question: "Do I need coding experience?",
      answer: "No prior experience needed! We start from basics and build up gradually. Perfect for beginners and advanced learners alike.",
    },
    {
      question: "Is this good for exam preparation?",
      answer: "Absolutely! Many students use Algoo to prepare for data structures & algorithms exams. Visual learning improves retention significantly.",
    },
    {
      question: "Can I use it on mobile?",
      answer: "Yes! Algoo is fully responsive and works great on tablets and mobile devices.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION - Monochrome */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Users className="w-4 h-4" />
                Trusted by 1000+ Students
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
                Master Algorithms.{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Visualize Paths.</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-gray-300 -z-0"></span>
                </span>{" "}
                Learn Smart.
              </h1>

              <p className="text-xl sm:text-2xl text-gray-700 font-medium">
                See algorithms think.
              </p>

              <p className="text-lg text-gray-600 max-w-xl">
                Transform complex pathfinding algorithms into interactive visual experiences.
                Professional learning platform for serious developers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {user ? (
                  <Link to="/dashboard">
                    <Button className="h-16 px-10 text-lg bg-black hover:bg-gray-900">
                      <Zap className="w-6 h-6 mr-2" />
                      Open Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="h-16 px-10 text-lg bg-black hover:bg-gray-900">
                        <Rocket className="w-6 h-6 mr-2" />
                        Get Started Free
                      </Button>
                    </Link>
                    <Link to="/visualizer">
                      <Button variant="outline" className="h-16 px-10 text-lg border-2 border-black hover:bg-gray-100">
                        <Play className="w-6 h-6 mr-2" />
                        Try Demo
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right: Illustration */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/hero_illustration.png"
                alt="Algorithm visualization"
                className="w-full max-w-md lg:max-w-lg opacity-90"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* 2. SOCIAL PROOF - Monochrome */}
      <section className="py-12 bg-black text-white border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">
              Trusted by students from 20+ universities
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-white fill-white" />
              <span className="text-2xl font-bold">4.9/5</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-gray-400">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-gray-400">Visualizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-gray-400">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALGORITHMS GRID - Monochrome */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Explore Algorithms Visually
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master the most important pathfinding algorithms with interactive visualizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithms.map((algo, index) => (
              <Link
                key={index}
                to={`/visualizer?algorithm=${algo.shortName.toLowerCase()}`}
                className="group"
              >
                <div className="bg-white border-2 border-gray-300 rounded-xl p-6 hover:border-black hover:shadow-2xl transition-all">
                  <div className="flex justify-center mb-4">
                    {algo.image ? (
                      <img src={algo.image} alt={algo.name} className="w-32 h-32 object-contain grayscale" />
                    ) : algo.icon ? (
                      <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-xl">
                        <algo.icon className="w-16 h-16 text-black" />
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-black">
                        {algo.shortName}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full font-semibold bg-gray-200 text-gray-800">
                        {algo.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{algo.description}</p>
                    <div className="pt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {algo.category}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUALIZER PREVIEW - Monochrome */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Preview Grid */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${i === 22 ? "bg-white" :
                        i === 77 ? "bg-gray-400" :
                          [23, 24, 33, 43, 53, 63, 73].includes(i) ? "bg-gray-700" :
                            [34, 44, 54, 64, 74, 75, 76].includes(i) ? "bg-gray-500" :
                              "bg-gray-800"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Steps */}
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                See Algorithms in Action
              </h2>
              <div className="space-y-6">
                {[
                  { step: 1, title: "Select Algorithm", desc: "Choose from BFS, Dijkstra, A*, or Greedy" },
                  { step: 2, title: "Place Walls", desc: "Draw obstacles by clicking and dragging" },
                  { step: 3, title: "Visualize Path", desc: "Watch the algorithm find the shortest route" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/visualizer">
                <Button className="h-14 px-8 bg-white text-black hover:bg-gray-200 text-lg font-semibold">
                  Try Live Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES - Monochrome */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Why Choose Algoo?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional algorithm learning platform for serious developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:border-black hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black rounded-xl">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LEARNING JOURNEY - Monochrome */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-gray-600">
              From beginner to algorithm master in 5 steps
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

            <div className="space-y-12">
              {[
                { title: "Choose Your Algorithm", desc: "Pick from our curated collection", icon: Target },
                { title: "Watch It Visualize", desc: "See the algorithm work in real-time", icon: Play },
                { title: "Understand the Logic", desc: "Learn why it works step-by-step", icon: Brain },
                { title: "Practice Problems", desc: "Apply your knowledge hands-on", icon: Code },
                { title: "Build Confidence", desc: "Master algorithms for exams & interviews", icon: Award },
              ].map((step, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-black transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-black" />
                      <h3 className="text-xl font-bold text-black">{step.title}</h3>
                    </div>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. TARGET AUDIENCE - Monochrome */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Who Is This For?
            </h2>
            <p className="text-lg text-gray-600">
              Algoo helps everyone master algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-black hover:shadow-lg transition-all"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-black rounded-2xl">
                    <audience.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                  {audience.title}
                </h3>
                <p className="text-gray-600">
                  {audience.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CODE VISUALIZATION - Monochrome */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Understand How Code Turns Into Paths
            </h2>
            <p className="text-lg text-gray-400">
              See the connection between code and visual execution
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                </div>
                <span className="text-gray-500 text-xs ml-2">bfs.ts</span>
              </div>
              <pre className="text-gray-300">
                {`function bfs(grid, start, end) {
  const queue = [start];
  const visited = new Set();
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (current === end) {
      return reconstructPath(current);
    }
    
    for (const neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`}
              </pre>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-center justify-center border-2 border-gray-800">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded ${i === 9 ? "bg-black" :
                        i === 54 ? "bg-gray-400" :
                          [10, 11, 18, 19, 26, 27].includes(i) ? "bg-gray-600" :
                            "bg-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS - Monochrome */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              What Students Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of learners who've mastered algorithms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200 hover:border-black transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-black fill-black" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.feedback}"
                </p>
                <div>
                  <div className="font-bold text-black">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ - Monochrome */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Algoo
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-black">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${openFaq === index ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA - Monochrome */}
      <section className="py-20 sm:py-32 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold">
            <Rocket className="w-4 h-4" />
            Join 1000+ Students
          </div>

          <h2 className="text-4xl sm:text-6xl font-bold">
            Ready to Master Algorithms?
          </h2>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start your journey today. No credit card required. 100% free forever.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/signup">
                <Button className="h-16 px-12 text-lg bg-white text-black hover:bg-gray-200 font-bold">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/visualizer">
                <Button variant="outline" className="h-16 px-12 text-lg border-2 border-white text-white hover:bg-white hover:text-black font-bold">
                  Open Visualizer
                  <Play className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 12. FOOTER - Monochrome */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Algoo</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Professional algorithm visualization platform for serious developers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Learn</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/learn" className="hover:text-white transition-colors">Algorithms</Link></li>
                <li><Link to="/tutorials" className="hover:text-white transition-colors">Tutorials</Link></li>
                <li><Link to="/visualizer" className="hover:text-white transition-colors">Visualizer</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              &copy; 2026 Algoo. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Built for algorithm learners worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
