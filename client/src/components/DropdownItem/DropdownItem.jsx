const SkillDropdownItem = ({ skillData, onClick }) => {
  return (
    <>
      <div
        className="dropdown-item"
        key={skillData.name}
        onClick={() => onClick(skillData)}
      >
        {skillData.name}
      </div>
    </>
  );
};

export default SkillDropdownItem;
