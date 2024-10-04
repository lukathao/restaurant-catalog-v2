"use server";

import { RestaurantsData } from "@/interfaces/Restaurant.interfaces";

export async function getBusinesses() {
  let businesses: RestaurantsData[] = [];
  businesses.push(
    {
      business_id: 1,
      business_name: "Chubby's Asian Fusion Cuisine",
      business_owner: "Chubby",
      email: "testemail@gmail.com"
    }
  )
  return businesses;
}

export async function getRestaurantInformation(id: string) {
  // TODO get this from api backend
  const hours = [15, 16, 17, 18, 19, 20, 21];
  return {
    "restaurant name": "Chubby's Asian Fusion Cuisine",
    "hours": hours
  }
}

export async function saveBusiness(restaurantData: RestaurantsData) {
  // TODO save to golang api with grpc call
  return 1;
}
