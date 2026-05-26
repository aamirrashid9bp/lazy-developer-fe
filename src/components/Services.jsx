import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Cloud, Palette, ArrowLeft, ArrowRight } from 'lucide-react';
import webDevImg from '../assets/images/web_dev.png';
import mobileDevImg from '../assets/images/mobile_dev.png';
import cloudSolutionsImg from '../assets/images/cloud_solutions.png';
import uiUxImg from '../assets/images/ui_ux.png';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Full-stack web applications built with modern frameworks, optimized for performance, scalability, and stunning user experiences.',
    image: webDevImg,
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Native and cross-platform mobile apps for iOS and Android that deliver seamless experiences across all devices.',
    image: mobileDevImg,
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure and DevOps pipelines that ensure your applications run reliably at any scale.',
    image: cloudSolutionsImg,
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Premium, research-driven design systems and interfaces that delight users and elevate your brand identity.',
    image: uiUxImg,
  },
];

// Configuration for ambient blurred glow backdrops
const ambientGlowConfig = [
  {
    className: 'services__ambient-glow services__ambient-glow--blue',
    size: 480,
    xStart: '5%',
    yStart: '12%',
    xAnimate: [0, 30, -30, 0],
    yAnimate: [0, -25, 25, 0],
    duration: 26,
  },
  {
    className: 'services__ambient-glow services__ambient-glow--pink',
    size: 550,
    xStart: '75%',
    yStart: '38%',
    xAnimate: [0, -35, 35, 0],
    yAnimate: [0, 35, -35, 0],
    duration: 32,
  },
  {
    className: 'services__ambient-glow services__ambient-glow--purple',
    size: 420,
    xStart: '35%',
    yStart: '68%',
    xAnimate: [0, 20, -20, 0],
    yAnimate: [0, 30, -30, 0],
    duration: 29,
  }
];

// Configuration for floating glass bubbles
const bubbleConfig = [
  {
    className: 'services__bubble services__bubble--glow',
    size: 190,
    xStart: '3%',
    yStart: '58%',
    xAnimate: [0, 25, -20, 0],
    yAnimate: [0, 20, -25, 0],
    scaleAnimate: [1, 1.06, 0.94, 1],
    duration: 22,
    parallaxFactor: 0.3,
  },
  {
    className: 'services__bubble services__bubble--pink',
    size: 230,
    xStart: '82%',
    yStart: '18%',
    xAnimate: [0, -20, 25, 0],
    yAnimate: [0, 25, -20, 0],
    scaleAnimate: [1, 0.95, 1.05, 1],
    duration: 25,
    parallaxFactor: -0.4,
  },
  {
    className: 'services__bubble services__bubble--blue',
    size: 150,
    xStart: '45%',
    yStart: '8%',
    xAnimate: [0, 20, -20, 0],
    yAnimate: [0, -15, 25, 0],
    scaleAnimate: [1, 1.08, 0.92, 1],
    duration: 20,
    parallaxFactor: 0.25,
  }
];

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse displacement from center of screen
      const x = (e.clientX - window.innerWidth / 2) / 70;
      const y = (e.clientY - window.innerHeight / 2) / 70;
      setMousePosition({ x, y });
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + services.length) % services.length);
  };

  const slideTransition = isMobile
    ? { type: 'tween', ease: [0.25, 1, 0.5, 1], duration: 0.6 }
    : { type: 'spring', stiffness: 260, damping: 30 };

  return (
    <section id="services" className="section services">
      {/* Background container wrapper to isolate animations and overflow */}
      <div className="section-bg-wrapper">
        {/* Ambient background glows */}
        {ambientGlowConfig.map((glow, idx) => (
          <motion.div
            key={`glow-${idx}`}
            className={glow.className}
            style={{
              width: glow.size,
              height: glow.size,
              left: glow.xStart,
              top: glow.yStart,
            }}
            animate={{
              x: glow.xAnimate,
              y: glow.yAnimate,
            }}
            transition={{
              duration: glow.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating glassmorphic bubbles with mouse parallax */}
        {bubbleConfig.map((bubble, idx) => (
          <motion.div
            key={`bubble-wrapper-${idx}`}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1,
            }}
            animate={{
              x: mousePosition.x * bubble.parallaxFactor,
              y: mousePosition.y * bubble.parallaxFactor,
            }}
            transition={{
              type: 'spring',
              stiffness: 75,
              damping: 24,
            }}
          >
            <motion.div
              className={bubble.className}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: bubble.xStart,
                top: bubble.yStart,
              }}
              animate={{
                x: bubble.xAnimate,
                y: bubble.yAnimate,
                scale: bubble.scaleAnimate,
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="container">
        {/* Centered Section Header */}
        <div className="section-header">
          <span className="section-label">What We Do</span>
          <h2>Our Core Services</h2>
          <p>
            We provide end-to-end digital solutions that help businesses
            innovate, grow, and lead in their industries.
          </p>
        </div>

        {/* Right-aligned Navigation Controls Row */}
        <div className="services__controls-row">
          <div className="services__controls">
            <button 
              onClick={handlePrev} 
              className={`services__arrow-btn ${activeIdx === 0 ? 'is-disabled' : ''}`}
              disabled={activeIdx === 0}
              aria-label="Previous service"
            >
              <ArrowLeft size={18} />
            </button>
            
            <span className="services__counter">
              <span className="services__counter-current">{activeIdx + 1}</span>
              <span className="services__counter-divider">/</span>
              <span className="services__counter-total">{services.length}</span>
            </span>

            <button 
              onClick={handleNext} 
              className={`services__arrow-btn ${activeIdx === services.length - 1 ? 'is-disabled' : ''}`}
              disabled={activeIdx === services.length - 1}
              aria-label="Next service"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Viewport for horizontal carousel */}
        <div className="services__slider-viewport">
          <motion.div
            className="services__slider-track"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={isMobile ? 0.15 : 0.5}
            dragMomentum={false}
            onDragEnd={(event, info) => {
              const swipeThreshold = isMobile ? 80 : 50;
              if (info.offset.x < -swipeThreshold) {
                handleNext();
              } else if (info.offset.x > swipeThreshold) {
                handlePrev();
              }
            }}
            animate={{
              x: `calc(-1 * (${activeIdx} * (var(--card-preview-width) + var(--card-gap)) + var(--card-width) / 2) - var(--card-offset))`,
            }}
            transition={slideTransition}
          >
            {services.map((svc, i) => {
              const isActive = i === activeIdx;
              return (
                <motion.div
                  key={svc.title}
                  className={`services__slider-card ${isActive ? 'is-active' : ''}`}
                  animate={{
                    width: isActive ? 'var(--card-width)' : 'var(--card-preview-width)',
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 'var(--card-active-scale)' : 'var(--card-preview-scale)',
                    y: isActive ? 0 : 8,
                    boxShadow: isActive 
                      ? '0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.04)' 
                      : '0 4px 15px rgba(0, 0, 0, 0.02)',
                  }}
                  whileHover={isActive ? {
                    y: -8,
                    scale: 1.02,
                    boxShadow: '0 35px 70px rgba(0, 0, 0, 0.16), 0 12px 25px rgba(0, 0, 0, 0.06)',
                  } : {}}
                  transition={slideTransition}
                >
                  <motion.div 
                    className="services__card-image-wrapper"
                    animate={{
                      width: isActive ? 'var(--card-active-img-width)' : '100%',
                    }}
                    transition={slideTransition}
                  >
                    <motion.img
                      src={svc.image}
                      alt={svc.title}
                      className="services__card-image"
                      animate={{
                        borderRadius: isActive 
                          ? 'var(--card-active-img-radius)' 
                          : 'var(--radius-lg)',
                      }}
                      whileHover={isActive ? { scale: 1.08 } : {}}
                      transition={slideTransition}
                    />
                  </motion.div>
 
                  <motion.div 
                    className="services__card-content"
                    animate={{
                      width: isActive ? 'var(--card-active-content-width)' : '0%',
                      height: isActive ? 'auto' : '0px',
                      opacity: isActive ? 1 : 0,
                      paddingLeft: isActive ? 'var(--card-content-padding)' : '0px',
                      paddingRight: isActive ? 'var(--card-content-padding)' : '0px',
                      paddingTop: isActive ? 'var(--card-content-padding)' : '0px',
                      paddingBottom: isActive ? 'var(--card-content-padding)' : '0px',
                      borderLeftColor: isActive ? 'rgba(0, 0, 0, 0.04)' : 'rgba(0, 0, 0, 0)',
                    }}
                    transition={slideTransition}
                    style={{ 
                      overflow: 'hidden',
                      pointerEvents: isActive ? 'auto' : 'none'
                    }}
                  >
                    <div style={{ minWidth: 'var(--card-content-min-width)' }}>
                      <div className="services__card-header">
                        <div className="services__card-icon">
                          <svc.icon size={22} strokeWidth={1.5} />
                        </div>
                        <h3>{svc.title}</h3>
                      </div>
                      <p>{svc.desc}</p>
                      <a href="#contact" className="services__card-readmore">
                        Read More <span className="arrow">&rarr;</span>
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
