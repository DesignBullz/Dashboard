// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register necessary chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const POCGraph = () => {
//   const [data, setData] = useState([]); // State to hold fetched data
//   const [graphData, setGraphData] = useState(null); // State for graph data
//   const [uniquePoc, setUniquePoc] = useState([]); // State for unique POC values

//   // Google Sheets CSV URL for "POC" data
//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0";

//   useEffect(() => {
//     // Fetch Google Sheet data
//     fetch(sheetURL)
//       .then((response) => response.text()) // Convert response to text
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
//         setData(parsedData.data); // Store parsed data in state

//         // Extract unique POC values from the data
//         const pocList = parsedData.data.map((row) => row["POC"]);
//         const uniquePocs = [...new Set(pocList)]; // Remove duplicates using Set
//         setUniquePoc(uniquePocs); // Store unique POCs

//         // Prepare data for the graph
//         const personalCounts = pocList.reduce((acc, person) => {
//           acc[person] = acc[person] ? acc[person] + 1 : 1; // Count occurrences of each person
//           return acc;
//         }, {});

//         // Prepare data for the bar chart
//         const labels = Object.keys(personalCounts);
//         const values = Object.values(personalCounts);
//         setGraphData({
//           labels: labels,
//           datasets: [
//             {
//               label: "Common Persona Count in POC",
//               data: values,
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//           POC Data - Graph
//         </h1>

//         {/* Render the graph if data is available */}
//         {graphData ? (
//           <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//             <Bar
//               data={graphData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: "POC Persona Count",
//                     font: {
//                       size: 18,
//                     },
//                     color: "#333",
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: (context) => {
//                         return `${context.label}: ${context.raw}`;
//                       },
//                     },
//                   },
//                 },
//                 layout: {
//                   padding: {
//                     left: 10,
//                     right: 10,
//                     top: 10,
//                     bottom: 10,
//                   },
//                 },
//               }}
//             />
//           </div>
//         ) : (
//           <div className="text-center text-gray-600 text-lg">
//             Loading POC data...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default POCGraph;

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

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const POCGraph = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [graphData, setGraphData] = useState(null); // State for graph data
  const [uniquePoc, setUniquePoc] = useState([]); // State for unique POC values

  // Google Sheets CSV URL for "POC" data
  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0";

  useEffect(() => {
    // Fetch Google Sheet data
    fetch(sheetURL)
      .then((response) => response.text()) // Convert response to text
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
        setData(parsedData.data); // Store parsed data in state

        // Extract unique POC values from the data
        const pocList = parsedData.data.map((row) => row["POC"]);
        const uniquePocs = [...new Set(pocList)]; // Remove duplicates using Set
        setUniquePoc(uniquePocs); // Store unique POCs

        // Prepare data for the graph
        const personalCounts = pocList.reduce((acc, person) => {
          acc[person] = acc[person] ? acc[person] + 1 : 1; // Count occurrences of each person
          return acc;
        }, {});

        // Prepare data for the bar chart
        const labels = Object.keys(personalCounts);
        const values = Object.values(personalCounts);
        setGraphData({
          labels: labels,
          datasets: [
            {
              label: "Common Persona Count in POC",
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
            <FaChartBar className="text-blue-500 mr-3" /> POC Data - Graph
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
                    text: "POC Persona Count",
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

export default POCGraph;
