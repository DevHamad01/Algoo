import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Zap, Target } from "lucide-react";
import HeroImage from "@/assets/about_hero.png";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-24 md:px-12 md:pt-24 lg:pt-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold tracking-wide uppercase text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              Our Vision
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              We take pride in delivering <span className="text-gray-400">Exceptional</span> results.
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
              Algoo is an innovative platform dedicated to visualizing the complex world of algorithms. We simplify learning through interactive experiences.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-gray-300 hover:bg-gray-50">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              {/* Use the generated premium 3D illustration here */}
              <img
                src={HeroImage}
                alt="Abstract Premium Design"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card Decorative */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Efficiency Boost</p>
                  <p className="text-xl font-bold">10x Faster</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gray-50 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Trophy className="w-12 h-12 mx-auto text-black" />
          <h2 className="text-3xl md:text-4xl font-medium leading-tight">
            "We believe that great design and powerful algorithms should go hand in hand. Our approach combines intellectual rigor with aesthetic simplicity."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=Dev+Hamad&background=000&color=fff" alt="Creator" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold">DevHamad</p>
              <p className="text-xs text-gray-500">Creator & Lead Architect</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Creator */}
      <section className="py-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Creator</h3>
          <h2 className="text-4xl font-bold">Meet the mind behind Algoo</h2>
          <p className="text-gray-500 max-w-md mx-auto mt-4">
            A solo developer, designer, and architect dedicated to crafting the ultimate algorithmic visualization tool.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:shadow-lg transition-all duration-300">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative border border-gray-200">
            <img src="https://ui-avatars.com/api/?name=Dev+Hamad&background=000&color=fff&size=512" alt="DevHamad" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">DevHamad</h3>
              <p className="text-lg text-gray-600 font-medium">Lead Developer, Designer & Architect</p>
            </div>
            <p className="text-gray-500 leading-relaxed text-base">
              DevHamad is the visionary and engineer behind Algoo. Driven by a passion for computer science and interface design, he single-handedly architected the system's pathfinding and sorting engines, created the modern visual aesthetics, and built the interactive learning curriculum.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-3 py-1 bg-white border border-gray-200 text-xs font-semibold rounded-full">React & TS</span>
              <span className="px-3 py-1 bg-white border border-gray-200 text-xs font-semibold rounded-full">Firebase Auth</span>
              <span className="px-3 py-1 bg-white border border-gray-200 text-xs font-semibold rounded-full">Algorithm Design</span>
              <span className="px-3 py-1 bg-white border border-gray-200 text-xs font-semibold rounded-full">UI/UX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="bg-black text-white py-24 px-6 md:px-12 rounded-t-[3rem]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why choose Algoo?</h2>
            <p className="text-gray-400">Empowering your path to mastery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 border-l border-gray-800 pl-6">
              <Target className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold">Precision</h3>
              <p className="text-gray-400">Our visualizers are accurate to the millisecond, ensuring you understand every step.</p>
            </div>
            <div className="space-y-4 border-l border-gray-800 pl-6">
              <Users className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold">Community</h3>
              <p className="text-gray-400">Join thousands of students and developers sharing paths and solutions.</p>
            </div>
            <div className="space-y-4 border-l border-gray-800 pl-6">
              <Trophy className="w-8 h-8 text-white" />
              <h3 className="text-xl font-bold">Excellence</h3>
              <p className="text-gray-400">Award-winning educational tools designed for the modern web.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
