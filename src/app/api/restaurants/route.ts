import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns"
import { saveBusiness } from "@/app/service/Restaurant.service";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // TODO parse out reservation data here
    const date = format(data["date"], "MM/dd/yyyy");
    const restaurant_id = await saveBusiness({
      business_id: null,
      business_name: data["business_name"],
      business_owner: data["business_owner"],
      email: data["email"],
    });
    const msg = "Created business"
    return NextResponse.json({
      message: msg,
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
      restaurant_id: restaurant_id
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error attempting to save reservation.",
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
