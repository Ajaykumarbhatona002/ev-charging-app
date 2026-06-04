import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";
import axios from "axios";
import "./Fast.css";

const Fast = () => {
  const [fastChargers, setFastChargers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    fetchFastChargers();
  }, []);

  const fetchFastChargers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fast-chargers");
      setFastChargers(res.data);
    } catch (err) {
      console.error("Error fetching fast chargers:", err);
      addToast("Failed to load fast chargers ❌", "error");
    } finally {
      setLoading(false);
    }
  };

const handleBookNow = (charger) => {
    navigate("/book", { state: { charger } });
  };

  const handleDirections = (charger) => {
    window.open(`https://maps.google.com?q=${encodeURIComponent(charger.location)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Fast Chargers...</p>
      </div>
    );
  }

  return (
    <div className="fast-page">
      <div className="header">
        <h1>⚡ Fast Charging Stations</h1>
        <p>Find the nearest ultra-fast chargers</p>
      </div>

      <div className="chargers-grid">
        {fastChargers.map((charger) => (
          <div key={charger.id} className="charger-card">
            <div className="card-header">
              <div className="charger-icon">⚡</div>
              <div>
                <h2>{charger.name}</h2>
                <div className="location">{charger.location}</div>
              </div>
            </div>

            <div className="card-details">
              <div className="detail">
                <span className="label">Power</span>
                <span className="value">{charger.watt}</span>
              </div>
              <div className="detail">
                <span className="label">Availability</span>
                <span className="value">{charger.available}/{charger.total}</span>
              </div>
              <div className="detail price">
                <span className="label">Price</span>
                <span className="value">{charger.price}</span>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="btn-book" 
                onClick={() => handleBookNow(charger)}
                disabled={!user || charger.available === 0}
              >
                Book Now
              </button>
              <button 
                className="btn-directions" 
                onClick={() => handleDirections(charger)}
              >
                Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fast;

