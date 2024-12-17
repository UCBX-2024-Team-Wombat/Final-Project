import { useQuery } from "@apollo/client";
import {
  QUERY_USER,
  QUERY_SKILL_RELATIONSHIPS_BY_USER_ID,
} from "../../utils/queries";

import { ADD_MESSAGE } from "../../utils/mutations.js";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import SkillDisplayList from "../../components/SkillDisplayList/SkillDisplayList";
import { useGlobalContext } from "../../utils/GlobalState";
import SharerStyleRouter from "./SharerStyleRouter";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import AuthService from "../../utils/auth";
import { extractConversationsArrayFromMessage } from "../../utils/dataParsers.js";
import { Form, Button } from "react-bootstrap";

const Sharer = () => {
  const [state] = useGlobalContext();
  const styleRouter = new SharerStyleRouter(state);
  const [introMessage, setIntroMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [chatModalVisibile, setChatModalVisible] = useState(false);
  const [createMessage] = useMutation(ADD_MESSAGE);

  const params = useParams();

  const { data: sharerData } = useQuery(QUERY_USER, {
    variables: { userId: params.userId },
  });
  const me = AuthService.getProfile()?.data;
  const sharer = sharerData ? sharerData.user : {};

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

  function handleSubmitIntroMessage(event) {
    event.preventDefault();
    try {
      createMessage({
        variables: {
          receiverId: sharer._id,
          message: introMessage,
        },
      });
      setMessageSent(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      {sharer ? (
        <div>
          <Modal show={chatModalVisibile} onHide={hideChatModal}>
            <Modal.Header closeButton>
              <Modal.Title>Introduce Yourself!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {!me ? (
                <div>Log in or sign up to send messages to other sharers.</div>
              ) : (
                <>
                  {!messageSent ? (
                    <div className="mb-3">
                      Let {sharer.username} know that you're interested in
                      trading skills! Be sure to let them know which skill or
                      skills you'd like to learn, and what skills you offer that
                      they might be interested in.
                    </div>
                  ) : (
                    <></>
                  )}
                  {!messageSent ? (
                    <Form onSubmit={handleSubmitIntroMessage}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          onChange={(event) =>
                            setIntroMessage(event.target.value)
                          }
                        />
                      </Form.Group>
                      <Button className="btn-info w-100" type="submit">
                        Send Introduction
                      </Button>
                    </Form>
                  ) : (
                    <div>
                      Your message has been sent! You can check your inbox to
                      see when they reply, as well as to check in on any other
                      conversations you have.
                    </div>
                  )}
                </>
              )}
            </Modal.Body>
          </Modal>
          <div className="row">
            <div className="col">
              <h3 className={styleRouter.header}>{sharer.username}</h3>
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
            <div>{sharer.bio}</div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>Location: </span>
              <span>
                {sharer.city}, {sharer.stateOrProvince}, {sharer.country}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>Gender: </span>
              <span>{sharer.gender}</span>
            </div>
          </div>
          <div className="mb-3">
            <div>
              <span className={styleRouter.fieldLabel}>
                Meeting Preference:{" "}
              </span>
              <span>{sharer.meetingPreference}</span>
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
