import { useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { AtSign, MapPin, Phone, Send } from 'lucide-react';
import ContactForm from './three/ContactForm';

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const { playClick, playSuccess } = useAudio();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccess();
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset submission status after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          GET IN TOUCH
        </motion.h2>
        <motion.h3 
          variants={itemVariants}
          className="text-3xl md:text-4xl font-orbitron font-bold text-white"
        >
          LET'S <span className="text-accent">CONNECT</span>
        </motion.h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Contact Info */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2"
        >
          <Card className="bg-background/40 backdrop-blur-lg border-primary/20 h-full">
            <CardContent className="p-6 flex flex-col h-full">
              <h4 className="text-xl font-orbitron font-semibold mb-6 text-white">
                CONTACT <span className="text-primary">INFO</span>
              </h4>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-gray-300 font-medium">Location</h5>
                    <p className="text-gray-400">Gurugram, India</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <AtSign size={20} />
                  </div>
                  <div>
                    <h5 className="text-gray-300 font-medium">Email</h5>
                    <p className="text-gray-400">shashankmishra9190@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="text-gray-300 font-medium">Phone</h5>
                    <p className="text-gray-400">+91 9369006191</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h5 className="text-gray-300 font-medium mb-4">Social Media</h5>
                <div className="flex space-x-4">
                  <motion.a 
                    href="https://www.linkedin.com/in/shashank-mishra-6a870b212/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      window.open('https://www.linkedin.com/in/shashank-mishra-6a870b212/', '_blank');
                    }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                  <motion.a 
                    href="https://x.com/Shashankm108" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      window.open('https://x.com/Shashankm108', '_blank');
                    }}
                  >
                    <i className="fab fa-twitter"></i>
                  </motion.a>
                  <motion.a 
                    href="https://github.com/shashankgeekboy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      window.open('https://github.com/shashankgeekboy', '_blank');
                    }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/codewithgeekboy/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      window.open('https://www.instagram.com/codewithgeekboy/', '_blank');
                    }}
                  >
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                  <motion.a 
                    href="https://www.youtube.com/@shashankmishra762" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary hover:bg-secondary/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      window.open('https://www.youtube.com/@shashankmishra762', '_blank');
                    }}
                  >
                    <i className="fab fa-youtube"></i>
                  </motion.a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Contact Form */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 relative"
        >
          {/* We're going to skip the 3D form to prevent rendering errors */}
          {/* <ContactForm /> */}
          
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="relative z-10 p-6"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background/80 backdrop-blur-md border border-accent/30 p-6 rounded-lg text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-accent mb-4">
                  <i className="fas fa-check text-2xl"></i>
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Message Sent!</h4>
                <p className="text-gray-300">Thank you for your message. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-300 mb-1">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="bg-background/70 border-primary/30 focus:border-primary text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      className="bg-background/70 border-primary/30 focus:border-primary text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm text-gray-300 mb-1">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message"
                    className="bg-background/70 border-primary/30 focus:border-primary text-white min-h-[150px]"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(75,192,192,0.5)] w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                  onClick={() => playClick()}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
