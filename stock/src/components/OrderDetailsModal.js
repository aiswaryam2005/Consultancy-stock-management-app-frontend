import React, { useState } from "react";//ok
import axios from "axios";
import "./Modal.css";

const OrderDetailsModal = ({ dealer, orders, onClose, refreshOrders }) => {
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({
    product: "",
    quantity: "",
    unitPrice: "",
    status: "Pending",
    date: ""
  });

  const startEditing = (order) => {
    setEditingOrderId(order._id);
    setEditData({
      product: order.product,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
      status: order.status,
      date: order.date.split("T")[0],
    });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveEdit = async () => {
  try {
    await axios.put(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${dealer._id}/orders/${editingOrderId}`, editData);
    setEditingOrderId(null);
    refreshOrders();
  } catch (error) {
    console.error("Failed to update order:", error.response?.data || error.message);
    alert("Failed to update order. Please try again.");
  }
};

  const deleteOrder = async (id) => {
  try {
    await axios.delete(`https://consultancy-stock-management-app-backend.onrender.com/api/dealers/${dealer._id}/orders/${id}`);
    refreshOrders();
  } catch (error) {
    console.error("Failed to delete order:", error.response?.data || error.message);
    alert("Failed to delete order. Please try again.");
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Orders for {dealer.name}</h3>

        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-row">
              {editingOrderId === order._id ? (
                <div className="edit-form">
                  <input
                    name="product"
                    value={editData.product}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleEditChange}
                  />
                  <input
                    type="number"
                    name="unitPrice"
                    value={editData.unitPrice}
                    onChange={handleEditChange}
                  />
                  <select name="status" value={editData.status} onChange={handleEditChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditingOrderId(null)}>Cancel</button>
                </div>
              ) : (
                <div onClick={() => startEditing(order)} className="order-row-display">
                  <span><strong>{order.product}</strong> - {order.quantity} units - {order.status} - ${order.unitPrice}</span>
                  <span>(Ordered on: {new Date(order.date).toLocaleDateString()})</span>
                  <button className="delete-button" onClick={(e) => {
                    e.stopPropagation(); // prevent edit trigger
                    deleteOrder(order._id);
                  }}>🗑️</button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
