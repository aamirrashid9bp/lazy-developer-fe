import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';

const openings = [
  {
    role: 'Senior React Developer',
    dept: 'Engineering',
    type: 'Full-time',
    location: 'San Francisco / Remote',
    desc: 'Lead the frontend architecture for our flagship products using React 19, building performant and accessible UIs at scale.',
  },
  {
    role: 'UX Designer',
    dept: 'Design',
    type: 'Full-time',
    location: 'London / Remote',
    desc: 'Craft intuitive user experiences through research-driven design, wireframing, prototyping, and design systems.',
  },
  {
    role: 'Cloud Architect',
    dept: 'Infrastructure',
    type: 'Full-time',
    location: 'San Francisco',
    desc: 'Design and implement scalable cloud infrastructure on AWS and GCP, ensuring high availability and security.',
  },
  {
    role: 'Product Manager',
    dept: 'Product',
    type: 'Full-time',
    location: 'Tokyo / Remote',
    desc: 'Drive product strategy and roadmap, collaborating with cross-functional teams to deliver impactful digital products.',
  },
];

export default function Career() {
  return (
    <section id="career" className="section career">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Join Our Team</span>
          <h2>Open Positions</h2>
          <p>
            We're looking for passionate individuals who want to build the
            future with us. Explore our current openings below.
          </p>
        </div>

        <div className="career__list">
          {openings.map((job, i) => (
            <motion.div
              key={job.role}
              className="career__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ x: 4 }}
            >
              <div className="career__icon">
                <Briefcase size={22} strokeWidth={1.5} />
              </div>
              <div className="career__info">
                <h3>{job.role}</h3>
                <p>{job.desc}</p>
                <div className="career__meta">
                  <span className="career__tag">{job.dept}</span>
                  <span className="career__tag">{job.type}</span>
                  <span className="career__tag">{job.location}</span>
                </div>
              </div>
              <button className="btn career__apply">
                Apply <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
