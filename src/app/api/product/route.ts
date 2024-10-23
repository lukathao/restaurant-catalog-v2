import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req: NextRequest) {
  await dbConnect();
  const param = await req.json();
  const [businessId] = param["id"];

  try {
    const products = await Product.find({ business: businessId }).select('name price');
    if (!products) {
      return NextResponse.json(
        { error: "Products not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(products);
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
    images,
    price,
    business,
  } = body;

  const newProduct = await Product.create({
    name,
    description,
    images,
    price,
    business,
  });

  console.log("new product created: ", newProduct);

  const savedProduct = await newProduct.save();

  return NextResponse.json({
    message: "Product created successfully",
    success: true,
    savedProduct,
  });
}