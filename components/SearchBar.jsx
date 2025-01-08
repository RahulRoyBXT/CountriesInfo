import React, { useState } from 'react';
import "./imp.css"
export default function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({ country: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.value === "") {
      onSearch("");
    }
  };

  const handleKeyPress = (e) => {
    console.log(e.key, e.code);
    if ((e.key === "Enter" || e.code === "Enter") && formData.country !== "") {
      onSearch(formData.country);
    }
  };
  const handleSubmit = () => {
    if (formData.country !== "") {
      onSearch(formData.country);
    }
  }

  return (<>
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        name="country"
        placeholder="Search for a country..."
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </div>
    <button className='mobile' onClick={handleSubmit}>Search</button>
    </>
  );
}