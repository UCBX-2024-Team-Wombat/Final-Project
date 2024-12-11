const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const { authMiddleware } = require("./utils/auth.js");
const { typeDefs, resolvers } = require("./schemas/index.js");
const db = require("./config/connection.js");
const { Server } = require('socket.io'); // for chat app.
const http = require('http');//for chat app

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
