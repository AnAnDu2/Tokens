const statuses = [
  "Pending",
  "In Progress",
  "Resolved",
  "On Hold",
];

const priorities = [
  "Low",
  "Medium",
  "High",
  "Critical",
];

const customers = [
  "General Hospital Ernakulam",
  "District Hospital Tirur",
  "Medical College Trivandrum",
  "District Hospital Aluva",
  "Malabar Cancer Centre",
];

const complaints = [
  "Laptop not working",
  "Printer offline",
  "Blood bag tracking issue",
  "Unable to login",
  "Scanner malfunction",
  "Network connectivity issue",
  "Application crash",
  "Data sync failed",
  "Report generation error",
  "Barcode scanner issue",
];

const tickets = Array.from({ length: 50 }, (_, index) => ({
  id: `SRQ-${801 + index}`,
  complaint: complaints[index % complaints.length],
  device: `BBTAPP-${1000 + index}`,
  customer: customers[index % customers.length],
  reportedBy: `User ${index + 1}`,
  assignedTo: `Engineer ${(index % 5) + 1}`,
  reportedAt: `2025-06-${String((index % 30) + 1).padStart(2, "0")}`,
  status: statuses[index % statuses.length],
  priority: priorities[index % priorities.length],
}));

export default tickets;