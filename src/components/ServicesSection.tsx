import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  delay
}) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return <div className={cn("bg-white p-6 rounded-lg shadow-lg border-l-4 border-ftg-green card-hover", isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8", "transition-all duration-700")}>
      <div className="w-16 h-16 mb-4 text-ftg-green">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-ftg-dark/80">{description}</p>
    </div>;
};
const ServicesSection: React.FC = () => {
  return <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-ftg-light text-ftg-green mb-4">
            SERVICES
          </span>
          <h2 className="section-heading">How I <span className="text-ftg-green">Grow</span> Your Business</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-700">
            Combining analytical expertise with creative thinking to help you make strategic decisions that drive growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent">
          <ServiceCard title="Product Strategy" description="Shaping your product direction with customer-centric approaches and market insights that create sustainable value." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M16 8L8 16M12 3V5M5.5 7.5L7 9M3 12H5M5.5 16.5L7 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>} delay={300} />
          
          <ServiceCard title="Business Development" description="Creating partnerships and opportunities that unlock new markets and drive revenue growth." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 21H3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 8V3H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" stroke="currentColor" strokeWidth="2" />
                <path d="M18 15C19.1046 15 20 14.1046 20 13C20 11.8954 19.1046 11 18 11C16.8954 11 16 11.8954 16 13C16 14.1046 16.8954 15 18 15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z" stroke="currentColor" strokeWidth="2" />
              </svg>} delay={600} />
          
          <ServiceCard title="Marketing Strategy" description="Developing innovative marketing approaches that capture attention and convert prospects into loyal customers." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M12 20L4 12L12 4M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>} delay={900} />
          
          <ServiceCard title="Growth Processes" description="Implementing scalable systems and processes that support sustainable business growth and evolution." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M3 7L9 13L13 9L21 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 17H21V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>} delay={1200} />
          
          <ServiceCard title="Data-Driven Decisions" description="Using data analysis to guide strategic choices, identifying opportunities and minimizing risks." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M7 7V17M17 7V17M12 10V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>} delay={1500} />
          
          <ServiceCard title="Pivot Analysis" description="Determining when to persevere with current strategies and when to pivot for maximized success." icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M4 14L9 9L13 13L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 6H20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>} delay={1800} />
        </div>
      </div>
    </section>;
};
export default ServicesSection;