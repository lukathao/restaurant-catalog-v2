import { dbConnect } from "@/utils/config/dbConnection";
import { NextResponse } from "next/server";
import { MenuItem } from "@/utils/models/MenuItem";


export async function GET() {
  await dbConnect();

  try {
    const featuredMenuItem = await MenuItem.findOne({ featured: true }).lean();
    if (!featuredMenuItem) {
      return NextResponse.json({ error: "error no featured product found" }, { status: 500 });
    }
    return NextResponse.json(featuredMenuItem);
  } catch (error) {
    return NextResponse.json({ error: "error fetching featured product", errorMsg: error }, { status: 500 });
  }
}
