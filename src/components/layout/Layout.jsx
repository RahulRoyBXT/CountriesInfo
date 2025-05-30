import React, { useContext, useEffect } from 'react';
import Header from './Header';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../contexts/ThemeContext';
import { NetworkContext } from '../../contexts/NetworkContext';
import './Layout.css';

/**
 * Layout component that wraps all pages
 * Handles theme switching and offline detection
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 */
const Layout = ({ children }) => {
  const isDark = useContext(ThemeContext);
  const isOnline = useContext(NetworkContext);

  useEffect(() => {
    // Apply dark mode class to body element
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (!isOnline) {
      // Redirect to offline page when connection is lost
      window.location.href = '/offline.html';
    }
  }, [isOnline]);

  return (
    <div className="layout">
      <Header />
      <motion.main 
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
