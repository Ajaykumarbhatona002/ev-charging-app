import { Zap, MapPin, CreditCard, Shield, Phone, Truck, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1400px",
      margin: "0 auto",
      color: "#1a2a5c",
      lineHeight: "1.6"
    }}>
      {/* Hero Intro */}
      <section style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, rgba(43, 92, 255, 0.1), rgba(74, 125, 255, 0.05))",
        borderRadius: "20px",
        marginBottom: "60px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(43, 92, 255, 0.2)"
      }}>
        <h1 style={{
          fontSize: "3.5em",
          fontWeight: "700",
          marginBottom: "20px",
          color: "white"
        }}>
          Welcome to EV Charge
        </h1>
        <p style={{
          fontSize: "1.4em",
          maxWidth: "800px",
          margin: "0 auto 40px",
          color: "#4b5563"
        }}>
          Revolutionizing EV charging with smart technology. Find, book, and charge at the fastest stations near you.
        </p>
        <Link to="/stations" style={{
          background: "linear-gradient(135deg, #2b5cff, #1e40af)",
          color: "white",
          padding: "15px 40px",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "600",
          boxShadow: "0 10px 30px rgba(43, 92, 255, 0.4)",
          transition: "all 0.3s"
        }}>
          Find Stations Now →
        </Link>
      </section>

      {/* Features */}
      <section>
        <h2 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "60px", color: "#1e293b" }}>
          Why Choose EV Charge?
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "30px",
          marginBottom: "80px"
        }}>
          <div style={{
            background: "white",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "transform 0.3s, box-shadow 0.3s"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Zap size={60} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.5em", marginBottom: "15px", color: "#1e293b" }}>Lightning Fast Charging</h3>
            <p style={{ color: "#6b7280", lineHeight: "1.7" }}>Access 50kW to 400kW ultra-fast chargers. Get back on the road in minutes.</p>
          </div>

          <div style={{
            background: "white",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "transform 0.3s, box-shadow 0.3s"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <MapPin size={60} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.5em", marginBottom: "15px", color: "#1e293b" }}>Nearest Stations</h3>
            <p style={{ color: "#6b7280", lineHeight: "1.7" }}>Real-time GPS location shows stations sorted by distance. Never get lost.</p>
          </div>

          <div style={{
            background: "white",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "transform 0.3s, box-shadow 0.3s"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <CreditCard size={60} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.5em", marginBottom: "15px", color: "#1e293b" }}>Instant Payments</h3>
            <p style={{ color: "#6b7280", lineHeight: "1.7" }}>Secure UPI payments with one tap. Transparent pricing, no hidden fees.</p>
          </div>

          <div style={{
            background: "white",
            padding: "40px 30px",
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
            textAlign: "center",
            transition: "transform 0.3s, box-shadow 0.3s"
          }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
            <Shield size={60} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.5em", marginBottom: "15px", color: "#1e293b" }}>Secure Bookings</h3>
            <p style={{ color: "#6b7280", lineHeight: "1.7" }}>End-to-end encryption. Track bookings and receipts in real-time.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: "rgba(43, 92, 255, 0.03)", padding: "80px 20px", borderRadius: "20px", marginBottom: "80px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "60px", color: "#1e293b" }}>
          How It Works
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px"
        }}>
          <div style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ 
              width: "80px", height: "80px", 
              background: "linear-gradient(135deg, #2b5cff, #1e40af)", 
              borderRadius: "50%", 
              margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              color: "white", fontSize: "1.8em", fontWeight: "bold" 
            }}>
              1
            </div>
            <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Login/Signup</h3>
            <p style={{ color: "#6b7280" }}>Create account or login securely</p>
          </div>

          <div style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ 
              width: "80px", height: "80px", 
              background: "linear-gradient(135deg, #2b5cff, #1e40af)", 
              borderRadius: "50%", 
              margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              color: "white", fontSize: "1.8em", fontWeight: "bold" 
            }}>
              2
            </div>
            <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Select Station</h3>
            <p style={{ color: "#6b7280" }}>Find nearest charger on map</p>
          </div>

          <div style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ 
              width: "80px", height: "80px", 
              background: "linear-gradient(135deg, #2b5cff, #1e40af)", 
              borderRadius: "50%", 
              margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              color: "white", fontSize: "1.8em", fontWeight: "bold" 
            }}>
              3
            </div>
            <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Choose & Pay</h3>
            <p style={{ color: "#6b7280" }}>Pick charger type, pay instantly</p>
          </div>

          <div style={{ textAlign: "center", padding: "30px" }}>
            <div style={{ 
              width: "80px", height: "80px", 
              background: "linear-gradient(135deg, #2b5cff, #1e40af)", 
              borderRadius: "50%", 
              margin: "0 auto 20px", 
              display: "flex", alignItems: "center", justifyContent: "center", 
              color: "white", fontSize: "1.8em", fontWeight: "bold" 
            }}>
              4
            </div>
            <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Start Charging</h3>
            <p style={{ color: "#6b7280" }}>Get receipt and track session</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "60px", color: "#1e293b" }}>
          Benefits You'll Love
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          marginBottom: "80px"
        }}>
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
            borderLeft: "5px solid #2b5cff"
          }}>
            <TrendingUp size={40} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.6em", marginBottom: "15px", color: "#1e293b" }}>Save Time & Money</h3>
            <p style={{ color: "#6b7280", fontSize: "1.1em" }}>30% cheaper than traditional stations. Real-time pricing and availability.</p>
          </div>

          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
            borderLeft: "5px solid #2b5cff"
          }}>
            <Phone size={40} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.6em", marginBottom: "15px", color: "#1e293b" }}>24/7 Support</h3>
            <p style={{ color: "#6b7280", fontSize: "1.1em" }}>Contact station owners directly. Live booking support available.</p>
          </div>

          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
            borderLeft: "5px solid #2b5cff"
          }}>
            <Star size={40} style={{ color: "#2b5cff", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "1.6em", marginBottom: "15px", color: "#1e293b" }}>Trusted Network</h3>
            <p style={{ color: "#6b7280", fontSize: "1.1em" }}>Verified stations only. 5000+ happy users across Delhi-NCR.</p>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section style={{
        textAlign: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #2b5cff, #1e40af)",
        color: "white",
        borderRadius: "20px",
        marginBottom: "40px"
      }}>
        <h2 style={{ fontSize: "2.8em", marginBottom: "20px", fontWeight: "700" }}>
          Our Future Vision
        </h2>
        <p style={{ fontSize: "1.3em", maxWidth: "700px", margin: "0 auto 40px", opacity: "0.95" }}>
          Expanding to 100+ cities. AI-powered charger recommendations. 
          Integration with car dashboards and smart home systems. 
          Making EV charging as easy as grabbing coffee.
        </p>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px 30px", borderRadius: "50px", backdropFilter: "blur(10px)" }}>100+ Cities</div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px 30px", borderRadius: "50px", backdropFilter: "blur(10px)" }}>AI Smart Matching</div>
          <div style={{ background: "rgba(255,255,255,0.2)", padding: "15px 30px", borderRadius: "50px", backdropFilter: "blur(10px)" }}>Car Integration</div>
        </div>
      </section>

      <div style={{ textAlign: "center", paddingBottom: "40px" }}>
        <p style={{ color: "#9ca3af", fontSize: "1em" }}>
          © 2024 EV Charge. Powering India's EV Revolution.
        </p>
      </div>
    </div>
  );
}

export default About;

