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
import Accordion from "react-bootstrap/Accordion";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import SearchPageStyleRouter from "./SearchPageStyleRouter.js";
import "./searchPage.css";

const SearchPage = () => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SearchPageStyleRouter(state);
  const [filters, setFilters] = useState({});
  const [temporaryFilters, setTemporaryFilters] = useState({});
  const [selectedSkills, setSelectedSkills] = useState({});
  const [runSearchQuery, { loading: searchLoading, data: searchData }] =
    useLazyQuery(QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA, {
      variables: {
        skillIds: selectedSkillIds(),
      },
    });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (value == "") {
      const updatedFilters = { ...temporaryFilters };
      delete updatedFilters[name];
      setTemporaryFilters({ ...updatedFilters });
    } else {
      setTemporaryFilters({
        ...temporaryFilters,
        [name]: value,
      });
    }
  };

  function resetSharerFilters() {
    setFilters({});
  }

  function handleUpdateFilter(event) {
    event.preventDefault();

    setTemporaryFilters({});
    const filterForm = document.getElementById("filter-form");
    filterForm.reset();
    setFilters({ ...temporaryFilters });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    console.log("searching");

    runSearchQuery();
    // Need to add logic to handle the search
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
      {/* Page Header */}
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
      {/* ============================== */}
      {/* Section: Skill Selection */}
      <div>
        <div className="end-of-page-buffer">
          {/* Skill Selection Header */}
          <div>
            <div className={styleRouter.header}>Skill Selection</div>
            <p>
              Enter the skill or skills you'd like to learn here. You can add
              multiple skills to a search.
            </p>
            <p>
              Start typing the name of a skill in the field below. A dropdown of
              skills that match or partially match what you've typed will
              appear. Click on one of these dropdown options to add it to your
              list of searched skills.
            </p>
            <p>
              Once you've added all the skills you'd like to search for, click
              the "search" button and a list of Skill Sharer's that offer that
              skill (and match your filter criteria, if any were provided) will
              appear below.
            </p>
          </div>
          {/* Skill Selection Form */}
          <div>
            <TypeableDropdown
              label=""
              placeholder="Begin typing a skill name here..."
              query={QUERY_SKILLS_BY_NAME}
              itemClickedFunction={searchSkillClickedHandler}
            />
          </div>
          {/* Section: Filter */}
          <div className="mb-3">
            <Accordion defaultActiveKey="">
              <Accordion.Item eventKey="0">
                <Accordion.Header className={styleRouter.header}>
                  Want to filter by Sharer Info?
                </Accordion.Header>
                <Accordion.Body>
                  {/* Filter Header */}
                  <div>
                    <div className={styleRouter.header}>Sharer Filters</div>
                    <p>
                      Use these fields to narrow your search based on skill
                      sharer info. For example, you can narrow your search to
                      only show other sharer's in a city near you, or sharer's
                      who prefer to meet online.
                    </p>
                  </div>
                  {/* Filter Form */}
                  <div>
                    <form onSubmit={handleUpdateFilter} id="filter-form">
                      <div className="mb-3">
                        <label className="form-label fw-bold">City</label>
                        <input
                          type="text"
                          placeholder="Enter the name of a city"
                          name="city"
                          className="form-control"
                          value={filters.city}
                          onChange={handleFilterChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">State</label>
                        <select
                          id="state"
                          className="form-select"
                          name="state"
                          onChange={handleFilterChange}
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
                        <label className="form-label fw-bold">
                          Meeting Preference
                        </label>
                        <select
                          id="meetingPreference"
                          className="form-select"
                          name="meetingPreference"
                          onChange={handleFilterChange}
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
                          value={temporaryFilters.gender}
                          onChange={handleFilterChange}
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
                        <div className="mb-2">
                          <button
                            type="submit"
                            className="btn btn-success w-100"
                          >
                            Add Skill Sharer Filters
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-info w-100"
                            onClick={resetSharerFilters}
                          >
                            Reset Sharer Filters
                          </button>
                        </div>
                      </div>
                    </form>
                    <div>
                      {Object.keys(filters).length > 0 ? (
                        <div>
                          <div className="mb-2">
                            Your search will be filtered to only include Skill
                            Sharer's that match the following criteria:
                          </div>
                          <div className="mx-3">
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
                                <span className="fw-bold">
                                  Meeting Preference:{" "}
                                </span>
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
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
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
      </div>
      {/* ============================== */}
    </div>
  );
};

export default SearchPage;
