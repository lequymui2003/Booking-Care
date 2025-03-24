import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import DoctorPage from "../Component/DoctorPage"; // Đường dẫn đúng với file DoctorPage.tsx
import BookingUser from "../Component/BookingUser";

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctorPage" element={<DoctorPage />} />
        <Route path="/booking" element={<BookingUser />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
