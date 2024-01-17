import React from "react";
import NoBookingImage from "../../NoBooking.png";
import "./NoBooking.css";
export default function NoBooking() {
  return (
    <div className="no-booking-container">
      <h2>No Bookings Found!</h2>
      <img src={NoBookingImage} alt="No Booking" className="no-booking-image" />
    </div>
  );
}
