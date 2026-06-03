import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AllTickets from "./pages/AllTickets";
import MyTickets from "./pages/MyTickets";

import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Login Page - No Header */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard - With Header */}
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />

        {/* Employee Dashboard - With Header */}
        <Route
          path="/employee-dashboard"
          element={
            <Layout>
              <EmployeeDashboard />
            </Layout>
          }
        />

        {/* All Tickets - With Header */}
        <Route
          path="/all-tickets"
          element={
            <Layout>
              <AllTickets />
            </Layout>
          }
        />

        {/* My Tickets - With Header */}
        <Route
          path="/my-tickets"
          element={
            <Layout>
              <MyTickets />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;