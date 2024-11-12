let refreshInterval;

async function fetchRecentData() {
  try {
    const response = await fetch("http://192.168.153.22:8080/api/res");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    const data = await response.json();
    // Assume the data is an object or array with fields "Resistance" and "Voltage"
    const recentEntry = Array.isArray(data) && data.length ? data[data.length - 1] : data;

    const voltageDisplay = document.getElementById("voltageDisplay");
    const resistanceDisplay = document.getElementById("resistanceDisplay");
    const dateTimeDisplay = document.getElementById("dateTimeDisplay");

    // Check if elements exist before updating them
    if (voltageDisplay && resistanceDisplay && dateTimeDisplay) {
      voltageDisplay.innerText = `Voltage: ${recentEntry.Voltage.toFixed(3)} V`;
      resistanceDisplay.innerText = `Resistance: ${recentEntry.Resistance.toFixed(2)} Ω`;
      dateTimeDisplay.innerText = `Date & Time: ${new Date().toLocaleString()}`;

      // Save to local storage for history page
      saveToHistory(recentEntry);
    } else {
      console.error("One or more display elements are missing in the DOM.");
    }

  } catch (error) {
    console.error("Error fetching data:", error);

    const voltageDisplay = document.getElementById("voltageDisplay");
    const resistanceDisplay = document.getElementById("resistanceDisplay");
    const dateTimeDisplay = document.getElementById("dateTimeDisplay");

    if (voltageDisplay) voltageDisplay.innerText = "Error fetching data";
    if (resistanceDisplay) resistanceDisplay.innerText = "";
    if (dateTimeDisplay) dateTimeDisplay.innerText = "";
  }
}

function saveToHistory(entry) {
  const history = JSON.parse(localStorage.getItem("dataHistory")) || [];
  entry.dateTime = new Date().toLocaleString(); // Add date and time for history
  history.push(entry);
  localStorage.setItem("dataHistory", JSON.stringify(history));
}

function startFetchingAndRefreshing() {
  document.getElementById('status').innerText = "Fetching data and starting the 1-minute refresh interval.";
  fetchRecentData(); // Fetch data immediately when the button is clicked

  // Start the interval to fetch data every 1 minute (60000 ms)
  refreshInterval = setInterval(fetchRecentData, 60000);

  // Stop the interval after 5 minutes (300000 ms)
  setTimeout(function() {
    clearInterval(refreshInterval);
    document.getElementById('status').innerText = "The auto-refresh has stopped after 5 minutes.";
    console.log("Auto-refresh stopped.");
  }, 300000); // Stops after 5 minutes
}

// Ensure the function runs only after the DOM is fully loaded
window.addEventListener("load", fetchRecentData);