import { useQuery } from "@apollo/client";
import {
  QUERY_USER,
  QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
  QUERY_ME,
} from "../../utils/queries";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import SkillDisplayList from "../../components/SkillDisplayList/SkillDisplayList";
import { useGlobalContext } from "../../utils/GlobalState";
import SharerStyleRouter from "./SharerStyleRouter";
import { useState } from "react";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import AuthService from "../../utils/auth";

const Sharer = () => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new SharerStyleRouter(state);

  const [chatModalVisibile, setChatModalVisible] = useState(false);
  const params = useParams();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: params.userId },
  });
  const me = AuthService.getProfile().data;

  console.log("AuthService.getProfile()", AuthService.getProfile());
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

  function showChatModal() {
    setChatModalVisible(true);
  }

  function hideChatModal() {
    setChatModalVisible(false);
  }

  return (
    <>
      {user ? (
        <div>
          <Modal show={chatModalVisibile} onHide={hideChatModal}>
            <Modal.Header closeButton>
              <Modal.Title>Chat with {user.username}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ChatWindow currentUser={me} recipientUser={user} />
              {/* <SkillUpdateForm
                skillRelationshipData={skillRelationshipPayload}
                offered={skillRelationshipPayload.modalType == "offered"}
                desired={skillRelationshipPayload.modalType == "desired"}
                submitButtonLabel="Update"
                submitButtonFunction={updateRelationship}
              /> */}
            </Modal.Body>
          </Modal>
          <div className="row">
            <div className="col">
              <h3 className={styleRouter.header}>{user.username}</h3>
            </div>
            <div className="col d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-info"
                onClick={showChatModal}
              >
                Let's chat!
              </button>
            </div>
          </div>
          <div className="mb-3">
            <div className={styleRouter.fieldLabel}>About Me</div>
            <div>{user.bio}</div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>Location: </span>
              <span>
                {user.city}, {user.stateOrProvince}, {user.country}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>Gender: </span>
              <span>{user.gender}</span>
            </div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>
                Meeting Preference:{" "}
              </span>
              <span>{user.meetingPreference}</span>
            </div>
          </div>
          <p>
            {skillRelationshipGroup("offered").length > 0 ? (
              <>
                <div className={styleRouter.fieldLabel}>Skill I Offer</div>
                <SkillDisplayList
                  skillRelationshipList={skillRelationshipGroup("offered")}
                />
              </>
            ) : (
              <></>
            )}
            {skillRelationshipGroup("desired").length > 0 ? (
              <>
                <div className={styleRouter.fieldLabel}>
                  Skill I Want To Learn
                </div>
                <SkillDisplayList
                  skillRelationshipList={skillRelationshipGroup("desired")}
                />
              </>
            ) : (
              <></>
            )}
          </p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Sharer;
