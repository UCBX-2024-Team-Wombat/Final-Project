const mongoose = require('mongoose');
const { Schema } = mongoose;

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
        // isSeen: {
        //     type: Boolean,
        //     default: false
        // }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;