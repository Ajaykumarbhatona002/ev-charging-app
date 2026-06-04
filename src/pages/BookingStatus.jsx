import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Clock, Zap, MapPin, CheckCircle } from 'lucide-react';

function BookingStatus() {
  const { user } = useAuth();
  const [activeBooking, setActiveBooking] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
  const fetchIntervalRef = useRef(null);

  const fetchActiveBooking = useCallback(async () => {
    if (!user) return;
    
    try {
      const res = await axios.get(`http://localhost:5000/bookings/active/${user.email}`);
      const booking = res.data;
      
      if (booking) {
        const startTime = new Date(booking.startTime).getTime();
        const durationMs = booking.durationMinutes * 60 * 1000;
        const now = Date.now();
        const remaining = Math.max(0, durationMs - (now - startTime));
        
        setActiveBooking(booking);
        setTimeRemaining(remaining);
        
        // Start timer only if remaining time > 0
        if (remaining > 0 && !timerRef.current) {
          timerRef.current = setInterval(() => {
            const currentRemaining = Math.max(0, durationMs - (Date.now() - startTime));
            setTimeRemaining(currentRemaining);
            
            if (currentRemaining === 0) {
              clearInterval(timerRef.current);
              timerRef.current = null;
              setActiveBooking(null);
            }
          }, 1000);
        }
      } else {
        setActiveBooking(null);
        setTimeRemaining(0);
      }
    } catch (err) {
      console.error('Status fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchActiveBooking();
    
    // Fetch interval - clear previous
    if (fetchIntervalRef.current) {
      clearInterval(fetchIntervalRef.current);
    }
    
    fetchIntervalRef.current = setInterval(fetchActiveBooking, 30000);
    
    return () => {
      if (fetchIntervalRef.current) clearInterval(fetchIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchActiveBooking]);

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  if (loading || !activeBooking || timeRemaining === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '100px',
      right: '20px',
      background: 'linear-gradient(135deg, #28a745, #20c997)',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(40, 167, 69, 0.4)',
      minWidth: '300px',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2em' }}><Zap size={24} /></h3>
        <button onClick={() => {
          setActiveBooking(null);
          if (timerRef.current) clearInterval(timerRef.current);
        }} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' }}>×</button>
      </div>

      <div style={{ fontSize: '1.1em', fontWeight: 'bold', marginBottom: '5px' }}>
        {activeBooking.stationName}
      </div>
      
      <div style={{ fontSize: '0.9em', opacity: 0.9, marginBottom: '15px' }}>
        <MapPin size={16} /> {activeBooking.chargerWatt}
      </div>

      <div style={{ 
        fontSize: '2.5em', 
        fontWeight: 'bold', 
        color: 'yellow', 
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        marginBottom: '10px'
      }}>
        {formatTime(timeRemaining)}
      </div>

      <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
        Cost: ₹{activeBooking.cost}
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.2)', 
        padding: '8px', 
        borderRadius: '6px', 
        marginTop: '10px', 
        textAlign: 'center',
        fontSize: '0.85em'
      }}>
        <CheckCircle size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
        Active Session
      </div>
    </div>
  );
}

export default BookingStatus;
