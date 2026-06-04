import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Clock, Zap, MapPin } from 'lucide-react';

function Receipt() {
  const location = useLocation();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = location.state;
    if (data) {
      setBookingData(data);
    }
    setLoading(false);
  }, [location.state]);

  const downloadReceipt = () => {
    const receiptData = {
      id: bookingData?.id,
      name: bookingData?.name,
      location: bookingData?.location,
      duration: bookingData?.duration,
      price: bookingData?.price,
      chargerWatt: bookingData?.chargerWatt,
      timestamp: new Date().toLocaleString()
    };
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${bookingData?.id || 'booking'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading receipt...</div>;
  }

  if (!bookingData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#6c757d' }}>
        <h2>No Booking Data</h2>
        <p>Please make a booking first</p>
        <Link to="/fast" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Go to Fast Charging
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px' }}>
      <div style={{ background: 'white', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '40px', textAlign: 'center' }}>
          <CheckCircle size={80} />
          <h1 style={{ margin: '20px 0 10px 0', fontSize: '2.5em' }}>Booking Confirmed!</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '1.2em' }}>Receipt Ready</p>
        </div>

        <div style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Booking ID</div>
              <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{bookingData.id}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Charger</div>
              <div style={{ fontSize: '1.3em' }}>{bookingData.chargerWatt}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Station</div>
              <div style={{ fontSize: '1.3em' }}>{bookingData.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Location</div>
              <div style={{ fontSize: '1.2em' }}>{bookingData.location}</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Duration</div>
              <div style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{bookingData.duration} min</div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '6px' }}>Total Price</div>
              <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#28a745' }}>{bookingData.price}</div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={downloadReceipt}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(40,167,69,0.3)'
              }}
            >
              <Download size={24} style={{ display: 'inline', marginRight: '10px' }} />
              Download Receipt
            </button>
            <div style={{ marginTop: '20px' }}>
              <Link to="/fast" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
                Book Another Fast Charger
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;

