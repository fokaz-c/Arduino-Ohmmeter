// Function to fetch historical data and display it in the table
async function loadHistoryData() {
  try {
    const response = await fetch("http://192.168.153.22:8080/api/history"); // Replace with your history API endpoint

    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
//CONVERT THE RESPONSE TO THE JSON FORMAT
    const historyData = await response.json();

    // Get the table body where data will be displayed
    const historyTableBody = document.getElementById("historyTableBody");
    historyTableBody.innerHTML = ""; // Clear any existing rows

    // Loop through each entry and create a row
    historyData.forEach(entry => {
      const row = document.createElement("tr");

      const dateTimeCell = document.createElement("td");
      dateTimeCell.innerText = entry.dateTime;

      const resistanceCell = document.createElement("td");
      resistanceCell.innerText = `${entry.resistance} Ω`;

      const voltageCell = document.createElement("td");
      voltageCell.innerText = `${entry.voltage} V`;

      // Append cells to the row
      row.appendChild(dateTimeCell);
      row.appendChild(resistanceCell);
      row.appendChild(voltageCell);

      // Append the row to the table body
      historyTableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Load data when the page loads
window.onload = loadHistoryData;
