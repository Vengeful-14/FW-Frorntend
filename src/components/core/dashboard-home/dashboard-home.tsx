import React, { useState, useEffect } from "react";
import { db } from "../../../services/firebase.service"; // Your Firebase service
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
// import { CircularProgress } from '@mui/material'; // For loading state
import "./dashboard-home.css"; // Import CSS for the dashboard

const DashboardHome: React.FC = () => {
  const [urlCount, setUrlCount] = useState<number>(0);
  const [portCount, setPortCount] = useState<number>(0);

  const fetchData = async () => {
    try {
      const urlsSnapshot = await getDocs(collection(db, "ipaddress")); // Fetch URLs
      const portsSnapshot = await getDocs(collection(db, "PORTs")); // Fetch Ports

      // Filter only blocked URLs
      const blockedUrls = urlsSnapshot.docs.filter(
        (doc) => doc.data().status === "blocked"
      );

      console.log("Blocked URLs Count:", blockedUrls.length);
      console.log("Ports Count:", portsSnapshot.size);

      setUrlCount(blockedUrls.length);
      setPortCount(portsSnapshot.size);

      // // Log to ensure data is being fetched
      // console.log("URLs Count:", urlsSnapshot.size);
      // console.log("Ports Count:", portsSnapshot.size);

      // // Set the counts based on Firestore collection sizes
      // setUrlCount(urlsSnapshot.size);
      // setPortCount(portsSnapshot.size);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  return (
    <div className="dashboard-container-1">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Blocked URLs</h3>
          <p>{urlCount}</p>
        </div>

        <div className="stat-card">
          <h3>Total Saved Ports</h3>
          <p>{portCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
