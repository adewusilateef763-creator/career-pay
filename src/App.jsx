import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import Login from "./pages/SignIn";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Careers from "./pages/Careers";
import Onboarding from "./pages/Onboarding";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardApp from "./pages/dashboard/DashboardApp";
import CreateNewPassword from "./pages/CreateNewPassword";
import EmailVerification from "./pages/EmailVerification";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import TaxCalculator from "./pages/TaxCalculator";





const App = () => {
  return (
    <main className="font-sfPro font-normal scroll-smooth">
      <Router>
        <Routes>
          {/* Main App Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/testimonials" element={<><Navbar /><Testimonials /><Footer /></>} />
          <Route path="/faq" element={<><Navbar /><FAQ /><Footer /></>} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
          <Route path="/terms" element={<><Navbar /><TermsOfService /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/help" element={<><Navbar /><HelpCenter /><Footer /></>} />
          <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email/:token" element={<EmailVerification />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/dashboard" element={ <ProtectedRoute><DashboardApp/></ProtectedRoute>
  }
/>
          <Route path="/tax" element={<TaxCalculator />} />
          

          {/* Dashboard Routes */}
          
          <Route path="/reset-password" element={<CreateNewPassword />} />
          
        </Routes>
      </Router>
    </main>
  );
};

export default App;
