// import React from "react";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Welcome to the Dashboard</h1>
//       <p>Select a page to navigate:</p>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         <li>
//           <Link to="/poc">POC Graph</Link>
//         </li>
//         <li>
//           <Link to="/state">State Graph</Link>
//         </li>
//         <li>
//           <Link to="/total">Total Orders</Link>
//         </li>
//         <li>
//           <Link to="/7">Last 7 Days</Link>
//         </li>
//         <li>
//           <Link to="/30">Last 30 Days</Link>
//         </li>
//         <li>
//           <Link to="/month">Last Month</Link>
//         </li>
//         <li>
//           <Link to="/previous">Previous Day</Link>
//         </li>
//         <li>
//           <Link to="/trend">Trend Line</Link>
//         </li>
//         <li>
//           <Link to="/compare">Compare Averages</Link>
//         </li>
//         <li>
//           <Link to="/cr">CR</Link>
//         </li>
//         <li>
//           <Link to="/do">DO</Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default HomePage;

import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartBar,
  FaCalendarDay,
  FaClock,
  FaHistory,
  FaChartLine,
  FaPercent,
  FaList,
  FaTasks,
  FaTable,
  FaRegCalendarCheck,
  FaUserShield, // Admin icon
} from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FaUserShield className="text-white text-3xl mr-2" />
          <span className="text-2xl font-bold">Admin Dashboard</span>
        </div>
        <div>
          <span className="text-lg">Welcome, Admin</span>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white p-6">
          <ul className="space-y-6">
            <li>
              <Link
                to="/poc"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaChartBar className="text-2xl mr-3" />
                <span className="font-medium">POC Graph</span>
              </Link>
            </li>
            <li>
              <Link
                to="/state"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaTasks className="text-2xl mr-3" />
                <span className="font-medium">State Graph</span>
              </Link>
            </li>
            <li>
              <Link
                to="/total"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaList className="text-2xl mr-3" />
                <span className="font-medium">Total Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/7"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaCalendarDay className="text-2xl mr-3" />
                <span className="font-medium">Last 7 Days</span>
              </Link>
            </li>
            <li>
              <Link
                to="/30"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaClock className="text-2xl mr-3" />
                <span className="font-medium">Last 30 Days</span>
              </Link>
            </li>
            <li>
              <Link
                to="/month"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaRegCalendarCheck className="text-2xl mr-3" />
                <span className="font-medium">Last Month</span>
              </Link>
            </li>
            <li>
              <Link
                to="/previous"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaHistory className="text-2xl mr-3" />
                <span className="font-medium">Previous Day</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trend"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaChartLine className="text-2xl mr-3" />
                <span className="font-medium">Trend Line</span>
              </Link>
            </li>
            <li>
              <Link
                to="/compare"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaTable className="text-2xl mr-3" />
                <span className="font-medium">Compare Averages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cr"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaPercent className="text-2xl mr-3" />
                <span className="font-medium">CR</span>
              </Link>
            </li>
            <li>
              <Link
                to="/do"
                className="flex items-center hover:bg-blue-700 p-3 rounded-lg transition"
              >
                <FaTasks className="text-2xl mr-3" />
                <span className="font-medium">DO</span>
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Dashboard Overview
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select a page to navigate:
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            <li>
              <Link
                to="/poc"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaChartBar className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">POC Graph</span>
              </Link>
            </li>
            <li>
              <Link
                to="/state"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaTasks className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">State Graph</span>
              </Link>
            </li>
            <li>
              <Link
                to="/total"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaList className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Total Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/7"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaCalendarDay className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Last 7 Days</span>
              </Link>
            </li>
            <li>
              <Link
                to="/30"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaClock className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Last 30 Days</span>
              </Link>
            </li>
            <li>
              <Link
                to="/month"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaRegCalendarCheck className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Last Month</span>
              </Link>
            </li>
            <li>
              <Link
                to="/previous"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaHistory className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Previous Day</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trend"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaChartLine className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">Trend Line</span>
              </Link>
            </li>
            <li>
              <Link
                to="/compare"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaTable className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">
                  Compare Averages
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/cr"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaPercent className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">CR</span>
              </Link>
            </li>
            <li>
              <Link
                to="/do"
                className="flex items-center bg-white shadow-lg p-4 rounded-lg hover:bg-blue-100 transition"
              >
                <FaTasks className="text-blue-500 text-2xl mr-4" />
                <span className="text-gray-800 font-medium">DO</span>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
