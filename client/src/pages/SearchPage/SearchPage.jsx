import React, { useState } from "react";
import SearchResultsDisplay from "../../components/SearchResultsDisplay/SearchResultsDisplay";
import TypeableDropdown from "../../components/TypeableDropdown/TypeableDropdown";
import { QUERY_SKILLS_BY_NAME } from "../../utils/queries.js";
import { useQuery } from "@apollo/client";

const SearchPage = () => {
  const [name, setName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("searching");

    const arguements = {
      skillIds: selectedSkillIds(),
    };

    runSearchQuery({ variables: arguements });
    // Need to add logic to handle the search
  };

  // ================================================

  const [runSearchQuery] = useQuery(
    QUERY_SKILL_RELATIONSHIPS_BY_SEARCH_CRITERIA
  );

  function handleUpdateFilter(event) {
    event.preventDefault();
    console.log("updating filter");
  }

  function searchSkillClickedHandler(skillData) {
    console.log("skillData", skillData);
    setSelectedSkills({ ...selectedSkills, [skillData._id]: skillData });
  }

  const selectedSkillIds = () => {
    return Object.keys(selectedSkills);
  };

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
            Name:
            <input
              type="text"
              placeholder="Name Search"
              value={name}
              onChange={handleNameChange}
            />
          </label>
        </div>
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
        <SearchResultsDisplay searchPayload={{}} />
      </div>
      {/* ============================== */}
    </div>
  );
};

export default SearchPage;
