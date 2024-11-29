// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";

// const LastMonth = () => {
//   const [data, setData] = useState([]); // State to hold fetched data
//   const [pocAverages, setPocAverages] = useState({}); // State for POC averages
//   const [totalAverage, setTotalAverage] = useState(0); // State for total average

//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=194558005"; // Your Google Sheet CSV URL for last month

//   useEffect(() => {
//     fetch(sheetURL)
//       .then((response) => response.text())
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
//         setData(parsedData.data); // Store parsed data in state

//         // Get the current date
//         const currentDate = new Date();
//         const lastMonth = currentDate.getMonth() - 1; // Last month
//         const lastMonthYear = currentDate.getFullYear();

//         // Filter the data for last month's date range
//         const lastMonthData = parsedData.data.filter((row) => {
//           const date = new Date(row["DATE"]);
//           return (
//             date.getMonth() === lastMonth &&
//             date.getFullYear() === lastMonthYear
//           );
//         });

//         // Calculate POC Averages (number of orders per POC) for last month
//         const pocOrderCount = {};
//         const pocDays = {}; // Track unique days per POC

//         lastMonthData.forEach((row) => {
//           const poc = row["POC"];
//           const date = row["DATE"];
//           if (!pocOrderCount[poc]) {
//             pocOrderCount[poc] = 0;
//             pocDays[poc] = new Set(); // Initialize unique days set for each POC
//           }
//           pocOrderCount[poc] += 1; // Count the orders for each POC
//           pocDays[poc].add(date); // Track unique days for each POC
//         });

//         const pocAveragesData = {};
//         for (const poc in pocOrderCount) {
//           const average = pocOrderCount[poc] / pocDays[poc].size; // Average per POC
//           pocAveragesData[poc] = average.toFixed(2); // Store the POC average
//         }
//         setPocAverages(pocAveragesData);

//         // Calculate Total Average (orders per day) for last month
//         const totalOrdersPerDay = {};
//         lastMonthData.forEach((row) => {
//           const date = row["DATE"];
//           if (!totalOrdersPerDay[date]) {
//             totalOrdersPerDay[date] = 0;
//           }
//           totalOrdersPerDay[date] += 1; // Count orders for each date
//         });

//         const totalOrderCount = Object.values(totalOrdersPerDay).reduce(
//           (sum, count) => sum + count,
//           0
//         );
//         const totalDays = Object.keys(totalOrdersPerDay).length;
//         const totalAvg = totalOrderCount / totalDays; // Calculate total average
//         setTotalAverage(totalAvg.toFixed(2)); // Set the total average
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           POC Orders and Averages (Last Month)
//         </h1>

//         {/* Total Average */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">
//             Total Orders Average (Last Month)
//           </h2>
//           <p className="text-2xl text-gray-700">{totalAverage}</p>
//         </div>

//         {/* POC Average */}
//         <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">
//             POC Orders Average (Last Month)
//           </h2>
//           <div className="space-y-4">
//             {Object.entries(pocAverages).map(([poc, avg]) => (
//               <div key={poc} className="flex justify-between">
//                 <span className="text-lg text-gray-700">{poc}</span>
//                 <span className="text-lg text-gray-700">{avg}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LastMonth;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import { FaSpinner, FaCalendarAlt, FaUsers } from "react-icons/fa";

const LastMonth = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [pocAverages, setPocAverages] = useState({}); // POC averages
  const [totalAverage, setTotalAverage] = useState(0); // Total average

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=194558005";

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
        setData(parsedData.data); // Store parsed data in state

        // Get the current date
        const currentDate = new Date();
        const firstDayOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        );

        // Filter the data for last month's date range
        const lastMonthData = parsedData.data.filter((row) => {
          const date = new Date(row["DATE"]);
          return date >= firstDayOfLastMonth && date <= lastDayOfLastMonth;
        });

        // Calculate POC Averages (number of orders per POC)
        const pocOrderCount = {};
        const pocDays = {}; // Track unique days per POC

        lastMonthData.forEach((row) => {
          const poc = row["POC"];
          const date = row["DATE"];
          if (!pocOrderCount[poc]) {
            pocOrderCount[poc] = 0;
            pocDays[poc] = new Set(); // Initialize unique days set for each POC
          }
          pocOrderCount[poc] += 1; // Count the orders for each POC
          pocDays[poc].add(date); // Track unique days for each POC
        });

        const pocAveragesData = {};
        for (const poc in pocOrderCount) {
          const average = pocOrderCount[poc] / pocDays[poc].size; // Average per POC
          pocAveragesData[poc] = average.toFixed(2); // Store the POC average
        }
        setPocAverages(pocAveragesData);

        // Calculate Total Average (orders per day)
        const totalOrdersPerDay = {};
        lastMonthData.forEach((row) => {
          const date = row["DATE"];
          if (!totalOrdersPerDay[date]) {
            totalOrdersPerDay[date] = 0;
          }
          totalOrdersPerDay[date] += 1; // Count orders for each date
        });

        const totalOrderCount = Object.values(totalOrdersPerDay).reduce(
          (sum, count) => sum + count,
          0
        );
        const totalDays = Object.keys(totalOrdersPerDay).length;
        const totalAvg = totalOrderCount / totalDays; // Calculate total average
        setTotalAverage(totalAvg.toFixed(2)); // Set the total average
      })
      .catch((error) => {
        console.error("Error fetching the sheet:", error);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => setLoading(false)); // Update loading state
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center py-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="text-blue-500 text-5xl animate-spin mb-4" />
          <p className="text-lg text-gray-700">Loading data...</p>
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      ) : (
        <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center">
            <FaCalendarAlt className="text-blue-500 mr-3" /> POC Orders and
            Averages (Last Month)
          </h1>

          {/* Total Average */}
          <div className="flex items-center bg-blue-50 p-6 rounded-lg shadow-md">
            <FaCalendarAlt className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Total Orders Average
              </h2>
              <p className="text-2xl text-gray-700">{totalAverage}</p>
            </div>
          </div>

          {/* POC Averages */}
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaUsers className="text-yellow-500 text-3xl mr-3" />
              POC Orders Average
            </h2>
            <div className="space-y-4 mt-4">
              {Object.entries(pocAverages).map(([poc, avg]) => (
                <div
                  key={poc}
                  className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-200"
                >
                  <span className="text-lg text-gray-700 font-medium">
                    {poc}
                  </span>
                  <span className="text-lg text-gray-700">{avg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LastMonth;
