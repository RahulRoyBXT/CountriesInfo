import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [formData, setFormData] = useState({ country: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(e.target.value === "") {
      onSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && formData.country !== "") {
      onSearch(formData.country);
    }
  };

  return (
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
  );
}