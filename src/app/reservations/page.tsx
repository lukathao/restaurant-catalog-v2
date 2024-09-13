"use server";
import React from 'react'
import Link from 'next/link';
import { getRestaurants } from '../service/Reservation.services';


const Restaurants = async () => {
  const restaurants = await getRestaurants();

  return (
    <>
      <div>
        <h1>Restaurants</h1>
      </div>
      <div>
        {
          restaurants?.map((restaurant) =>(
            <>
              <Link href={{
                pathname: `/reservations/rest`,
                query: {
                  restaurantId: restaurant.id,
                  restaurantName: restaurant.business_name
                }
              
              }}
              >
                <div className="text-black border-black border-2">
                  <div>
                    {restaurant.business_name}
                  </div>
                  <div>
                    {restaurant.business_owner}
                  </div>
                </div>
              </Link>
            </>
          ))
        }
      </div>
    </>
  )
}

export default Restaurants
