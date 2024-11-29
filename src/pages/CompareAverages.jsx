// import React, { useEffect, useState } from "react";
// import * as Papa from "papaparse";

// const CompareAverages = () => {
//   const [data7Days, setData7Days] = useState([]); // State for 7-day data
//   const [data30Days, setData30Days] = useState([]); // State for 30-day data
//   const [pocAverages7Days, setPocAverages7Days] = useState({}); // State for 7-day POC averages
//   const [pocAverages30Days, setPocAverages30Days] = useState({}); // State for 30-day POC averages

//   const sheetURL7Days =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1824590062"; // 7-day data URL

//   const sheetURL30Days =
//     "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1468133613"; // 30-day data URL

//   useEffect(() => {
//     // Fetch and parse 7-day data
//     const fetch7DaysData = async () => {
//       try {
//         const response = await fetch(sheetURL7Days);
//         const csvText = await response.text();
//         const parsedData = Papa.parse(csvText, { header: true });
//         setData7Days(parsedData.data);
//         const averages = calculateAverages(parsedData.data);
//         setPocAverages7Days(averages);
//       } catch (error) {
//         console.error("Error fetching 7-day data:", error);
//       }
//     };

//     // Fetch and parse 30-day data
//     const fetch30DaysData = async () => {
//       try {
//         const response = await fetch(sheetURL30Days);
//         const csvText = await response.text();
//         const parsedData = Papa.parse(csvText, { header: true });
//         setData30Days(parsedData.data);
//         const averages = calculateAverages(parsedData.data);
//         setPocAverages30Days(averages);
//       } catch (error) {
//         console.error("Error fetching 30-day data:", error);
//       }
//     };

//     fetch7DaysData();
//     fetch30DaysData();
//   }, []);

//   const calculateAverages = (data) => {
//     const pocOrderCount = {};
//     const pocDays = {};

//     data.forEach((row) => {
//       const poc = row["POC"];
//       const date = row["DATE"];
//       if (!pocOrderCount[poc]) {
//         pocOrderCount[poc] = 0;
//         pocDays[poc] = new Set(); // Track unique days per POC
//       }
//       pocOrderCount[poc] += 1;
//       pocDays[poc].add(date);
//     });

//     const pocAveragesData = {};
//     for (const poc in pocOrderCount) {
//       const average = pocOrderCount[poc] / pocDays[poc].size;
//       pocAveragesData[poc] = average.toFixed(2);
//     }

//     return pocAveragesData;
//   };

//   const compareAverages = (poc) => {
//     // Check if the POC exists in both datasets
//     const avg7Days = pocAverages7Days[poc]
//       ? parseFloat(pocAverages7Days[poc])
//       : 0.0;
//     const avg30Days = pocAverages30Days[poc]
//       ? parseFloat(pocAverages30Days[poc])
//       : 0.0;

//     if (avg7Days > avg30Days) {
//       return "bg-green-200"; // 7-day average is greater, green background
//     } else if (avg7Days < avg30Days) {
//       return "bg-red-200"; // 7-day average is less, red background
//     }

//     return ""; // Default background if averages are equal or both are 0.00
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
//       <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
//         <h1 className="text-3xl font-bold text-center text-gray-800">
//           POC Orders Comparison: 7 Days vs 30 Days
//         </h1>

//         <div className="space-y-4">
//           {Object.keys(pocAverages7Days).map((poc) => (
//             <div
//               key={poc}
//               className={`p-6 rounded-lg shadow-md ${compareAverages(poc)}`}
//             >
//               <div className="flex justify-between">
//                 <span className="text-lg font-semibold text-gray-700">
//                   {poc}
//                 </span>
//                 <div className="text-lg text-gray-700">
//                   <div>7-Day Average: {pocAverages7Days[poc] || "0.00"}</div>
//                   <div>30-Day Average: {pocAverages30Days[poc] || "0.00"}</div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Handle cases where there are POCs in 30 days but not in 7 days */}
//           {Object.keys(pocAverages30Days).map((poc) => {
//             if (!pocAverages7Days[poc]) {
//               return (
//                 <div key={poc} className="p-6 rounded-lg shadow-md bg-red-200">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-semibold text-gray-700">
//                       {poc}
//                     </span>
//                     <div className="text-lg text-gray-700">
//                       <div>7-Day Average: 0.00</div>
//                       <div>30-Day Average: {pocAverages30Days[poc]}</div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompareAverages;

import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";
import {
  FaArrowUp,
  FaArrowDown,
  FaRegCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa"; // Import FaSpinner

const CompareAverages = () => {
  const [data7Days, setData7Days] = useState([]); // State for 7-day data
  const [data30Days, setData30Days] = useState([]); // State for 30-day data
  const [pocAverages7Days, setPocAverages7Days] = useState({}); // State for 7-day POC averages
  const [pocAverages30Days, setPocAverages30Days] = useState({}); // State for 30-day POC averages
  const [loading, setLoading] = useState(true); // Loading state

  const sheetURL7Days =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1824590062"; // 7-day data URL

  const sheetURL30Days =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=1468133613"; // 30-day data URL

  useEffect(() => {
    // Fetch and parse 7-day data
    const fetch7DaysData = async () => {
      try {
        const response = await fetch(sheetURL7Days);
        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true });
        setData7Days(parsedData.data);
        const averages = calculateAverages(parsedData.data);
        setPocAverages7Days(averages);
      } catch (error) {
        console.error("Error fetching 7-day data:", error);
      }
    };

    // Fetch and parse 30-day data
    const fetch30DaysData = async () => {
      try {
        const response = await fetch(sheetURL30Days);
        const csvText = await response.text();
        const parsedData = Papa.parse(csvText, { header: true });
        setData30Days(parsedData.data);
        const averages = calculateAverages(parsedData.data);
        setPocAverages30Days(averages);
      } catch (error) {
        console.error("Error fetching 30-day data:", error);
      }
    };

    // Set loading state to true while fetching data
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetch7DaysData(), fetch30DaysData()]);
      setLoading(false); // Set loading state to false when data fetching is complete
    };

    fetchData();
  }, []);

  const calculateAverages = (data) => {
    const pocOrderCount = {};
    const pocDays = {};

    data.forEach((row) => {
      const poc = row["POC"];
      const date = row["DATE"];
      if (!pocOrderCount[poc]) {
        pocOrderCount[poc] = 0;
        pocDays[poc] = new Set(); // Track unique days per POC
      }
      pocOrderCount[poc] += 1;
      pocDays[poc].add(date);
    });

    const pocAveragesData = {};
    for (const poc in pocOrderCount) {
      const average = pocOrderCount[poc] / pocDays[poc].size;
      pocAveragesData[poc] = average.toFixed(2);
    }

    return pocAveragesData;
  };

  const compareAverages = (poc) => {
    // Check if the POC exists in both datasets
    const avg7Days = pocAverages7Days[poc]
      ? parseFloat(pocAverages7Days[poc])
      : 0.0;
    const avg30Days = pocAverages30Days[poc]
      ? parseFloat(pocAverages30Days[poc])
      : 0.0;

    if (avg7Days > avg30Days) {
      return "bg-green-100 border-green-500"; // 7-day average is greater, green background
    } else if (avg7Days < avg30Days) {
      return "bg-red-100 border-red-500"; // 7-day average is less, red background
    }

    return "bg-yellow-100 border-yellow-500"; // Neutral color if averages are equal or both are 0.00
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          <FaRegCheckCircle className="inline-block mr-3 text-blue-500" />
          POC Orders Comparison: 7 Days vs 30 Days
        </h1>

        {/* Show loading spinner if data is being fetched */}
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(pocAverages7Days).map((poc) => (
              <div
                key={poc}
                className={`p-6 rounded-lg shadow-md border-2 ${compareAverages(
                  poc
                )} transition-all duration-300`}
              >
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-700">
                    {poc}
                  </span>
                  <div className="text-lg text-gray-700">
                    <div className="flex items-center">
                      <FaArrowUp className="text-green-500 mr-2" />
                      <span>7-Day Avg: {pocAverages7Days[poc] || "0.00"}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaArrowDown className="text-red-500 mr-2" />
                      <span>
                        30-Day Avg: {pocAverages30Days[poc] || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Handle cases where there are POCs in 30 days but not in 7 days */}
            {Object.keys(pocAverages30Days).map((poc) => {
              if (!pocAverages7Days[poc]) {
                return (
                  <div
                    key={poc}
                    className="p-6 rounded-lg shadow-md bg-red-100 border-red-500"
                  >
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-700">
                        {poc}
                      </span>
                      <div className="text-lg text-gray-700">
                        <div className="flex items-center">
                          <FaTimesCircle className="text-red-500 mr-2" />
                          <span>7-Day Avg: 0.00</span>
                        </div>
                        <div className="flex items-center mt-2">
                          <FaArrowDown className="text-red-500 mr-2" />
                          <span>30-Day Avg: {pocAverages30Days[poc]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareAverages;
