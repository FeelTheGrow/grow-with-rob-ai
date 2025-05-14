
import React, { useEffect } from 'react';
import NavMenu from '@/components/NavMenu';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import MyWorkSection from '@/components/MyWorkSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollReveal from '@/components/ScrollReveal';

const Index = () => {
  useEffect(() => {
    // Update the title and meta description
    document.title = "Rob Dysell | Feel the Grow - Product Strategy Specialist";
    
    // Update meta description if it exists
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Rob Dysell helps businesses grow through innovative product strategy, business development, and growth processes with a personal touch.');
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <ParticleBackground />
      <NavMenu />
      
      <main>
        <HeroSection />
        
        <ScrollReveal>
          <ServicesSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <ExpertiseSection />
        </ScrollReveal>

        <ScrollReveal>
          <MyWorkSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
