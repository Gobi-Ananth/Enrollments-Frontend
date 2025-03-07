import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./components/SignUpPage";
import Wrapper from "./components/Wrapper";
import Rounds from "./components/Rounds";
import RoundZero from "./components/RoundZero";
import Interview from "./components/Interview";
import SlotWindow from "./components/SlotWindow";
import FallBack from "./components/FallBack";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}
