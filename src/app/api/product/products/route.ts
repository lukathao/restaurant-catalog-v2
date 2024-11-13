"user server";
import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";
import mongoose from "mongoose";
require("@/utils/models/Business");


export async function POST(req: NextRequest) {
  const params = await req.json();
  const businessId = new mongoose.Types.ObjectId(`${params["businessId"]}`);
  console.log("getting resources");
  try {
    await dbConnect();
    const products = await Product.find({ business: businessId }).select('name price business description image productType featured').populate('business', 'name');
    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error fetching products" }, { status: 500 });
  }
}