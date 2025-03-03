import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import Header from "./Component/Header.tsx";
// import Footer from "./Component/Footer.tsx";
// import Banner from "./Component/Banner.tsx";
// import ForYou from "./Component/ForYou.tsx";
// import ComprehensiveService from "./Component/ComprehensiveService.tsx";
// import Specialty from "./Component/Specialty.tsx";
// import MedicalFacility from "./Component/MedicalFacility.tsx";
// import Doctor from "./Component/Doctor.tsx";
// import RemoteExamination from "./Component/RemoteExamination.tsx";
// import Suggest from "./Component/Suggest.tsx";
// import MentalHealth from "./Component/MentalHealth.tsx";
// import Handbook from "./Component/Handbook.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <Header />
    <Banner />
    <ForYou />
    <ComprehensiveService />
    <Specialty />
    <MedicalFacility />
    <Doctor />
    <RemoteExamination />
    <Suggest />
    <MentalHealth />
    <Handbook />
    <Footer /> */}
  </StrictMode>
);
