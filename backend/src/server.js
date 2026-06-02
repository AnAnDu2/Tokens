// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); // Parses incoming JSON payloads

// Establish database connection
connectDb();

// Bind features to API routes
app.use("/api", ticketRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is operating on port ${PORT}`);
});