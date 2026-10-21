import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../App"; // Ensure baseUrl is correctly imported

export default function ManageUserRequests() {
  const [unassignedBookings, setUnassignedBookings] = useState([]); // Ensure it's an array
  const [maids, setMaids] = useState({});
  const [selectedMaids, setSelectedMaids] = useState({});

  // Fetch unassigned bookings
  useEffect(() => {
    fetchUnassignedBookings();
    fetchMaids();
  }, []);

  const fetchUnassignedBookings = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getUnassigned`);
      console.log("API Response:", response.data); // Debugging

      if (Array.isArray(response.data)) {
        setUnassignedBookings(response.data);
      } else {
        setUnassignedBookings([]); // Ensure it's an array
      }
    } catch (error) {
      console.error("Error fetching unassigned bookings:", error);
      setUnassignedBookings([]); // Prevent crash
      toast.error("Failed to fetch unassigned bookings.");
    }
  };

  // Fetch available maids
  const fetchMaids = async () => {
    try {
      const response = await axios.get(`${baseUrl}/getAllMaid`);
      const maidsData = response.data.reduce((acc, maid) => {
        acc[maid.id] = maid;
        return acc;
      }, {});
      setMaids(maidsData);
    } catch (error) {
      console.error("Error fetching maids:", error);
      toast.error("Failed to fetch maids.");
    }
  };

  // Assign maid to a booking
  const handleAssignMaid = async (bookingId) => {
    const maidId = selectedMaids[bookingId];

    if (!maidId) {
      toast.error("Please select a maid.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.put(`${baseUrl}/assignMaid/${bookingId}/${maidId}`);

      toast.success(response.data, { // Display backend response message
        position: "top-center",
        autoClose: 3000,
      });

      fetchUnassignedBookings(); // Refresh list after successful assignment
    } catch (error) {
      console.error("Error assigning maid:", error);

      if (error.response && error.response.data) {
        toast.error(error.response.data, { // Display backend error message
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to assign maid. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Manage User Requests</h2>
      <div className="row">
        {Array.isArray(unassignedBookings) && unassignedBookings.length > 0 ? (
          unassignedBookings.map((booking) => (
            <div key={booking.id} className="col-md-4">
              <div className="card p-3 shadow-sm mt-3">
                <h5>{booking.maidservice}</h5>
                <p><strong>User:</strong> {booking.user?.name || "N/A"} </p>
                <p><strong>Area:</strong> {booking.area}</p>
                <p><strong>Date:</strong> {booking.date}</p>

                {/* Maid selection dropdown */}
                <select
                  className="form-select mb-2"
                  value={selectedMaids[booking.id] || ""}
                  onChange={(e) => setSelectedMaids({ ...selectedMaids, [booking.id]: e.target.value })}
                >
                  <option value="">Select Maid</option>
                  {Object.values(maids).map((maid) => (
                    <option key={maid.id} value={maid.id}>
                      {maid.name} - {maid.area} - {maid.maidservice}
                    </option>
                  ))}
                </select>

                {/* Assign button */}
                <button className="btn btn-success w-100" onClick={() => handleAssignMaid(booking.id)}>
                  Assign Maid
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">No unassigned bookings available.</p>
        )}
      </div>
    </div>
  );
}
