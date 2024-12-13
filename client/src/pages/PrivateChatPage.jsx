import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow/ChatWindow.jsx";
import AuthService from "../utils/auth";
import { QUERY_ALL_USERS, QUERY_ME } from "../utils/queries.js";
import { useQuery } from "@apollo/client";

const PrivateChatPage = () => {
  const [friend, setFriend] = useState({});
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  console.log("All Users Querry: ", data);

  const userId = AuthService.getProfile().data._id;
  console.log("currentUserId: ", userId);

  const { loading: loadingUser, data: currentUser } = useQuery(QUERY_ME);
  const me = currentUser?.me || {};
  console.log("Me: ", me);

  function selectRecipient(user) {
    console.log("Friend to message", user);
    setFriend(user);
  }

  return (
    <div>
      <div>userId: {userId}</div>
      {data ? (
        data?.allUsers.map((user) => {
          return (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => selectRecipient(user)}
              key={JSON.stringify(user)}
            >
              {user.username}
            </button>
          );
        })
      ) : (
        <></>
      )}
      {Object.keys(friend).length > 0 ? (
        <>
          <h1>
            {me.username} chatting with {friend.username}
          </h1>
          <ChatWindow currentUser={me} recipientUser={friend} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PrivateChatPage;
