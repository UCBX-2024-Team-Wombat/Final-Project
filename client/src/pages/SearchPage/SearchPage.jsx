import React, { useState } from "react";
import SearchResultsDisplay from "../../components/SearchResultsDisplay/SearchResultsDisplay";
import TypeableDropdown from "../../components/TypeableDropdown/TypeableDropdown";
import {
  QUERY_SKILLS_BY_NAME,
  QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA,
} from "../../utils/queries.js";
import { useLazyQuery } from "@apollo/client";

// Import standardValues.js
import {
  GENDER_OPTIONS,
  US_STATES,
  MEETING_PREFERENCE,
} from "../../utils/standardValues.js";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    county: "",
    gender: "",
    meetingPreference: "",
  });
  const [selectedSkills, setSelectedSkills] = useState({});
  const [runSearchQuery, { loading: searchLoading, data: searchData }] =
    useLazyQuery(QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA, {
      variables: {
        skillIds: selectedSkillIds(),
      },
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name:", name);
    console.log("value:", value);
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  function handleSearchSubmit(event) {
    event.preventDefault();
    console.log("searching");

    runSearchQuery();
    // Need to add logic to handle the search
  }

  const genderSelfDescribe = (
    <div>
      <label className="form-label">Please describe your gender</label>
      <input
        className="form-control"
        name="genderDescribe"
        value={filters.genderDescribe}
        onChange={handleChange}
      />
    </div>
  );

  // ================================================

  // const [querySkills, { called, loading, data }] = useLazyQuery(query, {
  //   variables: { searchString: queryString },
  // });

  function handleUpdateFilter(event) {
    event.preventDefault();
    console.log("updating filter");
  }

  function searchSkillClickedHandler(skillData) {
    console.log("skillData", skillData);
    setSelectedSkills({ ...selectedSkills, [skillData._id]: skillData });
  }

  function selectedSkillIds() {
    return Object.keys(selectedSkills);
  }

  const skillContainer = (skillData) => {
    return (
      <>
        <div className={"card mb-2"}>
          {/* ADD A "REMOVE" BUTTON */}
          <div key={JSON.stringify(skillData)}>
            <div className="card-body">
              <div className={`card-title ${"fw-bold"}`}>{skillData.name}</div>
              {/* <div className={`card-text ${styleRouter.skillDescription}`}>
                {relationship.skill.description}
              </div> */}
              {skillData.description ? (
                <div className={"text-secondary"}>
                  <div className="fw-bold">Description</div>
                  <div>{skillData.description}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  // ================================================

  return (
    <div>
      <h1>Search for Skills</h1>
      <form onSubmit={handleUpdateFilter}>
        <div>
          <label>
            City:
            <input
              type="text"
              placeholder="City"
              name="city"
              value={filters.city}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>State:</label>
          <select name="state" value={filters.state} onChange={handleChange}>
            <option value="" disabled>
              Select a state
            </option>
            {US_STATES.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Meeting preference:</label>
          <select
            name="meetingPreference"
            value={filters.meetingPreference}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select your meeting preference
            </option>
            {MEETING_PREFERENCE.map((meeting) => (
              <option key={meeting} value={meeting}>
                {meeting}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={filters.gender} onChange={handleChange}>
            <option value="" disabled>
              What is your gender
            </option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        {filters.gender == "Self Describe" ? genderSelfDescribe : <></>}
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
      {/* ============================== */}
      <div>
        <TypeableDropdown
          label="Select a skill"
          placeholder="Begin typing the name of a skill here..."
          query={QUERY_SKILLS_BY_NAME}
          itemClickedFunction={searchSkillClickedHandler}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
        <div>Skills To Search For:</div>
        {selectedSkillIds().map((skillId) => {
          return skillContainer(selectedSkills[skillId]);
        })}
        <SearchResultsDisplay searchPayload={searchData} showOffered={true} />
      </div>
      {/* ============================== */}
    </div>
  );
};

export default SearchPage;
