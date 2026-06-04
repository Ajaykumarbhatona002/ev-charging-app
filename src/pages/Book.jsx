import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ToastProvider';
import axios from 'axios';
import { Zap, MapPin, Clock } from 'lucide-react';

const Book = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const charger = location.state?.charger;
  const [bookingLoading, setBookingLoading] = useState(false);
  const [duration, setDuration] = useState(30);

useEffect(() => {
    if (!charger) {
      addToast("No charger data found", "error");
      setTimeout(() => navigate('/fast'), 1000);
    }
  }, []);

  if (!charger) {
    return <div>Loading...</div>;
  }

  const handleConfirmBook = async () => {
    if (!user) {
      addToast("Please login first", "error");
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    try {
      const bookingData = {
        userEmail: user.email,
        stationId: charger?.id || 1,
        stationName: charger?.name || 'Unknown Station',
        chargerWatt: charger?.watt || '150kW',
        durationMinutes: duration,
        cost: `₹${totalCost}`
      };

      const res = await axios.post("http://localhost:5000/api/book", bookingData);
      
      addToast("Booking confirmed! Generating receipt...", "success");
      
      // Navigate to receipt with complete state
      navigate("/receipt", { state: { 
        ...res.data.booking,
        chargerName: charger.name,
        location: charger.location,
        duration: duration,
        totalPrice: `₹${totalCost}`
      } });
      
    } catch (err) {
      addToast(err.response?.data?.error || "Booking failed", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  const pricePerHour = (charger?.price?.split('/')[0]?.replace('₹', '') || 25) * 1;
  const totalCost = (pricePerHour * (duration / 60)).toFixed(0);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "30px" }}>
      <div style={{ 
        background: "white", 
        borderRadius: "20px", 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)", 
        overflow: "hidden" 
      }}>
        <div style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          color: "white", 
          padding: "30px", 
          textAlign: "center" 
        }}>
          <Zap size={64} />
          <h1 style={{ margin: "10px 0", fontSize: "2em" }}>Confirm Booking</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>{charger.name}</p>
        </div>

        <div style={{ padding: "30px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
            <div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Power</div>
              <div style={{ fontSize: "1.4em", fontWeight: "bold" }}>{charger.watt}</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Location</div>
              <div style={{ fontSize: "1.2em" }}>{charger.location}</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Price</div>
              <div style={{ fontSize: "1.4em", color: "#28a745", fontWeight: "bold" }}>{charger.price}</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Slots</div>
              <div style={{ fontSize: "1.2em" }}>{charger.available}/{charger.total} available</div>
            </div>
          </div>

          <div style={{ background: "#f8f9fa", padding: "25px", borderRadius: "12px", marginBottom: "30px" }}>
            <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Session Duration</h3>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>Duration (minutes)</label>
                <input 
                  type="range" 
                  min="15" 
                  max="120" 
                  step="15" 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  style={{ width: "100%", height: "8px", borderRadius: "4px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "14px" }}>
                  <span>15 min</span>
                  <span>{duration} min</span>
                  <span>2 hours</span>
                </div>
              </div>
              <div style={{ textAlign: "center", minWidth: "120px" }}>
                <div style={{ fontSize: "2.5em", fontWeight: "bold", color: "#28a745" }}>₹{totalCost}</div>
                <div style={{ color: "#6b7280" }}>Total</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button 
              onClick={() => navigate('/fast')}
              style={{
                background: "#6c757d",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmBook}
              disabled={bookingLoading || !user}
              style={{
                background: bookingLoading ? "#6c757d" : "#28a745",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: bookingLoading ? "not-allowed" : "pointer",
                minWidth: "160px"
              }}
            >
              {bookingLoading ? "Booking..." : "Confirm & Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;

