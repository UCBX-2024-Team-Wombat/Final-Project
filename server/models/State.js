const stateSchema = new Schema({
    name: { type: String, required: true, trim: true },
    cities: [citySchema],
  });
  
  module.exports = stateSchema;
  