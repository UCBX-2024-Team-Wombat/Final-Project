const provinceSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true,
    },
    cities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'City',
      },
    ],
  });
  
  module.exports = mongoose.model('Province', provinceSchema);
  