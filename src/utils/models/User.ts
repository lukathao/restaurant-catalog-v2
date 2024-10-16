import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "please provide your full name"]
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png",
  },
  dishesEaten: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItems"
    }
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ]
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;