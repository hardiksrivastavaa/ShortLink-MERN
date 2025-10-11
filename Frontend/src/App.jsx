import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import UrlAnalytics from "./components/UrlAnalytics";
import UrlShortener from "./components/UrlShortner";
import UserLogin from "./components/UserLogin";
import UserRegistration from "./components/UserRegistration";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthContext";
import UserDashboard from "./components/UserDashboard";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Navbar /> {/* Always visible */}
      <Outlet /> {/* This renders the current route's component */}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ✅ Toast notifications globally */}
        <Toaster position="top-center" reverseOrder={false} />

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/shorten" element={<UrlShortener />} />
            <Route path="/analytics" element={<UrlAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
