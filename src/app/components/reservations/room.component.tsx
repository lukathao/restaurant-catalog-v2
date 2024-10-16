"use client";

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import React from 'react'
// import { getReservations } from '@/app/service/Reservation.services';

const ReserveDiningRoom = async () => {
  type ReservationsType = {
    business_id: string | null;
    guest_name: string;
    date: Date | null;
    email: string,
  }
  const searchParams = useSearchParams();
  const businessName = searchParams.get('businessName');
  const businessId = searchParams.get('businessId');

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ReservationsType>({
    reValidateMode: "onSubmit",
  });
  // const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());

  // TODO get unavailable dates
  // let unavailabeDates = await getReservations();
  // if (!unavailabeDates) {
  //   unavailabeDates = [];
  // }

  // const dateRes = await fetch('/api/reservations');
  // console.log("dateRes" + dateRes);
  // const resJson = await dateRes.json();
  // console.log("resJson" + resJson)
  // const unavailabeDates = resJson["dates"];


  const submit = async (reservation: ReservationsType) => {
    reservation.business_id = businessId;
    reservation.date = date;
    try {
      const response = await fetch('/api/reservations', {
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(reservation),
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
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row flex-col min-h-screen justify-center items-center">
        <h1 className='text-3xl font-semibold'>Foodie Cat</h1>
        <h2 className='text-2xl font-semibold'>{businessName}</h2>
        <p>Dining Room Reservation</p>
        <form
          className='min-w-96 mx-auto space-y-6 p-4 my-4 justify-center items-center'
          onSubmit={handleSubmit(submit)}>

          <div id="guest_name">
            <label className='font-semibold'>Your name</label>
            <input
              type="text"
              className="text-black border-gray-400 border-2 block px-4 w-full rounded"
              {...register("guest_name", {
                required: "Invalid reservation name",
                minLength: {
                  value: 1,
                  message: "Name is too short"
                }
              })} />
            {errors.guest_name && (<p className="text-red-500">{errors.guest_name.message}</p>)}
          </div>

          <div id="email">
            <label className='font-semibold'>Your email:</label>
            <input
              type="text"
              className="text-black border-gray-400 border-2 block px-4 w-full rounded"
              {...register("email", {
                required: "Invalid email",
                minLength: {
                  value: 3,
                  message: "Email is too short"
                }
              })} />
            {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
          </div>
          <div>
            <label className='font-semibold'>Unavailable Dates</label>
            {/* <p>
              {unavailabeDates}
            </p> */}
          </div>
          <div>
            <label className='font-semibold'>Reservation Date</label>
            <div>
              <DatePicker
                showIcon
                selected={date}
                onChange={date => setDate(date)} />
            </div>
          </div>
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

export default ReserveDiningRoom
