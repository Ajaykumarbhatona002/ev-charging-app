import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/AuthForm.css';

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please fill all fields ❌");
      return;
    }

    if (email === 'Ajayadmin@com' && password === 'Admin@123') {
      setMessage("Admin login successful ✅");
      login({ email: 'Ajayadmin@com' });
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      setIsLoading(false);
      return;
    }

    setMessage("Invalid admin credentials ❌");
    setIsLoading(false);
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-container" style={{
        background: "linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(185, 28, 28, 0.1))",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(220, 38, 38, 0.3)",
        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)"
      }}>
        <h2 className="auth-title" style={{color: '#dc2626'}}>Admin Login</h2>

        {message && (
          <div className={`auth-message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="auth-input-wrapper">
          <input 
            className="auth-input"
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            disabled={isLoading}
            required
          />
        </div>

        <div className="auth-password-wrapper">
          <input 
            className="auth-input auth-password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Admin password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            disabled={isLoading}
            required
          />
          <button 
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#64748b" stroke="#64748b" strokeWidth="1">
                <circle cx="12" cy="12" r="3"/>
              </svg> :
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M1 12s4 -8 11 -8 11 8 11 8 -4 8 -11 8 -11 -8 -11 -8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            }
          </button>
        </div>

        <button 
          type="submit"
          className="auth-button"
          style={{
            background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #dc2626, #b91c1c)',
            boxShadow: isLoading ? 'none' : '0 10px 25px rgba(220, 38, 38, 0.3)'
          }}
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? 'Logging in...' : 'Admin Login'}
        </button>
        
        <p className="auth-link-container" style={{ color: '#dc2626' }}>
          <Link className="auth-link" to="/" style={{ color: '#dc2626' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

