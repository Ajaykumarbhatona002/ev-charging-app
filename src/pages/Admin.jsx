import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes] = await Promise.all([
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/admin/bookings')
        ]);
        setUsers(usersRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        console.error('Admin data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getStatusBadge = (status) => {
    const colors = {
      'active': { bg: '#d4edda', text: '#155724' },
      'completed': { bg: '#d1ecf1', text: '#0c5460' },
      'cancelled': { bg: '#f8d7da', text: '#721c24' }
    };
    const color = colors[status] || colors['active'];
    return (
      <span style={{ 
        background: color.bg, 
        color: color.text, 
        padding: '4px 12px', 
        borderRadius: '20px', 
        fontSize: '14px', 
        fontWeight: '500' 
      }}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', fontSize: '2.5em' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ 
          background: '#dc3545', color: 'white', border: 'none', padding: '12px 24px', 
          borderRadius: '8px', cursor: 'pointer', fontWeight: '600' 
        }}>
          Logout
        </button>
      </div>

      {user && <p style={{ color: '#666', marginBottom: '20px' }}>Logged in as: <strong>{user.email}</strong></p>}

      {/* Tabs */}
      <div style={{ marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'users' ? '#2b5cff' : '#f8f9fa',
            color: activeTab === 'users' ? 'white' : '#495057',
            border: 'none', 
            borderRadius: '8px 8px 0 0', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'users' ? '600' : '500',
            marginRight: '2px'
          }}
        >
          Users ({users.length})
        </button>
        <button 
          onClick={() => setActiveTab('bookings')}
          style={{ 
            padding: '12px 24px', 
            background: activeTab === 'bookings' ? '#2b5cff' : '#f8f9fa',
            color: activeTab === 'bookings' ? 'white' : '#495057',
            border: 'none', 
            borderRadius: '8px 8px 0 0', 
            cursor: 'pointer', 
            fontWeight: activeTab === 'bookings' ? '600' : '500'
          }}
        >
          Bookings ({bookings.length})
        </button>
      </div>

      {/* Users Table */}
      {activeTab === 'users' && (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Email</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Joined</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '20px 16px', fontWeight: '500' }}>{u.email}</td>
                  <td style={{ padding: '20px 16px', color: '#666' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '20px 16px' }}>
                    <span style={{ 
                      background: '#d4edda', color: '#155724', padding: '4px 12px', 
                      borderRadius: '20px', fontSize: '14px', fontWeight: '500' 
                    }}>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Bookings Table */}
      {activeTab === 'bookings' && (
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Booking ID</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>User</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Station</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Cost</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Payment</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Status</th>
                <th style={{ padding: '20px 16px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '20px 16px', fontWeight: '500', fontSize: '14px' }}>{booking.bookingId}</td>
                  <td style={{ padding: '20px 16px' }}>{booking.userEmail}</td>
                  <td style={{ padding: '20px 16px' }}>{booking.stationName}</td>
                <td style={{ padding: '20px 16px', fontWeight: 'bold', color: '#28a745' }}>₹{booking.cost}</td>
                  <td style={{ padding: '20px 16px' }}>
                    <span style={{
                      background: booking.paymentStatus === 'PAID' ? '#d4edda' : '#fff3cd',
                      color: booking.paymentStatus === 'PAID' ? '#155724' : '#856404',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '20px 16px' }}>
                    {getStatusBadge(booking.status)}
                  </td>
                  <td style={{ padding: '20px 16px', color: '#666', fontSize: '14px' }}>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center', color: '#666', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div>
          <p>Total Users: <strong>{users.length}</strong></p>
        </div>
        <div>
          <p>Total Bookings: <strong>{bookings.length}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
