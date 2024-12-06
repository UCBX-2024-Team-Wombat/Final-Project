import { useQuery } from "@apollo/client";
import { QUERY_SKILLRELATIONSHIPS } from "../../utils/queries";

const ProfileSkills = (props) => {
    const { loading, data } = useQuery(QUERY_SKILLRELATIONSHIPS);

  const skills = data?.getSkillRelationships || {};

//   const foundSkills = skills.map((skill) => skill.user?._id == props.id);
// Filter for specifically one user's id

//   console.log(foundSkills);



  console.log(skills);

  if(loading) {
    return <h2>Loading...</h2>
  }
  return (
    <ul>
        <li>
            {}
        </li>
    </ul>
  )
};

export default ProfileSkills;