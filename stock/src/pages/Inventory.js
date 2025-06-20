import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./Inventory.css";


const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const url = editingProduct?._id
      ? `http://localhost:5000/api/products/${editingProduct._id}`
      : "http://localhost:5000/api/products";
    const method = editingProduct?._id ? "put" : "post";

    try {
      await axios[method](url, editingProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="inventory-container">
        <div className="header">
          <h1>Inventory</h1>
          <button className="add-btn" onClick={() => {
            setEditingProduct({
              name: "",
              category: "",
              price: "",
              stock: "",
              location: "",
              supplier: "",
              reorderPoint: ""
            });
            setShowModal(true);
          }}>
            + Add Product
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id} style={{ position: "relative" }}>
              {(product.stock === 0 || product.stock < product.reorderPoint) && (
    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: product.stock === 0 ? "red" : "yellow",
        color: product.stock === 0 ? "white" : "black",
        padding: "4px 8px",
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "0.85rem",
        zIndex: 1,
      }}
    >
      {product.stock === 0 ? "No Stock" : "Low Stock"}
    </div>
  )}
              <h2>{product.name}</h2>
              <p>{product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock} units</p>
              <p><strong>Location:</strong> {product.location}</p>
              <p><strong>Supplier:</strong> {product.supplier}</p>
              <p><strong>Reorder Point:</strong> {product.reorderPoint}</p>
              <div className="product-actions">
                <button onClick={() => {
                  setEditingProduct(product);
                  setShowModal(true);
                }}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editingProduct?._id ? "Edit Product" : "Add New Product"}</h2>
              <form onSubmit={handleSave} className="product-form">
                <label>Product Name</label>
                <input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} required />
                <label>Category</label>
                <input type="text" name="category" value={editingProduct.category} onChange={handleInputChange} required/>
                <label>Price</label>
                <input type="number" name="price" value={editingProduct.price} onChange={handleInputChange} required/>
                <label>Stock</label>
                <input type="number" name="stock" value={editingProduct.stock} onChange={handleInputChange} required/>
                <label>Location</label>
                <input type="text" name="location" value={editingProduct.location} onChange={handleInputChange} />
                <label>Supplier</label>
                <input type="text" name="supplier" value={editingProduct.supplier} onChange={handleInputChange} required />
                <label>Reorder Point</label>
                <input type="number" name="reorderPoint" value={editingProduct.reorderPoint} onChange={handleInputChange} required />

                <div className="modal-buttons">
                  <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Inventory;
