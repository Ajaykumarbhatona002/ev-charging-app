import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <h1>Find EV Charging Stations Easily</h1>
        <p>Locate nearby charging points and power up your journey.</p>
        <Link to="/stations">
          <button className="btn">Get Started</button>
        </Link>
      </section>

      <section className="cards">
        <Link to="/fast" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/3103/3103446.png" />
          <h3>Fast Charging</h3>
          <p>Quick and efficient charging experience.</p>
        </Link>

        <Link to="/stations" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" />
          <h3>Nearby Stations</h3>
          <p>Find charging stations near your location.</p>
        </Link>

        <Link to="/payment" className="card">
          <img src="https://cdn-icons-png.flaticon.com/512/2331/2331943.png" />
          <h3>Easy Payment</h3>
          <p>Secure and fast payment system.</p>
        </Link>
      </section>

      <section className="about">
        <h2 style={{color: '#0f1419', fontWeight: 'bold'}}>About Us</h2>
        <p style={{color: '#333'}}>This system helps EV users find charging stations quickly and easily.</p>
        <Link to="/admin-login">
          <button className="btn-admin" style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            color: 'white',
            marginTop: '20px'
          }}>
            Admin Login
          </button>
        </Link>
      </section>
    </>
  );
}

export default Home;
