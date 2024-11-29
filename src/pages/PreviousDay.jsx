// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";
// import { Bar } from "react-chartjs-2"; // Import the Bar chart from react-chartjs-2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const PreviousDay = () => {
//   const [pocData, setPocData] = useState([]); // State to hold POC values of previous day
//   const [chartData, setChartData] = useState({}); // State to hold the chart data
//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1960557016"; // Your Google Sheet CSV URL for the previous day data

//   useEffect(() => {
//     // Fetch data from the Google Sheet
//     fetch(sheetURL)
//       .then((response) => response.text()) // Convert response to text
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
//         const data = parsedData.data;

//         // Get the current date and calculate the previous day
//         const currentDate = new Date();
//         currentDate.setDate(currentDate.getDate() - 1); // Set to previous day
//         const previousDay = currentDate.toLocaleDateString(); // Format date as "MM/DD/YYYY"

//         // Filter data for the previous day's records
//         const previousDayData = data.filter(
//           (row) => row["DATE"] === previousDay
//         );

//         // Extract the "POC" values for the previous day
//         const pocList = previousDayData.map((row) => row["POC"]);
//         setPocData(pocList); // Set the POC values in the state

//         // Count the frequency of each POC value
//         const pocCount = pocList.reduce((acc, poc) => {
//           acc[poc] = (acc[poc] || 0) + 1;
//           return acc;
//         }, {});

//         // Prepare data for the chart
//         const chartLabels = Object.keys(pocCount); // POC names
//         const chartValues = Object.values(pocCount); // Frequency of each POC

//         setChartData({
//           labels: chartLabels,
//           datasets: [
//             {
//               label: "POC Frequency",
//               data: chartValues,
//               backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
//               borderColor: "rgba(75, 192, 192, 1)", // Border color
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           POC Data for Previous Day
//         </h1>

//         {/* Display POC values for the previous day */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">
//             POC Values (Previous Day)
//           </h2>
//           <div className="space-y-4">
//             {pocData.length > 0 ? (
//               pocData.map((poc, index) => (
//                 <div key={index} className="text-lg text-gray-700">
//                   {poc}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-700">
//                 No data available for the previous day.
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Display Bar Chart */}
//         <div className="bg-green-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">
//             POC Frequency Chart (Previous Day)
//           </h2>
//           {pocData.length > 0 ? (
//             <Bar
//               data={chartData} // Pass the chart data
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: "POC Frequency on Previous Day",
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: (context) => `${context.label}: ${context.raw}`,
//                     },
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <p className="text-gray-700">
//               No data available for the previous day.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviousDay;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaChartBar, FaSpinner } from "react-icons/fa";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PreviousDay = () => {
  const [graphData, setGraphData] = useState(null); // State for graph data
  const [pocData, setPocData] = useState([]); // State to hold previous day's POC values

  // Google Sheets CSV URL for previous day data
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1960557016";

  useEffect(() => {
    // Fetch Google Sheet data
    fetch(sheetURL)
      .then((response) => response.text()) // Convert response to text
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
        const data = parsedData.data; // Get the parsed data

        // Get the current date and calculate the previous day
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1); // Set to previous day
        const previousDay = currentDate.toLocaleDateString(); // Format date as "MM/DD/YYYY"

        // Filter data for the previous day's records
        const previousDayData = data.filter(
          (row) => row["DATE"] === previousDay
        );

        // Extract the "POC" values for the previous day
        const pocList = previousDayData.map((row) => row["POC"]);
        setPocData(pocList); // Store POC values in state

        // Count the frequency of each POC value
        const pocCount = pocList.reduce((acc, poc) => {
          acc[poc] = acc[poc] ? acc[poc] + 1 : 1; // Count occurrences of each POC
          return acc;
        }, {});

        // Prepare data for the bar chart
        const labels = Object.keys(pocCount); // POC names
        const values = Object.values(pocCount); // Frequency of each POC
        setGraphData({
          labels: labels,
          datasets: [
            {
              label: "POC Frequency on Previous Day",
              data: values,
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaChartBar className="text-blue-500 mr-3" /> POC Data - Previous
            Day
          </h1>
        </div>

        {/* Render the graph if data is available */}
        {graphData ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <Bar
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "POC Frequency on Previous Day",
                    font: {
                      size: 18,
                    },
                    color: "#333",
                  },
                  legend: {
                    display: true,
                    labels: {
                      color: "#555",
                      font: {
                        size: 14,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return `${context.label}: ${context.raw}`;
                      },
                    },
                  },
                },
                layout: {
                  padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#333",
                    },
                  },
                  y: {
                    ticks: {
                      color: "#333",
                      beginAtZero: true,
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <FaSpinner className="text-blue-500 text-4xl animate-spin mb-4" />
            <p className="text-lg text-gray-600">Loading POC data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousDay;
