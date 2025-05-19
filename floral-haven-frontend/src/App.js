import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/home/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import Bee from "./pages/pollinators/Bee";
import Bat from "./pages/pollinators/Bat";
import Butterfly from "./pages/pollinators/Butterfly";
import Hummingbird from "./pages/pollinators/Hummingbird";
import GardenLayouts from "./pages/GardenLayouts";
import ContactPage from "./pages/ContactUs";
import Profile from "./pages/Profile";
import GuestProfile from "./pages/GuestProfile";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bee" element={<Bee />} />
          <Route path="/bat" element={<Bat />} />
          <Route path="/butterfly" element={<Butterfly />} />
          <Route path="/hummingbird" element={<Hummingbird />} />
          <Route path="/gardenlayouts" element={<GardenLayouts />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/guestprofile" element={<GuestProfile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;