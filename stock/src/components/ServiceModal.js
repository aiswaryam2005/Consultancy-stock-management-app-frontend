import React, { useState, useEffect } from "react";
import "./Modal.css";

const statusOptions = ["Select Status","Pending", "In Progress", "Completed"];

const ServiceModal = ({ onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    _id: null,
    customer: "",
    serviceType: "",
    status: "Select Status",
    cost: "",
    dateStarted: "",
    dateCompleted: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || null,
        customer: initialData.customer || "",
        serviceType: initialData.serviceType || "",
        status: initialData.status || "Pending",
        cost: initialData.cost || "",
        dateStarted: initialData.dateStarted
          ? initialData.dateStarted.slice(0, 10)
          : "",
        dateCompleted: initialData.dateCompleted
          ? initialData.dateCompleted.slice(0, 10)
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // if status changes away from Completed, clear dateCompleted
      ...(name === "status" && value !== "Completed"
        ? { dateCompleted: "" }
        : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    // ensure dateCompleted is blank if not completed
    if (payload.status !== "Completed") {
      payload.dateCompleted = "";
    }
    onSave(payload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{formData._id ? "Edit Service" : "Add Service"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Customer Name"
            required
          />
          <input
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            placeholder="Service Type"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Service Cost"
            required
          />
          <input
            type="date"
            name="dateStarted"
            value={formData.dateStarted}
            onChange={handleChange}
            required
          />
          {formData.status === "Completed" && (
            <input
              type="date"
              name="dateCompleted"
              value={formData.dateCompleted}
              onChange={handleChange}
              required
            />
          )}
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
