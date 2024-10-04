"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const AddRestaurant = () => {
  type BusinessType = {
    business_name: string;
    business_owner: string;
    email: string,
  }
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BusinessType>({
    reValidateMode: "onSubmit",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (business: BusinessType) => {
    try {
      const response = await fetch('/api/restaurants/add', {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(business),
      });
      if (response) {
        // TODO create confirmation popup with message
        const data = await response.json();
        console.log("Submitted Data");
        console.log(data);
      };
      // TODO reset only if successful reservation
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Welcome to FoodieCat, Foodie Catalogue</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(submit)}>

          <div id="business_name" className="flex flex-col">
            <label>Business name</label>
            <input
              type="text"
              className="text-black border-black border-2"
              {...register("business_name", {
                required: "Invalid business name",
                minLength: {
                  value: 1,
                  message: "Name is too short"
                }
              })} />
            {errors.business_name && (<p className="text-red-500">{errors.business_name.message}</p>)}
          </div>

          <div id="business_owner" className="flex flex-col">
            <label>Owner name</label>
            <input
              type="text"
              className="text-black border-black border-2"
              {...register("business_owner", {
                required: "Invalid business owner name",
                minLength: {
                  value: 1,
                  message: "Name is too short"
                }
              })} />
            {errors.business_owner && (<p className="text-red-500">{errors.business_owner.message}</p>)}
          </div>

          <div id="email" className="flex flex-col">
            <label>Contact email:</label>
            <input
              type="text"
              className="text-black border-black border-2"
              {...register("email", {
                required: "Invalid email",
                minLength: {
                  value: 3,
                  message: "Email is too short"
                }
              })} />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
          </div>

          <br />
          <br />
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddRestaurant