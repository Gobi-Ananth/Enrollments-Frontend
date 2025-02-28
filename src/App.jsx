import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./components/SignUpPage";
import Wrapper from "./components/Wrapper";
import Rounds from "./components/Rounds";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Rounds />
            </Wrapper>
          }
        />
      </Routes>
    </Router>
  );
}
