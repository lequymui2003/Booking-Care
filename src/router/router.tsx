import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import { DoctorPage } from "../Component/DoctorPage"; // Đường dẫn đúng với file DoctorPage.tsx
import BookingUser from "../Component/BookingUser";
import AppointmentSchedule from "../Component/AppointmentSchedule";
import AppointmentScheduleDoctor from "../Component/AppointmentScheduleDoctor";
import Login from "../Component/Login";
import Register from "../Component/Register";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute

function MainRouter() {
  return (
    <Router>
      <Routes>
        {/* Route không yêu cầu đăng nhập */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctorPage" element={<DoctorPage />} />


        {/* Các route yêu cầu đăng nhập */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <BookingUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointmentSchedule"
          element={
            <ProtectedRoute>
              <AppointmentSchedule />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/appointmentScheduleDoctor"
          element={
            <ProtectedRoute>
              <AppointmentScheduleDoctor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default MainRouter;