import { useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { projects } from '../lib/data';
import ProjectCard from './three/ProjectCard';

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { playClick } = useAudio();
  const [activeProject, setActiveProject] = useState(0);

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
          MY WORK
        </motion.h2>
        <motion.h3 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-orbitron font-bold text-white"
        >
          FEATURED <span className="text-accent">PROJECTS</span>
        </motion.h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="h-[400px] relative group"
            whileHover={{ 
              scale: 1.02, 
              transition: { duration: 0.3 } 
            }}
            onClick={() => {
              playClick();
              setActiveProject(index);
            }}
          >
            <ProjectCard 
              title={project.title}
              description={project.description} 
              image={project.image}
              technologies={project.technologies}
              url={project.url}
              github={project.github}
              isActive={activeProject === index}
            />
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="mt-10 text-center"
      >
        <button
          className="px-8 py-3 bg-accent/20 text-accent border border-accent/40 rounded-lg font-semibold hover:bg-accent/30 transition-all duration-300"
          onClick={() => {
            playClick();
            window.open('https://github.com/shashankgeekboy?tab=repositories', '_blank');
          }}
        >
          EXPLORE ALL PROJECTS
        </button>
      </motion.div>
    </div>
  );
};

export default Projects;
