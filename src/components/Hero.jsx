import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import heroAbstractBg from '../assets/images/hero_abstract_bg.png';
import heroHolographicWaves from '../assets/images/hero_holographic_waves.png';
import heroPastelBubbles from '../assets/images/hero_pastel_bubbles.png';

// Animation variants for entering text content
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Configuration for floating glass bubbles
const bubbleConfig = [
  {
    className: 'hero__bubble hero__bubble--pink',
    size: 280,
    xStart: '10%',
    yStart: '15%',
    xAnimate: [0, 30, -20, 0],
    yAnimate: [0, -40, 30, 0],
    scaleAnimate: [1, 1.08, 0.95, 1],
    duration: 22,
    parallaxFactor: 0.4,
  },
  {
    className: 'hero__bubble hero__bubble--purple',
    size: 320,
    xStart: '72%',
    yStart: '12%',
    xAnimate: [0, -35, 25, 0],
    yAnimate: [0, 35, -30, 0],
    scaleAnimate: [1, 0.94, 1.06, 1],
    duration: 26,
    parallaxFactor: -0.5,
  },
  {
    className: 'hero__bubble hero__bubble--peach',
    size: 200,
    xStart: '8%',
    yStart: '62%',
    xAnimate: [0, 25, -30, 0],
    yAnimate: [0, 30, -40, 0],
    scaleAnimate: [1, 1.05, 0.92, 1],
    duration: 18,
    parallaxFactor: 0.6,
  },
  {
    className: 'hero__bubble hero__bubble--glow',
    size: 290,
    xStart: '76%',
    yStart: '58%',
    xAnimate: [0, -25, 30, 0],
    yAnimate: [0, -25, 35, 0],
    scaleAnimate: [1, 1.06, 0.94, 1],
    duration: 24,
    parallaxFactor: -0.3,
  },
  {
    className: 'hero__bubble hero__bubble--pink',
    size: 130,
    xStart: '45%',
    yStart: '72%',
    xAnimate: [0, 15, -20, 0],
    yAnimate: [0, -20, 15, 0],
    scaleAnimate: [1, 1.08, 0.92, 1],
    duration: 16,
    parallaxFactor: 0.2,
  },
  {
    className: 'hero__bubble hero__bubble--glow',
    size: 150,
    xStart: '48%',
    yStart: '8%',
    xAnimate: [0, -15, 15, 0],
    yAnimate: [0, 25, -25, 0],
    scaleAnimate: [1, 0.96, 1.04, 1],
    duration: 20,
    parallaxFactor: -0.2,
  }
];

// Configuration for ambient blurred glow backdrops
const ambientGlowConfig = [
  {
    className: 'hero__ambient-glow hero__ambient-glow--pink',
    size: 500,
    xStart: '15%',
    yStart: '8%',
    xAnimate: [0, 40, -40, 0],
    yAnimate: [0, -30, 30, 0],
    duration: 28,
  },
  {
    className: 'hero__ambient-glow hero__ambient-glow--purple',
    size: 550,
    xStart: '62%',
    yStart: '48%',
    xAnimate: [0, -40, 40, 0],
    yAnimate: [0, 30, -30, 0],
    duration: 32,
  }
];

const backgrounds = [heroHolographicWaves, heroAbstractBg, heroPastelBubbles];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [bgIdx, setBgIdx] = useState(0);

  useEffect(() => {
    // Slideshow interval: changes background image every 6.5 seconds
    const interval = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % backgrounds.length);
    }, 6500);

    const handleMouseMove = (e) => {
      // Calculate mouse displacement from center of screen
      const x = (e.clientX - window.innerWidth / 2) / 60;
      const y = (e.clientY - window.innerHeight / 2) / 60;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="hero section">
      {/* Background container wrapper to isolate animations and overflow */}
      <div className="section-bg-wrapper">
        {/* Animated holographic background waves with smooth crossfade slideshow */}
        <div className="hero__animated-bg-wrapper" style={{ overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={bgIdx}
              className="hero__animated-bg"
              style={{ backgroundImage: `url(${backgrounds[bgIdx]})` }}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ 
                opacity: 1, 
                scale: 1.08,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2.0, ease: 'easeInOut' },
                scale: { duration: 6.8, ease: 'linear' }
              }}
            />
          </AnimatePresence>
        </div>

        {/* Glassmorphic blur and lighting overlay */}
        <div className="hero__glass-overlay" />

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
              zIndex: 2,
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

      <div className="container hero__inner">
        {/* Core Text Content */}
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-label" variants={itemVariants}>
            Welcome to Lazy Developer
          </motion.span>
          <motion.h1 className="hero__title" variants={itemVariants}>
            Building the Future
            <br />
            of <span className="hero__highlight">Digital Innovation</span>
          </motion.h1>
          <motion.p className="hero__subtitle" variants={itemVariants}>
            We craft premium digital experiences that transform businesses.
            From strategy to execution, we bring your vision to life with
            cutting-edge technology and elegant design.
          </motion.p>
          <motion.div className="hero__actions" variants={itemVariants}>
            <a href="#services" className="btn btn-dark">
              Explore Services <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

