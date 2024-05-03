import React, { useState } from 'react';

const SearchInput_Airport = ({ placeholder, onInputChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onInputChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchInput_Airport;
