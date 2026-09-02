import React from 'react';
import { motion } from 'framer-motion';
import styles from './Privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Privacy Policy
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            How we collect, use, and protect your data.
          </motion.p>
        </div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <div className={styles.document}>
          <p className={styles.lastUpdated}>Last Updated: September 2026</p>
          
          <p>
            Welcome to AuraTravel. This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this 
            privacy policy, please do not access the site.
          </p>

          <p>
            <em>Note: AuraTravel is currently a demonstration project for a frontend development showcase. No real personal 
            data is permanently stored or sold.</em>
          </p>

          <h2>1. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
          <ul>
            <li><strong>Personal Data:</strong> Name and email address when you use our Contact form.</li>
            <li><strong>Usage Data:</strong> Information such as your browser type, operating system, and the pages you have viewed.</li>
          </ul>

          <h2>2. How We Use Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul>
            <li>Respond to your customer service requests (via the Contact form).</li>
            <li>Generate personalized travel itineraries using our AI Assistant.</li>
            <li>Improve the functionality and user experience of our website.</li>
          </ul>

          <h2>3. Location Information</h2>
          <p>
            Our "Near Me" feature requests access to your device's geographical location to provide localized weather 
            and destination recommendations. We do not track your location continuously. Your location is processed 
            locally in your browser or used strictly to fetch weather data for the current session.
          </p>

          <h2>4. AI Travel Assistant</h2>
          <p>
            When you interact with our AI Planner or Chatbot, your inputs (destinations, interests, travel queries) are 
            sent to our AI provider (Google Gemini) to generate responses and itineraries. Please do not submit highly 
            sensitive or personal information to the AI assistant.
          </p>

          <h2>5. Cookies and Local Storage</h2>
          <p>
            We may use cookies, local storage, and similar tracking technologies to customize the Site and improve your 
            experience. For example, we might store your itinerary preferences locally so they persist if you refresh the page.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware 
            that despite our efforts, no security measures are perfect or impenetrable.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please use our <a href="/contact">Contact page</a> to 
            get in touch with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;