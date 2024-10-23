import { dbConnect } from "@/utils/config/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import { MenuItem } from "@/utils/models/MenuItem";

export async function GET(req: NextRequest, { params }: any) {
  await dbConnect();

  const [menuItemId] = params;

  try {
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 },
      )
    }
    return NextResponse.json(menuItem);
  } catch (error) {
    return NextResponse.json({ error: "error fetching menu item" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: any) {
  await dbConnect();
  const [menuItemId] = params;
  const body = await req.json();

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId, body, {
      new: true, runValidators: true,
    });
    if (!updatedMenuItem) {
      return NextResponse.json(
        { error: "Menu item not updated" },
        { status: 404 },
      )
    }
    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    return NextResponse.json({ error: "error updating menu item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: any) {
  await dbConnect();
  const [menuItemId] = params;

  try {
    const deletedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId, { isActive: false }, {
      returnOriginal: false
    });
    if (!deletedMenuItem) {
      return NextResponse.json(
        { error: "Menu item not updated" },
        { status: 404 },
      )
    }
    return NextResponse.json(deletedMenuItem);
  } catch (error) {
    return NextResponse.json({ error: "error updating menu item" }, { status: 500 });
  }
}
