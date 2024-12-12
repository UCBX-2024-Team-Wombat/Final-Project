const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConversationSchema = new Schema({
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;