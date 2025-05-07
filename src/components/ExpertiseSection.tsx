import React, { useState } from 'react';
import { cn } from '@/lib/utils';
interface ExpertiseAreaProps {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}
const ExpertiseArea: React.FC<ExpertiseAreaProps> = ({
  title,
  description,
  active,
  onClick,
  icon
}) => {
  return <div className={cn("p-5 rounded-lg cursor-pointer transition-all duration-300", active ? "bg-ftg-green text-white shadow-xl shadow-ftg-green/20" : "bg-white hover:bg-ftg-light border border-gray-200")} onClick={onClick}>
      <div className="flex items-start gap-3">
        <div className={cn("w-10 h-10", active ? "text-white" : "text-ftg-green")}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className={cn("transition-all duration-300", active ? "text-white/90" : "text-ftg-dark/70")}>
            {description}
          </p>
        </div>
      </div>
    </div>;
};
const ExpertiseSection: React.FC = () => {
  const [activeArea, setActiveArea] = useState(0);
  const expertiseAreas = [{
    title: "Product Strategy",
    description: "Combining market insights with user needs to create products that solve real problems effectively.",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M14 5.5C14 4.12 12.88 3 11.5 3C10.12 3 9 4.12 9 5.5C9 6.88 10.12 8 11.5 8C12.88 8 14 6.88 14 5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 17.5C16.5 16.12 15.38 15 14 15H9C7.62 15 6.5 16.12 6.5 17.5C6.5 18.88 7.62 20 9 20H14C15.38 20 16.5 18.88 16.5 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.5 11.5C20.5 10.12 19.38 9 18 9C16.62 9 15.5 10.12 15.5 11.5C15.5 12.88 16.62 14 18 14C19.38 14 20.5 12.88 20.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.5 11.5C4.5 10.12 5.62 9 7 9C8.38 9 9.5 10.12 9.5 11.5C9.5 12.88 8.38 14 7 14C5.62 14 4.5 12.88 4.5 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
  }, {
    title: "Business Development",
    description: "Creating strategic partnerships and identifying new market opportunities to drive sustainable growth.",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
  }, {
    title: "Marketing & Growth",
    description: "Developing innovative marketing approaches that capture attention and drive customer acquisition.",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M3.09 13.12H10.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.09 8.81H10.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.09 18.43H10.91" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.12 16.93V19.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.82 14.15V19.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.51 10.56V19.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.12 4.18V12.72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
  }, {
    title: "Data Analysis",
    description: "Turning raw data into actionable insights that guide strategic decisions and business growth.",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M15 22V13C15 12.4 14.6 12 14 12H10C9.4 12 9 12.4 9 13V22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 9.96999C3 9.35999 3.29 8.78004 3.77 8.40004L13.77 1.01003C14.5 0.460034 15.5 0.460034 16.23 1.01003L16.74 1.38" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.2 2.79004L20.23 3.57004C20.71 3.95004 21 4.52999 21 5.13999V22" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
  }, {
    title: "Startup Development",
    description: "Guiding startups from ideation to growth, with a focus on identifying product-market fit and scaling.",
    icon: <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M19.04 22.0001C19.04 18.6501 16.35 15.9601 13 15.9601C9.65 15.9601 6.96 18.6501 6.96 22.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.99 11.87C14.6731 11.87 16.03 10.5131 16.03 8.83C16.03 7.14688 14.6731 5.79 12.99 5.79C11.3069 5.79 9.95 7.14688 9.95 8.83C9.95 10.5131 11.3069 11.87 12.99 11.87Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 8.23C4 6.40977 5.47969 4.93008 7.29992 4.93008C9.12016 4.93008 10.6 6.40977 10.6 8.23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21.9999 7.92998C21.9999 9.75022 20.5202 11.2299 18.6999 11.2299C16.8797 11.2299 15.3999 9.75022 15.3999 7.92998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 21.9999H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
  }];
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="expertise" className="py-20 px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-ftg-light text-ftg-green mb-4">
            EXPERTISE
          </span>
          <h2 className="section-heading">Areas of <span className="text-ftg-green">Expertise</span></h2>
          <p className="text-xl max-w-3xl mx-auto text-ftg-dark/80">
            With over 15 years of experience across multiple industries, I bring a wealth of knowledge to every project.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid gap-4">
            {expertiseAreas.map((area, index) => <ExpertiseArea key={index} title={area.title} description={area.description} active={activeArea === index} onClick={() => setActiveArea(index)} icon={area.icon} />)}
          </div>
          
          <div className="relative p-6 hidden md:block">
            <div className="absolute inset-0 bg-ftg-green/10 rounded-lg blob-shape transform rotate-12"></div>
            <div className="relative p-8 rounded-lg shadow-xl border border-ftg-green/20 bg-ftg-light">
              <h3 className="text-2xl font-bold mb-4 text-ftg-dark">
                {expertiseAreas[activeArea].title} <span className="text-ftg-green">Expertise</span>
              </h3>
              
              <div className="mb-6 border-l-4 border-ftg-green pl-4 py-2">
                <p className="italic text-ftg-dark/80">
                  "Great product strategy isn't about following trends—it's about knowing when to break them and create your own path."
                </p>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="text-ftg-green mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ftg-dark/80">
                    Data-driven approach to identify opportunities and challenges
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="text-ftg-green mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ftg-dark/80">
                    Creative problem-solving that sets your brand apart
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="text-ftg-green mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-ftg-dark/80">
                    Strategic thinking that balances short-term wins with long-term vision
                  </span>
                </li>
              </ul>
              
              <div className="mt-8">
                <button onClick={scrollToContact} className="fun-button">
                  Ask Rob for help
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ExpertiseSection;