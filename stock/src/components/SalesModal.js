import React, { useState, useEffect } from "react";
import "./Modal.css";

const SalesModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    unitPrice: "",
    date: new Date().toISOString().split("T")[0], // Default to today
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Edit Sale" : "Add Sale"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity Sold"
            required
          />
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            placeholder="Unit Price"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesModal;
