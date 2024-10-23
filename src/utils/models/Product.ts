import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  description: {
    type: String,
  },
  images: [{ type: String }],
  price: {
    type: Number,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
  },
  reviews: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    }
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
},
  { timestamps: true }
);

productSchema.methods.hasUserPurchased = async function (userId: String) {
  const Order = mongoose.model("Order");

  const hasOrdered = await Order.findOne({
    user: userId,
    cartProduct: this._id,
  }); return !!hasOrdered;
}

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);