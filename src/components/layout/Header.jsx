import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import "./Header.css";

export default function Header() {
  const [isDark, setIsDark] = useContext(ThemeContext);
  const aboutPage = location.pathname === '/about' || location.pathname === '/about/'? true : false // Boolean Value
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
       {!aboutPage && <motion.h2 
          className="title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/">Where in the world?</Link>
        </motion.h2>}
        
        <motion.div
          className="theme-changer"
          onClick={() => {
            setIsDark((prev) => !prev);
            localStorage.setItem("DarkMode", !isDark);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <i className={`fa-solid ${isDark ? "fa-sun" : "fa-moon"}`} />
          {isDark ? "Light Mode" : "Dark Mode"}
        </motion.div>
      </div>
    </header>
  );
}
