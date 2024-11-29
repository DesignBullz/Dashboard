// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import POCGraph from "./pages/POCGraph";
// import StateGraph from "./pages/StateGraph";
// import TotalOrders from "./pages/TotalOrders";
// import SevenDays from "./pages/SevenDays";
// import Last30Days from "./pages/Last30Days";
// import LastMonth from "./pages/LastMonth";
// import PreviousDay from "./pages/PreviousDay";
// import TrendLine from "./pages/TrendLine";
// import CompareAverages from "./pages/CompareAverages";
// import CR from "./pages/CR";
// import DO from "./pages/DO";
// import HomePage from "./pages/HomePage";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<POCGraph />} />
//         <Route path="/state" element={<StateGraph />} />
//         <Route path="/total" element={<TotalOrders />} />
//         <Route path="/7" element={<SevenDays />} />
//         <Route path="/30" element={<Last30Days />} />
//         <Route path="/month" element={<LastMonth />} />
//         <Route path="/previous" element={<PreviousDay />} />
//         <Route path="/trend" element={<TrendLine />} />
//         <Route path="/compare" element={<CompareAverages />} />
//         <Route path="/cr" element={<CR />} />
//         <Route path="/do" element={<DO />} />
//         <Route path="/home" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// };

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import POCGraph from "./pages/POCGraph";
import StateGraph from "./pages/StateGraph";
import TotalOrders from "./pages/TotalOrders";
import SevenDays from "./pages/SevenDays";
import Last30Days from "./pages/Last30Days";
import LastMonth from "./pages/LastMonth";
import PreviousDay from "./pages/PreviousDay";
import TrendLine from "./pages/TrendLine";
import CompareAverages from "./pages/CompareAverages";
import CR from "./pages/CR";
import DO from "./pages/DO";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define all routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/poc" element={<POCGraph />} />
        <Route path="/state" element={<StateGraph />} />
        <Route path="/total" element={<TotalOrders />} />
        <Route path="/7" element={<SevenDays />} />
        <Route path="/30" element={<Last30Days />} />
        <Route path="/month" element={<LastMonth />} />
        <Route path="/previous" element={<PreviousDay />} />
        <Route path="/trend" element={<TrendLine />} />
        <Route path="/compare" element={<CompareAverages />} />
        <Route path="/cr" element={<CR />} />
        <Route path="/do" element={<DO />} />
      </Routes>
    </Router>
  );
};

export default App;
