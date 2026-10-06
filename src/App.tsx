/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code, 
  Layout, 
  Server, 
  Smartphone,
  ChevronRight,
  Menu,
  X,
  Briefcase,
  User,
  Cpu,
  Home,
  Laptop,
  Camera
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A premium online shopping experience featuring seamless navigation and modern retail aesthetics.",
    tags: ["React", "E-commerce", "Tailwind"],
    image: "/input_file_0.png",
    link: "https://urban-style-react.netlify.app/"
  },
  {
    id: 2,
    title: "Fintech Payment Suite",
    description: "Secure and intuitive financial transaction platform designed for modern digital banking.",
    tags: ["Fintech", "Payments", "Dashboard"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    link: "https://hyperswitch.io/"
  },
  {
    id: 3,
    title: "Real Estate Marketplace",
    description: "Advanced property search and management system with high-fidelity visual listings.",
    tags: ["Real Estate", "Listings", "React"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    link: "https://estaterry.netlify.app/"
  },
  {
    id: 4,
    title: "Hospital Management System",
    description: "Integrated healthcare solution for patient records and hospital resource orchestration.",
    tags: ["Healthcare", "Management", "System"],
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2070&auto=format&fit=crop",
    link: "https://69bc29e2ce61ee007e4630ac--celebrated-chimera-9bdec1.netlify.app/"
  },
  {
    id: 5,
    title: "Crypto Investment Hub",
    description: "Dynamic cryptocurrency trading and investment analysis platform with real-time data.",
    tags: ["Crypto", "Investment", "Trading"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2070&auto=format&fit=crop",
    link: "https://script.viserlab.com/aitrade/"
  }
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Full-Stack Development",
    description: "Building robust, scalable web applications from scratch using modern frameworks and best practices.",
    icon: <Code className="w-6 h-6" />
  },
  {
    id: 2,
    title: "UI/UX Architecture",
    description: "Crafting intuitive and aesthetically pleasing interfaces that prioritize user experience and accessibility.",
    icon: <Layout className="w-6 h-6" />
  },
  {
    id: 3,
    title: "API & Backend Systems",
    description: "Designing efficient server-side logic and RESTful/GraphQL APIs for complex data handling.",
    icon: <Server className="w-6 h-6" />
  },
  {
    id: 4,
    title: "Mobile Solutions",
    description: "Developing native-feel mobile experiences for iOS and Android using React Native.",
    icon: <Smartphone className="w-6 h-6" />
  }
];

// --- Components ---

const Navbar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'py-4 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a 
          href="#home" 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-black tracking-tighter text-white group"
        >
          DAVID<span className="text-indigo-500 group-hover:text-white transition-colors">.</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-bold text-zinc-400 hover:text-white transition-all hover:tracking-wider"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="px-8 py-3 bg-white text-black rounded-full text-sm font-black hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Connect
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
          aria-label="Toggle Menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
};

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home className="w-6 h-6" /> },
    { name: 'About Us', href: '#about', icon: <User className="w-6 h-6" /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase className="w-6 h-6" /> },
    { name: 'Services', href: '#services', icon: <Cpu className="w-6 h-6" /> },
    { name: 'Contact', href: '#contact', icon: <Mail className="w-6 h-6" /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[70] md:hidden"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-[340px] bg-zinc-950 z-[80] shadow-2xl md:hidden border-l border-white/5 flex flex-col"
          >
            {/* Close Button Inside the Sidebar */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-indigo-400 active:scale-95 transition-all duration-300 group"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
            </button>

            <div className="flex flex-col h-full p-8 pt-32 overflow-y-auto">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-center gap-5 py-5 px-6 rounded-[2rem] text-xl font-black text-zinc-400 hover:text-white hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                  >
                    <span className="p-3 rounded-xl bg-white/5 text-zinc-500 group-hover:text-indigo-500 group-hover:bg-indigo-500/10 transition-all">
                      {link.icon}
                    </span>
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-8 ml-2">Connect Now</p>
                  <div className="grid grid-cols-3 gap-4 px-2">
                    <a href="https://github.com/vlogguest-design" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-indigo-600 transition-all border border-white/5">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/chibuike-david-77778311b" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 transition-all border border-white/5">
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="https://wa.me/2347083991476" target="_blank" rel="noopener noreferrer" className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-green-600 transition-all border border-white/5">
                      <MessageCircle className="w-6 h-6" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SectionHeading = ({ title, subtitle, light = false }: { title: string, subtitle: string, light?: boolean }) => (
  <div className="mb-16">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 mb-4"
    >
      <span className="w-8 h-[2px] bg-indigo-500"></span>
      <span className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em]">
        {subtitle}
      </span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-4xl md:text-5xl font-display font-black leading-tight ${light ? 'text-white' : 'text-zinc-900'}`}
    >
      {title}
    </motion.h2>
  </div>
);

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profileImg, setProfileImg] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_david_photo') || '/profile.jpg';
    }
    return '/profile.jpg';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setProfileImg(base64);
      try {
        localStorage.setItem('portfolio_david_photo', base64);
        await fetch('/api/upload-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
      } catch (err) {
        console.error('Error saving uploaded photo:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const roles = [
    "Software Engineer.",
    "Full Stack Developer.",
    "UI/UX Architect.",
    "Problem Solver."
  ];

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[roleIndex];

      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      } else {
        const nextText = isDeleting 
          ? currentRole.substring(0, typedText.length - 1)
          : currentRole.substring(0, typedText.length + 1);
        setTypedText(nextText);
      }
    };

    const timer = setTimeout(handleType, isDeleting ? 50 : 120);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  return (
    <div className="min-h-screen selection:bg-indigo-500/30 selection:text-indigo-600 bg-zinc-950 overflow-x-hidden">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Hero Section */}
      <header id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-40 hero-gradient overflow-hidden px-6">
        <div className="max-w-5xl mx-auto w-full text-center relative z-10 mb-20">
          <div className="flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-display font-black tracking-tighter text-white leading-tight mb-6"
            >
              Hi, I'm <span className="text-indigo-500">David</span>.
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-16 md:h-20 flex items-center justify-center mb-16"
            >
              <p className="text-3xl md:text-5xl font-medium text-zinc-500 font-display leading-tight">
                {typedText}<span className="inline-block w-[2px] h-8 md:h-12 bg-indigo-500 ml-2 animate-pulse" />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full max-w-[92%] md:max-w-4xl aspect-[1/1] mx-auto mb-20 rounded-[4.5rem] md:rounded-[7.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] bg-zinc-900/50 group"
            >
              <img 
                src={profileImg} 
                alt="David - UI/UX Architect & Software Engineer"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  const currentSrc = target.src;
                  if (!currentSrc.includes('david_portrait_1791248919043.jpg')) {
                    target.src = "/src/assets/images/david_portrait_1791248919043.jpg";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-6 right-6 md:bottom-10 md:right-10 px-5 py-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-white/90 text-sm font-medium backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                title="Update portrait photo"
              >
                <Camera className="w-4 h-4 text-indigo-400" />
                <span>Update Photo</span>
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col md:flex-row gap-10 items-center justify-center relative z-30"
            >
              <a href="#projects" className="px-12 py-5 bg-white text-zinc-900 rounded-[2rem] font-black text-xl hover:bg-zinc-200 transition-all shadow-2xl">
                Explore My Work
              </a>
              <div className="flex gap-5">
                {[
                  { icon: <Github className="w-8 h-8 fill-current" strokeWidth={3} />, href: "https://github.com/vlogguest-design", color: "hover:bg-zinc-800", label: "GitHub" },
                  { icon: <Linkedin className="w-8 h-8 fill-current" strokeWidth={3} />, href: "https://www.linkedin.com/in/chibuike-david-77778311b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:bg-blue-600", label: "LinkedIn" },
                  { icon: <MessageCircle className="w-8 h-8 fill-current" strokeWidth={3} />, href: "https://wa.me/2347083991476", color: "hover:bg-green-600", label: "WhatsApp" },
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    title={social.label}
                    className={`w-20 h-20 rounded-3xl bg-white/20 border-2 border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-md shadow-lg ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Removed redundant elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5 z-20" />
      </header>

      {/* Decorative Laptop Art - Filling the gap */}
      <div className="relative h-64 flex items-center justify-center -mt-32 -mb-24 z-20 pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Glows */}
          <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20 scale-150" />
          <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-10 -translate-x-10 scale-125" />
          
          <div className="relative bg-zinc-900/50 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center group pointer-events-auto">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <Laptop className="w-24 h-24 text-indigo-400 drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
          </div>
          
          {/* Orbital elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -ml-32 -mt-32 w-64 h-64 border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -ml-40 -mt-40 w-80 h-80 border border-white/5 rounded-full border-dashed"
          />
        </motion.div>
      </div>

      {/* About Section - Dark BG */}
      <section id="about" className="py-32 px-6 bg-zinc-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading title="Passionate About Crafting Seamless Digital Experiences" subtitle="Who I Am" light />
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              <p>
                My journey as a software engineer is driven by curiosity and a relentless pursuit of excellence. I specialize in building full-stack applications that are as powerful as they are intuitive.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-white font-bold mb-2">Strategy</h4>
                  <p className="text-sm">Building scalable architectures that grow with your vision.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Design</h4>
                  <p className="text-sm">Clean, minimalist interfaces that prioritize the user journey.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
             <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 flex flex-col justify-center items-center text-center backdrop-blur-3xl shadow-2xl">
                <div className="text-5xl font-black text-indigo-500 mb-2">5+</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Years Experience</div>
             </div>
             <div className="p-8 bg-zinc-900 rounded-[2.5rem] border border-white/5 flex flex-col justify-center items-center text-center text-white shadow-2xl">
                <div className="text-5xl font-black mb-2">50+</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Live Projects</div>
             </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Dark Gray BG */}
      <section id="projects" className="py-32 px-6 bg-zinc-900/30 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Completed Projects" subtitle="Portfolio" light />
          
          <div className="grid md:grid-cols-2 gap-12">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group glass-card-light rounded-[3rem] overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const currentSrc = target.src;
                      
                      // Handle Unsplash failure (except the specific ones we chose)
                      if (currentSrc.includes('unsplash.com') && 
                          !currentSrc.includes('photo-1563013544-824ae1b704d3') && 
                          !currentSrc.includes('photo-1564013799919-ab600027ffc6') &&
                          !currentSrc.includes('photo-1512678080530-7760d81faba6')) {
                        target.src = "/input_file_0.png";
                        return;
                      }

                      if (currentSrc.includes('input_file_0.png')) {
                        target.src = "/input_file_1.png";
                      } else if (currentSrc.includes('input_file_1.png')) {
                        target.src = "/input_file_2.png";
                      } else if (currentSrc.includes('input_file_2.png')) {
                        target.src = "/input_file_3.png";
                      } else {
                         target.src = "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2070&auto=format&fit=crop";
                      }
                    }}
                  />
                </div>
                <div className="p-10">
                  <div className="flex gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-display font-black text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-indigo-400 group/link">
                    Live Demo
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-zinc-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Technical Services" subtitle="Expertise" light />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <div 
                key={service.id}
                className="p-10 border border-white/5 rounded-[2.5rem] bg-white/[0.02] hover:bg-white/5 hover:text-white transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-indigo-600 transition-all">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-white">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-32 px-6 bg-zinc-900 text-white rounded-t-[4rem] scroll-mt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-zinc-400 text-xs font-bold uppercase tracking-widest mb-12"
          >
            Get in touch
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter leading-none mb-20">
            Let's work <span className="text-indigo-400">together.</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-24">
            <a href="https://wa.me/2347083991476" target="_blank" className="flex items-center gap-6 bg-white/5 p-6 pr-12 rounded-[2rem] hover:bg-green-600 transition-all group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold whitespace-nowrap">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest mr-2">WhatsApp:</span>
                  07083991476
                </div>
              </div>
            </a>

            <a href="mailto:psalmsofdavid90@gmail.com" className="flex items-center gap-6 bg-white/5 p-6 pr-12 rounded-[2rem] hover:bg-white hover:text-black transition-all group">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white">
                <Mail className="w-8 h-8" />
              </div>
              <div className="text-left">
                <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email Me</div>
                <div className="text-xl font-bold">psalmsofdavid90@gmail.com</div>
              </div>
            </a>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-display font-black tracking-tighter text-white">
              DAVID<span className="text-indigo-500">.</span>
            </div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} David. All rights reserved.
            </div>
            <div className="flex gap-6">
               <a href="https://github.com/vlogguest-design" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                 <Github className="w-5 h-5 fill-current" />
               </a>
               <a href="https://www.linkedin.com/in/chibuike-david-77778311b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                 <Linkedin className="w-5 h-5 fill-current" />
               </a>
               <a href="https://wa.me/2347083991476" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                 <MessageCircle className="w-5 h-5 fill-current" />
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
