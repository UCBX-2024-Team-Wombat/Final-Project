const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    recipient: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    messageText: { 
        type: String, 
        required: true 
    }, 
    createdDateTime: { 
        type: Date, 
        default: Date.now 
    },
    conversation: { 
        type: Schema.Types.ObjectId, 
        ref: 'Conversation',
    }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;