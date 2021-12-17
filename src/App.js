import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import AdminMainMenu from "./admin/AdminMainMenu";
import Footer from "./footer/footer";
import AdminAddVaccination from "./admin/AdminAddVaccination";
import AdminNews from "./admin/AdminNews";
import AdminProfile from "./admin/AdminProfile";
import AdminEditVaccination from "./admin/AdminEditVaccination";

import UserLandingPage from "./user/UserLandingPage";

function App() {
  return (
    <>
      <Footer />
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/main-menu" element={<AdminMainMenu />} />
          <Route
            path="/admin/add-vaccination"
            element={<AdminAddVaccination />}
          />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route
            path="/admin/edit-vaccination"
            element={<AdminEditVaccination />}
          />
          <Route path="/admin/test" element={<AdminNews />} />

          <Route path="/user" element={<UserLandingPage />} />

          <Route path="*" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
