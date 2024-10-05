"use server";

import { format } from "date-fns"
import { ReservationData } from "@/interfaces/Reservations.interfaces";

export async function getReservations() {
  // TODO get real dates from golang API
  let dates: string[] = [];
  dates.push(
    "10/22", "10/14"
  )
  return dates;
}

export async function saveReservation(reservationData: ReservationData) {
  return "ok";
}

export async function updateReservation(reservationData: ReservationData) {
  return "ok";
}

export async function cancelReservation(reservationId: string) {
  return "ok";
}

