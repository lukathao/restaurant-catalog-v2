"use client";

import Link from 'next/link';
import { JSX, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

type ReservationsType = {
  restaurant_id: string | null;
  reservation_name: string;
  hours: number;
  guests: number;
  date: Date | null;
  email: string,
  number: string,
}

const ReservationsPage = () => {
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get('restaurantName');
  const restaurantId = searchParams.get('restaurantId');

  const { register, handleSubmit, formState: {errors, isSubmitting}, reset } = useForm<ReservationsType>({
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
    let options: JSX.Element[] = [];
    hours_of_operation.forEach(hour => {
        // TODO calculate 24 hour interval
        if (hour < 12) {
          options.push(<option>{hour} AM</option>)
        } else {
          options.push(<option>{hour - 12} PM</option>)
        }
    });
    return options;
  }

  const submit= async (reservation : ReservationsType) => {
    //TODO set this to the restaurant ID
    reservation.restaurant_id = restaurantId;
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
        <h1>Make a reservation for {restaurantName}</h1>
        <form
        onSubmit={handleSubmit(submit)}>
          <div id="reservation_name" className="flex flex-col">
            <label>Your name</label>
            <input 
              type="text"
              className="text-black border-black border-2"
              {...register("reservation_name", {
                required: "Invalid reservation name", 
                minLength: {
                  value: 1,
                  message: "Name is too short"
              }})}/>
              {errors.reservation_name && (<p className="text-red-500">{errors.reservation_name.message}</p>)}
          </div>

          <div id="reservation_name" className="flex flex-col">
            <label>Your email:</label>
            <input 
              type="text"
              className="text-black border-black border-2"
              {...register("email", {
                required: "Invalid reservation name", 
                minLength: {
                  value: 1,
                  message: "Name is too short"
              }})}/>
              {errors.reservation_name && (<p className="text-red-500">{errors.reservation_name.message}</p>)}
          </div>

          <div>
            <label>Number of guests</label>
            <select className="flex w-10" {...register("guests", {required: "Please select a valid state", minLength: 1})}>
              {guestOptions()}
            </select>
            {errors.guests && (<p className="text-red-500">{errors.guests.message}</p>)}
          </div>

          <div>
            <label>Reservation Hours</label>
            <select className="flex w-15" {...register("hours", {required: "Please select hours of reservation", minLength: 1})}>
              {reservationHours()}
            </select>
            {errors.hours && (<p className="text-red-500">{errors.hours.message}</p>)}
          </div>

          <div>
            <label>Reservation Date</label>
            <div>
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
          </div>
          <br/>
          <br/>
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

export default ReservationsPage
