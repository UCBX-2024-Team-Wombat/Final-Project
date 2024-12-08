const countrySchema = new Schema({
    name: { type: String, required: true, trim: true },
    states: [stateSchema],
  });
  
  module.exports = mongoose.model('Country', countrySchema);
  