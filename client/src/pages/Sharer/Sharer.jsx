import { useQuery } from "@apollo/client";
import {
  QUERY_USER,
  QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
} from "../../utils/queries";
import { useParams } from "react-router-dom";
import SkillDisplayList from "../../components/SkillDisplayList/SkillDisplayList";
import { useGlobalContext } from "../../utils/GlobalState";
import SharerStyleRouter from "./SharerStyleRouter";

const Sharer = () => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SharerStyleRouter(state);

  const params = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: params.userId },
  });

  const user = data ? data.user : {};

  const {
    loading: skillRelationshipsLoading,
    data: skillRelationshipQueryData,
  } = useQuery(QUERY_SKILL_RELATIONSHIPS_BY_USER_ID, {
    variables: { userId: params.userId },
  });

  const skillRelationshipData = skillRelationshipQueryData
    ? skillRelationshipQueryData.getSkillRelationshipsByUserId
    : [];

  const skillRelationshipGroup = (group) => {
    const skills = [];

    skillRelationshipData.map((relationship) => {
      if (group == "offered" && relationship.offered) {
        skills.push(relationship);
      }
      if (group == "desired" && relationship.desired) {
        skills.push(relationship);
      }
    });

    return skills;
  };

  return (
    <>
      {user ? (
        <div>
          <h3>{user.username}</h3>
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
          <p>
            {skillRelationshipGroup("offered").length > 0 ? (
              <>
                <div className={styleRouter.header}>Skill I Offer</div>
                <SkillDisplayList
                  skillRelationshipList={skillRelationshipGroup("offered")}
                />
              </>
            ) : (
              <></>
            )}
            {skillRelationshipGroup("desired").length > 0 ? (
              <>
                <div className={styleRouter.header}>Skill I Want To Learn</div>
                <SkillDisplayList
                  skillRelationshipList={skillRelationshipGroup("desired")}
                />
              </>
            ) : (
              <></>
            )}
            {/* <h3> Skills:</h3>
            
            <ul>
              {skillRelationshipData ? (
                skillRelationshipData.map((skill) => (
                  <li key={skill.id}>
                    {skill.skill.name} - {skill.offered ? "Offered" : "Desired"}
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul> */}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Sharer;
