import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dealers.css";
import Navbar from "../components/Navbar";
import DealerModal from "../components/DealerModal";
import OrderModal from "../components/OrderModal";
import OrderDetailsModal from "../components/OrderDetailsModal";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [showDealerModal, setShowDealerModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const res = await axios.get("https://consultancy-stock-management-app-backend.onrender.com/api/dealers");
      setDealers(res.data);
    } catch (err) {
      console.error("Failed to fetch dealers:", err);
    }
  };

  const fetchOrders = async (dealerId) => {
    try {
      const res = await axios.get(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${dealerId}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleAddDealer = () => {
    setSelectedDealer(null);
    setShowDealerModal(true);
  };

  const handleSaveDealer = async (dealer) => {
    try {
      if (dealer._id) {
        await axios.put(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${dealer._id}`, dealer);
      } else {
        await axios.post("https://consultancy-stock-management-app-backend.onrender.com/api/dealers", dealer);
      }
      fetchDealers();
      setShowDealerModal(false);
    } catch (err) {
      console.error("Error saving dealer:", err);
    }
  };

  const handleDeleteDealer = async (id) => {
    try {
      await axios.delete(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${id}`);
      fetchDealers();
    } catch (err) {
      console.error("Failed to delete dealer:", err);
    }
  };

  const handlePlaceOrder = async (dealer) => {
    setSelectedDealer(dealer);
    await fetchOrders(dealer._id);
    setShowOrderModal(true);
  };

  const handleViewOrders = async (dealer) => {
    setSelectedDealer(dealer);
    await fetchOrders(dealer._id);
    setShowOrderDetailsModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="dealers-container">
        <div className="dealers-header">
          <h2>Dealer Directory</h2>
          <button onClick={handleAddDealer}>+ Add Dealer</button>
        </div>

        <div className="dealer-grid">
          {dealers.map((dealer) => (
            <div className="dealer-card" key={dealer._id}>
              <h3>{dealer.name}</h3>
              <p><strong>{dealer.contactName}</strong></p>
              <p>{dealer.phone}</p>
              <p>{dealer.email}</p>
              <p>{dealer.address}</p>
              <div className="product-tags">
                {dealer.products.map((product, i) => (
                  <span key={i} className="tag">{product}</span>
                ))}
              </div>
              <div className="dealer-actions">
                <button onClick={() => handlePlaceOrder(dealer)}>Place Order</button>
                <button onClick={() => handleViewOrders(dealer)}>Details</button>
                <button onClick={() => handleDeleteDealer(dealer._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {showDealerModal && (
          <DealerModal
            onClose={() => setShowDealerModal(false)}
            onSave={handleSaveDealer}
            initialData={selectedDealer}
          />
        )}

        {showOrderModal && selectedDealer && (
          <OrderModal
            dealer={selectedDealer}
            orders={orders}
            refreshOrders={() => fetchOrders(selectedDealer._id)}
            onClose={() => {
              setShowOrderModal(false);
              setSelectedDealer(null);
            }}
          />
        )}

        {showOrderDetailsModal && selectedDealer && (
          <OrderDetailsModal
            dealer={selectedDealer}
            orders={orders}
            refreshOrders={() => fetchOrders(selectedDealer._id)}
            onClose={() => {
              setShowOrderDetailsModal(false);
              setSelectedDealer(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Dealers;
