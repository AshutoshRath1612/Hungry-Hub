// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const authRoutes = require('./routes/AuthRoutes');
// const errorHandler = require('./errorHandler');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/auth', authRoutes);

// // Error handling middleware
// app.use(errorHandler);

// // Database connection
// const dbURI = process.env.MONGO;
// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("MongoDB connected");
// }).catch((err) => {
//   console.error("MongoDB connection error:", err);
// });

// // Define a test endpoint
// app.get('/test', (req, res) => {
//     res.json({ message: 'Backend server is running successfully!' });
//   });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/AuthRoutes');
const foodRoutes = require('./routes/FoodRoutes');
const orderRoutes = require('./routes/orderRoutes')
const errorHandler = require('./errorHandler');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/order', orderRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
const dbURI = process.env.MONGO;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Define a test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running successfully!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
