function getUniqueUsersFromRelationships(relationshipsArray) {
  if (!relationshipsArray) {
    return undefined;
  }

  const users = {};

  for (const relationship of relationshipsArray) {
    const userId = relationship.user._id;

    if (users[userId] == undefined) {
      users[userId] = {
        user: relationship.user,
        skillRelationships: [relationship],
      };
    } else {
      users[userId].skillRelationships = [
        ...users[userId].skillRelationships,
        relationship,
      ];
    }
  }

  return users;
}

function parseSkillRelationshipsByRelationshipType(relationshipsArray) {
  if (!relationshipsArray) return undefined;

  const parsedSkillRelationships = {
    offeredSkills: [],
    desiredSkills: [],
  };

  for (const skillRelationship of relationshipsArray) {
    if (skillRelationship.offered) {
      parsedSkillRelationships.offeredSkills.push(skillRelationship);
    }
    if (skillRelationship.desired) {
      parsedSkillRelationships.desiredSkills.push(skillRelationship);
    }
  }

  return parsedSkillRelationships;
}

export {
  getUniqueUsersFromRelationships,
  parseSkillRelationshipsByRelationshipType,
};
