
import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from "@/lib/utils";

const NavMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={cn(
      "fixed w-full z-50 py-4 px-6 transition-all duration-300",
      scrollPosition > 50 
        ? "bg-white/95 backdrop-blur shadow-md dark:bg-ftg-dark/95 dark:shadow-ftg-dark/30" 
        : "bg-transparent"
    )}>
      <div className="flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-ftg-dark dark:text-white">
          <span className="text-ftg-green">Feel</span> the Grow
        </a>
        
        <div className="hidden md:flex space-x-6 items-center">
          {["Home", "Services", "Expertise", "Work", "About", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="grow-link text-ftg-dark dark:text-white hover:text-ftg-green transition-colors"
            >
              {item}
            </a>
          ))}
          <ThemeToggle />
          <button className="fun-button">
            Let's Talk
          </button>
        </div>
        
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={toggleMenu} 
            className="flex flex-col space-y-1.5 group"
          >
            <span className={cn(
              "w-6 h-0.5 bg-ftg-dark dark:bg-white transition-all",
              isMenuOpen && "rotate-45 translate-y-2"
            )}></span>
            <span className={cn(
              "w-6 h-0.5 bg-ftg-dark dark:bg-white transition-opacity",
              isMenuOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "w-6 h-0.5 bg-ftg-dark dark:bg-white transition-all",
              isMenuOpen && "-rotate-45 -translate-y-2"
            )}></span>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-ftg-dark shadow-lg py-4 px-6 animate-slide-in-left">
          <div className="flex flex-col space-y-4">
            {["Home", "Services", "Expertise", "Work", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-ftg-dark dark:text-white py-2 border-b border-gray-100 dark:border-gray-800 hover:pl-2 transition-all hover:text-ftg-green"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="fun-button mt-4">
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
