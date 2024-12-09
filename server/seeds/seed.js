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
    collectionName: "skillRelationships",
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

function mapSkills(user, field, map) {
  const skillRelationshipSeeds = user[field];
  const objectArray = [];

  for (const seed of skillRelationshipSeeds) {
    const skillRelationship = {};

    // Add skill
    const skillId = map[seed.seedId];
    console.log("skillId", skillId);
    skillRelationship.skill = skillId;

    // Add user
    skillRelationship.user = user._id;

    // Add experience and expertise if applicable
    if (seed.yearsOfExperience)
      skillRelationship.yearsOfExperience = seed.yearsOfExperience;
    if (seed.areasOfExpertise)
      skillRelationship.areasOfExpertise = seed.areasOfExpertise;

    objectArray.push(skillRelationship);
  }

  user[field] = objectArray;
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
  const emailToUserIdMap = {};
  try {
    const users = await User.insertMany(seedUsers);

    users.map((user) => {
      emailToUserIdMap[user.email] = user._id;
    });

    console.log("emailToUserIdMap", emailToUserIdMap);
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
        seeking: seed.seeking,
        seekingText: seed.seekingText,
        yearsOfExperience: seed.yearsOfExperience
      };

      // Set user
      const userId = emailToUserIdMap[seed.userEmail];
      insertObj.user = userId;

      // Set skill
      const skillId = skillsMap[seed.skillSeedId]
      insertObj.skill = skillId;
      
      relationshipsToInsert.push(insertObj);
    }

    const relationships = await SkillRelationship.insertMany(relationshipsToInsert);

  } catch (err) {
    throw err;
  }

  process.exit();
});
