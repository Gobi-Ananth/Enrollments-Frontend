import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./components/SignUpPage";
import Wrapper from "./components/Wrapper";
import Rounds from "./components/Rounds";
import RoundZero from "./components/RoundZero";
import Interview from "./components/Interview";
import SlotWindow from "./components/SlotWindow";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <SlotWindow />
            </Wrapper>
          }
        />
      </Routes>
    </Router>
  );
}
