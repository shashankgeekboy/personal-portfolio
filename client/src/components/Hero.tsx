import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useAudio } from '../hooks/useAudio';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { playClick } = useAudio();

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    // Create a parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(heroElement.querySelector('.parallax-layer-1'), {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(heroElement.querySelector('.parallax-layer-2'), {
        x: xPos * 0.8,
        y: yPos * 0.8,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div ref={heroRef} className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
      <motion.div 
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="parallax-layer-1 absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
          variants={itemVariants}
        />
        <motion.div 
          className="parallax-layer-2 absolute top-20 -right-10 w-60 h-60 rounded-full bg-accent/20 blur-3xl"
          variants={itemVariants}
        />
        
        <motion.h2 
          className="text-xl md:text-2xl font-light tracking-wide text-white mb-2"
          variants={itemVariants}
        >
          WELCOME TO MY DIGITAL SPACE
        </motion.h2>
        
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-tight text-white mb-4 leading-tight"
          variants={itemVariants}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            SHASHANK MISHRA
          </span>
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-2 text-sm md:text-base font-medium tracking-wider mb-8 text-white"
          variants={itemVariants}
        >
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
            AI INFLUENCER
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-accent mr-2"></span>
            MACHINE LEARNING ENGINEER
          </span>
          <span className="flex items-center">
            <span className="h-2 w-2 rounded-full bg-secondary mr-2"></span>
            PYTHON DEVELOPER
          </span>
        </motion.div>
        
        <motion.p 
          className="max-w-2xl mx-auto text-base md:text-lg text-white mb-10"
          variants={itemVariants}
        >
          Creating cutting-edge AI solutions and sharing knowledge through immersive digital experiences.
        </motion.p>
        
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          variants={itemVariants}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/80 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(120,0,255,0.5)]"
            onClick={() => {
              playClick();
              const projectsSection = document.querySelectorAll('section')[2];
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            EXPLORE PROJECTS
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-primary text-white hover:bg-primary/10 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
            onClick={() => {
              playClick();
              const contactSection = document.querySelectorAll('section')[4];
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            CONTACT ME
          </Button>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">SCROLL DOWN</span>
            <svg 
              className="w-5 h-5 text-primary" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
