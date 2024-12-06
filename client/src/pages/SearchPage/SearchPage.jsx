import React, { useState } from 'react';

const SearchPage = () => {
  const [name, setName] = useState('');
  const [skills, setSkills]= useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Need to add logic to handle the search
  };

  return (
    <div>
      <h1>Search for Skills</h1>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              placeholder="Name Search"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
        <div>
          <label>
            Skills:
            <input
              type="text"
              placeholder="Skill Search"
              value={skills}
              onChange={handleSkillsChange}
            />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;