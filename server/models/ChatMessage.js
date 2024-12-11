const mangoose = require('mangoose');
const { Schema } = mangoose;

const chatMessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        isSeen: bolean
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;