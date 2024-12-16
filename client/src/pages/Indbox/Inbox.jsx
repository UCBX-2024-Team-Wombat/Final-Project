import AuthService from "../../utils/auth.js";
import { QUERY_MESSAGES_BETWEEN_USERS } from "../../utils/queries.js";
import { useQuery } from "@apollo/client";
import { extractConversationsArrayFromMessage } from "../../utils/dataParsers.js";
import ChatWindow from "../../components/ChatWindow/ChatWindow.jsx";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../utils/GlobalState.jsx";

const Inbox = () => {
  const [state] = useGlobalContext();
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({});
  const me = AuthService.getProfile().data;

  const { data: conversationsData } = useQuery(QUERY_MESSAGES_BETWEEN_USERS, {
    variables: {
      userIds: [me._id],
    },
    pollInterval: 500,
  });

  const [conversationsArray, setConversationsArray] = useState([]);

  useEffect(() => {
    console.log("useeffect");
    console.log("conversationsData", conversationsData);

    if (conversationsData) {
      const arr = extractConversationsArrayFromMessage(
        me._id,
        conversationsData?.getMessagesBetweenUsers
      );

      setConversationsArray(arr);
    }
  }, [conversationsData]);

  useEffect(() => {
    if (Object.keys(currentConversation).length > 0) {
      for (const conversation of conversationsArray) {
        if (
          conversation.conversationPartner._id ==
          currentConversation.conversationPartner._id
        ) {
          console.log("updating current conversation");
          setCurrentConversation({ ...conversation });
          console.log("new current convo", conversation);

          break;
        }
      }
    }
  }, [conversationsArray]);

  async function handleChatWindowRefetch() {
    // await refetch();

    console.log("refetched data ", conversationsData?.messages?.at(-1));

    // setCurrentConversation(JSON.parse(JSON.stringify(currentConversation)));
    // console.log("refetching", currentConversation);
  }

  function openConversationWindow(conversation) {
    setCurrentConversation({ ...conversation });
    setChatModalVisible(true);
  }

  function hideChatModal() {
    setCurrentConversation({});
    setChatModalVisible(false);
  }

  return (
    <>
      <Modal show={chatModalVisible} onHide={hideChatModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Conversation with{" "}
            {currentConversation?.conversationPartner?.username}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChatWindow
            recipientUserId={currentConversation?.conversationPartner?._id}
            messagesArray={currentConversation?.messages}
            refetchFunction={handleChatWindowRefetch}
          />
        </Modal.Body>
      </Modal>
      <div className={state.isDesktop ? "d-flex justify-content-center" : ""}>
        <div style={state.isDesktop ? { width: "500px" } : {}}>
          <div>{conversationsData ? <h1>My Conversations</h1> : <></>}</div>
          <div>
            {conversationsData ? (
              <ul className="list-group">
                {conversationsArray.map((conversation) => {
                  return (
                    <li
                      className="list-group-item list-group-item-action"
                      key={JSON.stringify(conversation)}
                      onClick={() => openConversationWindow(conversation)}
                    >
                      <span className="fw-bold">User</span>:{" "}
                      {conversation.conversationPartner.username}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div>Loading messages...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
