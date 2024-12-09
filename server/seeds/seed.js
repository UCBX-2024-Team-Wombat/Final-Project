const db = require("../config/connection");
const models = require("../models");
const { User, Skill, SkillRelationship } = require("../models/index");
const { collection } = require("../models/User");
const seedSkills = require("./seedSkills.json");
const seedUsers = require("./seedUsers.json");
const seedSkillRelationships = require("./seedSkillRelationships.json");

const collectionsToReset = [
  {
    modelName: "User",
    collectionName: "users",
  },
  {
    modelName: "Skill",
    collectionName: "skills",
  },
  {
    modelName: "SkillRelationship",
    collectionName: "skillrelationships",
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

    // Create map of skill names to skill Ids
    const skillNameToIdMap = insertedSkills.reduce(
      (obj, skill) => Object.assign(obj, { [skill.name]: skill._id }),
      {}
    );

    // Create map of skill seed Ids (from seedSkills.json) to skill Ids (via skillNameToIdMap)
    seedSkills.map((skill) => {
      skillsMap[skill.seedId] = skillNameToIdMap[skill.name];
    });

  } catch (err) {
    throw err;
  }

  // Seed User documents
  const emailToUserIdMap = {};
  try {
    const users = await User.insertMany(seedUsers);

    // Create email to Id map
    users.map((user) => {
      emailToUserIdMap[user.email] = user._id;
    });
  } catch (err) {
    throw err;
  }

  // Seed skill relationships
  try {
    const relationshipsToInsert = [];

    for(const seed of seedSkillRelationships){

      const insertObj = {
        offered: seed.offered,
        offeredText: seed.offeredText,
        desired: seed.desired,
        desiredText: seed.desiredText,
        yearsOfExperience: seed.yearsOfExperience
      };

      // Get and set user Id from email
      const userId = emailToUserIdMap[seed.userEmail];
      insertObj.user = userId;

      // Get and set skill Id from seedId
      const skillId = skillsMap[seed.skillSeedId]
      insertObj.skill = skillId;
      
      relationshipsToInsert.push(insertObj);
    }

    await SkillRelationship.insertMany(relationshipsToInsert);

  } catch (err) {
    throw err;
  }

  process.exit();
});
