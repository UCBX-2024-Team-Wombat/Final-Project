# Skill Share Hub

## Description

Welcome to the Skill Share Hub. This application allows a user to exchange skills with another. For example, a user who wants to learn how to play the piano can offer one of their skills (riding a bike) in exchange. The goal of this application is to promote mutual learning, community interaction and skill growth without having to pay for it.

## User Story

- As a user who wants to learn new skills,
- I want to be able to offer my own skills in exchange for new skills,
- SO that I can learn new things without monetary transactions.

## Acceptance Criteria

- GIVEN I am an existing user
- WHEN I login and navicate to "My Profile" section,
- THEN I can view and update my profile with details including my password, skills, location, years of expereince and areas of extertise
- WHEN I want to view other's skills,
- THEN I can search and filter skills based off title, location and username
- WHEN I see a skill I want to learn,
- THEN I fill out a form that is sent to the user offering my skills

## Table of Contents:

- [Installation](#installation)
- [Usage](#usage)
- [CodeReferences](#codereferences)
- [LinkToRender](#linktorender)

## Installation

- "@apollo/server": npm i @apollo/server
- "bcrypt": npm i bcrypt
- "express": npm i express
- "graphql": npm i graphql
- "jsonwebtoken": npm i jsonwebtoken
- "mongoose": npm i mongoose
- "stripe": npm i stripe
- "bootstrap": npm i bootstrap
- "react"
- "react-bootstrap"
- "vitest"

## Usage

- To use this application, start by opening the terminal and running `npm run fullbuild`, `npm run seed`, `npm run dev`. These commands will download all dependencies, start the server and open up the application so it's live. You will be taken to the home page where you can eithe rlogin or signup. If you have an account login and you'll be taken to the home page where you can search for skills based on title, keywords, etc. You can also create your own skills, update skills and delete skills. Enjoy!

## CodeReferences

Applying Password Hashing on insertMany hook

- Sources:
  - https://www.linkedin.com/pulse/mongoose-pre-hooks-insertmany-model-functions-palash-chanda/
  - https://stackoverflow.com/questions/64029437/mongoose-schema-pre-insertmany-middleware
- Use: `server/models/User.js`

Convert array of objects into single object

- Source:
  - https://stackoverflow.com/a/44325124/8032508
- Use: `server/seeds/seed.js`

Handling dynamic content, when rendering lists of elements.

- Source:
  - https://www.geeksforgeeks.org/reactjs-keys/
- Use: `client/src/Sharer.js`

Resolve issue with detecting change in & hashing password on update

- Sources:
  - https://stackoverflow.com/a/70000238/8032508
- Use: `User.js`

## LinkToRender

- https://skillhub-uvg0.onrender.com/

## LinkToRender

- https://skillhub-uvg0.onrender.com/

Handling dynamic content, when rendering lists of elements.

- Source:
  - https://www.geeksforgeeks.org/reactjs-keys/
- Use: `client/src/Sharer.js`

Resolve issue with detecting change in & hashing password on update

- Sources:
  - https://stackoverflow.com/a/70000238/8032508
- Use: `User.js`

WebSocket functionality setup

- Source:
  - https://socket.io/get-started/chat
  - https://socket.io/docs/v4/server-options/
  - https://socket.io/docs/v4/rooms/
  - https://socket.io/docs/v4/mongo-adapter/
- Use: `server/server.js

MangoDB logic operations
-Source

- https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- https://socket.io/docs/v4/mongo-adapter/#emitter
- https://socket.io/docs/v4/adapter/#emitter-cheatsheet
- Use: server/schemas/resolver.js

- https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/close
- Use: client/components/chat.jsx
