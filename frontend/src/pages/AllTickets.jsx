import { useState } from "react";
import tickets from "../data/tickets";
import "./AllTickets.css";

function AllTickets() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [searchField, setSearchField] =
  useState("id");

  const [searchValue, setSearchValue] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [customerFilter, setCustomerFilter] =
    useState("All");

  const [deviceFilter, setDeviceFilter] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const ticketsPerPage = 10;

  const filteredTickets = tickets.filter(
    (ticket) => {
      const fieldValue = String(
        ticket[searchField] || ""
      ).toLowerCase();

      const searchMatch =
        fieldValue.includes(
          searchValue.toLowerCase()
        );

      const statusMatch =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      const customerMatch =
        customerFilter === "All" ||
        ticket.customer === customerFilter;

      const deviceMatch =
        deviceFilter === "All" ||
        ticket.device === deviceFilter;

      return (
        searchMatch &&
        statusMatch &&
        customerMatch &&
        deviceMatch
      );
    }
  );

  const totalPages = Math.ceil(
    filteredTickets.length / ticketsPerPage
  );

  const currentTickets =
    filteredTickets.slice(
      (currentPage - 1) * ticketsPerPage,
      currentPage * ticketsPerPage
    );

  const downloadCSV = () => {
    const headers = [
      "ID",
      "Complaint",
      "Customer",
      "Device",
      "Status",
      "Priority",
    ];

    const rows = filteredTickets.map((t) => [
      t.id,
      t.complaint,
      t.customer,
      t.device,
      t.status,
      t.priority,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv" }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "tickets.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="tickets-page">

      <div className="content-layout">

        {/* LEFT FILTERS */}

        <div className="filter-sidebar">

          <h3>Filters</h3>

          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />

          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />

          <label>Search Field</label>

<select
  value={searchField}
  onChange={(e) =>
    setSearchField(e.target.value)
  }
>
  <option value="id">
    Work Order No
  </option>

  <option value="complaint">
    Complaint
  </option>

  <option value="customer">
    Customer
  </option>

  <option value="device">
    Device
  </option>

  <option value="reportedBy">
    Reported By
  </option>

  <option value="assignedTo">
    Assigned To
  </option>
</select>

          

          <label>Progress</label>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>On Hold</option>
          </select>

          <label>Customer</label>
          <select
            value={customerFilter}
            onChange={(e) =>
              setCustomerFilter(e.target.value)
            }
          >
            <option value="All">All</option>

            {[...new Set(
              tickets.map(
                (t) => t.customer
              )
            )].map((customer) => (
              <option
                key={customer}
                value={customer}
              >
                {customer}
              </option>
            ))}
          </select>

          <label>Device</label>
          <select
            value={deviceFilter}
            onChange={(e) =>
              setDeviceFilter(e.target.value)
            }
          >
            <option value="All">All</option>

            {[...new Set(
              tickets.map(
                (t) => t.device
              )
            )].map((device) => (
              <option
                key={device}
                value={device}
              >
                {device}
              </option>
            ))}
          </select>
          <div className="filter-buttons">

  <button
    className="apply-btn"
    onClick={() => setCurrentPage(1)}
  >
    Apply
  </button>

  <button
    className="clear-btn"
    onClick={() => {
      setStartDate("");
      setEndDate("");
      setSearchField("id");
      setSearchValue("");
      setStatusFilter("All");
      setCustomerFilter("All");
      setDeviceFilter("All");
      setCurrentPage(1);
    }}
  >
    Clear
  </button>

</div>

        </div>

        {/* TABLE SECTION */}

        <div className="table-section">

          <div className="top-bar">

            <input
  className="top-search"
  placeholder={`Search by ${searchField}...`}
  value={searchValue}
  onChange={(e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  }}
/>

            <button className="add-btn">
              + Add Ticket
            </button>

          </div>

          <div className="table-container">

            <table>

              <thead>
  <tr>
    <th>WORK ORDER NO</th>
    <th>COMPLAINT</th>
    <th>DEVICE</th>
    <th>CUSTOMER</th>
    <th>REPORTED BY</th>
    <th>ASSIGNED TO</th>
    <th>REPORTED AT</th>
    <th>PROGRESS</th>
    <th>PRIORITY</th>
    <th>ACTIONS</th>
  </tr>
</thead>

              <tbody>

                {currentTickets.map(
                  (ticket) => (
                    <tr key={ticket.id}>

  <td>{ticket.id}</td>

  <td>{ticket.complaint}</td>

  <td>{ticket.device}</td>

  <td>{ticket.customer}</td>

  <td>{ticket.reportedBy}</td>

  <td>{ticket.assignedTo}</td>

  <td>{ticket.reportedAt}</td>

  <td>
    <span
      className={`status ${ticket.status
        .replace(" ", "-")
        .toLowerCase()}`}
    >
      {ticket.status}
    </span>
  </td>

  <td>
    <span
      className={`priority ${ticket.priority.toLowerCase()}`}
    >
      {ticket.priority}
    </span>
  </td>

  <td>
  <select
    className="action-select"
    defaultValue=""
    onChange={(e) => {
      const action = e.target.value;

      if (action === "Reply") {
        alert(`Reply to ${ticket.id}`);
      }

      if (action === "Delete") {
        alert(`Delete ${ticket.id}`);
      }

      e.target.value = "";
    }}
  >
    <option value="" disabled>
      Actions
    </option>

    <option value="Reply">
      Reply
    </option>

    <option value="Delete">
      Delete
    </option>
  </select>
</td>

</tr>
                  )
                )}

              </tbody>

            </table>

          </div>

          <div className="bottom-bar">

            <div className="pagination">

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "active-page"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

            </div>

            <button
              className="download-btn"
              onClick={downloadCSV}
            >
              Download
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AllTickets;