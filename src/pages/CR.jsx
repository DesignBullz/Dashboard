import React, { useEffect, useState } from "react";
import * as Papa from "papaparse";

const CR = () => {
  const [pocCounts, setPocCounts] = useState({}); // State to hold the count of each POC

  const sheetURL =
    "https://docs.google.com/spreadsheets/d/1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY/export?format=csv&id=1Qy-LAaYDEGxuKBymSPFXynL99YfFn6yTW-cd_Bz5DaY&gid=347839784"; // Your Google Sheet CSV URL

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { header: true }); // Parse CSV to JSON

        // Extract POC column values
        const pocValues = parsedData.data
          .map((row) => row["POC"])
          .filter((poc) => poc); // Filter out empty values

        // Count occurrences of each POC value
        const pocCount = {};
        pocValues.forEach((poc) => {
          pocCount[poc] = (pocCount[poc] || 0) + 1; // Increment count for each POC
        });

        setPocCounts(pocCount); // Store the count of each POC in the state
      })
      .catch((error) => console.error("Error fetching the sheet:", error)); // Handle errors
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          POC Repetition Count
        </h1>

        {/* Display POC Counts */}
        <div className="space-y-4 mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            POC Occurrences
          </h2>
          {Object.keys(pocCounts).length > 0 ? (
            Object.entries(pocCounts).map(([poc, count], index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
                <span className="text-lg text-gray-700">
                  {poc} - Repeated {count} times
                </span>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-700">Loading POC counts...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CR;
