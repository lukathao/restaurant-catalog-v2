"use server";

import { RestaurantsData } from "@/interfaces/Restaurant.interfaces";
import { revalidatePath } from "next/cache";
import { z } from 'zod';

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

const schema = z.object({
  business_name: z.string().min(1),
  business_owner: z.string().min(1),
  email: z.string().min(3),
});

export async function createBusiness(prevState: any, formData: FormData) {
  try {
    const data = schema.parse({
      business_name: formData.get("business_name"),
      business_owner: formData.get("business_owner"),
      email: formData.get("email"),
    });
    const business: RestaurantsData = {
      business_id: null,
      business_name: data.business_name,
      business_owner: data.business_owner,
      email: data.email,
    }
    const result = await saveBusiness(business);
    if (result > 0) {
      return { message: "Created new business." }
    } else {
      return { message: "Unable to create new business." }
    }
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath("/");
  }
};

export async function saveBusiness(restaurantData: RestaurantsData) {
  // TODO save to golang api with grpc call
  console.log(restaurantData);
  return 1;
}
