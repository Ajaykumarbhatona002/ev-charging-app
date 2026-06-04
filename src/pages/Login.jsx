import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import '../styles/AuthForm.css';

function Login() {
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



    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        login({ email });
        setTimeout(() => {
          navigate("/stations");
        }, 1000);
      } else {
        setMessage(data.error);
      }
      } catch (err) {
        console.error("Login error:", err);
        setMessage("Server Error ❌");
      } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <div className="auth-container" style={{
        background: "linear-gradient(135deg, rgba(43, 92, 255, 0.1), rgba(74, 125, 255, 0.1))",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(43, 92, 255, 0.2)",
        boxShadow: "0 20px 40px rgba(43, 92, 255, 0.15)"
      }}>
        <h2 className="auth-title">Welcome Back</h2>

        {message && (
          <div className={`auth-message ${message.includes('Success') || message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="auth-input-wrapper">
          <input 
            id="email"
            name="email"
            className="auth-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            disabled={isLoading}
            required
          />
        </div>

        <div className="auth-password-wrapper">
          <input 
            id="password"
            name="password"
            className="auth-input auth-password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
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
            background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #007bff, #0056b3)',
            boxShadow: isLoading ? 'none' : '0 10px 25px rgba(0, 123, 255, 0.3)'
          }}
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="auth-link-container">
          Don't have an account? <Link className="auth-link" to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

