// routes/ticketRoutes.js
import express from "express";
import { createTicket, getTicketById, deleteTicketById } from "../controllers/ticketController.js";
const router = express.Router();

router.post("/tickets", createTicket);
router.get("/tickets/:ticketId", getTicketById);
router.delete("/tickets/:ticketId", deleteTicketById);

export default router;