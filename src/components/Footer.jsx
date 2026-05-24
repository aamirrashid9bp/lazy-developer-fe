import { ArrowUp } from 'lucide-react';

const footerLinks = {
  Company: ['About', 'Careers', 'Blog', 'Press'],
  Services: ['Web Dev', 'Mobile Dev', 'Cloud', 'UI/UX'],
  Resources: ['Documentation', 'Community', 'Support', 'Status'],
  Legal: ['Privacy', 'Terms', 'Cookies', 'Licenses'],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="navbar-logo">
              <span className="navbar-logo__dot" />
              <span className="navbar-logo__text">Lazy Developer</span>
            </a>
            <p>
              Building the future of digital innovation. We craft premium
              experiences that transform businesses worldwide.
            </p>
          </div>

          <div className="footer__links">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="footer__col">
                <h4>{heading}</h4>
                <ul>
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Lazy Developer. All rights reserved.</p>
          <button
            className="footer__scroll-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
