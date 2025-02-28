import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpPage from "./components/SignUpPage";
import Wrapper from "./components/Wrapper";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Wrapper />} />
      </Routes>
    </Router>
  );
}
