import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// admin
import AdminLogin from "./admin/AdminLogin";
import AdminMainMenu from "./admin/AdminMainMenu";
import Footer from "./footer/footer";
import AdminAddVaccination from "./admin/AdminAddVaccination";
import AdminNews from "./admin/AdminNews";
import AdminProfile from "./admin/AdminProfile";
import AdminEditVaccination from "./admin/AdminEditVaccination";
import AdminParticipantList from "./admin/AdminParticipantList";
// not found
import NotFound from "./user/NotFound";

// user
import UserLandingPage from "./user/UserLandingPage";
import UserProfile from "./user/UserProfile";
import UserRegVaccine from "./user/UserRegVaccine";
import UserVaccineInformation from "./user/UserVaccineInformation";
import UserLogin from "./user/UserLogin";
import UserRegisterAccount from "./user/UserRegisterAccount";
import UserVaccineList from "./user/UserVaccineList";
import UserNotLogin from "./user/UserNotLogin";
import UserAgreementBeforRegisterVaccine from "./user/UserAgreementBeforRegisterVaccine";
import UserTicket from "./user/UserTicket";
import UserEditVaccineRegistration from "./user/UserEditVaccineRegistration";

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
          <Route path="/admin/participant" element={<AdminParticipantList />} />

          {/* not found */}
          <Route path="*" element={<NotFound />} />

          {/* user */}
          <Route path="/user/landingpage" element={<UserLandingPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/reg-vaccine" element={<UserRegVaccine />} />
          <Route path="/user/info-vacc" element={<UserVaccineInformation />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegisterAccount />} />
          <Route path="/user/vaccine-list" element={<UserVaccineList />} />
          <Route path="/user/yet-login" element={<UserNotLogin />} />
          <Route
            path="/user/agreement"
            element={<UserAgreementBeforRegisterVaccine />}
          />
          <Route path="/user/ticket" element={<UserTicket />} />
          <Route path="/user/edit-vaccination" element={<UserEditVaccineRegistration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
