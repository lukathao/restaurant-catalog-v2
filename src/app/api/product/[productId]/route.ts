import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";

export async function GET(req: NextRequest, { params }: any) {
  await dbConnect();

  const [productId] = params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "error fetching product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const [productId] = params;
  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, body, {
      new: true, runValidators: true,
    });
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not updated" },
        { status: 404 },
      )
    }
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: "error updating product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  await dbConnect();
  const [productId] = params;

  try {
    const deletedProduct = await Product.findByIdAndUpdate(productId, { isActive: false }, {
      returnOriginal: false
    });
    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not updated" },
        { status: 404 },
      )
    }
    return NextResponse.json(deletedProduct);
  } catch (error) {
    return NextResponse.json({ error: "error updating product" }, { status: 500 });
  }
}
