import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
  },
  restaurantId: {
    type: Number,
    required: [true, "Please provide restaurantId"],
  },
  paid: {
    type: Boolean,
    default: false,
  },
  cartProducts: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId, ref: "MenuItem"
      },
      price: Number,
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    enum: [
      "ordered",
      "field_not_used",
      "pending",
      "cooked",
      "delivered",
      "cancelled",
      "payment_failed"
    ],
    default: "field_not_used",
  }, total: {
    type: Number,
    required: [true, "Must have a total"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;