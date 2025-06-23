import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const OrderModal = ({ dealer, onClose, orders, refreshOrders }) => {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    status: "Select Status",
    date: new Date().toISOString().split("T")[0] // default to today's date
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${dealer._id}/orders`, formData);
    setFormData({
      product: "",
      quantity: "",
      unitPrice: "",
      status: "Select Status",
      date: new Date().toISOString().split("T")[0],
    });
    refreshOrders();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Orders for {dealer.name}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="product"
            placeholder="Product Name"
            value={formData.product}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Select Status">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <button type="submit">Place Order</button>
        </form>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderModal;
