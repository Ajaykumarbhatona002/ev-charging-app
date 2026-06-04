import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    setName("");
    setEmail("");
    setMsg("");
    setTimeout(() => setSubmitStatus(null), 4000);
  };

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1400px",
      margin: "0 auto",
      color: "#1a2a5c",
      boxSizing: "border-box"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{
          fontSize: "3em",
          fontWeight: "700",
          color: "white",
          marginBottom: "20px"
        }}>
          Get In Touch
        </h1>
        <p style={{ fontSize: "1.3em", color: "#6b7280", maxWidth: "600px", margin: "0 auto" }}>
          Have questions? We'd love to hear from you. Send us a message or contact us directly.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "start"
      }}>
        {/* Contact Info */}
        <div>
          <h3 style={{ 
            fontSize: "1.8em", 
            marginBottom: "30px", 
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <MessageCircle size={32} style={{ color: "#2b5cff" }} />
            Contact Information
          </h3>

          {/* Contact Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
            <div style={{
              background: "white",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #2b5cff",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              boxSizing: "border-box"
            }} onClick={() => window.location.href = "mailto:support@evcharge.com"}>
              <Mail size={28} style={{ color: "#2b5cff" }} />
              <div>
                <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>Email Us</div>
                <div style={{ color: "#6b7280", fontSize: "1.1em" }}>support@evcharge.com</div>
              </div>
            </div>

            <div style={{
              background: "white",
              padding: "25px",
              boxSizing: "border-box",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #2b5cff",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }} onClick={() => window.location.href = "tel:+917983365863"}>
              <Phone size={28} style={{ color: "#2b5cff" }} />
              <div>
                <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>Call Us</div>
                <div style={{ color: "#6b7280", fontSize: "1.1em" }}>+91 79833 65863</div>
              </div>
            </div>

            <div style={{
              background: "white",
              padding: "25px",
              boxSizing: "border-box",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              borderLeft: "4px solid #2b5cff",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}>
              <MapPin size={28} style={{ color: "#2b5cff" }} />
              <div>
                <div style={{ fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>Visit Us</div>
                <div style={{ color: "#6b7280", fontSize: "1.1em" }}>Delhi, India</div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div style={{
            background: "linear-gradient(135deg, rgba(43, 92, 255, 0.05), rgba(74, 125, 255, 0.03))",
            padding: "30px",
            borderRadius: "16px",
            border: "1px solid rgba(43,92,255,0.1)",
            boxSizing: "border-box"
          }}>
            <h4 style={{ color: "#1e293b", marginBottom: "20px", fontWeight: "600" }}>Working Hours</h4>
            <div style={{ color: "#6b7280" }}>
              <div>Mon - Fri: 9:00 AM - 8:00 PM</div>
              <div>Sat - Sun: "10:00 AM - 6:00 PM"</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ boxSizing: "border-box" }}>
          <h3 style={{ 
            fontSize: "1.8em", 
            marginBottom: "30px", 
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <Send size={32} style={{ color: "#2b5cff" }} />
            Send Message
          </h3>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
              boxSizing: "border-box"
            }}>
              ✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
              boxSizing: "border-box"
            }}>
              ❌ Please fill all fields correctly.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "25px"
          }}>
            <input 
              type="text"
              id="name"
              name="name"
              placeholder="Your Name *"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              disabled={isSubmitting}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 20px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s",
                background: isSubmitting ? "#f9fafb" : "white"
              }}
              required
            />

            <input 
              type="email"
              id="email"
              name="email"
              placeholder="Your Email *"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              disabled={isSubmitting}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 20px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                transition: "all 0.3s",
                background: isSubmitting ? "#f9fafb" : "white"
              }}
              required
            />

            <textarea 
              id="message"
              name="message"
              placeholder="Your Message *"
              value={msg}
              onChange={(e)=>setMsg(e.target.value)}
              disabled={isSubmitting}
              rows="6"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "16px 20px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                fontSize: "16px",
                fontFamily: "inherit",
                resize: "vertical",
                transition: "all 0.3s",
                background: isSubmitting ? "#f9fafb" : "white",
                minHeight: "120px"
              }}
              required
            />

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "18px 24px",
                background: isSubmitting ? "#9ca3af" : "linear-gradient(135deg, #2b5cff, #1e40af)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: isSubmitting ? "none" : "0 10px 30px rgba(43, 92, 255, 0.4)",
                transition: "all 0.3s",
                boxSizing: "border-box"
              }}
            >
              {isSubmitting ? "Sending..." : <><Send style={{ display: "inline", marginRight: "10px", verticalAlign: "middle" }} size={20} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

