
import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ftg-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-ftg-green">Feel</span> the Grow
            </h2>
            <p className="text-gray-300 mb-6">
              Helping businesses discover their growth potential through strategic product development and marketing.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/dysell/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ftg-green/20 rounded-full flex items-center justify-center text-ftg-green hover:bg-ftg-green hover:text-white transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/FeelTheGrow" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-ftg-green/20 rounded-full flex items-center justify-center text-ftg-green hover:bg-ftg-green hover:text-white transition-colors">
                <Github size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-ftg-green">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-ftg-green transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-ftg-green transition-colors">Services</a>
              </li>
              <li>
                <a href="#expertise" className="text-gray-300 hover:text-ftg-green transition-colors">Expertise</a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-ftg-green transition-colors">About</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-ftg-green transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-ftg-green">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 items-center">
                <div className="text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-300">hello@feelthegrow.com</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">+46 123 456 789</span>
              </li>
              <li className="flex gap-3 items-center">
                <div className="text-ftg-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-300">Stockholm, Sweden</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Feel the Grow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
