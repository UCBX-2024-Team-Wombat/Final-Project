import React, { useState } from 'react';

// Import standardValues.js
import { GENDER_OPTIONS, US_STATES, MEETING_PREFERENCE } from '../../utils/standardValues.js'

const SearchPage = () => {
  const [filters, setFilters] = useState({
    city: '',
    state: '',
    county: '',
    gender: '',
    meetingPreference: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log('name:', name)
    console.log('value:', value)
    setFilters({
      ...filters,
      [name]: value,
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

  }

  const genderSelfDescribe = (<div>
    <label>Please describe your gender</label>
    <input
      name='genderDescribe'
      value={filters.genderDescribe}
      onChange={handleChange} />
    </div>)
  return (
    <div>
      <h1>Search for Skills</h1>
      <form onSubmit={handleSearchSubmit}>
        <div>
          <label>
            City:
            <input
              type="text"
              placeholder="City"
              name='city'
              value={filters.city}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            State:
            </label>
          <select name='state' value={filters.state} onChange={handleChange}>
            <option value="" disabled>Select a state</option>
            {US_STATES.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
        <label>
            Meeting preference:
            </label>
          <select name='meetingPreference' value={filters.meetingPreference} onChange={handleChange}>
            <option value="" disabled>Select your meeting preference</option>
            {MEETING_PREFERENCE.map((meeting) => (
              <option key={meeting} value={meeting}>
                {meeting}
              </option>
            ))}
          </select>
        </div>
        <div>
        <label>
            Gender:
            </label>
          <select name='gender' value={filters.gender} onChange={handleChange}>
            <option value="" disabled>What is your gender</option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        {filters.gender == 'Self Describe' ?
          genderSelfDescribe
            :(<></>)
      }
            {/* <div>
          <label>
            Skills:
            <input
              type="text"
              placeholder="Skill Search"
              value={skills}
              onChange={handleSkillsChange}
            />
          </label>
        </div> */}
            <button type="submit">Search</button>
          </form>
    </div>
  );
};

export default SearchPage;