
import React, { useState, useEffect } from 'react';
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const calculateTransform = (factor: number) => {
    const xMove = (mousePosition.x - 0.5) * factor;
    const yMove = (mousePosition.y - 0.5) * factor;
    return `translate(${xMove}px, ${yMove}px)`;
  };
  return <section id="home" className="min-h-screen relative overflow-hidden pt-24 pb-16 px-6">
      {/* Background elements */}
      <div className="absolute right-0 top-1/4 w-64 h-64 bg-ftg-green/20 rounded-full blur-3xl" style={{
      transform: calculateTransform(-20)
    }}></div>
      <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-ftg-yellow/20 rounded-full blur-3xl" style={{
      transform: calculateTransform(-10)
    }}></div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-300`}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
            Strategy with a <span className="text-ftg-green relative">
              twist
              <svg className="absolute -bottom-1 w-full" viewBox="0 0 100 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,5 C30,2 70,9 100,3" fill="none" stroke="#3DE068" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Product strategy, business development, and growth processes with fun as the secret ingredient.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="fun-button">
              See My Work
            </button>
            <button className="px-6 py-3 font-medium border-2 border-ftg-green text-ftg-green rounded-md transition-all hover:bg-ftg-green/10">
              Get in Touch
            </button>
          </div>
        </div>
        
        <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-700 relative`}>
          <div className="w-full aspect-square bg-ftg-green/80 blob-shape blob-animation p-1.5">
            <div className="w-full h-full blob-shape blob-animation flex items-center justify-center p-8 bg-ftg-green rounded-none">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Did You Know?</h3>
                <p className="text-lg text-ftg-dark/80 mb-4">Companies with distinct brand personalities outperform competitors by 31%</p>
                <div className="inline-block animate-pulse-grow">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3DE068" strokeWidth="2" />
                    <path d="M12 16V12M12 8H12.01" stroke="#3DE068" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-ftg-yellow blob-shape animate-float">
            <div className="w-full h-full flex items-center justify-center text-ftg-dark font-bold">
              <div className="transform -rotate-12">Let's Grow!</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#3DE068" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>;
};
export default HeroSection;
