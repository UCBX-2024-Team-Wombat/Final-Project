import { useGlobalContext } from "../../utils/GlobalState";
import SkillDisplayListStyleRouter from "./SkillDisplayListStyleRouter";
import "./skillDisplayList.css";

const SkillDisplayList = ({ skillRelationshipList, openModalFunction }) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SkillDisplayListStyleRouter(state);

  const skillContainer = (relationship) => {
    return (
      <>
        <div className={styleRouter.listWrapperBox}>
          <div key={JSON.stringify(relationship)}>
            <div className="card-body">
              <div className={`card-title ${styleRouter.skillTitle}`}>
                {relationship.skill.name}
              </div>
              {/* <div className={`card-text ${styleRouter.skillDescription}`}>
                {relationship.skill.description}
              </div> */}
              <div className={styleRouter.fieldLabel}>
                <div>Years of Experience</div>
                <div>{relationship.yearsOfExperience}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {skillRelationshipList?.map((relationship) => {
        return (
          <div
            key={JSON.stringify(relationship)}
            onClick={() => openModalFunction(relationship)}
          >
            {skillContainer(relationship)}
          </div>
        );
      })}
    </>
  );
};

export default SkillDisplayList;
