import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";
import mongoose from "mongoose";
// require("@/utils/models/Product");

export async function POST(req) {

  const param = await req.json();
  const productId = new mongoose.Types.ObjectId(`${param["productId"]}`);

  try {
    await dbConnect();
    const product = await Product.findById(productId).select('_id name image description productType price');
    if (!product) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "error fetching products" }, { status: 500 });
  }
}
