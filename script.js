// Helper function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(index) {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ index: `Promise ${index}`, time: time.toFixed(3) }), time * 1000);
  });
}

// Function to handle promises and update the table
function handlePromises() {
  const tbody = document.getElementById('output');
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
      loadingRow.remove();

      // Add rows for each promise result
      results.forEach((result) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.textContent = result.index;
        cell2.textContent = `${result.time} seconds`;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);
      });

      // Add row for total duration
      const totalRow = document.createElement('tr');
      const totalCell1 = document.createElement('td');
      const totalCell2 = document.createElement('td');
      totalCell1.textContent = 'Total';
      totalCell2.textContent = `${totalDuration} seconds`;
      totalRow.appendChild(totalCell1);
      totalRow.appendChild(totalCell2);
      tbody.appendChild(totalRow);
    })
    .catch((error) => {
      console.error('Error handling promises:', error);
      loadingRow.textContent = 'Error loading data';
    });
}

// Call the function to handle promises
handlePromises();
