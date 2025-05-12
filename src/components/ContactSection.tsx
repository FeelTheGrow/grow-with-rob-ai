import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Github } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return <section id="contact" className="py-20 px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold px-3 py-1 rounded-full bg-ftg-light text-ftg-green mb-4">
            GET IN TOUCH
          </span>
          <h2 className="section-heading">Let's <span className="text-ftg-green">Grow</span> Together</h2>
          <p className="text-xl max-w-3xl mx-auto text-ftg-light">
            Ready to take your business to the next level? Let's connect and explore how we can work together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 p-6 rounded-lg shadow-lg border border-gray-100 bg-ftg-light">
            <h3 className="text-2xl font-bold mb-6 text-ftg-dark">
              Connect With Me
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ftg-green/10 rounded-full flex items-center justify-center text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Email</h4>
                  <p className="text-ftg-dark/70">hello@feelthegrow.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ftg-green/10 rounded-full flex items-center justify-center text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Phone</h4>
                  <p className="text-ftg-dark/70">+46 123 456 789</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-ftg-green/10 rounded-full flex items-center justify-center text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Location</h4>
                  <p className="text-ftg-dark/70">Stockholm, Sweden</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/dysell/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ftg-green/10 rounded-full flex items-center justify-center text-ftg-green hover:bg-ftg-green hover:text-white transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://github.com/FeelTheGrow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ftg-green/10 rounded-full flex items-center justify-center text-ftg-green hover:bg-ftg-green hover:text-white transition-colors">
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 p-6 rounded-lg shadow-lg border border-gray-100 bg-ftg-light">
            <h3 className="text-2xl font-bold mb-6 text-ftg-dark">
              Send Me a Message
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Your name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ftg-green/50" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ftg-green/50" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company (Optional)
                </label>
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ftg-green/50" placeholder="Your Company" />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ftg-green/50" placeholder="How can I help you?" required />
              </div>
              
              <button type="submit" className={cn("fun-button w-full relative overflow-hidden", isSubmitting && "opacity-80 cursor-wait")} disabled={isSubmitting}>
                {isSubmitting ? <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span> : isSubmitted ? <span className="flex items-center justify-center">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </span> : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>;
};

export default ContactSection;
