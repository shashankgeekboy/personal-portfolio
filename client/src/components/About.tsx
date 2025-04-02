import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';
import { useAudio } from '../hooks/useAudio';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { playHover } = useAudio();

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

  const skills = [
    { name: 'Machine Learning', level: 92 },
    { name: 'Python', level: 95 },
    { name: 'Deep Learning', level: 88 },
    { name: 'Data Science', level: 85 },
    { name: 'MLOps', level: 78 },
    { name: 'NLP', level: 82 }
  ];

  return (
    <div ref={ref} className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        {/* About Text Column */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl text-primary font-light tracking-wider mb-2">ABOUT ME</h2>
          <h3 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 text-white">
            MACHINE LEARNING <span className="text-accent">SPECIALIST</span>
          </h3>
          
          <div className="space-y-4 text-gray-300">
            <p>
              With over 1.5 years of experience in AI and machine learning, I specialize in developing 
              cutting-edge solutions that transform complex data into actionable insights.
            </p>
            <p>
              My expertise spans from developing neural networks for image recognition to 
              implementing NLP systems for advanced text analysis, always focusing on 
              real-world applications that drive business value.
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-background/40 backdrop-blur-sm border border-primary/20 rounded-lg p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(120, 0, 255, 0.5)' }}
              onMouseEnter={() => playHover()}
            >
              <div className="text-3xl font-bold text-primary mb-1">1.5</div>
              <div className="text-sm text-gray-400">Years of Experience</div>
            </motion.div>
            
            <motion.div 
              className="bg-background/40 backdrop-blur-sm border border-accent/20 rounded-lg p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(75, 192, 192, 0.5)' }}
              onMouseEnter={() => playHover()}
            >
              <div className="text-3xl font-bold text-accent mb-1">12</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </motion.div>
            
            <motion.div 
              className="bg-background/40 backdrop-blur-sm border border-secondary/20 rounded-lg p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 191, 255, 0.5)' }}
              onMouseEnter={() => playHover()}
            >
              <div className="text-3xl font-bold text-secondary mb-1">6</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </motion.div>
            
            <motion.div 
              className="bg-background/40 backdrop-blur-sm border border-primary/20 rounded-lg p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(120, 0, 255, 0.5)' }}
              onMouseEnter={() => playHover()}
            >
              <div className="text-3xl font-bold text-primary mb-1">15</div>
              <div className="text-sm text-gray-400">AI Solutions</div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Skills Column */}
        <motion.div variants={itemVariants}>
          <Card className="bg-background/40 backdrop-blur-lg border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-orbitron font-semibold mb-6 text-white">
                TECHNICAL <span className="text-primary">EXPERTISE</span>
              </h3>
              
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-primary">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-gray-700/50"
                      indicatorClassName="bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-3">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'Keras', 'OpenCV', 'Spark', 'Docker', 'AWS'].map((tech, index) => (
                    <motion.span 
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(120, 0, 255, 0.3)' }}
                      onMouseEnter={() => playHover()}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
