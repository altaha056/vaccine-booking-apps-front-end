import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
