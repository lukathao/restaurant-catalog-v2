import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";
import Business from "@/utils/models/Business";

export async function GET(req: NextRequest) {

  const param = await req.json();
  const [businessId] = param["id"];

  try {
    await dbConnect();
    const products = await Product.find({ business: businessId }).select('name price');
    const business = await Business.findById(businessId).select('name');
    if (!products) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 },
      )
    }
    return NextResponse.json([products, business]);
  } catch (error) {
    return NextResponse.json({ error: "error fetching products" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const {
    name,
    description,
    image,
    price,
    business,
    productType,
    featured
  } = body;

  const newProduct = await Product.create({
    name,
    description,
    image,
    price,
    business,
    productType,
    featured
  });

  console.log("new product created: ", newProduct);

  const savedProduct = await newProduct.save();

  return NextResponse.json({
    message: "Product created successfully",
    success: true,
    savedProduct,
  });
}