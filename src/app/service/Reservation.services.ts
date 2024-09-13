"use server";

import sqlstring from "sqlstring";
import { Pool } from "@neondatabase/serverless";

import { ReservationData } from "@/interfaces/Reservations.interfaces";

export async function getNeonDbPool() {
  return new Pool({connectionString: process.env.DATABASE_URL});
}

export async function saveReservation(reservationData: ReservationData) {
  // TODO hit go api endpoint and return results in try catch
  console.log(reservationData);
  return "ok";
}

export async function getRestaurantInformation(id: string) {
  // TODO get this from api backend
  const hours = [15, 16, 17, 18, 19, 20, 21];
  return {
    "restaurant name": "Chubby's Asian Fusion Cuisine", 
    "hours": hours}
}

export async function getRestaurants() {
  const pool = await getNeonDbPool();
  const sql = sqlstring.format(
    `select * from restaurants`
  , []);
  try {
    pool.connect();
    const { rows, rowCount } = await pool.query(sql);
    if (rowCount == null || rowCount == 0) {
      return null;
    }
    return rows;    
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    pool.end();
  }
}
