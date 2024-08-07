const express = require('express');
const dotenv = require('dotenv');
const { databaseConnection } = require("./utils/database");
const cookieParser = require('cookie-parser');
const { router } = require('./routes/userRoute');
const cors = require('cors');

dotenv.config({ path: ".env" }); // Load .env file

databaseConnection();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Update CORS configuration
const corsOptions = {
  origin: 'https://netflix-clone-gagan-2.netlify.app',
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "This is backend",
    success: true,
  });
});

app.use("/api/v1/user", router);

const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
