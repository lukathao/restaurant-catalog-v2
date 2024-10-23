import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Business from "@/utils/models/Business";

export async function GET(req: NextRequest) {
  await dbConnect();
  const data = req.json();
  const [businessId] = "param";

  try {
    const business = await Business.findById(businessId);
    if (!business) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(business);
  } catch (error) {
    return NextResponse.json({ error: "error fetching business" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const {
    name,
    owner,
    email,
    phone,
  } = body;

  const newBusiness = await Business.create({
    name,
    owner,
    email,
    phone,
  });

  console.log("new product created: ", newBusiness);

  const savedBusiness = await newBusiness.save();

  return NextResponse.json({
    message: "Product created successfully",
    success: true,
    savedBusiness,
  });
}

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const [businessId] = params;
  const body = await req.json();

  try {
    const updatedBusiness = await Business.findByIdAndUpdate(businessId, body, {
      new: true, runValidators: true,
    });
    if (!updatedBusiness) {
      return NextResponse.json(
        { error: "Product not updated" },
        { status: 404 },
      )
    }
    return NextResponse.json(updatedBusiness);
  } catch (error) {
    return NextResponse.json({ error: "error updating business" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  await dbConnect();
  const [businessId] = params;

  try {
    const deletedBusiness = await Business.findByIdAndUpdate(businessId, { isActive: false }, {
      returnOriginal: false
    });
    if (!deletedBusiness) {
      return NextResponse.json(
        { error: "Business not deleted" },
        { status: 404 },
      )
    }
    return NextResponse.json(deletedBusiness);
  } catch (error) {
    return NextResponse.json({ error: "error deleting business" }, { status: 500 });
  }
}
