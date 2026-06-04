import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";
import { MapPin, Phone, Zap } from "lucide-react";
import axios from "axios";

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stations");
      setStations(res.data);
    } catch (err) {
      console.error("Error fetching stations:", err);
      addToast("Failed to load stations ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (station) => {
    if (!user) {
      addToast("Please login first ❌", "error");
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    try {
      const durationMinutes = 60; // Default 1 hour
      const cost = (station.watt === "50kW" ? 10 : station.watt === "150kW" ? 15 : 12) * 60 / 1000 * 100; // Approx cost

      const bookingData = {
        userEmail: user.email,
        stationId: station.id,
        stationName: station.name,
        chargerWatt: station.watt,
        durationMinutes,
        cost: `₹${cost.toFixed(0)}`
      };

      const res = await axios.post("http://localhost:5000/api/book", bookingData);
      
      addToast("Booking successful! Redirecting... ✅", "success");
      
      // Redirect to receipt with booking data
      setTimeout(() => {
        navigate(`/receipt?data=${encodeURIComponent(JSON.stringify(res.data.booking))}`);
      }, 1500);

    } catch (err) {
      console.error("Booking error:", err);
      addToast(err.response?.data?.error || "Booking failed ❌", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading stations...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5em", color: "#1e293b", marginBottom: "10px" }}>
          🚀 EV Charging Stations
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.2em" }}>Find and book nearby charging stations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "25px" }}>
        {stations.map((station) => (
          <div 
            key={station.id} 
            style={{ 
              background: "white", 
              borderRadius: "16px", 
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)", 
              padding: "24px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.4em", color: "#1e293b", margin: 0 }}>{station.name}</h3>
              <div style={{ 
                padding: "6px 12px", 
                background: station.available > 0 ? "#d4edda" : "#f8d7da", 
                borderRadius: "20px",
                color: station.available > 0 ? "#155724" : "#721c24",
                fontWeight: "600",
                fontSize: "0.85em"
              }}>
                {station.available > 0 ? `${station.available}/${station.chargers} Available` : "All Busy"}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "12px 20px", marginBottom: "20px", fontSize: "15px" }}>
              <Zap size={18} style={{ color: "#3b82f6" }} />
              <span style={{ fontWeight: "500", color: "#1e293b" }}>{station.watt}</span>

              <MapPin size={18} style={{ color: "#10b981" }} />
              <span style={{ color: "#4b5563" }}>Delhi-NCR Area</span>

              {station.phone && (
                <>
                  <Phone size={18} style={{ color: "#f59e0b" }} />
                  <a href={`tel:${station.phone}`} style={{ color: "#f59e0b", textDecoration: "none" }}>
                    {station.phone}
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => navigate('/book', { state: { charger: station } })}
              disabled={station.available === 0 || !user}
              style={{
                width: "100%",
                padding: "14px",
                background: station.available > 0 && user ? "#3b82f6" : "#9ca3af",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: station.available > 0 && user ? "pointer" : "not-allowed",
                transition: "all 0.2s"
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stations;

