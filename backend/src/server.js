import 'dotenv/config'; // Automatically loads your .env variables
import express from 'express';
import authRoutes from './routes/auth.route.js'; // Notice the .js extension is required!

const app = express();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});