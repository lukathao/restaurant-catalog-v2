"use client";

import React from 'react';
import { useFormState } from 'react-dom';
import { createBusiness } from '@/app/service/Restaurant.service';
import { SaveButton } from '@/app/components/buttons/buttons';


const AddRestaurant = () => {
  const initialState = {
    message: "Enter restaurant information.",
  };
  const [state, formAction] = useFormState(createBusiness, initialState);

  return (
    <>
      <div className="flex flex-row flex-col min-h-screen justify-center items-center">
        <h1 className='text-3xl font-semibold'>Foodie Cat</h1>
        <p>Add a new restaurant to the catalog</p>
        <form
          className='min-w-96 mx-auto space-y-6 p-4 my-4 justify-center items-center'
          action={formAction}>

          <div>
            <label className='font-semibold'>Business name</label>
            <input
              type="text"
              className="text-black border-gray-400 border-2 block px-4 w-full rounded"
              id="business_name"
              name="business_name"
            />
          </div>

          <div>
            <label className='font-semibold'>Owner name</label>
            <input
              type="text"
              className="text-black border-gray-400 border-2 block px-4 w-full rounded"
              id="business_owner"
              name="business_owner"
            />
          </div>

          <div>
            <label className='font-semibold'>Contact email:</label>
            <input
              type="text"
              className="text-black border-gray-400 border-2 block px-4 w-full rounded"
              id="email"
              name="email"
            />
          </div>
          <div>
            <SaveButton />
          </div>
          <p aria-live='polite' className='sr-only' role='status'>
            {state?.message}
          </p>
        </form>
      </div>
    </>
  )
}

export default AddRestaurant