import Form from "react-bootstrap/Form";
import AuthService from "../../utils/auth.js";

import { useState } from "react";
// import SkillAdder from "../SkillAdder/SkillAdder";
import TypeableDropdown from "../TypeableDropdown/TypeableDropdown.jsx";
import { QUERY_SKILLS_BY_NAME } from "../../utils/queries";
import { QUERY_SKILL_RELATIONSHIPS_BY_USER_ID } from "../../utils/queries";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import SkillAddFormStyleRouter from "./SkillAddFormStyleRouter.js";
import { useQuery } from "@apollo/client"; //
import { useEffect } from "react"; //

const SkillAddForm = ({ submitButtonFunction }) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SkillAddFormStyleRouter(state);
  const [formState, setFormState] = useState({
    yearsOfExperience: "0",
    userId: AuthService.getProfile().data._id,
    existingSkills: [], // need to store the names of existing skills
  });
  // fetching the skills user already have
  const { data: skillsData } = useQuery(QUERY_SKILL_RELATIONSHIPS_BY_USER_ID, {
    variables: { userId: formState.userId },
  });

  useEffect(() => {
    if (skillsData && skillsData.getSkillRelationshipsByUserId) {
      //store in state (the names)
      const skillNames = skillsData.getSkillRelationshipsByUserId.map(
        (skillRel) => skillRel.skill.name
      );
      setFormState((prevState) => ({
        ...prevState,
        existingSkills: skillNames,
      }));
    }
  }, [skillsData]);

  function skillClickedHandler(data) {
    if (formState.existingSkills.includes(data.name)) {
      alert("You already have this skill.");
      return;
    }
    setFormState({ ...formState, skill: data, skillId: data._id });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });

    if (name == "relationshipType") {
      console.log("in block");

      if (value == "Offer") {
        setFormState({
          ...formState,
          offered: true,
          desired: false,
          desiredText: null,
        });
      } else if (value == "Learn") {
        setFormState({
          ...formState,
          offered: false,
          offeredText: null,
          desired: true,
        });
      } else if (value == "Both") {
        setFormState({ ...formState, offered: true, desired: true });
      }
    }
  }

  function showObject() {
    console.log("formState", formState);
  }

  const allRequiredFieldsPopulated = () => {
    let requiredFieldMissing = false;
    const requiredFields = ["yearsOfExperience", "skillId", "userId"];

    for (const field of requiredFields) {
      if (formState[field] == undefined || formState[field] == null) {
        requiredFieldMissing = true;
        break;
      }
    }

    if (
      requiredFieldMissing == false &&
      formState.offered == undefined &&
      formState.desired == undefined
    ) {
      requiredFieldMissing = true;
    }

    return !requiredFieldMissing;
  };

  const buttonInfoObject = () => {
    if (allRequiredFieldsPopulated()) {
      return { class: "btn-primary", disabled: false };
    } else {
      return { class: "btn-secondary", disabled: true };
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {formState.skill == undefined ? (
          <TypeableDropdown
            label="Select a skill"
            placeholder="Begin typing the name of a skill here..."
            query={QUERY_SKILLS_BY_NAME}
            itemClickedFunction={skillClickedHandler}
          />
        ) : (
          <></>
        )}
        {/* Display selected skill */}
        {formState.skill ? (
          <div className={styleRouter.selectedSkillDisplay}>
            Great! <span className="fw-bold">{formState.skill.name}</span> is
            is.
          </div>
        ) : (
          <></>
        )}
        {formState.skill ? (
          <div>
            <Form.Group className="mb-3" controlId="yearsOfExperience">
              <Form.Label>
                How many years of experience do you have with this skill, if
                any?
              </Form.Label>
              <Form.Control
                type="number"
                required
                name="yearsOfExperience"
                min="0"
                step=".01"
                value={formState.yearsOfExperience}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        ) : (
          <></>
        )}
        {formState.skill ? (
          <div className={styleRouter.relationshipTypeSelector}>
            <label className="form-label">
              Would you like to learn this skill, offer this skill, or both?
            </label>
            <select
              className="form-select"
              name="relationshipType"
              onChange={handleChange}
            >
              <option selected disabled>
                Please select an option
              </option>
              <option>Learn</option>
              <option>Offer</option>
              <option>Both</option>
            </select>
          </div>
        ) : (
          <></>
        )}

        {formState.offered ? (
          <div>
            <Form.Group className="mb-3" controlId="offeredText">
              <Form.Label>
                Please describe your experience with this skill
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                name="offeredText"
                placeholder="This information isn't required, but will help you find a skill buddy"
                value={formState.offeredText}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        ) : (
          <></>
        )}
        {formState.desired ? (
          <div>
            <Form.Group className="mb-3" controlId="desiredText">
              <Form.Label>What you would like to learn or practice?</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                name="desiredText"
                placeholder="This information isn't required, but will help you find a skill buddy"
                value={formState.desiredText}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        ) : (
          <></>
        )}

        <button
          type="button"
          className={`btn ${buttonInfoObject().class}`}
          disabled={buttonInfoObject().disabled}
          onClick={() => submitButtonFunction(formState)}
        >
          Add Skill
        </button>
        {/* <button className="btn btn-danger" onClick={showObject}>
          Show Object
        </button> */}
      </Form>
    </>
  );
};

export default SkillAddForm;
