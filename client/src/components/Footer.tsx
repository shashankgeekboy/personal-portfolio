import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';

const Footer: React.FC = () => {
  const { playHover, playClick } = useAudio();
  
  const links = [
    { name: 'Home', url: '#' },
    { name: 'About', url: '#about' },
    { name: 'Projects', url: '#projects' },
    { name: 'Contact', url: '#contact' },
  ];
  
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/shashankgeekboy', icon: 'github' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shashank-mishra-6a870b212/', icon: 'linkedin' },
    { name: 'Twitter', url: 'https://x.com/Shashankm108', icon: 'twitter' },
    { name: 'Instagram', url: 'https://www.instagram.com/codewithgeekboy/', icon: 'instagram' },
    { name: 'YouTube', url: 'https://www.youtube.com/@shashankmishra762', icon: 'youtube' },
  ];
  
  return (
    <motion.footer 
      className="w-full py-10 px-6 bg-background/80 backdrop-blur-md border-t border-primary/20 relative overflow-hidden z-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
      
      {/* Cyberpunk grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '20px 20px' 
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold font-orbitron text-white mb-4">
              SHASHANK<span className="text-primary">MISHRA</span>
            </h2>
            <p className="text-gray-400 mb-4 max-w-md">
              AI Influencer & Machine Learning Engineer specializing in computer vision, natural language processing, and AI-powered applications.
            </p>
            
            {/* Email subscription form */}
            <div className="mt-6">
              <p className="text-white text-sm mb-2">Subscribe for updates</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-background/30 border border-primary/30 rounded px-3 py-2 text-white text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <motion.button 
                  className="bg-primary text-black font-medium px-4 py-2 rounded text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-primary transition-colors"
                    onMouseEnter={playHover}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/50 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  {social.icon === 'github' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  )}
                  {social.icon === 'instagram' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )}
                  {social.icon === 'youtube' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-2">Contact</h3>
              <p className="text-gray-400 text-sm">
                <a href="mailto:shashankmishra9190@gmail.com" className="hover:text-primary">
                  shashankmishra9190@gmail.com
                </a>
              </p>
              <p className="text-gray-400 text-sm">
                <a href="tel:+919369006191" className="hover:text-primary">
                  +91 9369006191
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Shashank Mishra. All rights reserved.
          </p>
          
          <div className="text-gray-500 text-sm">
            <motion.span 
              className="relative inline-block"
              whileHover={{ color: "#61DAFB" }}
            >
              Made with 
              <motion.span 
                className="inline-block mx-1 text-red-500"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5 
                }}
              >
                ♥
              </motion.span>
              and React
            </motion.span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;