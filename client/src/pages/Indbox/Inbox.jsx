import AuthService from "../../utils/auth.js";
import { QUERY_MESSAGES_BETWEEN_USERS } from "../../utils/queries.js";
import { useQuery } from "@apollo/client";
import { extractConversationsArrayFromMessage } from "../../utils/dataParsers.js";
import ChatWindow from "../../components/ChatWindow/ChatWindow.jsx";

const Inbox = () => {
  const me = AuthService.getProfile().data;

  const { loading, data: conversationsData } = useQuery(
    QUERY_MESSAGES_BETWEEN_USERS,
    {
      variables: {
        userIds: [me._id],
      },
      // pollInterval: 500,
    }
  );

  const conversationsArray = () => {
    const arr = extractConversationsArrayFromMessage(
      me._id,
      conversationsData.getMessagesBetweenUsers
    );

    console.log("arr", arr);
    return arr;
  };

  return (
    <>
      {conversationsData ? (
        <div>
          {conversationsArray().map((conversation) => {
            return (
              <div key={JSON.stringify(conversation)}>
                <div>
                  Conversation with: {conversation.conversationPartner.username}
                </div>
                <div>
                  <ChatWindow
                    recipientUserId={conversation.conversationPartner._id}
                    messagesArray={conversation.messages}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading messages...</div>
      )}
    </>
  );
};

export default Inbox;
