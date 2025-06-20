// components/AddProductModal.js
import React, { useState } from "react";

const AddProductModal = ({ onClose, onSubmit }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
    reorderPoint: 0,
    supplier: "",
    location: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" placeholder="Product Name" onChange={handleChange} required className="col-span-1 p-2 border rounded" />
          <input name="category" placeholder="Category" onChange={handleChange} required className="col-span-1 p-2 border rounded" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="col-span-2 p-2 border rounded" />
          <input type="number" name="price" placeholder="Price ($)" onChange={handleChange} required className="col-span-1 p-2 border rounded" />
          <input type="number" name="stock" placeholder="Current Stock" onChange={handleChange} required className="col-span-1 p-2 border rounded" />
          <input type="number" name="reorderPoint" placeholder="Reorder Point" onChange={handleChange} className="col-span-2 p-2 border rounded" />
          <input name="supplier" placeholder="Supplier" onChange={handleChange} className="col-span-1 p-2 border rounded" />
          <input name="location" placeholder="Storage Location" onChange={handleChange} className="col-span-1 p-2 border rounded" />

          <div className="col-span-2 flex justify-end mt-4 gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
