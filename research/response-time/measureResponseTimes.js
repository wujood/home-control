const axios = require("axios");
const fs = require("fs");
const { createCanvas } = require("canvas");

// Config
const url = process.argv[2];
const requestCount = parseInt(process.argv[3], 10);

if (!url || isNaN(requestCount)) {
  console.error(
    "Usage: node measureResponseTimes.js <url> <number_of_requests>"
  );
  process.exit(1);
}

async function measureResponseTime(url) {
  const start = Date.now();
  try {
    await axios.get(url);
    return Date.now() - start;
  } catch (err) {
    console.error(`Error: ${err.message}`);
    return -1;
  }
}

(async () => {
  const responseTimes = [];

  for (let i = 0; i < requestCount; i++) {
    const time = await measureResponseTime(url);
    responseTimes.push(time);
    console.log(`Request ${i + 1}: ${time} ms`);
  }

  // Create a simple HTML+Chart.js page to visualize results
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Response Time Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h2>Response Times for ${url}</h2>
  <canvas id="chart" width="800" height="400"></canvas>
  <script>
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [...Array(${requestCount}).keys()].map(i => i + 1),
        datasets: [{
          label: 'Response Time (ms)',
          data: ${JSON.stringify(responseTimes)},
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  </script>
</body>
</html>
`;

  fs.writeFileSync("response_times_chart.html", html);
  console.log("Chart written to response_times_chart.html");
})();
