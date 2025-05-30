import React, { useContext } from 'react'
import { FaGlobe, FaSearch, FaInfoCircle } from 'react-icons/fa'
import { ThemeContext } from '../contexts/ThemeContext'
import './About.css'

const About = () => {
  const [isDark] = useContext(ThemeContext);

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="about-container">
        <div className="about-header">
          <h1>About Country Parcel</h1>
          <p className="subtitle">Your Gateway to Global Knowledge</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <FaGlobe className="feature-icon" />
            <h3>Comprehensive Data</h3>
            <p>Access detailed information about every country in the world, including population, capitals, languages, and more.</p>
          </div>

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Easy Search</h3>
            <p>Find any country quickly with our powerful search and filtering system. Filter by region, population, or other criteria.</p>
          </div>

          <div className="feature-card">
            <FaInfoCircle className="feature-icon" />
            <h3>Rich Details</h3>
            <p>Explore in-depth information about each country's culture, geography, and essential statistics.</p>
          </div>
        </div>

        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Country Parcel aims to make global information accessible to everyone. Whether you're a student,
            traveler, or just curious about the world, we provide accurate and up-to-date information about
            countries across the globe.
          </p>

          <h2>How to Use</h2>
          <p>
            Browse our comprehensive list of countries, use the search bar to find specific nations,
            or filter by region to explore different parts of the world. Click on any country card
            to discover detailed information about that nation.
          </p>
        </div>

        <div className="about-footer">
          <p>Built with ❤️ using React and REST Countries API</p>
        </div>
      </div>
    </main>
  )
}

export default About
