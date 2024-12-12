import React, { useState } from "react";
import SearchResultsDisplay from "../../components/SearchResultsDisplay/SearchResultsDisplay";
import TypeableDropdown from "../../components/TypeableDropdown/TypeableDropdown";
import {
  QUERY_SKILLS_BY_NAME,
  QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA,
} from "../../utils/queries.js";
import { useLazyQuery } from "@apollo/client";
import {
  GENDER_OPTIONS,
  US_STATES,
  MEETING_PREFERENCE,
} from "../../utils/standardValues.js";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import SearchPageStyleRouter from "./SearchPageStyleRouter.js";
import "./searchPage.css";

const SearchPage = () => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SearchPageStyleRouter(state);

  const [filters, setFilters] = useState({});
  const [selectedSkills, setSelectedSkills] = useState({});
  const [runSearchQuery, { loading: searchLoading, data: searchData }] =
    useLazyQuery(QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA, {
      variables: {
        skillIds: selectedSkillIds(),
      },
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
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
        {/* ADD A "REMOVE" BUTTON */}
        <li key={JSON.stringify(skillData)}>{skillData.name}</li>
      </>
    );
  };

  return (
    <div>
      <div className="border-bottom mb-2">
        <h1>Skill Search</h1>
        <div>
          <p>
            Here you can search for skills you'd like to learn. You can also
            optionally add filters to your search to only show other skill
            sharer's that match the criteria you're looking for
          </p>
        </div>
      </div>
      <div>
        <div className={styleRouter.header}>Sharer Filters</div>
        <p>
          Use these fields to narrow your search based on skill sharer info. For
          example, you can narrow your search to only show other sharer's in a
          city near you, or sharer's who prefer to meet online.
        </p>
      </div>
      <form onSubmit={handleUpdateFilter}>
        <div className="mb-3">
          <label className="form-label fw-bold">City</label>
          <input
            type="text"
            placeholder="Enter the name of a city"
            name="city"
            className="form-control"
            value={filters.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">State</label>
          <select
            id="state"
            className="form-select"
            name="state"
            onChange={handleChange}
          >
            <option value="" selected>
              Select a state
            </option>
            {US_STATES.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Meeting Preference</label>
          <select
            id="meetingPreference"
            className="form-select"
            name="meetingPreference"
            onChange={handleChange}
          >
            <option value="" selected>
              Select a meeting preference
            </option>
            {MEETING_PREFERENCE.map((meeting) => (
              <option key={meeting} value={meeting}>
                {meeting}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Gender</label>
          <select
            id="gender"
            className="form-select"
            name="gender"
            onChange={handleChange}
          >
            <option value="" selected>
              Preferred skill sharer gender
            </option>
            {GENDER_OPTIONS.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        <div className="border-bottom pb-3 mb-2">
          <button type="submit" className="btn btn-success w-100">
            Add Skill Sharer Filters
          </button>
        </div>
      </form>
      {/* ============================== */}
      <div className="end-of-page-buffer">
        <div>
          <div className={styleRouter.header}>Skill Selection</div>
          <p>
            Enter the skill or skills you'd like to learn here. You can add
            multiple skills to a search.
          </p>
          <p>
            Start typing the name of a skill in the field below. A dropdown of
            skills that match or partially match what you've typed will appear.
            Click on one of these dropdown options to add it to your list of
            searched skills.
          </p>
          <p>
            Once you've added all the skills you'd like to search for, click the
            "search" button and a list of Skill Sharer's that offer that skill
            (and match your filter criteria, if any were provided) will appear
            below.
          </p>
        </div>
        <TypeableDropdown
          label=""
          placeholder="Begin typing here..."
          query={QUERY_SKILLS_BY_NAME}
          itemClickedFunction={searchSkillClickedHandler}
        />
        {Object.keys(filters).length > 0 ? (
          <div>
            <div>Showing Skill Sharer's that match the following criteria:</div>
            {filters.city ? (
              <div>
                <span className="fw-bold">City: </span>
                <span>{filters.city}</span>
              </div>
            ) : (
              <></>
            )}
            {filters.state ? (
              <div>
                <span className="fw-bold">State: </span>
                <span>{filters.state}</span>
              </div>
            ) : (
              <></>
            )}
            {filters.meetingPreference ? (
              <div>
                <span className="fw-bold">Meeting Preference: </span>
                <span>{filters.meetingPreference}</span>
              </div>
            ) : (
              <></>
            )}
            {filters.gender ? (
              <div>
                <span className="fw-bold">Gender: </span>
                <span>{filters.gender}</span>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="border-bottom pb-3 mb-2">
          <button
            type="button"
            className="btn btn-success w-100"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>

        <div className={styleRouter.subHeader}>Selected Skills:</div>
        <div>
          <ul>
            {selectedSkillIds().map((skillId) => {
              return skillContainer(selectedSkills[skillId]);
            })}
          </ul>
        </div>
        <SearchResultsDisplay searchPayload={searchData} showOffered={true} />
      </div>
      {/* ============================== */}
    </div>
  );
};

export default SearchPage;
