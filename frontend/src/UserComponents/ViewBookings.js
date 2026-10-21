import React, { useEffect, useState } from "react";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:8080/getAssignedBookings/${email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setBookings([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setError("Failed to load bookings. Please try again later.");
        });
    }
  }, [email]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
  Welcome {bookings.length > 0 ? bookings[0]?.user?.name : "User"} - Assigned Bookings
</h2>


      {error && <p className="text-danger">{error}</p>}

      {bookings.length === 0 && !error ? (
        <p>No assigned bookings found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Maid Service</th>
              <th>Maid Name</th>
              <th>Mobile</th>
              <th>Area</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.maidservice}</td>
                <td>{booking.maid?.name || "N/A"}</td>
                <td>{booking.maid?.mobile || "N/A"}</td>
                <td>{booking.maid?.area || "N/A"}</td>
                <td>{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBookings;
