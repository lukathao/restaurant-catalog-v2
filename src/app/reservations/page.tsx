"use server";
import React from 'react'
import Link from 'next/link';
import { getBusinesses } from '../service/Restaurant.service';


const Restaurants = async () => {
  const businesses = await getBusinesses();

  return (
    <>
      <div>
        <h1>Restaurants</h1>
      </div>
      <div>
        {
          businesses?.map((business) => (
            <>
              <Link href={{
                pathname: `/reservations/rest`,
                query: {
                  businessId: business.business_id,
                  businessName: business.business_name
                }
              }}
              >
                <div className="text-black border-black border-2">
                  <div>
                    {business.business_name}
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
