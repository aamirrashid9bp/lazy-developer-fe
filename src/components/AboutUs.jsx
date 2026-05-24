import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import officeImg from '../assets/images/office_workspace.png';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="about__counter-value">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 50, suffix: '+', label: 'Team Members' },
  { value: 12, suffix: '', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

export default function AboutUs() {
  return (
    <section id="about" className="section about" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Who We Are</span>
          <h2>About Lazy Developer</h2>
        </div>

        <div className="about__content">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p>
              Founded in 2014, Lazy Developer has grown from a small design studio
              into a global digital innovation powerhouse. We partner with
              forward-thinking companies to create products that matter — from
              initial concept through launch and beyond.
            </p>
            <p style={{ marginTop: 'var(--space-md)' }}>
              Our team of engineers, designers, and strategists shares a single
              mission: to build technology that empowers people and moves
              industries forward. We believe in clean code, thoughtful design,
              and lasting partnerships.
            </p>

            <div className="about__stats">
              {stats.map((s) => (
                <div key={s.label} className="about__stat">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                  <span className="about__stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about__image img-zoom-wrapper"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img src={officeImg} alt="Lazy Developer office workspace" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
