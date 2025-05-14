import React, { useEffect, useState } from 'react';
interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}
const Counter: React.FC<CounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <div className="font-bold text-4xl bg-transparent">
      {prefix}{count}{suffix}
    </div>;
};
const AboutSection = () => {
  return <section id="about" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-ftg-green/20 rounded-lg transform -rotate-3"></div>
            <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-ftg-green/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-6xl text-ftg-green mb-4">👋</div>
                    <h3 className="text-2xl font-bold mb-2 text-ftg-dark">Rob Dysell</h3>
                    <p className="text-lg text-ftg-dark/70">Product Strategy Specialist</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-ftg-light rounded-lg">
                  <Counter end={15} suffix="+" />
                  <p className="text-sm text-ftg-dark/70 mt-2">Years Experience</p>
                </div>
                <div className="p-4 bg-ftg-light rounded-lg">
                  <Counter end={50} suffix="+" />
                  <p className="text-sm text-ftg-dark/70 mt-2">Projects</p>
                </div>
                <div className="p-4 bg-ftg-light rounded-lg">
                  <Counter end={30} suffix="+" />
                  <p className="text-sm text-ftg-dark/70 mt-2">Happy Clients</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-ftg-yellow blob-shape flex items-center justify-center animate-pulse-grow">
              <div className="transform rotate-6 font-bold">Let's Talk!</div>
            </div>
          </div>
          
          <div>
            <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-ftg-light text-ftg-green mb-4">
              ABOUT ME
            </span>
            <h2 className="text-4xl font-bold mb-6">
              Bringing <span className="text-ftg-green">Fun</span> to Your Business Strategy
            </h2>
            
            <p className="text-lg mb-6 text-gray-700">
              With over 15 years of experience in marketing, research, and business development, I've helped numerous companies find their strategic path forward. I believe that the best strategies come from a unique blend of analytical thinking and creative problem-solving.
            </p>
            
            <div className="bg-ftg-light p-5 rounded-lg mb-6 border-l-4 border-ftg-green">
              <p className="italic text-gray-700">
                "I help businesses identify when to persevere with their current strategy and when to pivot for maximum impact."
              </p>
            </div>
            
            <p className="text-lg mb-6 text-gray-700">
              As a solo consultant, I offer a personalized approach to every client. My methodology combines rigorous data analysis with innovative thinking, helping you grow in ways you never thought possible. And yes, we'll have fun along the way!
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-3 py-1 bg-ftg-green/10 text-ftg-green rounded-full text-sm">Product Strategy</span>
              <span className="px-3 py-1 bg-ftg-green/10 text-ftg-green rounded-full text-sm">Marketing</span>
              <span className="px-3 py-1 bg-ftg-green/10 text-ftg-green rounded-full text-sm">Business Development</span>
              <span className="px-3 py-1 bg-ftg-green/10 text-ftg-green rounded-full text-sm">Data Analysis</span>
              <span className="px-3 py-1 bg-ftg-green/10 text-ftg-green rounded-full text-sm">Growth Strategy</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="fun-button">
                Download CV
              </button>
              <button className="px-6 py-3 font-medium border-2 border-ftg-green text-ftg-green rounded-md transition-all hover:bg-ftg-green/10">
                Connect on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;