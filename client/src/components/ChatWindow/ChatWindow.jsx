import { useState, useEffect } from "react";
import { ADD_MESSAGE } from "../../utils/mutations.js";
import { useMutation } from "@apollo/client";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import ChatWindowStyleRouter from "./ChatWindowStyleRouter.js";
import "./chatWindow.css";

const ChatWindow = ({ recipientUserId, messagesArray, refetchFunction }) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new ChatWindowStyleRouter(state);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  function scrollToBottom() {
    const chatScroller = document.getElementById("chat-scroller");
    if (chatScroller) {
      chatScroller.scrollTop = chatScroller.scrollHeight + 1000;
    }
  }

  const [createMessage] = useMutation(ADD_MESSAGE);

  const handleSendMessage = async () => {
    setNewMessage("");
    await createMessage({
      variables: {
        receiverId: recipientUserId,
        message: newMessage,
      },
    });
    if (refetchFunction) {
      refetchFunction();
    }
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
          {messagesArray?.map((msg, index) => (
            <div key={index}>
              <div
                className={
                  msg.sender._id != recipientUserId
                    ? "border mb-2 p-1 px-3 bg-info bg-gradient rounded float-end my-message"
                    : "border mb-2 p-1 px-3 bg-warning bg-gradient rounded float-start their-message"
                }
              >
                <strong>{msg.sender.username}:</strong> {msg.message}{" "}
                <em>
                  (
                  {new Date(parseInt(msg.timestamp)).toLocaleTimeString(
                    "en-US"
                  )}
                  )
                </em>
              </div>
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
