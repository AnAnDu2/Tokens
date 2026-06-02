import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const {user, loading}= useAuth()
  const navigate= useNavigate()
  if(loading){
    return <div>Loading....</div>
  }
  if(!user){
     navigate('/login')
  }
  return (
    <div>
      <h1>Admin Dashboard {user && user.name}</h1>
    </div>
  );
};

export default AdminDashboard;