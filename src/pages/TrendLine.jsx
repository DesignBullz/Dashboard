// // import React, { useEffect, useState } from "react";
// // import * as Papa from "papaparse";
// // import { Bar, Line } from "react-chartjs-2"; // Import both Bar and Line charts from react-chartjs-2
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   PointElement, // Register PointElement for line charts
// // } from "chart.js";

// // // Register chart.js components
// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   PointElement // Register PointElement here
// // );

// // const TrendLine = () => {
// //   const [dateData, setDateData] = useState([]); // State to hold date values
// //   const [chartData, setChartData] = useState({}); // State to hold the chart data
// //   const [lineChartData, setLineChartData] = useState({}); // State to hold the line chart data

// //   const sheetURL =
// //     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0"; // Your Google Sheet CSV URL

// //   useEffect(() => {
// //     // Fetch the data from Google Sheets CSV
// //     fetch(sheetURL)
// //       .then((response) => response.text()) // Convert response to text
// //       .then((csvText) => {
// //         const parsedData = Papa.parse(csvText, { header: true }); // Parse the CSV to JSON
// //         const data = parsedData.data;

// //         // Extract the "DATE" values
// //         const dateList = data.map((row) => row["DATE"]);

// //         // Count the frequency of each date
// //         const dateCount = dateList.reduce((acc, date) => {
// //           acc[date] = (acc[date] || 0) + 1;
// //           return acc;
// //         }, {});

// //         // Prepare the bar chart data
// //         const chartLabels = Object.keys(dateCount); // Dates as labels
// //         const chartValues = Object.values(dateCount); // Frequency of each date

// //         // Prepare the line chart data for trend over time
// //         const lineChartLabels = chartLabels; // Dates as labels for the trend line
// //         const lineChartValues = chartValues; // Frequencies to show in the trend line

// //         setDateData(chartLabels); // Set date labels
// //         setChartData({
// //           labels: chartLabels,
// //           datasets: [
// //             {
// //               label: "Date Frequency (Bar)",
// //               data: chartValues,
// //               backgroundColor: "rgba(54, 162, 235, 0.2)", // Bar color
// //               borderColor: "rgba(54, 162, 235, 1)", // Border color
// //               borderWidth: 1,
// //             },
// //           ],
// //         });

// //         setLineChartData({
// //           labels: lineChartLabels,
// //           datasets: [
// //             {
// //               label: "Date Frequency (Trend Line)",
// //               data: lineChartValues,
// //               borderColor: "rgba(75, 192, 192, 1)", // Line color
// //               backgroundColor: "rgba(75, 192, 192, 0.2)", // Line area color
// //               fill: true, // Fill the area under the line
// //               tension: 0.4, // Smooth the line
// //               borderWidth: 2,
// //             },
// //           ],
// //         });
// //       })
// //       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors

// //     // Cleanup chart instances when the component unmounts or re-renders
// //     return () => {
// //       if (window.Chart && window.Chart.instances) {
// //         window.Chart.instances.forEach((chart) => chart.destroy());
// //       }
// //     };
// //   }, []);

// //   return (
// //     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
// //       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
// //         <h1 className="text-3xl font-bold text-center text-gray-800">
// //           Same Date Frequency
// //         </h1>

// //         {/* Display the list of dates and their counts */}
// //         <div className="bg-blue-50 p-6 rounded-lg shadow-md">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             Dates and Their Frequencies
// //           </h2>
// //           <div className="space-y-4">
// //             {dateData.length > 0 ? (
// //               dateData.map((date, index) => (
// //                 <div key={index} className="text-lg text-gray-700">
// //                   <span className="font-semibold">{date}</span>:{" "}
// //                   {chartData.datasets[0].data[index]} occurrences
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-gray-700">No data available.</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Display Bar Chart */}
// //         <div className="bg-green-50 p-6 rounded-lg shadow-md">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             Date Frequency (Bar Chart)
// //           </h2>
// //           {dateData.length > 0 ? (
// //             <Bar
// //               data={chartData} // Pass the chart data
// //               options={{
// //                 responsive: true,
// //                 plugins: {
// //                   title: {
// //                     display: true,
// //                     text: "Date Frequency",
// //                   },
// //                   tooltip: {
// //                     callbacks: {
// //                       label: (context) => `${context.label}: ${context.raw}`,
// //                     },
// //                   },
// //                 },
// //               }}
// //             />
// //           ) : (
// //             <p className="text-gray-700">No data available.</p>
// //           )}
// //         </div>

// //         {/* Display Line Chart (Trend Line) */}
// //         <div className="bg-purple-50 p-6 rounded-lg shadow-md">
// //           <h2 className="text-xl font-semibold text-gray-800">
// //             Date Frequency (Trend Line)
// //           </h2>
// //           {lineChartData.labels ? (
// //             <Line
// //               data={lineChartData} // Pass the line chart data
// //               options={{
// //                 responsive: true,
// //                 plugins: {
// //                   title: {
// //                     display: true,
// //                     text: "Trend Line of Date Frequency",
// //                   },
// //                   tooltip: {
// //                     callbacks: {
// //                       label: (context) => `${context.label}: ${context.raw}`,
// //                     },
// //                   },
// //                 },
// //                 scales: {
// //                   x: {
// //                     title: {
// //                       display: true,
// //                       text: "Date",
// //                     },
// //                   },
// //                   y: {
// //                     title: {
// //                       display: true,
// //                       text: "Frequency",
// //                     },
// //                   },
// //                 },
// //               }}
// //             />
// //           ) : (
// //             <p className="text-gray-700">No data available.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TrendLine;

// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";
// import { Line } from "react-chartjs-2"; // Only import Line chart from react-chartjs-2
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
// } from "chart.js";

// // Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement
// );

// const TrendLine = () => {
//   const [lineChartData, setLineChartData] = useState({}); // State to hold the line chart data

//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0"; // Your Google Sheet CSV URL

//   useEffect(() => {
//     // Fetch the data from Google Sheets CSV
//     fetch(sheetURL)
//       .then((response) => response.text()) // Convert response to text
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse the CSV to JSON
//         const data = parsedData.data;

//         // Extract the "DATE" values
//         const dateList = data.map((row) => row["DATE"]);

//         // Count the frequency of each date
//         const dateCount = dateList.reduce((acc, date) => {
//           acc[date] = (acc[date] || 0) + 1;
//           return acc;
//         }, {});

//         // Prepare the line chart data for trend over time
//         const lineChartLabels = Object.keys(dateCount); // Dates as labels for the trend line
//         const lineChartValues = Object.values(dateCount); // Frequencies to show in the trend line

//         setLineChartData({
//           labels: lineChartLabels,
//           datasets: [
//             {
//               label: "Date Frequency (Trend Line)",
//               data: lineChartValues,
//               borderColor: "rgba(75, 192, 192, 1)", // Line color
//               backgroundColor: "rgba(75, 192, 192, 0.2)", // Line area color
//               fill: true, // Fill the area under the line
//               tension: 0.4, // Smooth the line
//               borderWidth: 2,
//             },
//           ],
//         });
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors

//     // Cleanup chart instances when the component unmounts or re-renders
//     return () => {
//       if (window.Chart && window.Chart.instances) {
//         window.Chart.instances.forEach((chart) => chart.destroy());
//       }
//     };
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           Date Frequency Trend Line
//         </h1>

//         {/* Display Line Chart (Trend Line) */}
//         <div className="bg-purple-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Date Frequency (Trend Line)
//           </h2>
//           {lineChartData.labels ? (
//             <Line
//               data={lineChartData} // Pass the line chart data
//               options={{
//                 responsive: true,
//                 plugins: {
//                   title: {
//                     display: true,
//                     text: "Trend Line of Date Frequency",
//                   },
//                   tooltip: {
//                     callbacks: {
//                       label: (context) => `${context.label}: ${context.raw}`,
//                     },
//                   },
//                 },
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Date",
//                     },
//                   },
//                   y: {
//                     title: {
//                       display: true,
//                       text: "Frequency",
//                     },
//                   },
//                 },
//               }}
//             />
//           ) : (
//             <p className="text-gray-700">No data available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrendLine;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import { Line } from "react-chartjs-2"; // Only import Line chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { FaChartBar, FaSpinner } from "react-icons/fa";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const TrendLine = () => {
  const [lineChartData, setLineChartData] = useState({}); // State to hold the line chart data
  const [loading, setLoading] = useState(true); // State for loading state

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0"; // Your Google Sheet CSV URL

  useEffect(() => {
    // Fetch the data from Google Sheets CSV
    fetch(sheetURL)
      .then((response) => response.text()) // Convert response to text
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse the CSV to JSON
        const data = parsedData.data;

        // Extract the "DATE" values
        const dateList = data.map((row) => row["DATE"]);

        // Count the frequency of each date
        const dateCount = dateList.reduce((acc, date) => {
          acc[date] = acc[date] ? acc[date] + 1 : 1;
          return acc;
        }, {});

        // Prepare the line chart data for trend over time
        const lineChartLabels = Object.keys(dateCount); // Dates as labels for the trend line
        const lineChartValues = Object.values(dateCount); // Frequencies to show in the trend line

        setLineChartData({
          labels: lineChartLabels,
          datasets: [
            {
              label: "Date Frequency (Trend Line)",
              data: lineChartValues,
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Line area color
              fill: true, // Fill the area under the line
              tension: 0.4, // Smooth the line
              borderWidth: 2,
            },
          ],
        });
        setLoading(false); // Set loading to false when data is ready
      })
      .catch((error) => {
        console.error("Error fetching the sheet:", error);
        setLoading(false); // Set loading to false even on error
      });

    // Cleanup chart instances when the component unmounts or re-renders
    return () => {
      if (window.Chart && window.Chart.instances) {
        window.Chart.instances.forEach((chart) => chart.destroy());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaChartBar className="text-blue-500 mr-3" /> Date Frequency - Trend
            Line
          </h1>
        </div>

        {/* Render the graph if data is available */}
        {!loading ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <Line
              data={lineChartData} // Pass the line chart data
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Trend Line of Date Frequency",
                    font: {
                      size: 18,
                    },
                    color: "#333",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                    ticks: {
                      color: "#333",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Frequency",
                    },
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
            <p className="text-lg text-gray-600">Loading Date Frequency...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendLine;
