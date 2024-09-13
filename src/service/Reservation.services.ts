"Use server";

import { ReservationData } from "@/interfaces/Reservations.interfaces";

export function saveReservation(reservationData: ReservationData) {
  // TODO hit go api endpoint and return results in try catch
  return "ok";
}

export function getRestaurantInformation(id: string) {
  // TODO get this from api backend
  const hours = [15, 16, 17, 18, 19, 20, 21];
  return {
    "restaurant name": "Chubby's Asian Fusion Cuisine", 
    "hours": hours}
}
