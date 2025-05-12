import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  tags
}) => {
  return <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 h-full">
      <div className="h-48 relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-ftg-dark">{title}</h3>
        <p className="text-ftg-dark/80 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => <span key={index} className="px-3 py-1 bg-ftg-light text-ftg-green text-xs rounded-full">
              {tag}
            </span>)}
        </div>
      </div>
    </div>;
};
const MyWorkSection: React.FC = () => {
  const projects = [{
    title: "Product Strategy for Fintech Startup",
    description: "Developed a comprehensive product roadmap that led to 200% increase in user engagement and secured Series A funding.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Product Strategy", "Fintech", "Growth"]
  }, {
    title: "E-commerce Marketplace Optimization",
    description: "Redesigned the customer journey to reduce cart abandonment by 35% and increase average order value by 22%.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    tags: ["UX Research", "E-commerce", "Conversion"]
  }, {
    title: "SaaS Platform Market Expansion",
    description: "Led market entry strategy into three new regions, resulting in a 60% revenue increase within the first year.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    tags: ["Market Strategy", "SaaS", "International"]
  }, {
    title: "Healthcare App Development",
    description: "Guided product team in creating an intuitive healthcare application that achieved 100K downloads in the first quarter.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    tags: ["Healthcare", "Mobile App", "UX Design"]
  }, {
    title: "Retail Brand Repositioning",
    description: "Transformed a declining retail brand through strategic pivoting, resulting in 40% increase in new customer acquisition.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Brand Strategy", "Retail", "Pivot"]
  }, {
    title: "B2B Growth Marketing",
    description: "Implemented data-driven marketing processes that reduced customer acquisition costs by 45% while increasing lead quality.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["B2B", "Marketing", "Analytics"]
  }];
  return <section id="my-work" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-ftg-light text-ftg-green mb-4">
            PORTFOLIO
          </span>
          <h2 className="section-heading">My <span className="text-ftg-green">Work</span></h2>
          <p className="text-xl max-w-3xl mx-auto text-ftg-dark">
            A selection of projects where I've helped businesses grow and succeed.
          </p>
        </div>
        
        <div className="relative px-4 md:px-12">
          <Carousel opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-4">
              {projects.map((project, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <ProjectCard title={project.title} description={project.description} image={project.image} tags={project.tags} />
                  </div>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4" />
            <CarouselNext className="hidden md:flex -right-4" />
          </Carousel>

          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex gap-2">
              {projects.map((_, index) => <button key={index} className={cn("w-3 h-3 rounded-full", index === 0 ? "bg-ftg-green" : "bg-gray-300")} aria-label={`Go to slide ${index + 1}`} />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MyWorkSection;