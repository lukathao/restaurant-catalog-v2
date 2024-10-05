
import { getReservations, saveReservation } from "@/app/service/Reservation.services";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns"

export async function GET() {
  const dates = await getReservations();
  return NextResponse.json({
    "dates": dates,
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // TODO parse out reservation data here
    const date = format(data["date"], "MM/dd/yyyy");
    const res = await saveReservation({
      business_id: data["business_id"],
      reservation_name: data["reservation_name"],
      hours: data["hours"],
      date: date,
      email: data["email"],
      number: "", //for future use of sms
      guests: data["guests"]
    });
    // Give more details in msg
    const msg = "Saved Reservation"
    return NextResponse.json({
      message: msg,
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
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
