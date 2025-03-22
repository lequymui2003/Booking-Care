import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import DoctorPage from "../Component/DoctorPage"; // Đường dẫn đúng với file DoctorPage.tsx

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctorPage" element={<DoctorPage />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
