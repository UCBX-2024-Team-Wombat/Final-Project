const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  },
});

module.exports = mongoose.model('City', citySchema);
