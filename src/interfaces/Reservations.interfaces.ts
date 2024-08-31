export interface ReservationData {
  restaurant_id: string;
  reservation_name: string;
  hours: number;
  confirmed: boolean;
  guests: number;
  date: Date;
  email: string,
  number: string,
}