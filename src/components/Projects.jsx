import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    title: "Royal Route All Over India",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop",
    tag: "Full Stack",
    desc: "Museum ticket booking system integrated with a chatbot for seamless user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    demoLink: "https://royal-route-demo.netlify.app",
    githubLink: "https://github.com/yourusername/royal-route",
    accent: "#f97316",
  },
  {
    title: "SwasthSetu",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
    tag: "Healthcare Tech",
    desc: "A bridge to healthcare providing seamless medical assistance and telemedicine services.",
    tech: ["HTML", "CSS", "JavaScript", "MySQL"],
    demoLink: "https://swasthsetu-demo.netlify.app",
    githubLink: "https://github.com/yourusername/swasthsetu",
    accent: "#10b981",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Fixed section height - exactly 200vh for 2 cards (each card takes 100vh)
  const sectionHeight = "130vh";

  // Handle scroll with smooth stops
  useEffect(() => {
    let lastScrollTime = 0;
    
    const handleWheel = (e) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 100;
      
      if (!isInView) return;
      
      if (isTransitioning) {
        e.preventDefault();
        return;
      }
      
      const now = Date.now();
      if (now - lastScrollTime < 500) return;
      
      const delta = e.deltaY;
      const isScrollingDown = delta > 0;
      const isScrollingUp = delta < 0;
      
      if (isScrollingDown && currentIndex < projects.length - 1) {
        e.preventDefault();
        lastScrollTime = now;
        setIsTransitioning(true);
        setCurrentIndex(currentIndex + 1);
        setTimeout(() => setIsTransitioning(false), 550);
      } 
      else if (isScrollingUp && currentIndex > 0) {
        e.preventDefault();
        lastScrollTime = now;
        setIsTransitioning(true);
        setCurrentIndex(currentIndex - 1);
        setTimeout(() => setIsTransitioning(false), 550);
      }
    };
    
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isTransitioning]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!stageRef.current || isTransitioning) return;
      const rect = stageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseX(x);
      setMouseY(y);
    };
    
    const stage = stageRef.current;
    if (stage) stage.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (stage) stage.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTransitioning]);

  // Magnetic cursor - Blue circle with diagonal up-right white arrow
  const cursorRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  
  useEffect(() => {
    let rafId;
    let targetX = -100, targetY = -100;
    let currentX = -100, currentY = -100;
    
    const updateCursor = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      
      if (cursorRef.current && cursorVisible && !isTransitioning && stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        cursorRef.current.style.left = rect.left + 'px';
        cursorRef.current.style.top = rect.top + 'px';
        cursorRef.current.style.opacity = '1';
      } else if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
      
      rafId = requestAnimationFrame(updateCursor);
    };
    
    const handleMouseMove = (e) => {
      if (!stageRef.current || isTransitioning) {
        setCursorVisible(false);
        return;
      }
      
      const rect = stageRef.current.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isInside) {
        setCursorVisible(true);
        targetX = e.clientX - rect.left - 20;
        targetY = e.clientY - rect.top - 20;
        targetX = Math.min(Math.max(targetX, -30), rect.width - 40);
        targetY = Math.min(Math.max(targetY, -30), rect.height - 40);
      } else {
        setCursorVisible(false);
        targetX = -100;
        targetY = -100;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    updateCursor();
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTransitioning, cursorVisible]);

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const isActive = diff === 0;
    
    if (isActive) {
      return { opacity: 1, scale: 1, y: '0%', zIndex: 20 };
    } else if (diff === -1 && isTransitioning) {
      return { opacity: 0, scale: 0.92, y: '-20%', zIndex: 10 };
    } else if (diff === 1 && isTransitioning) {
      return { opacity: 1, scale: 1, y: '0%', zIndex: 30 };
    } else if (diff < 0) {
      return { opacity: 0, scale: 0.9, y: '-100%', zIndex: 5 };
    } else {
      return { opacity: 0, scale: 0.9, y: '100%', zIndex: 5 };
    }
  };

  const activeParallaxX = mouseX * 12;
  const activeParallaxY = mouseY * 8;
  const activeScale = 1 + Math.abs(mouseX) * 0.015;

  const openLink = (url) => {
    if (url && url !== "#") {
      window.open(url, "_blank");
    }
  };

  return (
    <div 
      ref={sectionRef} 
      className="relative bg-white" 
      style={{ height: sectionHeight }}
    >
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm pt-8 pb-3 px-6 md:px-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <span className="text-indigo-500 text-xs font-mono tracking-wider">PORTFOLIO</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mt-1">
            FEATURED PROJECTS
          </h1>
          <div className="w-12 h-0.5 bg-indigo-500 mt-3 rounded-full" />
          
          {/* Progress dots */}
          <div className="flex gap-2 mt-4">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => !isTransitioning && setCurrentIndex(i)}
                className="cursor-pointer"
              >
                <div
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-6 bg-indigo-500' : 'w-3 bg-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY CARD STAGE */}
      <div 
        ref={stageRef}
        className="sticky top-20 h-[calc(100vh-5rem)] rounded-xl overflow-hidden mx-4 md:mx-12 shadow-xl"
      >
        {/* Background */}
        <div
          className="absolute inset-0 transition-colors duration-500"
          style={{ backgroundColor: projects[currentIndex]?.accent + '08' }}
        />
        
        {projects.map((project, idx) => {
          const style = getCardStyle(idx);
          const isActive = idx === currentIndex;
          
          return (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: style.opacity,
                scale: style.scale,
                y: style.y,
                zIndex: style.zIndex,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 rounded-xl overflow-hidden"
            >
              <img
                src={project.img}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{
                  transform: isActive && !isTransitioning
                    ? `scale(${activeScale}) translate(${activeParallaxX * 0.3}px, ${activeParallaxY * 0.3}px)` 
                    : 'scale(1)',
                }}
                alt={project.title}
                draggable={false}
              />
              
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, ${project.accent}15 50%, transparent 100%)`,
                }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                  }}
                  transition={{ duration: 0.4, delay: isActive && !isTransitioning ? 0.1 : 0 }}
                  style={{ backgroundColor: project.accent }}
                  className="px-3 py-1 rounded-full w-fit mb-3 text-xs font-medium shadow-lg"
                >
                  {project.tag}
                </motion.span>
                
                <motion.h2
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20,
                  }}
                  transition={{ duration: 0.4, delay: isActive && !isTransitioning ? 0.2 : 0 }}
                  className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-2xl leading-tight"
                >
                  {project.title}
                </motion.h2>
                
                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                  }}
                  transition={{ duration: 0.4, delay: isActive && !isTransitioning ? 0.3 : 0 }}
                  className="mt-2 text-xs md:text-sm text-white/80 max-w-md leading-relaxed"
                >
                  {project.desc}
                </motion.p>
                
                {/* Tech stack chips */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                  }}
                  transition={{ duration: 0.4, delay: isActive && !isTransitioning ? 0.4 : 0 }}
                  className="flex flex-wrap gap-2 mt-3"
                >
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] md:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
                {/* Buttons for Demo and GitHub */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 15,
                  }}
                  transition={{ duration: 0.4, delay: isActive && !isTransitioning ? 0.5 : 0 }}
                  className="flex gap-3 mt-4"
                >
                  <button
                    onClick={() => openLink(project.demoLink)}
                    className="px-4 py-1.5 bg-white text-gray-900 rounded-full text-xs font-medium hover:scale-105 transition-transform shadow-lg cursor-pointer"
                  >
                    Live Demo →
                  </button>
                  <button
                    onClick={() => openLink(project.githubLink)}
                    className="px-4 py-1.5 bg-transparent border border-white/50 text-white rounded-full text-xs font-medium hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
                  >
                    GitHub →
                  </button>
                </motion.div>
              </div>
              
              {/* Top-left icon */}
              <div className={`absolute top-3 left-3 w-6 h-6 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white text-[10px] font-mono z-20 border border-white/20 transition-opacity duration-300 ${isActive ? 'opacity-70' : 'opacity-20'}`}>
                Ⓒ
              </div>
            </motion.div>
          );
        })}

        {/* Magnetic Cursor - Blue Circle with Diagonal Up-Right White Arrow */}
        <div
          ref={cursorRef}
          className="fixed z-50 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className="w-10 h-10 bg-blue-500 rounded-full shadow-2xl flex items-center justify-center">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M7 17L17 7M17 7H7M17 7V17" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Transition indicator */}
        {isTransitioning && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-[10px]">
            pause
          </div>
        )}
        
        {/* Scroll hint */}
        {!isTransitioning && currentIndex === 0 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/40 text-[10px] animate-bounce">
            scroll down ↓
          </div>
        )}
        
        {!isTransitioning && currentIndex === projects.length - 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white/40 text-[10px]">
            last project
          </div>
        )}
      </div>

      {/* BROWSE BUTTON */}
      <div className="relative h-16 flex items-center justify-center">
        <button
          className="px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-xs cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${projects[currentIndex]?.accent}, ${projects[currentIndex]?.accent}CC)`,
            color: 'white',
          }}
          onClick={() => openLink("https://github.com/yourusername")}
        >
          VIEW ALL PROJECTS →
        </button>
      </div>
    </div>
  );
}