import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { QUERY_MESSAGES_BETWEEN_USERS } from "../../utils/queries.js";
import { ADD_MESSAGE } from "../../utils/mutations.js";
import { useMutation, useQuery } from "@apollo/client";
import { useGlobalContext } from "../../utils/GlobalState.jsx";
import ChatWindowStyleRouter from "./ChatWindowStyleRouter.js";
import "./chatWindow.css";

const socket = io();

const ChatWindow = ({ currentUser, recipientUser }) => {
  const [state, dispatch] = useGlobalContext();
  const styleRouter = new ChatWindowStyleRouter(state);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { loading, data } = useQuery(QUERY_MESSAGES_BETWEEN_USERS, {
    variables: {
      userIds: [currentUser._id, recipientUser._id],
    },
    pollInterval: 500,
  });

  useEffect(() => {
    const messages = data?.getMessagesBetweenUsers || [];

    // const chatScroller = React.useRef()
    setMessages(messages);
    const chatScroller = document.getElementById("chat-scroller");
    if (chatScroller) {
      chatScroller.scrollTop = chatScroller.scrollHeight + 1000;
    }
  }, [data]);

  const [createMessage] = useMutation(ADD_MESSAGE);

  useEffect(() => {
    // Join the user's private room
    socket.emit("joinUser", currentUser.id);

    socket.on("newMessage", (message) => {
      console.log("Message: ", message);
      if (
        (message.sender.id === currentUser.id &&
          message.receiver.id === recipientUser.id) ||
        (message.sender.id === recipientUser.id &&
          message.receiver.id === currentUser.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [currentUser.id, recipientUser.id]);

  const handleSendMessage = () => {
    const messageData = {
      receiverId: recipientUser._id,
      message: newMessage,
    };

    socket.emit("sendMessage", messageData);

    const payload = {
      sender: currentUser,
      receiver: recipientUser,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    setNewMessage("");
    createMessage({
      variables: {
        receiverId: recipientUser._id,
        message: newMessage,
      },
    });
  };

  return (
    <div>
      <div>
        <div className={styleRouter.messageWindow} id="chat-scroller">
          {messages.map((msg, index) => (
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
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message"
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
