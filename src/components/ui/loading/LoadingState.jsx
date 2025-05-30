import React, { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import "./styles.css"

const LoadingState = () => {
  const [isDark] = useContext(ThemeContext);
  
  return (
    <div className={`shimmer-wrapper ${isDark ? "dark" : ""}`} id='loading'>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
      <div className="shimmer"></div>
    </div>
  )
}

export default LoadingState
