import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MaidService() {
  const [email, setEmail] = useState(""); 
  const [maidservice, setMaidservice] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Retrieve email from sessionStorage when component mounts
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
      fetchBookings(storedEmail);
    }
  }, []);

  async function fetchBookings(userEmail) {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/getByUser/${userEmail}`);
      console.log("API Response:", response.data); // Debugging line
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([]); // Ensure it's always an array
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
      setBookings([]); // Prevent map error
    } finally {
      setLoading(false);
    }
  }
  

  async function handleBooking(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required.");
      return;
    }

    const bookingData = { email, maidservice, area, date };

    try {
      if (selectedBookingId) {
        if (!window.confirm("Are you sure you want to update this booking?")) return;
        
        await axios.put(`${baseUrl}/update/${selectedBookingId}`, bookingData);
        toast.success("Booking updated successfully!");
      } else {
        await axios.post(`${baseUrl}/bookService`, bookingData);
        toast.success("Service booked successfully!");
      }

      resetForm();
      fetchBookings(email);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Operation failed. Please try again.");
    }
  }

  function handleEdit(booking) {
    setSelectedBookingId(booking.id);
    setMaidservice(booking.maidservice);
    setArea(booking.area);
    setDate(booking.date);
  }

  function resetForm() {
    setMaidservice("");
    setArea("");
    setDate("");
    setSelectedBookingId(null);
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center">{selectedBookingId ? "Update Booking" : "Book a Maid Service"}</h2>
        <form onSubmit={handleBooking}>
          <input type="email" className="form-control mb-3" value={email} readOnly />

          <select
            className="form-select mb-3"
            value={maidservice}
            onChange={(e) => setMaidservice(e.target.value)}
            required
          >
            <option value="">Select a maid service</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Cooking">Cooking</option>
            <option value="Babysitting">Babysitting</option>
            <option value="Elderly Care">Elderly Care</option>
            <option value="Laundry">Laundry</option>
            <option value="Housekeeping">Housekeeping</option>
          </select>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter your area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />

          <input
            type="date"
            className="form-control mb-3"
            value={date}
            min={new Date().toISOString().split("T")[0]} 
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100" disabled={!maidservice || !area || !date}>
            {selectedBookingId ? "Update Booking" : "Book Service"}
          </button>

          {selectedBookingId && (
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h3 className="mt-5 text-center">Your Bookings</h3>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div key={booking.id} className="col-md-4">
              <div className="card p-3 shadow-sm mt-3">
                <h5>{booking.maidservice}</h5>
                <p><strong>Area:</strong> {booking.area}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Maid:</strong> {booking.maid ? booking.maid.name : "Not Assigned"}</p>

                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(booking)}
                  disabled={!!booking.maid} 
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
