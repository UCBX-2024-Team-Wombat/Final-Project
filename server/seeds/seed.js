const db = require("../config/connection");
const models = require("../models");
const { User } = require("../models/index");
const { collection } = require("../models/User");
const seedUsers = require("./seedUsers.json");

const collectionsToReset = [
  {
    modelName: "User",
    collectionName: "users",
  },
];

// Collection resetter function
async function dropCollection({ modelName, collectionName }) {
  try {
    console.log(`Resetting collection ${collectionName}`);

    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}

async function seedCollection({ modelName }, records) {
  try {
    await models[modelName].db.db.insertMany(records);
  } catch (err) {
    throw err;
  }
}

db.once("open", async () => {
  // Drop all existing collections
  for (const collection of collectionsToReset) {
    await dropCollection(collection);
  }

  // Seed User documents
  try {
    await User.insertMany(seedUsers);
  } catch (err) {
    throw err;
  }

  process.exit();
});
