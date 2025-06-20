import { useEffect, useState } from "react";//ok
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // handle loading
  const [error, setError] = useState(null);     // handle error

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/products/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/inventory");
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {["name", "category", "price", "stock", "location", "supplier"].map((field) => (
          <input
            key={field}
            type={["price", "stock"].includes(field) ? "number" : "text"}
            name={field}
            value={product[field] || ""}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            required
          />
        ))}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
