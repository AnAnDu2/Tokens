import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const userRegister = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/ems");

    const hashPassword = await bcrypt.hash("admin", 10);

    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save();

    console.log("Admin user created successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
};

userRegister();