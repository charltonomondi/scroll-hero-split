import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaSecondary?: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Ready to",
    subtitle: "Change Lives?",
    description: "Start with yours. Discover programs that transform passion into purpose and create lasting impact in your community.",
    ctaText: "Explore Programs",
    ctaSecondary: "Learn More"
  },
  {
    title: "Innovation",
    subtitle: "Starts Here",
    description: "Join a community of forward-thinking individuals pushing boundaries and creating solutions for tomorrow's challenges.",
    ctaText: "Join Us",
    ctaSecondary: "Discover More"
  },
  {
    title: "Your Future",
    subtitle: "Awaits",
    description: "Take the first step toward an extraordinary career with programs designed to unlock your full potential.",
    ctaText: "Get Started",
    ctaSecondary: "View Options"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsAnimating(false);
    }, 400);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsAnimating(false);
    }, 400);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 400);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left Content Section */}
      <div className="relative z-10 w-full lg:w-1/2 bg-gradient-hero px-8 lg:px-16 py-16 lg:py-24 min-h-screen flex flex-col justify-center">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full animate-float" />
          <div className="absolute top-1/2 -left-12 w-64 h-64 bg-white/3 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-12 left-1/4 w-32 h-32 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Hero Content */}
          <div className={`transition-all duration-800 ${isAnimating ? 'animate-hero-slide-out' : 'animate-hero-slide-in'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {currentHero.title}
              <br />
              <span className="relative">
                {currentHero.subtitle}
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-accent rounded-full" />
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {currentHero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white border-0 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                {currentHero.ctaText}
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105">
                {currentHero.ctaSecondary}
              </Button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {/* Slide Indicators */}
            <div className="flex gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-accent scale-125' 
                      : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex gap-2 ml-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Separator */}
      <div className="absolute inset-y-0 left-1/2 w-32 lg:w-48 z-20 hidden lg:block">
        <div className="h-full bg-gradient-hero transform -skew-x-12 -translate-x-6" />
        <div className="absolute inset-0 h-full bg-white/5 transform -skew-x-12 translate-x-2" />
      </div>

      {/* Right Video Section */}
      <div className="relative w-full lg:w-1/2 min-h-screen lg:min-h-screen">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-students-working-together-in-a-library-4005-large.mp4" type="video/mp4" />
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-video-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>

        {/* Video Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="group relative">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110 border-2 border-white/30">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full animate-ping" />
          </button>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/40 to-transparent" />
      </div>
    </section>
  );
};