const db = require("../config/connection");
const models = require("../models");
const { User, Skill } = require("../models/index");
const { collection } = require("../models/User");
const seedSkills = require("./seedSkills.json");
const seedUsers = require("./seedUsers.json");

const collectionsToReset = [
  {
    modelName: "User",
    collectionName: "users",
  },
  {
    modelName: "Skill",
    collectionName: "skills",
  },
  // {
  //   modelName: "SkillRelationship",
  //   collectionName: "skillRelationships",
  // },
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

function mapSkills(user, field, map) {
  user[field].map((skillNumber) => {
    return map[skillNumber];
  });
}

db.once("open", async () => {
  // Drop all existing collections
  for (const collection of collectionsToReset) {
    await dropCollection(collection);
  }

  // Insert Seed Skills
  let skillsMap = {};
  try {
    const skills = [];
    seedSkills.map((skill) =>
      skills.push({ name: skill.name, description: skill.description })
    );
    const insertedSkills = await Skill.insertMany(skills);

    const skillNameToIdMap = insertedSkills.reduce(
      (obj, skill) => Object.assign(obj, { [skill.name]: skill._id }),
      {}
    );

    seedSkills.map((skill) => {
      skillsMap[skill.seedId] = skillNameToIdMap[skill.name];
    });

    console.log("skillsMap", skillsMap);
  } catch (err) {
    throw err;
  }

  // Seed User documents
  try {
    for (const user of seedUsers) {
      mapSkills(user, "availableSkills", skillsMap);
      mapSkills(user, "desiredSkills", skillsMap);
    }

    await User.insertMany(seedUsers);
  } catch (err) {
    throw err;
  }

  process.exit();
});
