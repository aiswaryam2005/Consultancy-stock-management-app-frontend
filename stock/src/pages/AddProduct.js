import { useState } from "react"; //ok
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    location: "",
    supplier: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/inventory");
    } catch (err) {
      console.error("Failed to add product", err);
    }
  };

  const fields = ["name", "category", "price", "stock", "location", "supplier"];

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <input
            key={field}
            type={["price", "stock"].includes(field) ? "number" : "text"}
            name={field}
            value={product[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
          />
        ))}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
