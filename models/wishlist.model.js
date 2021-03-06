const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    active: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
