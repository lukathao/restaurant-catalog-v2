import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { MenuItem } from "@/utils/models/MenuItem";

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const featuredMenuItem = await MenuItem.find({ featured: true });
    return NextResponse.json(featuredMenuItem);
  } catch (error) {
    return NextResponse.json({ error: "error fetching featured product" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const [menuItemId] = params;

  try {
    //find all products with featured true and set to false
    const updatedFeaturedMenuItems = await MenuItem.updateMany({ featured: true }, { featured: false });
    const updateMenuItems = await MenuItem.findByIdAndUpdate(menuItemId, { featured: true }, { new: true });
    if (!updateMenuItems) {
      return NextResponse.json({ error: "error updating featured product" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "error updating featured menu item" }, { status: 500 });
  }
}
