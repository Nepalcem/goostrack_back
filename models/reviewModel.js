const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
      required: [true, 'Rate the project'],
    },
    comment: {
      type: String,
      maxLength: 300,
      default: '',
      required: [true, 'DB: Add your comment'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
      required: [true, "Set owner contact"],
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

reviewSchema.post('save', handleMongooseError);

const Review = model('review', reviewSchema);

module.exports = Review;