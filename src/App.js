import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// admin
import AdminLogin from "./admin/AdminLogin";
import AdminMainMenu from "./admin/AdminMainMenu";
import Footer from "./footer/footer";
import AdminAddVaccination from "./admin/AdminAddVaccination";
import AdminNews from "./admin/AdminNews";
import AdminProfile from "./admin/AdminProfile";
import AdminEditVaccination from "./admin/AdminEditVaccination";

// user
import UserLandingPage from "./user/UserLandingPage";
import UserProfile from "./user/UserProfile";
import UserRegVaccine from "./user/UserRegVaccine";
import UserVaccineInformation from "./user/UserVaccineInformation";

function App() {
  return (
    <>
      <Footer />
      <Router>
        <Routes>
          {/* admin */}
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

          <Route path="*" element={<AdminLogin />} />

          {/* user */}
          <Route path="/user/landingpage" element={<UserLandingPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/reg-vaccine" element={<UserRegVaccine />} />
          <Route path="/user/info-vacc" element={<UserVaccineInformation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
