export interface ReservationData {
  // TODO change these to line up with catrest golang struct
  business_id: string;
  reservation_name: string;
  hours: number;
  guests: number;
  date: string;
  email: string;
  number: string;
}
