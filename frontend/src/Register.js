import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./App";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [usertype, setUsertype] = useState("");
  const [area, setArea] = useState(""); // Added area state
  const [maidservice, setMaidservice] = useState(""); // Added maid service state

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (!usertype) {
      alert("Please select a usertype.");
      return;
    }

    const data = usertype === "Maid" ? { email, password, mobile, name, area, maidservice } : { email, password, mobile, name };

    const registerUrl = usertype === "User" ? "/registerUser" : "/registerMaid";

    axios
      .post(baseUrl + registerUrl, data)
      .then(() => {
        alert("Registration successful! You can now login.");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Failed to register. Please try again.");
      });
  }

  return (
    <div className="bg-image">
      <div className="w-50 card mx-auto p-4">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <select className="form-select mb-3" value={usertype} onChange={(e) => setUsertype(e.target.value)} required>
            <option value="">-----Select Usertype------</option>
            <option value="User">User</option>
            <option value="Maid">Maid</option>
          </select>

          <input type="text" className="form-control mb-3" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" className="form-control mb-3" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="form-control mb-3" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="tel" className="form-control mb-3" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          
          {/* Show additional fields if Maid is selected */}
          {usertype === "Maid" && (
  <>
    {/* Area input */}
    <input 
      type="text" 
      className="form-control mb-3" 
      placeholder="Enter your area" 
      value={area} 
      onChange={(e) => setArea(e.target.value)} 
      required 
    />

    {/* Maid Service dropdown */}
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
  </>
)}

          
          <button type="submit" className="btn btn-primary mt-4">Register</button>
        </form>
      </div>
    </div>
  );
}
