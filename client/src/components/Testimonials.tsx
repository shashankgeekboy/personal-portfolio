import { useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { testimonials } from '../lib/data';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import TestimonialCard from './three/TestimonialCard';

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { playClick, playHover } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

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
    hidden: { y: 30, opacity: 0 },
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

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    playClick();
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div ref={ref} className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-xl text-primary font-light tracking-wider mb-2"
        >
          WHAT CLIENTS SAY
        </motion.h2>
        <motion.h3 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-orbitron font-bold text-white"
        >
          CLIENT <span className="text-accent">TESTIMONIALS</span>
        </motion.h3>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="relative h-[450px] flex items-center justify-center"
      >
        {/* Testimonial Controls */}
        <div className="absolute z-10 w-full flex justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-primary/20"
            onClick={handlePrev}
            onMouseEnter={() => playHover()}
          >
            <ArrowLeft size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-primary/20"
            onClick={handleNext}
            onMouseEnter={() => playHover()}
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>
        
        {/* 3D Testimonial Cards */}
        <div className="relative w-full h-full">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <TestimonialCard testimonial={testimonial} isActive={index === currentIndex} />
            </div>
          ))}
        </div>
        
        {/* Testimonial Navigation Dots */}
        <div className="absolute bottom-2 flex space-x-2 justify-center">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-600'}`}
              onClick={() => {
                playClick();
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => playHover()}
            />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        variants={itemVariants}
        className="mt-8 text-center"
      >
        <Quote className="text-primary/40 inline-block mb-2" size={28} />
        <p className="text-lg text-gray-300 italic font-light max-w-2xl mx-auto">
          "Working with cutting-edge AI professionals has transformed our business operations and given us a competitive edge in our market."
        </p>
      </motion.div>
    </div>
  );
};

export default Testimonials;
