import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { useAudio } from '../../hooks/useAudio';
import { Testimonial } from '../../lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial,
  isActive
}) => {
  const { playHover } = useAudio();
  const [hovered, setHovered] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseEnter={() => playHover()}
    >
      <Card className="bg-background/40 backdrop-blur-md border-primary/20 overflow-hidden relative">
        {/* Cyberpunk top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        
        {/* Animated background effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/20 blur-3xl"></div>
        
        <CardContent className="p-8 relative z-10">
          <motion.div
            className="flex items-center gap-4 mb-6"
            variants={childVariants}
          >
            <Avatar className="h-16 w-16 border-2 border-accent ring-2 ring-accent/20">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-accent/20 text-accent">{testimonial.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                {testimonial.name === 'Rahul Jindal' && (
                  <a 
                    href="https://www.linkedin.com/in/rahul-jindal/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
              <p className="text-sm text-gray-400">{testimonial.title}</p>
            </div>
            
            <Badge className="ml-auto bg-accent/20 text-accent border border-accent/30">
              {testimonial.company}
            </Badge>
          </motion.div>
          
          <motion.div
            className="mb-6 relative"
            variants={childVariants}
          >
            <div className="text-4xl text-primary/20 absolute -top-4 -left-2">"</div>
            <p className="text-gray-300 italic relative z-10 pl-6">
              {testimonial.testimonial}
            </p>
            <div className="text-4xl text-primary/20 absolute -bottom-10 right-0">"</div>
          </motion.div>
          
          <motion.div 
            className="flex justify-between items-center"
            variants={childVariants}
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < testimonial.rating ? 'text-accent' : 'text-gray-500'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            <span className="text-xs text-gray-400">{testimonial.date}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
