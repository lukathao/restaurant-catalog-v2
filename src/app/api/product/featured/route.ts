import { dbConnect } from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";


export async function GET() {
  await dbConnect();

  try {
    const featuredProduct = await Product.findOne({ featured: true }).lean();
    if (!featuredProduct) {
      return NextResponse.json({ error: "error no featured product found" }, { status: 500 });
    }
    return NextResponse.json(featuredProduct);
  } catch (error) {
    return NextResponse.json({ error: "error fetching featured product", errorMsg: error }, { status: 500 });
  }
}
