import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminMainMenu from "./admin/AdminMainMenu";
import Footer from "./footer/footer";
import AdminAddVaccination from "./admin/AdminAddVaccination";
function App() {
  return (
    <>
      <Footer />
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/main-menu" element={<AdminMainMenu />} />
          <Route path="/admin/add-vaccination" element={<AdminAddVaccination />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
