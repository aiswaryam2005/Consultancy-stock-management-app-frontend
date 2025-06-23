import React, { useEffect, useState } from "react";//ok
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Profit.css";

const Profit = () => {
  const [summaries, setSummaries] = useState([]);
  const [todaySummary, setTodaySummary] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchProfitData();
  }, []);

  const fetchProfitData = async () => {
    try {
      const res = await axios.get("https://consultancy-stock-management-app-backend.onrender.com/api/profit");
      const profitData = res.data;

      setSummaries(profitData);
      setTodaySummary(profitData[0] || null);

      // Calculate accumulated total profit
      const total = profitData.reduce((sum, item) => sum + (item.profit || 0), 0);
      setTotalProfit(total);
    } catch (err) {
      console.error("Error fetching profit data:", err);
    }
  };

  const generateTodaySummary = async () => {
    try {
      await axios.post("https://consultancy-stock-management-app-backend.onrender.com/api/generate-today");
      await fetchProfitData(); // refresh summaries
    } catch (err) {
      console.error("Error generating today's profit summary:", err);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <>
      <Navbar />
      <div className="profit-container">
        <div className="profit-header">
          <h2>Profit Summary</h2>
          <button className="summary-btn" onClick={generateTodaySummary}>
            Daily Summary
          </button>
        </div>

        <div className="summary-cards">
          <div className="card">
            <h4>Service Revenue</h4>
            <p>${todaySummary?.serviceRevenue?.toFixed(2) || "0.00"}</p>
          </div>
          <div className="card">
            <h4>Parts Revenue</h4>
            <p>${todaySummary?.partsRevenue?.toFixed(2) || "0.00"}</p>
          </div>
          <div className="card">
            <h4>Net Profit</h4>
            <p>${todaySummary?.profit?.toFixed(2) || "0.00"}</p>
          </div>
          <div className="card">
            <h4>Services</h4>
            <p>{todaySummary?.services || 0}</p>
          </div>
          <div className="card">
            <h4>Total Profit</h4>
            <p>${totalProfit.toFixed(2)}</p>
          </div>
        </div>

        <h3>Daily Profit History</h3>
        <table className="profit-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service Revenue</th>
              <th>Parts Revenue</th>
              <th>Parts Cost</th>
              <th>Profit</th>
              <th>Services</th>
              <th>Parts Sold</th>
            </tr>
          </thead>
          <tbody>
            {summaries.map((summary, index) => (
              <tr key={index}>
                <td>{formatDate(summary.date)}</td>
                <td>${summary.serviceRevenue?.toFixed(2) || "0.00"}</td>
                <td>${summary.partsRevenue?.toFixed(2) || "0.00"}</td>
                <td>${summary.partsCost?.toFixed(2) || "0.00"}</td>
                <td>${summary.profit?.toFixed(2) || "0.00"}</td>
                <td>{summary.services || 0}</td>
                <td>{summary.partsSold || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Profit;
