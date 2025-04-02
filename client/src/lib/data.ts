import { Project, Testimonial, Service } from './types';

// Projects Data
export const projects: Project[] = [
  {
    id: 1,
    title: 'ThePeachDev',
    description: 'An online freelance platform for web development, Flutter development, data analysis, UI/UX design, and Figma design.',
    image: 'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    technologies: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    url: 'https://www.thepeachdev.com/',
    github: 'https://github.com/shashankgeekboy'
  },
  {
    id: 2,
    title: 'AI Body Measurement',
    description: 'AI-driven body measurement system that uses computer vision and machine learning to accurately measure body dimensions for applications in fashion, fitness, and healthcare.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80',
    technologies: ['Machine Learning', 'Computer Vision', 'Python', 'Image Processing', 'Flask/Django'],
    url: 'https://github.com/shashankgeekboy/Ai-body-measurement',
    github: 'https://github.com/shashankgeekboy/Ai-body-measurement'
  },
  {
    id: 3,
    title: 'AmigoAffiliates',
    description: 'An affiliate marketing platform that connects affiliates with advertisers in industries like betting, casino, dating, and cryptocurrency.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2836&q=80',
    technologies: ['Affiliate Marketing', 'React', 'Django/Flask', 'Node.js', 'Payment Gateway'],
    url: 'https://amigoaffiliates.co/',
    github: 'https://github.com/shashankgeekboy'
  }
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Jindal',
    title: 'Cloud Engineer',
    company: 'TechVision',
    testimonial: 'Working with Shashank transformed our approach to data processing. His machine learning expertise and Python development skills helped us reduce processing time by 70% while improving accuracy.',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80',
    rating: 5,
    date: 'Jan 15, 2025'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Product Manager',
    company: 'DataCore',
    testimonial: 'Shashank developed a custom AI solution that automated our document analysis process, saving hundreds of work hours monthly. His expertise in natural language processing was exactly what we needed.',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
    rating: 5,
    date: 'April 3, 2023'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    title: 'Director of Innovation',
    company: 'FutureTech',
    testimonial: 'The neural network implementation Shashank designed for our predictive maintenance system exceeded expectations. Not only did he deliver excellent code, but his clear communication made the project run smoothly.',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4,
    date: 'January 18, 2023'
  }
];

// Services Data
export const services: Service[] = [
  {
    id: 1,
    title: 'Machine Learning Solutions',
    description: 'Custom ML models tailored to your business needs, from predictive analytics to pattern recognition systems.',
    icon: 'brain'
  },
  {
    id: 2,
    title: 'AI Application Development',
    description: 'End-to-end development of AI-powered applications with intuitive interfaces and robust backends.',
    icon: 'code'
  },
  {
    id: 3,
    title: 'Computer Vision Systems',
    description: 'Image and video analysis solutions for object detection, recognition, and classification tasks.',
    icon: 'eye'
  },
  {
    id: 4,
    title: 'NLP & Text Analytics',
    description: 'Natural language processing systems for sentiment analysis, text classification, and information extraction.',
    icon: 'message-square'
  }
];

// Experience Data
export const experience = [
  {
    company: 'AI Innovations',
    position: 'Senior Machine Learning Engineer',
    period: '2021 - Present',
    description: 'Leading ML model development and deployment for enterprise clients across healthcare and finance sectors.'
  },
  {
    company: 'DataTech Solutions',
    position: 'AI Developer',
    period: '2018 - 2021',
    description: 'Designed and implemented neural networks for computer vision and natural language processing applications.'
  },
  {
    company: 'TechStart Inc.',
    position: 'Python Developer',
    period: '2016 - 2018',
    description: 'Developed data processing pipelines and APIs for analytics platforms using Python and SQL.'
  }
];

// Skills Data
export const skills = [
  { name: 'Machine Learning', level: 92 },
  { name: 'Python', level: 95 },
  { name: 'Deep Learning', level: 88 },
  { name: 'Data Science', level: 85 },
  { name: 'MLOps', level: 78 },
  { name: 'NLP', level: 82 }
];

// Tech Stack
export const techStack = [
  'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 
  'NumPy', 'Keras', 'OpenCV', 'Spark', 'Docker', 
  'AWS', 'Flask', 'FastAPI', 'React', 'Node.js'
];
