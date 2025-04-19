import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import ScrollToTop from "./ScrollToTop";
import { DoctorPage } from "../pages/Doctor/DoctorPage"; // Đường dẫn đúng với file DoctorPage.tsx
import BookingUser from "../Component/BookingUser";
import AppointmentSchedule from "../pages/Patient/AppointmentSchedule";
import AppointmentScheduleDoctor from "../pages/Doctor/AppointmentScheduleDoctor";
import Login from "../Component/Login";
import Register from "../Component/Register";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import ListInfo from "../Component/ListInFo";
import RemoteExaminationPage from "../pages/Specialties/RemoteExaminationPage";
import MentalHealthPage from "../pages/Specialties/MentalHealthPage";
import SpecialtyPage from "../pages/Specialties/SpecialtyPage";

function MainRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Route không yêu cầu đăng nhập */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctorPage/:id" element={<DoctorPage />} />
        <Route path="/listInfo/:id" element={<ListInfo />} />
        <Route path="/remoteExamination" element={<RemoteExaminationPage />} />
        <Route path="/mentalHealthPage" element={<MentalHealthPage />} />
        <Route path="/specialtyPage" element={<SpecialtyPage />} />

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
