// import React from "react";
// import SideNav from "../side-nav/side-nav";
// import { Outlet } from "react-router-dom";
// import "./dashboard.css";

// const Dashboard: React.FC = () => {
//   return (
//     <div className="dashboard-container">
//       <SideNav />
//       <main className="main-content">
//         <Outlet /> {/* This renders the current child route */}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import SideNav from "../side-nav/side-nav";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Side Navigation */}
      <SideNav />

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
