import React, { useState, useEffect } from "react";
import "./Modal.css";

const DealerModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    contactName: "",
    phone: "",
    email: "",
    address: "",
    products: [],
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const products = e.target.value.split(",").map((p) => p.trim());
    setFormData((prev) => ({ ...prev, products }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Edit Dealer" : "Add Dealer"}</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Dealer Name" value={formData.name} onChange={handleChange} required />
          <input name="contactName" placeholder="Contact Name" value={formData.contactName} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <input
            placeholder="Products Supplied (comma separated)"
            value={formData.products.join(", ")}
            onChange={handleProductChange}
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

export default DealerModal;
