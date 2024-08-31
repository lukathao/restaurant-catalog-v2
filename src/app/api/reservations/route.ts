import { ReservationData } from "@/interfaces/Reservations.interfaces";
import { saveReservation } from "@/service/Reservation.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    "hello" : "world",
  })
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    // TODO parse out reservation data here
    const res = await saveReservation({
      restaurant_id: "",
      reservation_name: "",
      hours: 0,
      confirmed : false,
      date: new Date,
      email: "",
      number: "",
      guests: 0
    });
    // Give more details in msg
    const msg = "Saved Reservation"
    return NextResponse.json({
      message: msg,
      headers: {
        "Content-Type" : "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error attempting to save reservation.",
      headers: {
        "Content-Type" : "application/json",
      },
      status: 500,
    });
  } 
}
