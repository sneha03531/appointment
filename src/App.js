import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from './pages/Home';
import ApplyDoctor from './pages/ApplyDoctor';
import { useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Notification from './pages/Notification';
import Image from "./pages/Image"
import UsersList from './pages/Admin/UsersList';
import DoctorsList from './pages/Admin/DoctorsList';
import Profile from './pages/Doctor/Profile';
import BookTime from "./components/BookTime"

//PUSH TEST
function App() {
  const {loading}=useSelector((state)=>state.alerts);
  return (
    <BrowserRouter>
    {loading && (
      <div className="spinner-parent">
      <div className="spinner-border" role="status">
      </div>
      </div>
    )}
   
    <Toaster position="top-center" reverseOrder={false}/>
    <Routes>
    <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>}/>
    <Route path='/register' element={<PublicRoutes><Register/></PublicRoutes>}/>
    <Route path='/' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
    <Route path='/apply-doctor' element={<ProtectedRoutes><ApplyDoctor/></ProtectedRoutes>}/>
    <Route path='/notifications' element={<ProtectedRoutes><Notification/></ProtectedRoutes>}/>
    <Route path='/admin/userslist' element={<ProtectedRoutes><UsersList/></ProtectedRoutes>}/>
    <Route path='/admin/doctorslist' element={<ProtectedRoutes><DoctorsList/></ProtectedRoutes>}/>
    <Route path='/doctor/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
    <Route path='/doctor/booking' element={<ProtectedRoutes><BookTime/></ProtectedRoutes>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
