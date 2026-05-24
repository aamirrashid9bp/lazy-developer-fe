import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import sfImg from '../assets/images/sf_office.png';
import londonImg from '../assets/images/london_office.png';
import tokyoImg from '../assets/images/tokyo_office.png';

const branches = [
  {
    city: 'San Francisco',
    country: 'United States',
    image: sfImg,
    desc: 'Our global headquarters and innovation hub, located in the heart of Silicon Valley.',
    address: '450 Mission Street, Suite 300',
    phone: '+1 (415) 555-0120',
    email: 'sf@lazydev.io',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    image: londonImg,
    desc: 'Leading our European operations with a focus on fintech and enterprise digital transformation.',
    address: '71 Queen Victoria Street, EC4V 4AY',
    phone: '+44 20 7946 0958',
    email: 'london@lazydev.io',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image: tokyoImg,
    desc: 'Asia-Pacific hub powering next-gen experiences for clients across Japan, Korea, and Southeast Asia.',
    address: '1-6-1 Roppongi, Minato-ku',
    phone: '+81 3-6384-5500',
    email: 'tokyo@lazydev.io',
  },
];

export default function Branches() {
  return (
    <section id="branches" className="section branches">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Global Presence</span>
          <h2>Our Branches</h2>
          <p>
            With offices across three continents, we bring local expertise
            and global perspective to every project.
          </p>
        </div>

        <div className="grid-3 branches__grid">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.city}
              className="card branches__card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="img-zoom-wrapper branches__img">
                <img src={branch.image} alt={`${branch.city} office`} />
              </div>
              <div className="branches__body">
                <div className="branches__location">
                  <h3>{branch.city}</h3>
                  <span className="branches__country">{branch.country}</span>
                </div>
                <p className="branches__desc">{branch.desc}</p>
                <div className="branches__contact">
                  <div className="branches__contact-row">
                    <MapPin size={15} />
                    <span>{branch.address}</span>
                  </div>
                  <div className="branches__contact-row">
                    <Phone size={15} />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="branches__contact-row">
                    <Mail size={15} />
                    <span>{branch.email}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
