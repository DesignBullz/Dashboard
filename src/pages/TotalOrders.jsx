// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";

// const TotalOrders = () => {
//   const [data, setData] = useState([]); // State to hold fetched data
//   const [totalUniqueIds, setTotalUniqueIds] = useState(0); // State for total unique IDs
//   const [codRepeats, setCodRepeats] = useState(0); // State for COD repeat values
//   const [deliveredRepeats, setDeliveredRepeats] = useState(0); // State for Delivered repeat values
//   const [totalAmount, setTotalAmount] = useState(0); // State for Total Amount (INR)
//   const [prepaidCount, setPrepaidCount] = useState(0); // State for "PREPAID" count
//   const [rtoDeliveredCount, setRtoDeliveredCount] = useState(0); // State for "RTO Delivered" count

//   const sheetURL =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0";

//   useEffect(() => {
//     fetch(sheetURL)
//       .then((response) => response.text())
//       .then((csvText) => {
//         const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
//         setData(parsedData.data); // Store parsed data in state

//         // Extract unique IDs
//         const idList = parsedData.data.map((row) => row["ID"]);
//         const uniqueIds = new Set(idList); // Remove duplicates using Set
//         setTotalUniqueIds(uniqueIds.size); // Set the total unique IDs

//         // COD Repeat Count
//         const codList = parsedData.data.map((row) => row["COD"]);
//         const codCounts = codList.reduce((acc, cod) => {
//           acc[cod] = (acc[cod] || 0) + 1;
//           return acc;
//         }, {});
//         setCodRepeats(Math.max(...Object.values(codCounts)));

//         // Delivered Repeat Count
//         const deliveredList = parsedData.data.map((row) => row["Delivered"]);
//         const deliveredCounts = deliveredList.reduce((acc, delivered) => {
//           acc[delivered] = (acc[delivered] || 0) + 1;
//           return acc;
//         }, {});
//         setDeliveredRepeats(Math.max(...Object.values(deliveredCounts)));

//         // Total Amount Calculation
//         const totalAmountSum = parsedData.data.reduce((sum, row) => {
//           const amount =
//             parseFloat((row["Total Amount  (INR)"] || "").trim()) || 0; // Parse amount or default to 0
//           return sum + amount;
//         }, 0);
//         setTotalAmount(totalAmountSum); // Set total amount

//         // Count "PREPAID" in PREPAID Column
//         const prepaidList = parsedData.data.map((row) => row["PREPAID"]);
//         const prepaidOccurrences = prepaidList.reduce((count, value) => {
//           if (value && value.trim() === "PREPAID") {
//             return count + 1;
//           }
//           return count;
//         }, 0);
//         setPrepaidCount(prepaidOccurrences); // Set "PREPAID" count

//         // Count "RTO Delivered" in RTO Delivered Column
//         const rtoDeliveredList = parsedData.data.map(
//           (row) => row["RTO Delivered"]
//         );
//         const rtoDeliveredOccurrences = rtoDeliveredList.reduce(
//           (count, value) => {
//             if (value && value.trim() === "RTO Delivered") {
//               return count + 1;
//             }
//             return count;
//           },
//           0
//         );
//         setRtoDeliveredCount(rtoDeliveredOccurrences); // Set "RTO Delivered" count
//       })
//       .catch((error) => console.error("Error fetching the sheet:", error));
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           Total Unique Orders
//         </h1>

//         {/* Total Unique IDs */}
//         <div className="bg-blue-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">TOTAL ORDERS</h2>
//           <p className="text-2xl text-gray-700">{totalUniqueIds}</p>
//         </div>

//         {/* COD Repeat Count */}
//         <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">COD</h2>
//           <p className="text-2xl text-gray-700">{codRepeats}</p>
//         </div>

//         {/* Delivered Repeat Count */}
//         <div className="bg-purple-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">DELIVERED</h2>
//           <p className="text-2xl text-gray-700">{deliveredRepeats}</p>
//         </div>

//         {/* Total Amount */}
//         <div className="bg-orange-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">ORDER VALUE</h2>
//           <p className="text-2xl text-gray-700">
//             ₹{totalAmount.toLocaleString()}
//           </p>
//         </div>

//         {/* PREPAID Repeated Count */}
//         <div className="bg-teal-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">PREPAID</h2>
//           <p className="text-2xl text-gray-700">{prepaidCount}</p>
//         </div>

//         {/* RTO Delivered Repeated Count */}
//         <div className="bg-pink-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800">RTO DELIVERED</h2>
//           <p className="text-2xl text-gray-700">{rtoDeliveredCount}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalOrders;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import {
  FaBoxOpen,
  FaCashRegister,
  FaCheckCircle,
  FaRupeeSign,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";

const TotalOrders = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [totalUniqueIds, setTotalUniqueIds] = useState(0); // Total unique IDs
  const [codRepeats, setCodRepeats] = useState(0); // COD repeat values
  const [deliveredRepeats, setDeliveredRepeats] = useState(0); // Delivered repeat values
  const [totalAmount, setTotalAmount] = useState(0); // Total Amount (INR)
  const [prepaidCount, setPrepaidCount] = useState(0); // PREPAID count
  const [rtoDeliveredCount, setRtoDeliveredCount] = useState(0); // RTO Delivered count

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=0";

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON
        setData(parsedData.data); // Store parsed data in state

        // Extract unique IDs
        const idList = parsedData.data.map((row) => row["ID"]);
        const uniqueIds = new Set(idList); // Remove duplicates using Set
        setTotalUniqueIds(uniqueIds.size); // Set the total unique IDs

        // COD Repeat Count
        const codList = parsedData.data.map((row) => row["COD"]);
        const codCounts = codList.reduce((acc, cod) => {
          acc[cod] = (acc[cod] || 0) + 1;
          return acc;
        }, {});
        setCodRepeats(Math.max(...Object.values(codCounts)));

        // Delivered Repeat Count
        const deliveredList = parsedData.data.map((row) => row["Delivered"]);
        const deliveredCounts = deliveredList.reduce((acc, delivered) => {
          acc[delivered] = (acc[delivered] || 0) + 1;
          return acc;
        }, {});
        setDeliveredRepeats(Math.max(...Object.values(deliveredCounts)));

        // Total Amount Calculation
        const totalAmountSum = parsedData.data.reduce((sum, row) => {
          const amount =
            parseFloat((row["Total Amount  (INR)"] || "").trim()) || 0; // Parse amount or default to 0
          return sum + amount;
        }, 0);
        setTotalAmount(totalAmountSum); // Set total amount

        // Count "PREPAID" in PREPAID Column
        const prepaidList = parsedData.data.map((row) => row["PREPAID"]);
        const prepaidOccurrences = prepaidList.reduce((count, value) => {
          if (value && value.trim() === "PREPAID") {
            return count + 1;
          }
          return count;
        }, 0);
        setPrepaidCount(prepaidOccurrences); // Set "PREPAID" count

        // Count "RTO Delivered" in RTO Delivered Column
        const rtoDeliveredList = parsedData.data.map(
          (row) => row["RTO Delivered"]
        );
        const rtoDeliveredOccurrences = rtoDeliveredList.reduce(
          (count, value) => {
            if (value && value.trim() === "RTO Delivered") {
              return count + 1;
            }
            return count;
          },
          0
        );
        setRtoDeliveredCount(rtoDeliveredOccurrences); // Set "RTO Delivered" count
      })
      .catch((error) => console.error("Error fetching the sheet:", error))
      .finally(() => setLoading(false)); // Update loading state
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex items-center justify-center py-10">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="text-blue-500 text-5xl animate-spin mb-4" />
          <p className="text-lg text-gray-700">Loading Order Data...</p>
        </div>
      ) : (
        <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center">
            <FaBoxOpen className="text-blue-500 mr-3" /> Total Orders Overview
          </h1>

          {/* Total Unique IDs */}
          <div className="flex items-center bg-blue-50 p-6 rounded-lg shadow-md">
            <FaBoxOpen className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                TOTAL ORDERS
              </h2>
              <p className="text-2xl text-gray-700">{totalUniqueIds}</p>
            </div>
          </div>

          {/* COD Repeat Count */}
          <div className="flex items-center bg-yellow-50 p-6 rounded-lg shadow-md">
            <FaCashRegister className="text-yellow-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">COD</h2>
              <p className="text-2xl text-gray-700">{codRepeats}</p>
            </div>
          </div>

          {/* Delivered Repeat Count */}
          <div className="flex items-center bg-purple-50 p-6 rounded-lg shadow-md">
            <FaCheckCircle className="text-purple-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">DELIVERED</h2>
              <p className="text-2xl text-gray-700">{deliveredRepeats}</p>
            </div>
          </div>

          {/* Total Amount */}
          <div className="flex items-center bg-orange-50 p-6 rounded-lg shadow-md">
            <FaRupeeSign className="text-orange-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                ORDER VALUE
              </h2>
              <p className="text-2xl text-gray-700">
                ₹{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* PREPAID Count */}
          <div className="flex items-center bg-teal-50 p-6 rounded-lg shadow-md">
            <FaCreditCard className="text-teal-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">PREPAID</h2>
              <p className="text-2xl text-gray-700">{prepaidCount}</p>
            </div>
          </div>

          {/* RTO Delivered Count */}
          <div className="flex items-center bg-pink-50 p-6 rounded-lg shadow-md">
            <FaTruck className="text-pink-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                RTO DELIVERED
              </h2>
              <p className="text-2xl text-gray-700">{rtoDeliveredCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalOrders;
