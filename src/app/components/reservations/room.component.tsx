"use client";

import Link from 'next/link';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const ReserveDiningRoom = () => {
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
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());

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
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex max-w-[350px] flex-col gap-5 rounded bg-white p-5">
        <h1>Make a reservation for the dining room of {businessName}</h1>
        <form onSubmit={handleSubmit(submit)}>

          <div id="guest_name" className="flex flex-col">
            <label>Your name</label>
            <input
              type="text"
              className="text-black border-black border-2"
              {...register("guest_name", {
                required: "Invalid reservation name",
                minLength: {
                  value: 1,
                  message: "Name is too short"
                }
              })} />
            {errors.guest_name && (<p className="text-red-500">{errors.guest_name.message}</p>)}
          </div>

          <div id="email" className="flex flex-col">
            <label>Your email:</label>
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

          <div className='flex flex-col'>
            <label>Reservation Date</label>
            <div>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
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
        <div>
          <div>Need to cancel a reservation?</div>
          <div><Link href="/reservations/cancel">Click Here</Link></div>
        </div>
      </div>
    </>
  )
}

export default ReserveDiningRoom
