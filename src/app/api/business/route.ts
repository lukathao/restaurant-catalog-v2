import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import Business from "@/utils/models/Business";

export async function GET() {
  await dbConnect();
  try {
    const businesses = await Business.find({}).select('name logo');
    if (!businesses) {
      return NextResponse.json(
        { error: "Businesses not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(businesses);
  } catch (error) {
    return NextResponse.json({ error: "error fetching businesses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();

  const {
    name,
    owner,
    logo,
    email,
    phone,
  } = body;

  const newBusiness = await Business.create({
    name,
    owner,
    logo,
    email,
    phone,
  });

  console.log("new business created: ", newBusiness);

  const savedBusiness = await newBusiness.save();

  return NextResponse.json({
    message: "Product created successfully",
    success: true,
    savedBusiness,
  });
}