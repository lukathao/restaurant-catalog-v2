import { dbConnect } from "@/utils/config/dbConnection";
import User from "@/utils/models/User";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

const DEFAULT_PROFILE_IMAGE = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();
    const user = await User.findOne(email);

    if (user) {
      return NextResponse.json({
        error: "User already exists",
      }, { status: 400 })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage: DEFAULT_PROFILE_IMAGE,
    });
    const saveUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      saveUser
    });
  } catch (err) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}