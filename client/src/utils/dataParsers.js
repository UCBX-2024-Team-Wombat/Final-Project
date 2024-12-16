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

function extractConversationsArrayFromMessage(currentUserId, messages) {
  const partnerIdToConversationMap = {};

  for (const message of messages) {
    let conversationPartner;

    if (message.sender._id != currentUserId) {
      conversationPartner = message.sender;
    } else if (message.receiver._id != currentUserId) {
      conversationPartner = message.receiver;
    }

    if (
      !Object.keys(partnerIdToConversationMap).includes(conversationPartner._id)
    ) {
      partnerIdToConversationMap[conversationPartner._id] = {
        messages: [message],
        conversationPartner: conversationPartner,
      };
    } else {
      partnerIdToConversationMap[conversationPartner._id].messages.push(
        message
      );
    }
  }

  const arrayOfConversations = Object.keys(partnerIdToConversationMap).map(
    (partnerId) => {
      return partnerIdToConversationMap[partnerId];
    }
  );

  return arrayOfConversations;
}

export {
  getUniqueUsersFromRelationships,
  parseSkillRelationshipsByRelationshipType,
  extractConversationsArrayFromMessage,
};
