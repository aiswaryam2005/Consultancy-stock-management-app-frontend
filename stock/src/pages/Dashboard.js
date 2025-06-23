import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    inventoryValue: 0,
  });

  const fetchStats = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://consultancy-stock-management-app-backend.onrender.com/api/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
  <h1 className="dashboard-header">Dashboard</h1>

  <div className="stat-cards-row">
    <div className="stat-card">
      <h4>Total Products</h4>
      <p className="value">{stats.totalProducts}</p>
      <span className="desc">items in inventory</span>
    </div>
    <div className="stat-card">
      <h4>Low Stock</h4>
      <p className="value">{stats.lowStock}</p>
      <div className="progress"><div style={{ width: `${stats.lowStock * 10}%` }} /></div>
      <span className="desc">items below reorder point</span>
    </div>
    <div className="stat-card">
      <h4>Out of Stock</h4>
      <p className="value">{stats.outOfStock}</p>
      <div className="progress"><div style={{ width: `${stats.outOfStock * 10}%` }} /></div>
      <span className="desc">items with zero stock</span>
    </div>
    <div className="stat-card">
      <h4>Inventory Value</h4>
      <p className="value">${stats.inventoryValue.toFixed(2)}</p>
      <span className="desc">total value of inventory</span>
    </div>
  </div>
</div>

    </>
  );
}

export default Dashboard;
