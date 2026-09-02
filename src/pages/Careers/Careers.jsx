import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight } from 'lucide-react';
import styles from './Careers.module.css';

const Careers = () => {
  const roles = [
    {
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Hybrid'
    },
    {
      title: 'Travel Content Creator',
      department: 'Content',
      type: 'Contract',
      location: 'Remote'
    },
    {
      title: 'AI/Travel Product Intern',
      department: 'Product',
      type: 'Internship',
      location: 'Remote'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Build the Future of Travel
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Join our mission to make exploring the world effortless and inspiring.
          </motion.p>
        </div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.intro}>
          <h2>Open Positions</h2>
          <p>
            We are always looking for passionate individuals who love travel and technology. 
            If you're excited about building AI-powered tools that help millions of people 
            plan their dream vacations, we want to hear from you.
          </p>
        </div>
        
        <div className={styles.jobsList}>
          {roles.map((role, idx) => (
            <motion.div 
              key={idx} 
              className={styles.jobCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.jobInfo}>
                <h3>{role.title}</h3>
                <div className={styles.jobMeta}>
                  <span>{role.department}</span>
                  <span className={styles.dot}>•</span>
                  <span>{role.type}</span>
                  <span className={styles.dot}>•</span>
                  <span>{role.location}</span>
                </div>
              </div>
              <button className={styles.applyBtn}>
                Apply <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className={styles.contactSection}>
          <div className={styles.iconWrapper}><Briefcase size={32} /></div>
          <h3>Don't see a fit?</h3>
          <p>Send us your resume anyway. We're growing fast and always looking for talent.</p>
          <a href="/contact" className={styles.contactLink}>Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Careers;