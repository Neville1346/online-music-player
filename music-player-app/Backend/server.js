// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Use CORS and body-parser middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Define a simple User schema with mongoose
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a User model based on the schema
const User = mongoose.model('User', UserSchema);

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('A token is required for authentication');

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};

// Signup route (create a new user)
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User created successfully');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

// Login route (authenticate user and return a JWT token)
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.send({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

// Define a protected route that requires JWT authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Hello, ${req.user.userId}! You are authenticated.`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
