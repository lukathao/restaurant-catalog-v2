"use server";


import { ReservationData } from "@/interfaces/Reservations.interfaces";



export async function saveReservation(reservationData: ReservationData) {
  // TODO hit go api endpoint and return results in try catch
  console.log(reservationData);
  return "ok";
}

export async function updateReservation(reservationData: ReservationData) {
  return "ok";
}

export async function cancelReservation(reservationId: string) {
  return "ok";
}

