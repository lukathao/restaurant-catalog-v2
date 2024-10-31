import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/models/Product";
import mongoose from "mongoose";

export async function GET(req) {
  const params = await req.json();
  const productId = new mongoose.Types.ObjectId(`${params["_id"]}`);

  try {
    await dbConnect();
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

export async function PUT(req) {
  const params = await req.json();
  const productId = new mongoose.Types.ObjectId(`${params["_id"]}`);

  try {
    await dbConnect();
    const updatedProduct = await Product.findByIdAndUpdate(productId, params, {
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

export async function DELETE(req) {
  const params = await req.json();
  const productId = new mongoose.Types.ObjectId(`${params["_id"]}`);

  try {
    await dbConnect();
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
