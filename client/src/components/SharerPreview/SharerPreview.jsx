import { useNavigate } from "react-router-dom";
import { QUERY_SKILL_RELATIONSHIPS_BY_USER_ID } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { parseSkillRelationshipsByRelationshipType } from "../../utils/dataParsers";

const SharerPreview = ({ userInfo }) => {
  const user = userInfo;

  const { data: skillRelationships } = useQuery(
    QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
    {
      variables: {
        userId: user._id,
      },
    }
  );

  const getParsedSkillRelationships = () =>
    parseSkillRelationshipsByRelationshipType(
      skillRelationships?.getSkillRelationshipsByUserId
    );

  const offeredSkills = () => {
    return getParsedSkillRelationships()?.offeredSkills;
  };

  const desiredSkills = () => {
    return getParsedSkillRelationships()?.desiredSkills;
  };

  const skillsList = (title, skillsList) => {
    skillsList.sort((a, b) => {
      const nameA = a.skill.name.toUpperCase();
      const nameB = b.skill.name.toUpperCase();

      return nameA > nameB ? 1 : -1;
    });

    return (
      <>
        <div>
          <div className="fw-bold">{title}</div>
          <ul>
            {skillsList.map((skill) => {
              return (
                <li key={JSON.stringify(skill)}>
                  {skill.skill.name} ({skill.yearsOfExperience} year(s))
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  };

  const navigate = useNavigate();

  function viewProfile() {
    navigate(`/sharer/${user._id}`);
  }

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <h3 className="card-title">{user.username}</h3>
          <div className="card-text">
            <p>
              <strong> Location:</strong> {user.city}, {user.stateOrProvince},{" "}
              {user.country}
            </p>
            <p>
              <strong> Gender:</strong> {user.gender}
            </p>
            <p>
              <strong> Meeting Preference:</strong> {user.meetingPreference}
            </p>

            <div>
              {offeredSkills() ? (
                skillsList("Offered Skills", offeredSkills())
              ) : (
                <></>
              )}
            </div>

            <div>
              {desiredSkills() ? (
                skillsList("Desired Skills", desiredSkills())
              ) : (
                <></>
              )}
            </div>
          </div>
          <button className="btn btn-info w-100" onClick={viewProfile}>
            View Profile
          </button>
        </div>
      </div>
    </>
  );
};
export default SharerPreview;
