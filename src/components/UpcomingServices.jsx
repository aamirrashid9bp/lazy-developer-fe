import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, MonitorPlay } from 'lucide-react';
import appAutomationImg from '../assets/images/app_automation.png';
import aiAutomationImg from '../assets/images/ai_automation.png';
import vpsHostingImg from '../assets/images/vps_hosting.png';

const upcoming = [
  {
    image: appAutomationImg,
    icon: MonitorPlay,
    title: 'App Automation',
    desc: 'Seamlessly automate mobile and web applications with cross-platform testing, automated deployments, and intelligent robotic process automation (RPA).',
    status: 'Development Phase',
    badgeColor: 'rgba(59, 130, 246, 0.08)',
    badgeText: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    image: aiAutomationImg,
    icon: Bot,
    title: 'AI Automation',
    desc: 'Supercharge your business operations with custom artificial intelligence solutions, LLM integrations, and automated decision-making workflows.',
    status: 'Beta Testing',
    badgeColor: 'rgba(139, 92, 246, 0.08)',
    badgeText: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.15)',
  },
  {
    image: vpsHostingImg,
    icon: Cpu,
    title: 'VPS Hosting',
    desc: 'Deploy your applications on lightning-fast virtual private servers. Enjoy dedicated resources, root access, and a 99.9% uptime SLA.',
    status: 'Alpha Testing',
    badgeColor: 'rgba(16, 185, 129, 0.08)',
    badgeText: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Configuration for ambient blurred glow backdrops on dark background
const ambientGlowConfig = [
  {
    className: 'upcoming__ambient-glow upcoming__ambient-glow--purple',
    size: 500,
    xStart: '10%',
    yStart: '10%',
    xAnimate: [0, 40, -30, 0],
    yAnimate: [0, -35, 35, 0],
    duration: 28,
  },
  {
    className: 'upcoming__ambient-glow upcoming__ambient-glow--cyan',
    size: 550,
    xStart: '65%',
    yStart: '40%',
    xAnimate: [0, -45, 45, 0],
    yAnimate: [0, 35, -45, 0],
    duration: 32,
  },
  {
    className: 'upcoming__ambient-glow upcoming__ambient-glow--pink',
    size: 450,
    xStart: '35%',
    yStart: '60%',
    xAnimate: [0, 30, -35, 0],
    yAnimate: [0, 40, -30, 0],
    duration: 25,
  }
];

// Configuration for floating glass bubbles on dark background
const bubbleConfig = [
  {
    className: 'upcoming__bubble upcoming__bubble--cyan',
    size: 200,
    xStart: '5%',
    yStart: '55%',
    xAnimate: [0, 20, -25, 0],
    yAnimate: [0, 30, -20, 0],
    scaleAnimate: [1, 1.05, 0.95, 1],
    duration: 22,
    parallaxFactor: 0.3,
  },
  {
    className: 'upcoming__bubble upcoming__bubble--purple',
    size: 240,
    xStart: '78%',
    yStart: '15%',
    xAnimate: [0, -30, 20, 0],
    yAnimate: [0, 25, -30, 0],
    scaleAnimate: [1, 0.96, 1.04, 1],
    duration: 26,
    parallaxFactor: -0.45,
  },
  {
    className: 'upcoming__bubble upcoming__bubble--glow',
    size: 130,
    xStart: '45%',
    yStart: '8%',
    xAnimate: [0, 15, -20, 0],
    yAnimate: [0, -20, 15, 0],
    scaleAnimate: [1, 1.08, 0.92, 1],
    duration: 18,
    parallaxFactor: 0.2,
  }
];

export default function UpcomingServices() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse displacement from center of screen
      const x = (e.clientX - window.innerWidth / 2) / 70;
      const y = (e.clientY - window.innerHeight / 2) / 70;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="upcoming" className="section upcoming">
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
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.span className="section-label" variants={titleVariants}>
            What's Next
          </motion.span>
          <motion.h2 variants={titleVariants}>Upcoming Services</motion.h2>
          <motion.p variants={titleVariants}>
            Explore our next-generation digital solutions engineered with a cutting-edge tech stack to automate, scale, and power your future workflows.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid-3 upcoming__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {upcoming.map((item, i) => {
            const isHovered = hoveredIdx === i;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <motion.div
                key={item.title}
                className="upcoming__card-wrapper"
                variants={cardVariants}
              >
                <motion.div
                  className="upcoming__card"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  animate={{
                    scale: isHovered ? 1.05 : (isAnyHovered ? 0.94 : 1.0),
                    opacity: isHovered ? 1 : (isAnyHovered ? 0.65 : 1.0),
                    y: isHovered ? -12 : 0,
                    boxShadow: isHovered 
                      ? '0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.04)' 
                      : '0 4px 20px rgba(0, 0, 0, 0.02)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                  }}
                  style={{
                    '--glow-color': item.glowColor,
                    '--accent-color': item.badgeText,
                  }}
                >
                  <div className="upcoming__card-image-container">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="upcoming__card-image"
                      animate={{
                        scale: isHovered ? 1.08 : 1.0,
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                    />
                    <div className="upcoming__card-icon-overlay">
                      <item.icon size={20} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="upcoming__card-content">
                    <span
                      className="upcoming__card-status-badge"
                      style={{
                        backgroundColor: item.badgeColor,
                        color: item.badgeText,
                      }}
                    >
                      {item.status}
                    </span>
                    <h3 className="upcoming__card-title">{item.title}</h3>
                    <p className="upcoming__card-description">{item.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
