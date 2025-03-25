import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./components/SignUpPage";
import Wrapper from "./components/Wrapper";
import Rounds from "./components/Rounds";
import RoundZero from "./components/RoundZero";
import Interview from "./components/Interview";
import SlotWindow from "./components/SlotWindow";
import FallBack from "./components/FallBack";
import LoadingScreen from "./components/LoadingScreen";
import NotFoundScreen from "./components/NotFoundScreen";
import InterviewAdmin from "./components/Admin-Components/InterviewAdmin";
import AdminSignUpPage from "./components/Admin-Components/AdminLogin";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminSignUpPage />} />
      </Routes>
    </Router>
  );
}
