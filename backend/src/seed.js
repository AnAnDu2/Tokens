// seed.js
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js"; 
import { Ticket } from "./models/Ticket.js";
import { Counter } from "./models/Counter.js";

dotenv.config();

const dummyTickets = [
    { complaint: "Screen flickering continuously", device: "MacBook Pro M1", customer: "Rahul Sharma", reportedBy: "Support Desk A" },
    { complaint: "Battery draining within 2 hours", device: "iPhone 13", customer: "Anjali Menon", reportedBy: "Walk-in Center" },
    { complaint: "Keyboard keys multi-typing", device: "Logitech G613", customer: "Kevin Paul", reportedBy: "Web Portal" },
    { complaint: "No display on HDMI port 2", device: "Dell 24 inch Monitor", customer: "Siddharth Rice Mills", reportedBy: "B2B Executive" },
    { complaint: "Heats up excessively while idling", device: "Asus ROG Strix", customer: "Gautham Krishna", reportedBy: "Support Desk B" },
    { complaint: "Left earbud volume lower than right", device: "Sony WF-1000XM4", customer: "Meera Nair", reportedBy: "Web Portal" },
    { complaint: "OS stuck on bootloop after update", device: "Google Pixel 7", customer: "Vikram Sai", reportedBy: "Walk-in Center" },
    { complaint: "Router dropping Wi-Fi signal frequently", device: "TP-Link Archer C6", customer: "Sneha Joseph", reportedBy: "Support Desk A" },
    { complaint: "Tracks skipping mechanically", device: "Audio-Technica LP120X", customer: "Rohan Das", reportedBy: "VIP Client Desk" },
    { complaint: "Touchpad unresponsive intermittently", device: "HP Pavilion 15", customer: "Aisha Reddy", reportedBy: "Web Portal" }
];

const seedDatabase = async () => {
    try {
        await connectDb();

        // Clear existing data to prevent ID collisions during initialization
        await Ticket.deleteMany({});
        await Counter.deleteMany({});
        console.log("Existing tickets and counters cleared.");

        // Insert sequentially to ensure pre-save hooks safely trigger SRQ-1 through SRQ-10
        for (const ticket of dummyTickets) {
            const newTicket = new Ticket(ticket);
            await newTicket.save();
        }

        console.log("Successfully seeded 10 dummy tickets (SRQ-1 to SRQ-10)!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();