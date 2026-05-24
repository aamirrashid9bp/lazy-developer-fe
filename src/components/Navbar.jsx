import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Upcoming Services', href: '#upcoming' },
  { label: 'Our Branches', href: '#branches' },
  { label: 'About Us', href: '#about' },
  { label: 'Career', href: '#career' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const diff = latest - lastY.current;
    lastY.current = latest;

    setScrolled(latest > 20);

    if (latest < 80) {
      setHidden(false);                       // always show near top
    } else if (diff > 4) {
      setHidden(true);                        // scrolling down → hide
    } else if (diff < -4) {
      setHidden(false);                       // scrolling up → show
    }
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      {/* ---- Full-width bar: logo left, pill right ---- */}
      <motion.header
        className={`navbar-bar ${scrolled ? 'navbar-bar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={hidden ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="navbar-container">
          {/* Left Column — Logo */}
          <div className="navbar-left">
            <a href="#home" className="navbar-logo">
              <span className="navbar-logo__dot" />
              <span className="navbar-logo__text">Lazy Developer</span>
            </a>
          </div>

          {/* Center Column — Pill nav (desktop) */}
          <div className="navbar-center">
            <nav className="navbar-pill">
              <ul className="navbar-pill__links">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="navbar-pill__link">
                      {link.hasDot && <span className="navbar-pill__dot" />}
                      {link.label}
                      <span className="navbar-pill__underline" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right Column — Actions & Hamburger */}
          <div className="navbar-right">
            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ---- Mobile drawer ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="navbar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleLinkClick}
            />
            <motion.div
              className="navbar-mobile"
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <ul className="navbar-mobile__links">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                  >
                    <a href={link.href} onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {link.label}
                      {link.hasDot && <span className="navbar-mobile__dot" style={{ width: '6px', height: '6px', backgroundColor: '#ff3b30', borderRadius: '50%', display: 'inline-block' }} />}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                className="btn btn-dark"
                onClick={handleLinkClick}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Let's Talk
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
