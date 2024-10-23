import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const featuredProduct = await Product.find({ featured: true });
    return NextResponse.json(featuredProduct);
  } catch (error) {
    return NextResponse.json({ error: "error fetching featured product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const [productId] = params;

  try {
    //find all products with featured true and set to false
    const updatedFeaturedProducts = await Product.updateMany({ featured: true }, { featured: false });
    const updateProducts = await Product.findByIdAndUpdate(productId, { featured: true }, { new: true });
    if (!updateProducts) {
      return NextResponse.json({ error: "error updating featured product" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "error updating featured product" }, { status: 500 });
  }
}
