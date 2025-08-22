import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Dashboard from "./components/core/dashboard/dashboard";
import DashboardHome from "./components/core/dashboard-home/dashboard-home";
import Urls from "./components/core/URLsPage/URLs";
import Ports from "./components/core/PortsPage/ports";
import Logs from "./components/core/logs/logs";
import Users from "./components/core/users/users";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Users />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nested Routes */}
          <Route index element={<DashboardHome />} />
          <Route path="urls" element={<Urls />} />
          <Route path="ports" element={<Ports />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        {/* Catch-All Route for 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
