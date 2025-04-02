import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';
import { useAudio } from '../../hooks/useAudio';

const SocialSidebar = () => {
  const { playClick } = useAudio();

  const socialLinks = [
    { 
      icon: <Github size={18} />, 
      href: 'https://github.com/shashankgeekboy', 
      label: 'GitHub',
      color: '#7800ff' 
    },
    { 
      icon: <Twitter size={18} />, 
      href: 'https://x.com/Shashankm108', 
      label: 'Twitter',
      color: '#00bfff' 
    },
    { 
      icon: <Linkedin size={18} />, 
      href: 'https://www.linkedin.com/in/shashank-mishra-6a870b212/', 
      label: 'LinkedIn',
      color: '#0077b5' 
    },
    { 
      icon: <Youtube size={18} />, 
      href: 'https://www.youtube.com/@shashankmishra762', 
      label: 'YouTube',
      color: '#ff0000' 
    },
    { 
      icon: <Mail size={18} />, 
      href: 'mailto:shashankmishra9190@gmail.com', 
      label: 'Email',
      color: '#4bc0c0' 
    },
  ];

  const handleClick = (url: string) => {
    playClick();
    // Using window.location.href as a fallback if window.open fails
    try {
      const newWindow = window.open(url, '_blank');
      // If window.open returns null, it may have been blocked by a popup blocker
      if (!newWindow) {
        console.log('Popup blocked or failed to open. Redirecting directly...');
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error opening link:', error);
      window.location.href = url;
    }
  };

  return (
    <motion.div 
      className="fixed left-4 md:left-10 bottom-1/2 transform translate-y-1/2 z-30 flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: 1, 
        duration: 0.5,
        staggerChildren: 0.1
      }}
    >
      <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent my-2"></div>
      
      {socialLinks.map((social, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
          className="group relative"
        >
          <motion.button
            onClick={() => handleClick(social.href)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 0 12px ${social.color}80` 
            }}
            className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-white hover:border-primary transition-all duration-300 hover:text-primary relative z-10"
            aria-label={social.label}
          >
            {social.icon}
            <span 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              style={{ 
                background: `radial-gradient(circle, ${social.color}40 0%, transparent 70%)`,
                filter: 'blur(4px)'
              }}
            ></span>
          </motion.button>
          
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
            <div className="bg-background/80 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-md border border-primary/20 whitespace-nowrap">
              {social.label}
            </div>
          </div>
        </motion.div>
      ))}
      
      <div className="h-16 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent my-2"></div>
    </motion.div>
  );
};

export default SocialSidebar;