// control/ticketController.js
import { Ticket } from "../models/Ticket.js";

// POST: Create a new ticket
export const createTicket = async (req, res) => {
    try {
        const { complaint, device, customer, reportedBy, assignedTo, progress } = req.body;

        const newTicket = new Ticket({
            complaint,
            device,
            customer,
            reportedBy,
            assignedTo,
            progress
        });

        await newTicket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET: Get a ticket by ticketId (e.g., SRQ-1)
export const getTicketById = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket.findOne({ ticketId: ticketId.toUpperCase() });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const deleteTicketById = async (req, res) => {
    try {
        const { ticketId } = req.params;
        console.log(`Attempting to delete ticket ID: ${ticketId}`);

        // Find and delete the document in one step
        const deletedTicket = await Ticket.findOneAndDelete({ ticketId: ticketId.toUpperCase().trim() });

        // If no ticket matches that ID
        if (!deletedTicket) {
            console.log(`Delete failed: Ticket ${ticketId} not found.`);
            return res.status(404).json({ message: "Ticket not found. Nothing was deleted." });
        }

        console.log(`Ticket ${ticketId} successfully deleted from database.`);
        return res.status(200).json({ 
            message: `Ticket ${ticketId} has been deleted successfully`,
            deletedTicket // Returns the deleted data back as a reference
        });

    } catch (error) {
        console.error("Error inside deleteTicketById controller:", error);
        return res.status(500).json({ error: error.message });
    }
};
