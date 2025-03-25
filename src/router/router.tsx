import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import DoctorPage from "../Component/DoctorPage"; // Đường dẫn đúng với file DoctorPage.tsx
import BookingUser from "../Component/BookingUser";
import AppointmentSchedule from "../Component/AppointmentSchedule";
import AppointmentScheduleDoctor from "../Component/AppointmentScheduleDoctor";
import Login from "../Component/Login";
import Register from "../Component/Register";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctorPage" element={<DoctorPage />} />
        <Route path="/booking" element={<BookingUser />} />
        <Route path="/appointmentSchedule" element={<AppointmentSchedule />} />
        <Route path="/appointmentScheduleDoctor" element={<AppointmentScheduleDoctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
