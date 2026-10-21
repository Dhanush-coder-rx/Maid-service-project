import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAssignedWork = () => {
  const [bookings, setBookings] = useState([]);
  const maidEmail = sessionStorage.getItem("email"); // Get email from sessionStorage

  useEffect(() => {
    if (maidEmail) {
      axios
        .get(`http://localhost:8080/getBookingsByMaid/${maidEmail}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            setBookings(response.data);
          } else {
            setBookings([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching assigned work:", error);
        });
    }
  }, [maidEmail]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 " >Welcome {bookings.length > 0 ? bookings[0]?.maid?.name : 'Maid'} - Assigned Work</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Work Owner</th>
            <th>Owner Mobile</th>
            <th>Maid Service</th>
            <th>Area</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user.name}</td>
                <td>{booking.user.mobile}</td>
                <td>{booking.maidservice}</td>
                <td>{booking.area}</td>
                <td>{booking.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No assigned work found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAssignedWork;