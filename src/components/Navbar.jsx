import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const [activeBooking, setActiveBooking] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (user) {
      fetchActiveBooking();
      const interval = setInterval(fetchActiveBooking, 30000); // Refresh every 30s
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchActiveBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/bookings/active/${user?.email}`);
      const booking = res.data;
      if (booking) {
        const startTime = new Date(booking.startTime);
        const durationMs = booking.durationMinutes * 60 * 1000;
        const remaining = Math.max(0, durationMs - (Date.now() - startTime.getTime()));
        setActiveBooking(booking);
        setTimeRemaining(remaining);
        
        if (remaining > 0) {
          const timer = setInterval(() => {
            const newRemaining = Math.max(0, durationMs - (Date.now() - startTime.getTime()));
            setTimeRemaining(newRemaining);
          }, 1000);
        }
      } else {
        setActiveBooking(null);
        setTimeRemaining(0);
      }
    } catch (err) {
      console.error('Navbar status error:', err);
    }
  };

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };
  
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "linear-gradient(to right, #2b5cff, #4a7dff)",
      color: "white"
    }}>
      <h2>EV Charge</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
        <Link to="/stations" style={{ color: "white", textDecoration: "none" }}>Stations</Link>
        <Link to="/fast" style={{ color: "white", textDecoration: "none" }}>Fast</Link>
        
        {user ? (
          <>
            <span style={{ fontSize: "0.9em" }}>Hi, {user.email}</span>
            {user?.email === 'Ajayadmin@com' && (
              <Link to="/admin" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Admin</Link>
            )}
            {activeBooking && timeRemaining > 0 && (
              <div style={{ 
                background: "rgba(255,255,0,0.3)", 
                padding: "8px 12px", 
                borderRadius: "20px", 
                fontSize: "0.8em",
                fontWeight: "bold"
              }}>
                <Clock size={16} /> {formatTime(timeRemaining)}
              </div>
            )}
            <button onClick={logout} style={{ background: "none", border: "1px solid white", color: "white", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
