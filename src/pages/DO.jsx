// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";

// const DO = () => {
//   const [repeatedPocData, setRepeatedPocData] = useState({}); // State to store repeated POCs

//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1460192487"; // Your Google Sheet CSV URL for the specified sheet

//   useEffect(() => {
//     fetch(sheetURL)
//       .then((response) => response.text())
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON

//         // Extract POC values from the sheet
//         const pocValues = parsedData.data
//           .map((row) => row["POC"])
//           .filter((poc) => poc);

//         // Count the occurrences of each POC
//         const pocCount = {};
//         pocValues.forEach((poc) => {
//           pocCount[poc] = (pocCount[poc] || 0) + 1; // Increment count for each POC
//         });

//         // Filter POCs that appear more than once
//         const repeatedPocs = Object.entries(pocCount).filter(
//           ([poc, count]) => count > 1
//         );

//         // Set repeated POCs in state
//         setRepeatedPocData(repeatedPocs);
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           Repeated POC Values
//         </h1>

//         {/* Display Repeated POCs */}
//         <div className="space-y-4 mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">Repeated POCs</h2>
//           {repeatedPocData.length > 0 ? (
//             repeatedPocData.map(([poc, count], index) => (
//               <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
//                 <div className="text-lg text-gray-700">
//                   <strong>POC:</strong> {poc}
//                 </div>
//                 <div className="mt-2">
//                   <strong>Count:</strong> {count}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-lg text-gray-700">Loading repeated POCs...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DO;

// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";

// const DO = () => {
//   const [deliveredData, setDeliveredData] = useState([]); // State to hold parsed data
//   const [pocDeliveredCount, setPocDeliveredCount] = useState({}); // State for storing count of "Delivered" per POC

//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1460192487"; // Your Google Sheet CSV URL for the specified sheet

//   useEffect(() => {
//     fetch(sheetURL)
//       .then((response) => response.text())
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
//         setDeliveredData(parsedData.data); // Store parsed data

//         // Count the number of "Delivered" for each POC
//         const pocDeliveredCount = {};

//         parsedData.data.forEach((row) => {
//           const poc = row["POC"];
//           const delivered = row["Delivered"];

//           if (delivered === "Delivered") {
//             // Initialize the count for the POC if it's not already initialized
//             if (!pocDeliveredCount[poc]) {
//               pocDeliveredCount[poc] = 0;
//             }
//             pocDeliveredCount[poc] += 1; // Increment count for each "Delivered"
//           }
//         });

//         setPocDeliveredCount(pocDeliveredCount); // Update state with the count
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           POC and Delivered Count
//         </h1>

//         {/* Display POC and Delivered Count */}
//         <div className="space-y-4 mt-8">
//           <h2 className="text-xl font-semibold text-gray-800">
//             POC and Delivered Count
//           </h2>
//           {Object.entries(pocDeliveredCount).length > 0 ? (
//             Object.entries(pocDeliveredCount).map(([poc, count], index) => (
//               <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
//                 <div className="text-lg text-gray-700">
//                   <strong>POC:</strong> {poc}
//                 </div>
//                 <div className="mt-2">
//                   <strong>Delivered Count:</strong> {count}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-lg text-gray-700">Loading data...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DO;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";

const DO = () => {
  const [pocCounts, setPocCounts] = useState({}); // State for storing counts of "COD", "PREPAID", and "DELIVERED" per POC

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1460192487"; // Google Sheet URL

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
        const data = parsedData.data; // Store parsed data

        // Initialize the counts for "COD", "PREPAID", and "DELIVERED" for each POC
        const pocCounts = {};

        data.forEach((row) => {
          const poc = row["POC"];
          const cod = row["COD"];
          const prepaid = row["PREPAID"];
          const delivered = row["Delivered"]; // Track Delivered column

          // Initialize count objects for each POC if not already initialized
          if (!pocCounts[poc]) {
            pocCounts[poc] = { COD: 0, PREPAID: 0, DELIVERED: 0 };
          }

          // Count "COD" occurrences (only if COD is "COD")
          if (cod === "COD") {
            pocCounts[poc].COD += 1;
          }

          // Count "PREPAID" occurrences (only if PREPAID is "PREPAID")
          if (prepaid === "PREPAID") {
            pocCounts[poc].PREPAID += 1;
          }

          // Count "DELIVERED" occurrences (only if DELIVERED is "Delivered")
          if (delivered === "Delivered") {
            pocCounts[poc].DELIVERED += 1;
          }
        });

        setPocCounts(pocCounts); // Update state with counts
      })
      .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          POC, COD, PREPAID, and DELIVERED Count
        </h1>

        {/* Display POC, COD, PREPAID, and DELIVERED Count */}
        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            POC and Counts
          </h2>
          {Object.entries(pocCounts).length > 0 ? (
            Object.entries(pocCounts).map(([poc, counts], index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
                <div className="text-lg text-gray-700">
                  <strong>POC:</strong> {poc}
                </div>
                <div className="mt-2">
                  <strong>COD Count:</strong> {counts.COD}
                </div>
                <div className="mt-2">
                  <strong>PREPAID Count:</strong> {counts.PREPAID}
                </div>
                <div className="mt-2">
                  <strong>Delivered Count:</strong> {counts.DELIVERED}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700">Loading data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DO;
