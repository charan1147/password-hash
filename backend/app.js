const express = require("express");
const dotenv = require("dotenv");  
const connectDB = require("./config/Db");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');

dotenv.config();  

const app = express();
app.use(express.json());


connectDB();
app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


