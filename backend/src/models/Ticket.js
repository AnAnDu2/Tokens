// model/Ticket.js
import mongoose from "mongoose";
import { Counter } from "./Counter.js";

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, unique: true },
    complaint: { type: String },
    device: { type: String, required: true },
    customer: { type: String, required: true },
    reportedBy: { type: String, required: true },
    assignedTo: { type: String, default: "AJIL" },
    reportedAt: { type: Date, default: Date.now },
    progress: { type: String, default: "IN-progress" }
});

// Pre-save hook to handle auto-incrementing custom ticketId (SRQ-1, SRQ-2...)
ticketSchema.pre("save", async function () {
    if (!this.isNew) return; // Just return instead of next()

    try {
        const counter = await Counter.findOneAndUpdate(
            { id: "ticketId" },
            { $inc: { seq: 1 } },
            // Changed 'new: true' to 'returnDocument: "after"' to fix the Mongoose warning
            { returnDocument: "after", upsert: true } 
        );

        this.ticketId = `SRQ-${counter.seq}`;
        // No next() needed here anymore!
    } catch (error) {
        // If an error happens in an async hook, throwing it automatically rejects the save
        throw error; 
    }
});

export const Ticket = mongoose.model("Ticket", ticketSchema);