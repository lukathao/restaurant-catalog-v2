import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: "Business",
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
  productType: {
    type: String,
    default: "entree",
  }
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