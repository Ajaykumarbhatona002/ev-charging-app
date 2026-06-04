import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";
import '../styles/AuthForm.css';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [signupLoading, setSignupLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill all fields");
      addToast("Please fill all fields ❌", "error");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter valid email");
      addToast("Invalid email format ❌", "error");
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      addToast("Password too short (min 6 chars) ❌", "error");
      return;
    }

    if (signupLoading) return;
    setSignupLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        addToast(`Account created for ${email}! Redirecting... ✅`, "success");
        login({ email });
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/stations"), 1500);
      } else {
        setError(data.error || "Signup failed");
        addToast(data.error || "Signup failed ❌", "error");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server Error");
      addToast("Server Error ❌", "error");
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleSubmit} className="auth-container" style={{
        background: "linear-gradient(135deg, rgba(43, 92, 255, 0.1), rgba(74, 125, 255, 0.1))",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(43, 92, 255, 0.2)",
        boxShadow: "0 20px 40px rgba(43, 92, 255, 0.15)"
      }}>
        <h2 className="auth-title">Register</h2>

        {error && (
          <div className="error-message" style={{
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '15px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            {error}
          </div>
        )}

        <div className="auth-input-wrapper">
          <input 
            className="auth-input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            disabled={signupLoading}
            required
          />
        </div>

        <div className="auth-password-wrapper">
          <input 
            className="auth-input auth-password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password (min 6 chars)"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            disabled={signupLoading}
            required
          />
          <button 
            type="button"
            className="auth-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={signupLoading}
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
          className="auth-button"
          style={{
            background: signupLoading ? '#94a3b8' : 'linear-gradient(135deg, #28a745, #20c997)',
            boxShadow: signupLoading ? 'none' : '0 10px 25px rgba(40, 167, 69, 0.3)'
          }}
          disabled={signupLoading}
        >
          {signupLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#64748b' }}>
          Already have account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
