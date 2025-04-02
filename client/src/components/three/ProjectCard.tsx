import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { useAudio } from '../../hooks/useAudio';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  isActive: boolean;
  url?: string;
  github?: string;
}

// A 3D project card component rendered in HTML
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  technologies,
  isActive,
  url = "",
  github = ""
}) => {
  const { playHover, playClick } = useAudio();
  const [hovered, setHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  
  const handleFlip = () => {
    playHover();
    setFlipped(!flipped);
  };
  
  const handleViewProject = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    if (url) {
      window.open(url, '_blank');
    } else if (github) {
      window.open(github, '_blank');
    }
  };
  
  return (
    <motion.div
      className="w-full h-full relative bg-background/70 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/30 shadow-lg shadow-primary/20 group cursor-pointer"
      initial={false}
      animate={{
        rotateY: flipped ? 180 : 0,
        scale: isActive ? 1.05 : 1
      }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={handleFlip}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front of card */}
      <motion.div
        className="absolute inset-0 backface-hidden"
        style={{ 
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background/90 pointer-events-none"></div>
        
        <div 
          className="h-full"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 z-20">
          <h3 className="text-xl font-bold font-orbitron text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
          
          <div className="flex gap-1 mt-3 flex-wrap">
            {technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="outline" className="bg-primary/20 border-primary/30 text-primary text-xs">
                {tech}
              </Badge>
            ))}
            {technologies.length > 3 && (
              <Badge variant="outline" className="bg-background/50 text-white text-xs">
                +{technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <motion.div 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary border border-primary/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.8,
            rotate: hovered ? 180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M7 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"></path>
            <path d="M3.5 17C2.56 17 2 15.5 2 14c0-1 4-6 4-6s4 5 4 6c0 1.5-.56 3-1.5 3"></path>
            <path d="M7 13v3"></path>
            <path d="M14 13v6"></path>
            <path d="M10 16c.5 0 1-.5 1-1"></path>
            <path d="M18 21c-1 0-4-1-4-4"></path>
            <path d="M18 16c-1 0-4-1-4-4"></path>
            <path d="M17 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
            <path d="M7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
            <path d="M14.5 5h.5"></path>
            <path d="M9.5 5H7"></path>
            <path d="M13 5c0-1.5-.5-2-2-2"></path>
          </svg>
        </motion.div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      </motion.div>
      
      {/* Back of card */}
      <motion.div
        className="absolute inset-0 p-6 bg-background/80 backdrop-blur-md border border-primary/30 flex flex-col backface-hidden"
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <h3 className="text-xl font-bold font-orbitron text-white mb-3">{title}</h3>
        
        <p className="text-gray-300 text-sm flex-grow">
          {description}
        </p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-white mb-2">Technologies Used:</h4>
          <div className="flex gap-1 flex-wrap">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="bg-primary/20 border-primary/30 text-primary text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-primary/20 border border-primary/30 text-primary text-sm rounded-lg flex-1 hover:bg-primary/30 transition-colors"
            onClick={handleViewProject}
          >
            View Project
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-accent/20 border border-accent/30 text-accent text-sm rounded-lg flex-1 hover:bg-accent/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleFlip();
            }}
          >
            Flip Back
          </motion.button>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
