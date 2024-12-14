import { useState, useEffect } from "react";
import { QUERY_MESSAGES_BETWEEN_USERS } from "../../utils/queries.js";
import { ADD_MESSAGE } from "../../utils/mutations.js";
import { useMutation, useQuery } from "@apollo/client";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import ChatWindowStyleRouter from "./ChatWindowStyleRouter.js";
import "./chatWindow.css";

const ChatWindow = ({ recipientUserId, messagesArray }) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new ChatWindowStyleRouter(state);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const { loading, data, refetch } = useQuery(QUERY_MESSAGES_BETWEEN_USERS, {
  //   variables: {
  //     userIds: [currentUser._id, recipientUser._id],
  //   },
  //   pollInterval: 500,
  // });

  useEffect(() => {
    // const messages = data?.getMessagesBetweenUsers || [];

    setMessages(messages);
    // refetch();
    const chatScroller = document.getElementById("chat-scroller");
    if (chatScroller) {
      chatScroller.scrollTop = chatScroller.scrollHeight + 1000;
    }
  }, [messagesArray]);

  const [createMessage] = useMutation(ADD_MESSAGE);

  const handleSendMessage = () => {
    setNewMessage("");
    createMessage({
      variables: {
        receiverId: recipientUserId,
        message: newMessage,
      },
    });
  };

  function sendKeyChecker(event) {
    if (event.code == "Enter") {
      setNewMessage(event.target.value);
      handleSendMessage();
    }
  }

  return (
    <div>
      <div>
        <div className={styleRouter.messageWindow} id="chat-scroller">
          {messagesArray.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender.username}:</strong> {msg.message}{" "}
              <em>
                ({new Date(parseInt(msg.timestamp)).toLocaleTimeString("en-US")}
                )
              </em>
            </div>
          ))}
          <div id="chat-anchor" className="chat-anchor"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => sendKeyChecker(e)}
            placeholder="Type your message"
            className="form-control"
          />
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-info"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
