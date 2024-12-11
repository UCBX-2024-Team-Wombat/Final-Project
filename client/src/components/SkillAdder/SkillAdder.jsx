import AuthService from "../../utils/auth.js";
import TypeableDropdown from "../TypeableDropdown/TypeableDropdown.jsx";
import { QUERY_SKILLS_BY_NAME } from "../../utils/queries";
import { useState } from "react";
import SkillForm from "../SkillForm/SkillForm.jsx";

const SkillAdder = ({ offered, desired }) => {
  const [selectedSkill, setSelectedSkill] = useState();
  const userId = AuthService.getProfile().data._id;

  function skillClickedHandler(data) {
    console.log("data in skill adder", data);
    setSelectedSkill(data);
  }

  return (
    <>
      <TypeableDropdown
        label="Select a skill"
        placeholder="Begin typing the name of a skill here..."
        query={QUERY_SKILLS_BY_NAME}
        itemClickedFunction={skillClickedHandler}
      />
      {selectedSkill ? (
        <div className="border border-secondary rounded p-3">
          <SkillForm skillData={selectedSkill} offered={false} desired={true} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

// Add a offered skill
// Add a desired skill
// Fields:
// - Skill (typable dropdown)
// - Years of experience (decimal, convert to string)
// - Offered & Offered Text
// - Desired & Desired Text

export default SkillAdder;
