import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/evDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.error("MongoDB Connection Failed ❌:", err.message);
    console.error("Starting without MongoDB. API routes still available.");
  });

// Models
import User from "./models/User.js";
import Booking from "./models/Booking.js";

// Test route
app.get("/", (req, res) => res.send("API Working!"));

// Stations API - mock data
app.get("/api/stations", (req, res) => {
  const stations = [
    { id: 1, name: "EV Station 1", lat: 28.6139, lng: 77.2090, chargers: 4, watt: "50kW", phone: "+91-9876543210", available: 2 },
    { id: 2, name: "Fast Charge Hub", lat: 28.6200, lng: 77.2000, chargers: 6, watt: "150kW", phone: "+91-9876543211", available: 5 },
    { id: 3, name: "Green Power", lat: 28.6000, lng: 77.2200, chargers: 3, watt: "30kW", phone: "+91-9876543212", available: 1 },
    { id: 4, name: "Noida EV Hub", lat: 28.5355, lng: 77.3910, chargers: 8, watt: "120kW", phone: "+91-9876543213", available: 6 },
    { id: 5, name: "Ghaziabad Supercharger", lat: 28.6692, lng: 77.4538, chargers: 5, watt: "250kW", phone: "+91-9876543214", available: 3 },
    { id: 6, name: "Hapur Fast Charge", lat: 28.7303, lng: 77.7813, chargers: 4, watt: "100kW", phone: "+91-9876543215", available: 2 }
  ];
  res.json(stations);
});

// Fast chargers API
app.get("/api/fast-chargers", (req, res) => {
  const fastChargers = [
    { id: 1, name: "Turbo Charge Pro", lat: 28.6139, lng: 77.2090, watt: "350kW", available: 3, total: 5, location: "Connaught Place", price: "₹25/kWh", phone: "+91-9876543210" },
    { id: 2, name: "Lightning DC Fast", lat: 28.6200, lng: 77.2000, watt: "250kW", available: 2, total: 4, location: "Nehru Place", price: "₹22/kWh", phone: "+91-9876543211" },
    { id: 3, name: "Ultra Fast Hub", lat: 28.6000, lng: 77.2200, watt: "400kW", available: 1, total: 3, location: "Saket", price: "₹28/kWh", phone: "+91-9876543212" },
    { id: 4, name: "Speed Charge Station", lat: 28.6300, lng: 77.2300, watt: "150kW", available: 4, total: 6, location: "Karol Bagh", price: "₹20/kWh", phone: "+91-9876543213" },
    { id: 5, name: "Noida Ultra Fast", lat: 28.5355, lng: 77.3910, watt: "300kW", available: 2, total: 4, location: "Sector 18", price: "₹26/kWh", phone: "+91-9876543216" },
    { id: 6, name: "Ghaziabad Turbo", lat: 28.6692, lng: 77.4538, watt: "350kW", available: 1, total: 3, location: "NH-24", price: "₹24/kWh", phone: "+91-9876543217" },
    { id: 7, name: "Hapur High Speed", lat: 28.7303, lng: 77.7813, watt: "200kW", available: 3, total: 5, location: "Garh Road", price: "₹21/kWh", phone: "+91-9876543218" }
  ];
  res.json(fastChargers);
});

// Booking APIs
app.post("/api/book", async (req, res) => {
  try {
    const { userEmail, stationId, stationName, chargerWatt, durationMinutes, cost } = req.body;
    
    if (!userEmail || !stationId || !stationName || !chargerWatt || !durationMinutes || !cost) {
      return res.status(400).json({ error: "All fields required" });
    }

    const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
    
    const booking = new Booking({
      userEmail,
      stationId: parseInt(stationId),
      stationName,
      chargerWatt,
      durationMinutes: parseInt(durationMinutes),
      cost,
      paymentStatus: 'PAID',
      bookingId
    });

    await booking.save();

    res.json({ 
      message: "Booking successful ✅", 
      booking: { ...booking.toObject(), _id: booking._id.toString() }
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/bookings/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const bookings = await Booking.find({ userEmail }).sort({ startTime: -1 }).limit(10);
    res.json(bookings);
  } catch (err) {
    console.error("Bookings fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/bookings/active/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;
    const activeBooking = await Booking.findOne({ 
      userEmail, 
      status: 'active',
      startTime: { $gt: new Date(Date.now() - 30 * 60 * 1000) } // Last 30min
    });
    res.json(activeBooking || null);
  } catch (err) {
    console.error("Active booking error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    console.log("Signup request:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({error: "Email and password required"});
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({error: "User already exists ❌"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    const savedUser = await user.save();
    console.log("User created:", savedUser._id);

    res.json({message: "Signup Success ✅", user: {email}});
  } catch (err) {
    console.error("Signup ERROR:", err);
    console.error("Full error stack:", err.stack);
    res.status(500).json({error: err.message});
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    console.log("Login request:", req.body);
    const { email, password } = req.body;

    if (email === 'admin@ev.com') {
      res.json({message: "Admin Login Success ✅", user: {email, isAdmin: true}});
      return;
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({error: "User not found ❌"});
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(500).json({error: "Wrong Password ❌"});
    }

    res.json({message: "Login Success ✅", user: {email}});
  } catch (err) {
    console.error("Login ERROR:", err);
    res.status(500).json({error: err.message});
  }
});

// Admin API - GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, 'email createdAt updatedAt');
    res.json(users);
  } catch (err) {
    console.error("Users fetch ERROR:", err);
    res.status(500).json({error: err.message});
  }
});



// Admin API - GET all bookings
app.get("/admin/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ startTime: -1 }).limit(50);
    res.json(bookings);
  } catch (err) {
    console.error("Admin bookings ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
