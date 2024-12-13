const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth.js");
const { typeDefs, resolvers } = require("./schemas/index.js");
const db = require("./config/connection.js");
const { Server } = require("socket.io"); // for chat app.
const http = require("http"); //for chat app
const { createServer } = require("http");

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const httpServer = createServer(app);
//const CHAT_PORT = process.env.PORT || 5000;
// Create an HTTP server and attach Socket.IO
const ioServer = new Server(httpServer);

httpServer.listen(4000);
// ioServer.listen(4000);

// Socket.IO logic
// Socket.IO library enables real-time,
// bidirectional communication between web clients and servers.
ioServer.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // think user as a provote room
  socket.on("joinUser", (room) => {
    socket.join(userId);
    console.log(`User ${socket.id} joined privite room: ${userId}`);
  });

  socket.on("sendMessage", ({ receiverId, message }) => {
    const chatMessage = {
      senderId: socket.userId,
      receiverId,
      message,
      timestamp: new Date(),
    };
    io.to(receiverId).emit("newMessage", chatMessage); // Emit to the receiver
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  // Wait for start up of Apollo Server
  await apolloServer.start();

  // Add URL encoding and JSON middleware to express app
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Add GraphQL and Apollo Server as middleware to express app
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: authMiddleware,
    })
  );

  // If running in production environment, serve the client distribution folder
  // as the static resource, and the index.html folder as the default file
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Log message on successful db opening
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server

startApolloServer();

// bi dene bakalim confliction a sebep oluyo mu olmadi cozum bakariz
// httpServer.listen(REST_PORT;, () => {
//   console.log(`Rest Port is running on http://localhost:${REST_PORT}`);
// });
module.exports = { ioServer };
