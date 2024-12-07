const countrySchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    provinces: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Province',
      },
    ],
  });
  
  module.exports = mongoose.model('Country', countrySchema);
  