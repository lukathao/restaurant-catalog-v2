import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your business name"],
  },
  owner: {
    type: String,
    required: [true, "Please provide your owner name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your contact email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your contact phone"],
  },
  address: {
    type: String,
  },
  addressState: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  logo: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const Business = mongoose.models.Business || mongoose.model("Business", businessSchema);

export default Business;