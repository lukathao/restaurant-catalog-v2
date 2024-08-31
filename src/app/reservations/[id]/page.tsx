"use client";

import { getRestaurantInformation } from '@/service/Reservation.services';
import { DetailedHTMLProps, OptionHTMLAttributes, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

type ReservationsType = {
  restaurant_id: string;
  reservation_name: string;
  hours: number;
  confirmed: boolean;
  guests: number;
  date: Date;
  email: string,
  number: string,
}

const ReservationsPage = async () => {
  const id = "";
  const restaurantInfo = await getRestaurantInformation(id);

  const { register, handleSubmit, formState: {errors, isSubmitting}, setValue, watch, reset } = useForm<ReservationsType>({
    reValidateMode: "onSubmit",
  });
  const [ loading, setLoading] = useState(false);
  const [ date, setDate ] = useState<Date | null>(new Date());

  const guestOptions = () => {
    let options = [];
    for (let i=2; i<=40; i++) {
      options.push(<option>{i}</option>)
    }
    return options;
  }

  const reservationHours = () => {
    // TODO get this array from backend
    const hours_of_operation = [15, 16, 17, 18, 19, 20, 21];
    let options : any = [];
    const guestOptions = () => {
      hours_of_operation.forEach(hour => {
          // TODO calculate 24 hour interval
          if (hour < 12) {
            options.push(<option>{hour} + " AM"</option>)
          } else {
            options.push(<option>{hour - 12} + " PM"</option>)
          }
      })
    }
    return options;
  }

  const submit= async (reservation : ReservationsType) => {
    //TODO set this to the restaurant ID
    reservation.restaurant_id = "";
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
      <div>
        <h1>Add Restaurant</h1>
        <form 
        className="flex max-w-[350px] flex-col gap-5 rounded bg-white p-5"
        onSubmit={handleSubmit(submit)}>
          <div id="reservation_name" className="flex flex-col">
            <label>Reservation Name</label>
            <input 
              type="text"
              className="w-96 text-black border-black border-2"
              {...register("reservation_name", {
                required: "Invalid reservation name", 
                minLength: {
                  value: 1,
                  message: "Name is too short"
              }})}/>
              {errors.reservation_name && (<p className="text-red-500">{errors.reservation_name.message}</p>)}
          </div>

          <div id="reservation_name" className="flex flex-col">
            <label>Email:</label>
            <input 
              type="text"
              className="w-96 text-black border-black border-2"
              {...register("reservation_name", {
                required: "Invalid reservation name", 
                minLength: {
                  value: 1,
                  message: "Name is too short"
              }})}/>
              {errors.reservation_name && (<p className="text-red-500">{errors.reservation_name.message}</p>)}
          </div>

          <div className="w-10 flex flex-col">
            <label>Number of guests (including you)</label>
            <select {...register("guests", {required: "Please select a valid state", minLength: 1})}>
              {guestOptions()}
            </select>
            {errors.guests && (<p className="text-red-500">{errors.guests.message}</p>)}
          </div>

          <div className="w-10 flex flex-col">
            <label>Reservation Hours</label>
            <select {...register("hours", {required: "Please select hours of reservation", minLength: 1})}>
              {reservationHours()}
            </select>
            {errors.hours && (<p className="text-red-500">{errors.hours.message}</p>)}
          </div>

          <div className="w-10 flex flex-col">
            <label>Reservation Date (if different from today)</label>
            <div>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
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

export default ReservationsPage
