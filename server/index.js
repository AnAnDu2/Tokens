import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";
import authRouter from './routes/auth.js'
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter)
app.get("/", (req, res) => {
  res.send("Backend Running Successfully 🚀");
});
connectToDatabase();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});