import React, { useState, useEffect } from "react";//ok
import axios from "axios";
import Navbar from "../components/Navbar";
import SalesModal from "../components/SalesModal";
import "./Sales.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales");
      setSales(res.data);
    } catch (err) {
      console.error("Failed to fetch sales", err);
    }
  };

  const handleRowClick = (sale) => {
    setEditingSale(sale);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingSale(null);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await axios.put(`http://localhost:5000/api/sales/${data._id}`, data);
      } else {
        await axios.post("http://localhost:5000/api/sales", data);
      }
      fetchSales();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save sale", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sales/${id}`);
      fetchSales();
    } catch (err) {
      console.error("Failed to delete sale", err);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // e.g., 5/21/2025
  };

  return (
    <>
      <Navbar />
      <div className="sales-container">
        <div className="header">
          <h2>Sales Management</h2>
          <button onClick={handleAddClick}>+ Add Sale</button>
        </div>
        <table className="sales-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Quantity Sold</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} onClick={() => handleRowClick(sale)}>
                <td>{sale.date ? formatDate(sale.date) : "-"}</td>
                <td>{sale.productName}</td>
                <td>{sale.quantity}</td>
                <td>${sale.unitPrice}</td>
                <td>${sale.unitPrice * sale.quantity}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(sale._id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <SalesModal
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            initialData={editingSale}
          />
        )}
      </div>
    </>
  );
};

export default Sales;
