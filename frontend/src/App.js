import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AdminDashboard from './AdminComponents/AdminDashboard';
import UserDashboard from './UserComponents/UserDashboard';
import MaidDashboard from './MaidComponents/MaidDashboard';
import UpdatedPasswordForAdmin from './AdminComponents/UpdatedPasswordForAdmin';
import ManageUserRequests from './AdminComponents/ManageUserRequests';
import MaidService from './UserComponents/MaidService';
import UpdatedPasswordForUser from './UserComponents/UpdatedPasswordForUser';
import ViewBookings from './UserComponents/ViewBookings';
import ViewAssignedWork from './MaidComponents/ViewAssignedWork';

export const baseUrl = "http://localhost:8080"; 

function App() {
  return (
   
    <div className="App">
         <BrowserRouter>
         <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> 
                    
                 
                    <Route path="/admindashboard" element={<AdminDashboard />}>
    
                    <Route path="ManageUserRequests" element={<ManageUserRequests />} />
                    {/* <Route path="ManageEquipment" element={<ManageEquipment />} /> */}
                
                  
                    <Route path="UpdatedPasswordForAdmin" element={<UpdatedPasswordForAdmin />} />  
    
                    </Route>




    
                    <Route path="/maiddashboard" element={<MaidDashboard />}>
                  
                    <Route path="ViewAssignedWork" element={<ViewAssignedWork />} />
                    </Route>





                    <Route path="/userdashboard" element={<UserDashboard />}>
    
                    <Route path="MaidService" element={<MaidService />} />

                    <Route path="ViewBookings" element={<ViewBookings />} />
                    {/* <Route path="ViewBooking" element={<ViewBooking />} />

                    <Route path="EquipmentBooking" element={<EquipmentBooking />} /> */}
                    <Route path="UpdatedPasswordForUser" element={<UpdatedPasswordForUser />} />
                   
    
                       
                    </Route>
                    
                </Routes>
                </BrowserRouter>
        </div>
  );
}

export default App;
