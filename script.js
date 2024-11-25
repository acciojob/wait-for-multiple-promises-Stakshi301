// Helper function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ index: `Promise ${index}`, time: time.toFixed(3) }), time * 1000);
  });
}

// Function to handle promises and update the table
function handlePromises() {
  const table = document.getElementById('promiseTable');
  const loadingRow = document.getElementById('loadingRow');

  // Create three promises
  const promises = [createRandomPromise(1), createRandomPromise(2), createRandomPromise(3)];

  const startTime = performance.now(); // Start time for total duration calculation

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises)
    .then((results) => {
      const endTime = performance.now(); // End time for total duration calculation
      const totalDuration = ((endTime - startTime) / 1000).toFixed(3);

      // Remove the loading row
      table.deleteRow(0);

      // Add rows for each promise result
      results.forEach((result) => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = result.index;
        cell2.textContent = `${result.time} seconds`;
      });

      // Add row for total duration
      const totalRow = table.insertRow();
      const totalCell1 = totalRow.insertCell(0);
      const totalCell2 = totalRow.insertCell(1);
      totalCell1.textContent = 'Total';
      totalCell2.textContent = `${totalDuration} seconds`;
    })
    .catch((error) => {
      console.error('Error handling promises:', error);
      loadingRow.textContent = 'Error loading data';
    });
}

// Call the function to handle promises
handlePromises();
