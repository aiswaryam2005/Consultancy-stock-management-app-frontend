import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ServiceModal from "../components/ServiceModal";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://consultancy-stock-management-app-backend.onrender.com/api/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleRowClick = (service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingService(null);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await axios.put(`https://consultancy-stock-management-app-backend.onrender.com/api/services/${data._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("https://consultancy-stock-management-app-backend.onrender.com/api/services", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchServices();
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save service", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://consultancy-stock-management-app-backend.onrender.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="services-container">
        <div className="header">
          <h2>Service Management</h2>
          <button onClick={handleAddClick}>+ New Service</button>
        </div>

        <table className="service-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service Type</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Date Started</th>
              <th>Date Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} onClick={() => handleRowClick(service)}>
                <td>{service.customer}</td>
                <td>{service.serviceType}</td>
                <td>{service.status}</td>
                <td>${service.cost}</td>
                <td>{service.dateStarted?.slice(0, 10)}</td>
                <td>{service.dateCompleted?.slice(0, 10)}</td>
                <td>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(service._id); }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <ServiceModal
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            initialData={editingService}
          />
        )}
      </div>
    </>
  );
};

export default Services;
