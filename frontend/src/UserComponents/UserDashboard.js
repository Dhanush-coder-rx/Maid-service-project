import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {  FaCity,  FaLock, FaSignOutAlt } from 'react-icons/fa';
import { GiNuclearWaste } from "react-icons/gi";

export default function UserDashboard() {
  return (
    <div className="admin-dashboard-container">
      <div className="sidebar">
        <h3 className="orange-text">User Dashboard</h3>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="MaidService" className="nav-link">
                <GiNuclearWaste  className="nav-icon" /> Maid Service
              </Link>
            </li>
            <li>
              <Link to="ViewBookings" className="nav-link">
                <FaCity className="nav-icon" /> View Bookings
              </Link>
            </li>
            <li>
              <Link to="UpdatedPasswordForUser" className="nav-link">
                <FaLock className="nav-icon" /> Update Password
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link logout">
                <FaSignOutAlt className="nav-icon" /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
