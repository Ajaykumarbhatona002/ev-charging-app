import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import BookingStatus from "./pages/BookingStatus";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import Fast from "./pages/Fast";
import Stations from "./pages/Stations";
import Book from "./pages/Book";
import Receipt from "./pages/Receipt";
import Admin from "./pages/Admin";

function AdminProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.email !== 'Ajayadmin@com') {
    return <Navigate to="/admin-login" />;
  }
  return children;
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <BrowserRouter>
      <Navbar />
      <BookingStatus />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/stations" element={<ProtectedRoute><Stations /></ProtectedRoute>} />
        <Route path="/fast" element={<Fast />} />
        <Route path="/book" element={<ProtectedRoute><Book /></ProtectedRoute>} />
        <Route path="/receipt" element={<ProtectedRoute><Receipt /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><Admin /></AdminProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

import { ToastProvider } from "./components/ToastProvider";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

